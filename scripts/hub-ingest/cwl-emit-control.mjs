/**
 * Thin WebIR → CWL reverse for RFC-0021 control shapes produced by pillar ingest.
 * Projectable only — never invents opaque `g_*` residuals.
 */

/**
 * @param {object | undefined} n
 * @returns {string}
 */
export function cwlEmitLocator(n) {
  const p = n?.provenance?.[0];
  if (!p) return "";
  return String(p.locator ?? p.note ?? "");
}

/**
 * @param {(id: string) => object | undefined} get
 * @param {string} id
 * @returns {string | null}
 */
export function projectCwlCondExpr(get, id) {
  const n = get(id);
  if (!n || n.dialect !== "data") return null;
  if (n.op === "param") {
    const name = String(n.attrs?.name ?? "");
    return /^[A-Za-z_][A-Za-z0-9_]*$/.test(name) ? name : null;
  }
  if (n.op === "request.field" || n.op === "requestField") {
    const name = String(n.attrs?.name ?? "");
    return /^[A-Za-z_][A-Za-z0-9_]*$/.test(name) ? name : null;
  }
  if (n.op === "unaryop" || n.op === "unaryOp") {
    if (String(n.attrs?.operator ?? "") !== "!") return null;
    const inner = projectCwlCondExpr(get, n.operands?.[0]);
    return inner ? `!${inner}` : null;
  }
  if (n.op === "binop" || n.op === "binOp") {
    const op = String(n.attrs?.operator ?? "");
    const left = n.operands?.[0];
    const right = n.operands?.[1];
    if (op === "||" || op === "&&") {
      const l = projectCwlCondExpr(get, left);
      const r = projectCwlCondExpr(get, right);
      return l && r ? `${l} ${op} ${r}` : null;
    }
    if (op === "==" || op === "!=") {
      const name = projectCwlCondExpr(get, left);
      const litN = get(right);
      if (!name || !litN || litN.op !== "literal") return null;
      return `${name} ${op} ${renderLit(litN.attrs?.value)}`;
    }
  }
  return null;
}

/**
 * @param {unknown} value
 */
function renderLit(value) {
  if (value === null) return "null";
  if (typeof value === "boolean" || typeof value === "number") return String(value);
  if (typeof value === "string") return JSON.stringify(value);
  return "null";
}

/**
 * @param {(id: string) => object | undefined} get
 * @param {string} id
 * @returns {{ status: number | null, body: object | null, stmts: object[] } | null}
 */
export function projectExitOrStmts(get, id) {
  const n = get(id);
  if (!n) return null;

  // Nested if / else inside guard body
  if (n.dialect === "data" && (n.op === "if" || n.op === "ifElse")) {
    const g = projectIfNode(get, id);
    if (!g) return null;
    return {
      status: g.status,
      body: g.body,
      stmts: [
        {
          kind: "if",
          condExpr: g.condExpr,
          status: g.status,
          body: g.body,
          stmts: g.stmts,
          elseIfs: g.elseIfs,
          elseStmts: g.elseStmts,
          elseStatus: g.elseStatus,
          elseBody: g.elseBody,
        },
      ],
    };
  }

  if (n.dialect === "data" && n.op === "block") {
    const loc = cwlEmitLocator(n);
    if (loc === "cwl:early-exit" || loc === "cwl:early-exit-stmts") {
      /** @type {object[]} */
      const stmts = [];
      let status = null;
      let body = null;
      for (const opId of n.operands ?? []) {
        const child = get(opId);
        if (!child) continue;
        if (child.dialect === "web.request" && child.op === "response") {
          status = Number(child.attrs?.status ?? 200);
          stmts.push({ kind: "status", status });
          const valId = child.operands?.[0];
          const val = valId ? get(valId) : null;
          if (val?.op === "literal") {
            const kind = String(child.attrs?.kind ?? "");
            body =
              kind === "html"
                ? { kind: "html", value: val.attrs?.value }
                : { kind: "literal", value: val.attrs?.value };
            stmts.push({ kind: "return", body });
          }
          continue;
        }
        if (child.dialect === "data" && (child.op === "if" || child.op === "ifElse")) {
          const nested = projectExitOrStmts(get, opId);
          if (nested?.stmts?.length) stmts.push(...nested.stmts);
          continue;
        }
        if (child.dialect === "data" && child.op === "foreach") {
          const fe = projectForeachNode(get, opId);
          if (fe) stmts.push({ kind: "foreach", ...fe, stmts: fe.stmts });
        }
      }
      return { status, body, stmts };
    }
    // Generic block: try single child
    if ((n.operands ?? []).length === 1) return projectExitOrStmts(get, n.operands[0]);
  }

  if (n.dialect === "web.request" && n.op === "response") {
    const status = Number(n.attrs?.status ?? 200);
    const val = get(n.operands?.[0]);
    if (val?.op === "literal") {
      const kind = String(n.attrs?.kind ?? "");
      const body =
        kind === "html"
          ? { kind: "html", value: val.attrs?.value }
          : { kind: "literal", value: val.attrs?.value };
      return {
        status,
        body,
        stmts: [
          ...(status !== 200 ? [{ kind: "status", status }] : []),
          { kind: "return", body },
        ],
      };
    }
  }

  return null;
}

/**
 * @param {(id: string) => object | undefined} get
 * @param {string} id
 */
