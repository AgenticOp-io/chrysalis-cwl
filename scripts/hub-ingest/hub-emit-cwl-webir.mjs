/**
 * Thin WebIR → CWL projection (Phase 0.3 Slice 4 + 1.0.10 control reverse).
 *
 * CWL-shaped surfaces that pillar ingest already lowers (literals, flat object
 * literals, projectable early-guards / else / foreach, honest holes).
 * Does NOT copy convert `hub-webir-routes.mjs` PHP/session walkers.
 *
 * @see docs/history/WEBIR-EXTRACT-PLAN.md Slice 4
 */
import { cwlEmitLocator, peelCwlControlBody } from "./cwl-emit-control.mjs";
import { printEmitUiTree, projectHtmlTemplateOrLiteral, projectUiTreeValue } from "./cwl-emit-ui.mjs";

/**
 * @param {unknown} value
 */
function cwlRenderLiteral(value) {
  if (value === true) return "true";
  if (value === false) return "false";
  if (typeof value === "number") return Number.isFinite(value) ? String(value) : "null";
  if (typeof value === "string") return JSON.stringify(value);
  if (value === null) return "null";
  if (Array.isArray(value)) return `[${value.map(cwlRenderLiteral).join(", ")}]`;
  if (typeof value === "object") {
    const ent = Object.entries(value).map(([k, v]) => `${k}: ${cwlRenderLiteral(v)}`);
    return `{ ${ent.join(", ")} }`;
  }
  return "null";
}

/**
 * @param {object} v — { t: "lit"|"obj"|"hole"|"html", ... }
 */
function cwlRenderValue(v) {
  if (!v) return '""';
  if (v.t === "html") return `html ${cwlRenderLiteral(v.value)}`;
  if (v.t === "ident" && typeof v.name === "string") return v.name;
  if (v.t === "lit") return cwlRenderLiteral(v.value);
  if (v.t === "obj") {
    const ent = v.entries.map((e) => `${e.key}: ${cwlRenderValue(e.value)}`);
    return `{ ${ent.join(", ")} }`;
  }
  if (v.t === "arr") {
    return `[${(v.elements ?? []).map((el) => cwlRenderValue(el)).join(", ")}]`;
  }
  return '""';
}

/**
 * @param {unknown} name
 * @param {string} [fallback]
 */
export function toCwlIdent(name, fallback = "handler") {
  let s = String(name ?? "")
    .replace(/[^a-zA-Z0-9_]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .replace(/_+/g, "_");
  if (!s) s = fallback;
  if (!/^[a-zA-Z_]/.test(s)) s = `h_${s}`;
  if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(s)) s = fallback;
  return s;
}

/**
 * Project a single WebIR data node into a CWL value (thin surface).
 * @param {(id: string) => object | undefined} get
 * @param {string} id
 * @returns {{ t: "lit"|"obj"|"hole"|"html"|"ident", value?: unknown, name?: string, entries?: Array<{key:string,value:object}>, reason?: string }}
 */
