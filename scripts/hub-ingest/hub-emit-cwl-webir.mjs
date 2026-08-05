/**
 * Thin WebIR → CWL projection (Phase 0.3 Slice 4).
 *
 * CWL-shaped surfaces that pillar ingest already lowers (literals, flat object
 * literals, honest holes). Does NOT copy convert `hub-webir-routes.mjs`
 * (PHP/session/HTML/early-exit walkers stay in convert).
 *
 * @see docs/history/WEBIR-EXTRACT-PLAN.md Slice 4
 */

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
 * @param {object} v — { t: "lit"|"obj"|"hole", ... }
 */
function cwlRenderValue(v) {
  if (!v) return '""';
  if (v.t === "lit") return cwlRenderLiteral(v.value);
  if (v.t === "obj") {
    const ent = v.entries.map((e) => `${e.key}: ${cwlRenderValue(e.value)}`);
    return `{ ${ent.join(", ")} }`;
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
 * @returns {{ t: "lit"|"obj"|"hole", value?: unknown, entries?: Array<{key:string,value:object}>, reason?: string }}
 */
export function cwlValueOfThin(get, id) {
  const n = get(id);
  if (!n) return { t: "hole", reason: "cwl:emit:missing-value" };
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
    return { t: "hole", reason: `cwl:emit:unsupported-call:${callee}` };
  }
  if (n.dialect === "data" && n.op === "hole") {
    return { t: "hole", reason: String(n.attrs?.reason ?? "cwl:emit:hole") };
  }
  return { t: "hole", reason: `cwl:emit:unsupported:${n.dialect}.${n.op}` };
}

/**
 * Walk a handler body for thin CWL projection.
 * @param {(id: string) => object | undefined} get
 * @param {string} bodyId
 */
export function walkCwlHandlerBodyThin(get, bodyId) {
  const value = cwlValueOfThin(get, bodyId);
  if (value.t === "hole") {
    return {
      status: null,
      params: [],
      value: null,
      holeReason: value.reason,
      effects: ["none"],
      earlyGuards: [],
      foreachBindings: [],
    };
  }
  return {
    status: null,
    params: [],
    value,
    holeReason: null,
    effects: ["none"],
    earlyGuards: [],
    foreachBindings: [],
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
    lines.push(`@route ${r.method} "${r.path}"`);
    lines.push(`handler ${handlerIdent} {`);
    const effectTags = Array.isArray(r.effects) && r.effects.length > 0 ? r.effects : ["none"];
    lines.push(`  effects: ${effectTags.join(", ")};`);
    if (r.holeReason) {
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
    if (typeof r.status === "number" && r.status !== 200) {
      lines.push(`  status ${r.status};`);
    }
    for (const p of r.params ?? []) {
      lines.push(`  param ${p.name};`);
    }
    lines.push(`  return ${cwlRenderValue(r.value)};`);
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