function projectElseChain(get, id) {
  const n = get(id);
  if (!n) return { elseIfs: [], elseStmts: null, elseStatus: null, elseBody: null };

  if (
    n.dialect === "data" &&
    (n.op === "if" || n.op === "ifElse") &&
    cwlEmitLocator(n) === "cwl:early-exit-else-if"
  ) {
    const condExpr = projectCwlCondExpr(get, n.operands?.[0]);
    const thenPart = projectExitOrStmts(get, n.operands?.[1]);
    if (!condExpr || !thenPart) {
      return { elseIfs: [], elseStmts: null, elseStatus: null, elseBody: null };
    }
    const rest = n.operands?.[2]
      ? projectElseChain(get, n.operands[2])
      : { elseIfs: [], elseStmts: null, elseStatus: null, elseBody: null };
    return {
      elseIfs: [
        {
          condExpr,
          status: thenPart.status,
          body: thenPart.body,
          stmts: thenPart.stmts,
        },
        ...rest.elseIfs,
      ],
      elseStmts: rest.elseStmts,
      elseStatus: rest.elseStatus,
      elseBody: rest.elseBody,
    };
  }

  const part = projectExitOrStmts(get, id);
  if (!part) return { elseIfs: [], elseStmts: null, elseStatus: null, elseBody: null };
  return {
    elseIfs: [],
    elseStmts: part.stmts,
    elseStatus: part.status,
    elseBody: part.body,
  };
}

/**
 * @param {(id: string) => object | undefined} get
 * @param {string} id
 */
export function projectIfNode(get, id) {
  const n = get(id);
  if (!n || n.dialect !== "data" || (n.op !== "if" && n.op !== "ifElse")) return null;
  const condExpr = projectCwlCondExpr(get, n.operands?.[0]);
  if (!condExpr) return null;
  const thenPart = projectExitOrStmts(get, n.operands?.[1]);
  if (!thenPart) return null;
  const elseId = n.operands?.[2];
  const elseChain = elseId
    ? projectElseChain(get, elseId)
    : { elseIfs: [], elseStmts: null, elseStatus: null, elseBody: null };
  return {
    condExpr,
    status: thenPart.status,
    body: thenPart.body,
    stmts: thenPart.stmts,
    elseIfs: elseChain.elseIfs,
    elseStmts: elseChain.elseStmts,
    elseStatus: elseChain.elseStatus,
    elseBody: elseChain.elseBody,
  };
}

/**
 * @param {(id: string) => object | undefined} get
 * @param {string} id
 */
export function projectForeachNode(get, id) {
  const n = get(id);
  if (!n || n.dialect !== "data" || n.op !== "foreach") return null;
  const iterable = get(n.operands?.[0]);
  const collection =
    iterable && iterable.dialect === "data" && iterable.op === "param"
      ? String(iterable.attrs?.name ?? "")
      : "";
  const item = String(n.attrs?.valueName ?? "item");
  const keyRaw = n.attrs?.keyName != null ? String(n.attrs.keyName) : "";
  const key = /^[A-Za-z_][A-Za-z0-9_]*$/.test(keyRaw) ? keyRaw : null;
  if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(collection) || !/^[A-Za-z_][A-Za-z0-9_]*$/.test(item)) {
    return null;
  }
  const bodyPart = projectExitOrStmts(get, n.operands?.[1]);
  return {
    collection,
    key,
    item,
    body: bodyPart?.body ?? null,
    stmts: bodyPart?.stmts ?? [],
  };
}

/**
 * Collect binding names from projectable control / success IR.
 * @param {(id: string) => object | undefined} get
 * @param {string} id
 * @param {{ path: string[], query: string[], body: string[] }} acc
 * @param {Set<string>} seen
 */
function collectBindings(get, id, acc, seen) {
  if (!id || seen.has(id)) return;
  seen.add(id);
  const n = get(id);
  if (!n) return;
  if (n.dialect === "data" && (n.op === "request.field" || n.op === "requestField")) {
    const name = String(n.attrs?.name ?? "");
    const src = String(n.attrs?.source ?? "");
    if (/^[A-Za-z_][A-Za-z0-9_]*$/.test(name)) {
      if (src === "path" && !acc.path.includes(name)) acc.path.push(name);
      if (src === "query" && !acc.query.includes(name)) acc.query.push(name);
      if (src === "body" && !acc.body.includes(name)) acc.body.push(name);
    }
  }
  for (const op of n.operands ?? []) collectBindings(get, op, acc, seen);
}

/**
 * Peel ingest-shaped control wrappers from a handler body id.
 * @param {(id: string) => object | undefined} get
 * @param {string} bodyId
 */
export function peelCwlControlBody(get, bodyId) {
  /** @type {object[]} */
  let earlyGuards = [];
  /** @type {object[]} */
  let foreachBindings = [];
  let id = bodyId;
  let n = get(id);

  if (n?.dialect === "data" && n.op === "block" && cwlEmitLocator(n) === "cwl:foreach-bindings") {
    const ops = n.operands ?? [];
    id = ops[0];
    for (let i = 1; i < ops.length; i++) {
      const fe = projectForeachNode(get, ops[i]);
      if (fe) foreachBindings.push(fe);
    }
    n = get(id);
  }

  if (n?.dialect === "data" && n.op === "block" && cwlEmitLocator(n) === "cwl:early-guards") {
    const ops = n.operands ?? [];
    const successId = ops[ops.length - 1];
    for (let i = 0; i < ops.length - 1; i++) {
      const g = projectIfNode(get, ops[i]);
      if (g) earlyGuards.push(g);
    }
    id = successId;
    n = get(id);
  }

  /** @type {{ path: string[], query: string[], body: string[] }} */
  const bindings = { path: [], query: [], body: [] };
  collectBindings(get, bodyId, bindings, new Set());

  return { successId: id, successNode: n, earlyGuards, foreachBindings, bindings };
}