export function cwlValueOfThin(get, id) {
  const n = get(id);
  if (!n) return { t: "hole", reason: "cwl:emit:missing-value" };

  // Authored HTML / UI response chrome (page or early-exit success)
  if (n.dialect === "web.request" && n.op === "response") {
    const val = get(n.operands?.[0]);
    if (!val) return { t: "hole", reason: "cwl:emit:unsupported-response" };
    if (val.dialect === "data" && val.op === "ui.tree") return projectUiTreeValue(get, val);
    if (val.dialect === "data" && (val.op === "html.template" || val.op === "literal")) {
      const kind = String(n.attrs?.kind ?? "");
      if (kind === "html" || cwlEmitLocator(n).includes("html") || val.op === "html.template") {
        return projectHtmlTemplateOrLiteral(get, val);
      }
      if (val.op === "literal") return { t: "lit", value: val.attrs?.value };
    }
    return { t: "hole", reason: "cwl:emit:unsupported-response" };
  }
  if (n.dialect === "data" && n.op === "ui.tree") return projectUiTreeValue(get, n);
  if (n.dialect === "data" && n.op === "html.template") return projectHtmlTemplateOrLiteral(get, n);

  if (n.dialect === "data" && n.op === "literal") {
    return { t: "lit", value: n.attrs?.value };
  }
  if (n.dialect === "data" && n.op === "block") {
    const ops = n.operands ?? [];
    if (ops.length === 1) return cwlValueOfThin(get, ops[0]);
    if (ops.length === 0) return { t: "hole", reason: "cwl:emit:empty-block" };
    return { t: "hole", reason: "cwl:emit:multi-statement-body" };
  }
  if (n.dialect === "data" && n.op === "call") {
    const callee = String(n.attrs?.callee ?? "");
    if (callee === "__object_literal") {
      const ops = n.operands ?? [];
      /** @type {Array<{ key: string, value: object }>} */
      const entries = [];
      for (let i = 0; i + 1 < ops.length; i += 2) {
        const keyNode = get(ops[i]);
        const key = keyNode?.attrs?.value;
        if (typeof key !== "string") return { t: "hole", reason: "cwl:emit:non-string-key" };
        const value = cwlValueOfThin(get, ops[i + 1]);
        if (value.t === "hole") return value;
        entries.push({ key, value });
      }
      return { t: "obj", entries };
    }
    if (callee === "__array_literal") {
      const ops = n.operands ?? [];
      /** @type {object[]} */
      const elements = [];
      for (const op of ops) {
        const value = cwlValueOfThin(get, op);
        if (value.t === "hole") return value;
        elements.push(value);
      }
      return { t: "arr", elements };
    }
    return { t: "hole", reason: `cwl:emit:unsupported-call:${callee}` };
  }
  if (n.dialect === "data" && n.op === "hole") {
    return { t: "hole", reason: String(n.attrs?.reason ?? "cwl:emit:hole") };
  }
  // RFC-0013 v2 load redirect / http.error (ingest lowers these as effect nodes)
  if (n.dialect === "effect" && n.op === "redirect") {
    const loc = cwlValueOfThin(get, n.operands?.[0]);
    if (loc.t === "lit" && typeof loc.value === "string") {
      return { t: "load-redirect", location: loc.value };
    }
    return { t: "hole", reason: "cwl:emit:unsupported:effect.redirect" };
  }
  if (n.dialect === "effect" && (n.op === "http.error" || n.op === "httpError")) {
    const status = Number(n.attrs?.status);
    if (!Number.isFinite(status)) {
      return { t: "hole", reason: "cwl:emit:unsupported:effect.http.error" };
    }
    /** @type {{ t: "load-error", status: number, message?: string }} */
    const out = { t: "load-error", status };
    if (n.operands?.[0]) {
      const msg = cwlValueOfThin(get, n.operands[0]);
      if (msg.t === "lit" && typeof msg.value === "string") out.message = msg.value;
    }
    return out;
  }
  // Path/query defaults (`??`) project as the binding ident (default emitted on param/query decl)
  if (n.dialect === "data" && (n.op === "binop" || n.op === "binOp") && n.attrs?.operator === "??") {
    return cwlValueOfThin(get, n.operands?.[0]);
  }
  // Path/query/body/header field as bare ident (headers may include `-`)
  if (n.dialect === "data" && (n.op === "request.field" || n.op === "requestField" || n.op === "param")) {
    const name = String(n.attrs?.name ?? "");
    if (/^[A-Za-z_][A-Za-z0-9_-]*$/.test(name)) return { t: "ident", name };
  }
  return { t: "hole", reason: `cwl:emit:unsupported:${n.dialect}.${n.op}` };
}

/**
 * Walk a handler body for thin CWL projection (incl. projectable control reverse).
 * @param {(id: string) => object | undefined} get
 * @param {string} bodyId
 */
export function walkCwlHandlerBodyThin(get, bodyId) {
  const peeled = peelCwlControlBody(get, bodyId);
  let value = cwlValueOfThin(get, peeled.successId);
  /** @type {object | null} */
  let loadValue = null;
  if (peeled.loadBody?.kind === "object-ref" && peeled.loadBody.id) {
    const lv = cwlValueOfThin(get, peeled.loadBody.id);
    if (lv.t === "obj" || lv.t === "lit") loadValue = lv;
  } else if (peeled.loadBody?.kind === "effect-ref" && peeled.loadBody.id) {
    const ev = cwlValueOfThin(get, peeled.loadBody.id);
    if (ev.t === "load-redirect") {
      loadValue = {
        t: "obj",
        entries: [{ key: "redirect", value: { t: "lit", value: ev.location } }],
      };
    } else if (ev.t === "load-error") {
      /** @type {Array<{ key: string, value: object }>} */
      const entries = [{ key: "error", value: { t: "lit", value: ev.status } }];
      if (typeof ev.message === "string") {
        entries.push({ key: "message", value: { t: "lit", value: ev.message } });
      }
      loadValue = { t: "obj", entries };
    }
  }
  // Legacy IR: bare redirect/error as success (pre-1.0.26) — recover load + empty shell.
  if (value.t === "load-redirect") {
    loadValue = {
      t: "obj",
      entries: [{ key: "redirect", value: { t: "lit", value: value.location } }],
    };
    value = { t: "html", value: "" };
  } else if (value.t === "load-error") {
    /** @type {Array<{ key: string, value: object }>} */
    const entries = [{ key: "error", value: { t: "lit", value: value.status } }];
    if (typeof value.message === "string") {
      entries.push({ key: "message", value: { t: "lit", value: value.message } });
    }
    loadValue = { t: "obj", entries };
    value = { t: "html", value: "" };
  }
  const isPage = value.t === "html" || value.t === "ui" || loadValue != null;
  const hasControl =
    peeled.earlyGuards.length > 0 ||
    peeled.foreachBindings.length > 0 ||
    (peeled.effects?.length && peeled.effects[0] !== "none") ||
    loadValue != null ||
    peeled.status != null ||
    peeled.contentType != null ||
    (peeled.responseHeaders?.length ?? 0) > 0 ||
    (peeled.attachmentHoles?.length ?? 0) > 0;

  if (value.t === "hole" && !hasControl) {
    return {
      status: peeled.status,
      contentType: peeled.contentType,
      streamKind: peeled.streamKind,
      responseHeaders: peeled.responseHeaders,
      params: peeled.bindings.path,
      pathDefaults: peeled.bindings.pathDefaults,
      queryParams: peeled.bindings.query,
      queryDefaults: peeled.bindings.queryDefaults,
      bodyParams: peeled.bindings.body,
      multipartFields: peeled.bindings.multipartFields,
      multipartFiles: peeled.bindings.multipartFiles,
      headerParams: peeled.bindings.header,
      cookieParams: peeled.bindings.cookie,
      value: null,
      loadValue: null,
      holeReason: value.reason,
      effects: peeled.effects ?? ["none"],
      earlyGuards: [],
      foreachBindings: [],
      attachmentHoles: peeled.attachmentHoles ?? [],
      surfaceKind: "api",
    };
  }
  if (value.t === "hole") {
    return {
      status: peeled.status,
      contentType: peeled.contentType,
      streamKind: peeled.streamKind,
      responseHeaders: peeled.responseHeaders,
      params: peeled.bindings.path,
      pathDefaults: peeled.bindings.pathDefaults,
      queryParams: peeled.bindings.query,
      queryDefaults: peeled.bindings.queryDefaults,
      bodyParams: peeled.bindings.body,
      multipartFields: peeled.bindings.multipartFields,
      multipartFiles: peeled.bindings.multipartFiles,
      headerParams: peeled.bindings.header,
      cookieParams: peeled.bindings.cookie,
      value: null,
      loadValue,
      holeReason: value.reason,
      effects: peeled.effects ?? ["none"],
      earlyGuards: peeled.earlyGuards,
      foreachBindings: peeled.foreachBindings,
      attachmentHoles: peeled.attachmentHoles ?? [],
      surfaceKind: isPage ? "page" : "api",
    };
  }
  return {
    status: peeled.status,
    contentType: peeled.contentType,
    streamKind: peeled.streamKind,
    responseHeaders: peeled.responseHeaders,
    params: peeled.bindings.path,
    pathDefaults: peeled.bindings.pathDefaults,
    queryParams: peeled.bindings.query,
    queryDefaults: peeled.bindings.queryDefaults,
    bodyParams: peeled.bindings.body,
    multipartFields: peeled.bindings.multipartFields,
    multipartFiles: peeled.bindings.multipartFiles,
    headerParams: peeled.bindings.header,
    cookieParams: peeled.bindings.cookie,
    value,
    loadValue,
    holeReason: null,
    effects: peeled.effects ?? ["none"],
    earlyGuards: peeled.earlyGuards,
    foreachBindings: peeled.foreachBindings,
    attachmentHoles: peeled.attachmentHoles ?? [],
    surfaceKind: isPage ? "page" : "api",
  };
}

/**
 * List routes with thin CWL-shaped projections.
 * @param {{ roots: string[], nodes: Map<string, object> | { get: (id: string) => object | undefined } }} module
 */
export function listCwlRoutes(module) {
  const get =
    typeof module.nodes?.get === "function"
      ? (id) => module.nodes.get(id)
      : (id) => module.nodes?.[id];
  const routes = [];
  for (const rid of module.roots ?? []) {
    const routeNode = get(rid);
    if (!routeNode || routeNode.dialect !== "web.request" || routeNode.op !== "route") continue;
    const attrs = routeNode.attrs ?? {};
    const method = String(attrs.method ?? "GET").toUpperCase();
    const path = String(attrs.path ?? "/");
    const handlerId = routeNode.operands?.[0];
    if (handlerId === undefined) continue;
    const handler = get(handlerId);
    if (!handler || handler.dialect !== "web.request" || handler.op !== "handler") continue;
    const bodyId = handler.operands?.[0];
    if (bodyId === undefined) continue;
    const rawName = String(handler.attrs?.name ?? `${method}_${path.replace(/[^a-zA-Z0-9]+/g, "_")}`);
    const handlerName = toCwlIdent(
      rawName,
      `${method.toLowerCase()}_${path.replace(/[^a-zA-Z0-9]+/g, "_") || "root"}`,
    );
    routes.push({ method, path, handlerName, ...walkCwlHandlerBodyThin(get, bodyId) });
  }
  return routes.sort((a, b) => a.path.localeCompare(b.path) || a.method.localeCompare(b.method));
}

/**
 * @param {object[]} stmts
 * @param {string} indent
 * @param {string[]} lines
 */
function printEmitStmts(stmts, indent, lines) {
  for (const s of stmts ?? []) {
    if (s.kind === "status" && typeof s.status === "number") {
      lines.push(`${indent}status ${s.status};`);
      continue;
    }
    if (s.kind === "return") {
      if (s.body?.kind === "html") {
        lines.push(`${indent}return html ${cwlRenderLiteral(s.body.value)};`);
      } else if (s.body?.kind === "literal") {
        lines.push(`${indent}return ${cwlRenderLiteral(s.body.value)};`);
      } else if (s.body?.kind === "object" && s.body.entries) {
        const ent = s.body.entries
          .map((e) => `${e.key}: ${cwlRenderValue(e.value?.t ? e.value : { t: "lit", value: e.value })}`)
          .join(", ");
        lines.push(`${indent}return { ${ent} };`);
      }
      continue;
    }
    if (s.kind === "if") {
      lines.push(`${indent}if ${s.condExpr} {`);
      printEmitStmts(s.stmts ?? [], `${indent}  `, lines);
      lines.push(`${indent}}`);
      for (const ei of s.elseIfs ?? []) {
        lines.push(`${indent}else if ${ei.condExpr} {`);
        printEmitStmts(ei.stmts ?? [], `${indent}  `, lines);
        lines.push(`${indent}}`);
      }
      if (Array.isArray(s.elseStmts) && s.elseStmts.length > 0) {
        lines.push(`${indent}else {`);
        printEmitStmts(s.elseStmts, `${indent}  `, lines);
        lines.push(`${indent}}`);
      }
      continue;
    }
    if (s.kind === "foreach") {
      const keyPart = s.key ? ` ${s.key} =>` : "";
      lines.push(`${indent}foreach ${s.collection} as${keyPart} ${s.item} {`);
      printEmitStmts(s.stmts ?? [], `${indent}  `, lines);
      lines.push(`${indent}}`);
    }
  }
}

/**
 * @param {object} g
 * @param {string} indent
 * @param {string[]} lines
 */
function printEmitGuard(g, indent, lines) {
  lines.push(`${indent}if ${g.condExpr} {`);
  printEmitStmts(g.stmts ?? [], `${indent}  `, lines);
  lines.push(`${indent}}`);
  for (const ei of g.elseIfs ?? []) {
    lines.push(`${indent}else if ${ei.condExpr} {`);
    printEmitStmts(ei.stmts ?? [], `${indent}  `, lines);
    lines.push(`${indent}}`);
  }
  if (Array.isArray(g.elseStmts) && g.elseStmts.length > 0) {
    lines.push(`${indent}else {`);
    printEmitStmts(g.elseStmts, `${indent}  `, lines);
    lines.push(`${indent}}`);
  }
}

/**
 * Render thin `listCwlRoutes` output to CWL source.
 * @param {ReturnType<typeof listCwlRoutes>} routes
 * @param {{ header?: string, moduleName?: string }} [opts]
 */
export function renderCwlRoutes(routes, opts = {}) {
  const header = opts.header ?? "# Chrysalis Web Language — thin WebIR emit";
  const moduleName = opts.moduleName ?? "hub";
  const lines = [header, `module ${moduleName};`, ""];
  let holeCount = 0;
  for (const r of routes) {
    const handlerIdent = toCwlIdent(
      r.handlerName,
      `${String(r.method ?? "GET").toLowerCase()}_${String(r.path ?? "/").replace(/[^a-zA-Z0-9]+/g, "_") || "root"}`,
    );
    const surface = r.surfaceKind === "page" || r.value?.t === "html" ? "page" : "api";
    const kw = surface === "page" ? "@page" : "@route";
    const block = surface === "page" ? "page" : "handler";
    lines.push(`${kw} ${r.method} "${r.path}"`);
    lines.push(`${block} ${handlerIdent} {`);
    const effectTags = Array.isArray(r.effects) && r.effects.length > 0 ? r.effects : ["none"];
    lines.push(`  effects: ${effectTags.join(", ")};`);
    const pathDefaults = r.pathDefaults ?? {};
    for (const name of r.params ?? []) {
      if (Object.prototype.hasOwnProperty.call(pathDefaults, name)) {
        lines.push(`  param ${name} = ${cwlRenderLiteral(pathDefaults[name])};`);
      } else {
        lines.push(`  param ${name};`);
      }
    }
    const queryDefaults = r.queryDefaults ?? {};
    for (const name of r.queryParams ?? []) {
      if (Object.prototype.hasOwnProperty.call(queryDefaults, name)) {
        lines.push(`  query ${name} = ${cwlRenderLiteral(queryDefaults[name])};`);
      } else {
        lines.push(`  query ${name};`);
      }
    }
    for (const name of r.headerParams ?? []) lines.push(`  header ${name};`);
    for (const name of r.cookieParams ?? []) lines.push(`  cookie ${name};`);
    for (const name of r.multipartFields ?? []) lines.push(`  multipart field ${name};`);
    for (const name of r.multipartFiles ?? []) lines.push(`  multipart file ${name};`);
    for (const name of r.bodyParams ?? []) lines.push(`  body ${name};`);
    for (const h of r.responseHeaders ?? []) {
      if (Object.prototype.hasOwnProperty.call(h, "default")) {
        lines.push(`  response-header ${h.name} = ${cwlRenderLiteral(h.default)};`);
      } else {
        lines.push(`  response-header ${h.name};`);
      }
    }

    const hasSurface =
      r.earlyGuards?.length ||
      r.foreachBindings?.length ||
      r.value ||
      r.loadValue ||
      (typeof r.status === "number" && r.status !== 200) ||
      r.contentType ||
      r.responseHeaders?.length;
    if (r.holeReason && !hasSurface) {
      holeCount += 1;
      const reason = String(r.holeReason);
      lines.push(
        /^[A-Za-z0-9_:.-]+$/.test(reason)
          ? `  hole ${reason};`
          : `  hole legacy ${JSON.stringify(reason)};`,
      );
      lines.push("}");
      lines.push("");
      continue;
    }

    for (const g of r.earlyGuards ?? []) printEmitGuard(g, "  ", lines);

    if (typeof r.status === "number" && r.status !== 200) {
      lines.push(`  status ${r.status};`);
    }
    // Skip default page HTML CT (ingest always sets it); keep authored non-default CT.
    const defaultPageCt = "text/html; charset=utf-8";
    if (r.streamKind === "sse" || r.contentType === "text/event-stream") {
      lines.push(`  stream sse;`);
    } else if (
      r.contentType &&
      !(surface === "page" && String(r.contentType) === defaultPageCt) &&
      !(r.value?.t === "html" && String(r.contentType) === defaultPageCt) &&
      !(r.value?.t === "ui" && String(r.contentType) === defaultPageCt)
    ) {
      lines.push(`  content-type ${JSON.stringify(String(r.contentType))};`);
    }

    for (const reason of r.attachmentHoles ?? []) {
      const rs = String(reason);
      lines.push(
        /^[A-Za-z0-9_:.-]+$/.test(rs) ? `  hole ${rs};` : `  hole legacy ${JSON.stringify(rs)};`,
      );
    }

    if (r.loadValue) {
      lines.push(`  load ${cwlRenderValue(r.loadValue)};`);
    }

    if (r.value?.t === "ui") {
      printEmitUiTree(r.value.tree, "  ", lines);
    } else if (r.value) {
      lines.push(`  return ${cwlRenderValue(r.value)};`);
    } else if (r.holeReason) {
      holeCount += 1;
      const reason = String(r.holeReason);
      lines.push(
        /^[A-Za-z0-9_:.-]+$/.test(reason)
          ? `  hole ${reason};`
          : `  hole legacy ${JSON.stringify(reason)};`,
      );
    }

    for (const fe of r.foreachBindings ?? []) {
      const keyPart = fe.key ? ` ${fe.key} =>` : "";
      lines.push(`  foreach ${fe.collection} as${keyPart} ${fe.item} {`);
      printEmitStmts(fe.stmts ?? [], "    ", lines);
      lines.push("  }");
    }

    lines.push("}");
    lines.push("");
  }
  return { text: `${lines.join("\n")}\n`, holeCount, routeCount: routes.length };
}

/**
 * Emit CWL source from a finished WebIR module (pillar round-trip path).
 * @param {import('@chrysalis/webir').Module | { roots: string[], nodes: Map<string, object> }} module
 * @param {{ header?: string, moduleName?: string }} [opts]
 */
export function emitCwlFromWebirModule(module, opts = {}) {
  const routes = listCwlRoutes(module);
  return renderCwlRoutes(routes, opts);
}
