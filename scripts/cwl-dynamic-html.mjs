/**
 * Dynamic HTML emit.
 * The page source stays CWL. Each call builds the HTML from that source,
 * the request, and host data. CWL does not query a database.
 * `repeat` walks a host array. `if` / `else if` / `else` choose a document
 * when the condition is a comparison against the request or that data.
 */

/**
 * @param {unknown} value
 */
function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * @param {unknown} value
 */
function truthy(value) {
  if (value == null || value === false || value === 0 || value === "") return false;
  if (Array.isArray(value) && value.length === 0) return false;
  return true;
}

/**
 * @param {string} expr
 * @param {string} op
 */
function splitTop(expr, op) {
  /** @type {string[]} */
  const parts = [];
  let buf = "";
  let quote = "";
  for (let i = 0; i < expr.length; i += 1) {
    const ch = expr[i];
    if (quote) {
      buf += ch;
      if (ch === quote && expr[i - 1] !== "\\") quote = "";
      continue;
    }
    if (ch === '"' || ch === "'") {
      quote = ch;
      buf += ch;
      continue;
    }
    if (expr.startsWith(op, i)) {
      parts.push(buf);
      buf = "";
      i += op.length - 1;
      continue;
    }
    buf += ch;
  }
  parts.push(buf);
  return parts;
}

/**
 * @param {string} token
 * @param {{ path: Record<string, string>, query: Record<string, string>, data: Record<string, unknown> }} env
 */
function lookup(token, env) {
  const name = token.trim();
  if (name === "null") return null;
  if (name === "true") return true;
  if (name === "false") return false;
  if ((name.startsWith('"') && name.endsWith('"')) || (name.startsWith("'") && name.endsWith("'"))) {
    return name.slice(1, -1);
  }
  if (/^-?\d+$/.test(name)) return Number(name);
  if (Object.prototype.hasOwnProperty.call(env.query, name)) return env.query[name];
  if (Object.prototype.hasOwnProperty.call(env.path, name)) return env.path[name];
  if (name.includes(".")) {
    const [root, ...rest] = name.split(".");
    let cur = env.data?.[root];
    for (const key of rest) {
      if (cur == null || typeof cur !== "object") return undefined;
      cur = /** @type {Record<string, unknown>} */ (cur)[key];
    }
    return cur;
  }
  if (env.data && Object.prototype.hasOwnProperty.call(env.data, name)) return env.data[name];
  return undefined;
}

/**
 * Comparisons, negation, and && / || against the request and host data.
 * Anything else does not match.
 * @param {string} expr
 * @param {{ path: Record<string, string>, query: Record<string, string>, data: Record<string, unknown> }} env
 */
export function evalCwlDynamicCond(expr, env) {
  const source = String(expr ?? "").trim();
  if (!source || /[()[\]]/.test(source)) return false;
  const orParts = splitTop(source, "||");
  if (orParts.length > 1) return orParts.some((part) => evalCwlDynamicCond(part, env));
  const andParts = splitTop(source, "&&");
  if (andParts.length > 1) return andParts.every((part) => evalCwlDynamicCond(part, env));
  const cmp = /^(.*?)\s*(==|!=)\s*(.*)$/.exec(source);
  if (cmp) {
    const left = lookup(cmp[1], env);
    const right = lookup(cmp[3], env);
    const equal = left == null && right == null ? true : String(left) === String(right);
    return cmp[2] === "==" ? equal : !equal;
  }
  if (source.startsWith("!")) return !truthy(lookup(source.slice(1), env));
  return truthy(lookup(source, env));
}

/**
 * @param {string} html
 * @param {string} name
 * @param {string} raw
 */
function replaceIdent(html, name, raw) {
  let out = "";
  let i = 0;
  while (i < html.length) {
    const match = /^[A-Za-z_][A-Za-z0-9_]*/.exec(html.slice(i));
    if (match && match[0] === name) {
      const before = i > 0 ? html[i - 1] : "";
      const after = html[i + name.length] ?? "";
      if (before !== "-" && before !== "." && after !== "-" && after !== ".") {
        out += raw;
        i += name.length;
        continue;
      }
    }
    if (match) {
      out += match[0];
      i += match[0].length;
      continue;
    }
    out += html[i];
    i += 1;
  }
  return out;
}

/**
 * @param {unknown} item
 * @param {string} itemName
 * @param {string} when
 */
function whenValue(item, itemName, when) {
  if (when === itemName) return item;
  const prefix = `${itemName}.`;
  if (!when.startsWith(prefix) || item == null || typeof item !== "object") return undefined;
  let cur = /** @type {Record<string, unknown>} */ (item);
  for (const key of when.slice(prefix.length).split(".")) {
    if (cur == null || typeof cur !== "object") return undefined;
    cur = /** @type {Record<string, unknown>} */ (cur)[key];
  }
  return cur;
}

/**
 * @param {string} template
 * @param {string} itemName
 * @param {unknown} item
 * @param {Array<{ collection: string, item: string, template: string, when?: string, empty?: string }>} repeats
 */
function renderItem(template, itemName, item, repeats) {
  let html = template;
  const nested = repeats.filter((repeat) => repeat.collection.startsWith(`${itemName}.`));
  for (const repeat of nested) {
    const field = repeat.collection.slice(itemName.length + 1);
    const leaf = field.split(".").pop() ?? field;
    const value = whenValue(item, itemName, `${itemName}.${field}`);
    const list = Array.isArray(value) ? value : [];
    const inner = list.length === 0
      ? (repeat.empty ?? "")
      : list.map((child) => renderItem(repeat.template, repeat.item, child, repeats)).join("");
    html = replaceIdent(html, leaf, inner);
  }
  if (item == null || typeof item !== "object" || Array.isArray(item)) {
    return replaceIdent(html, itemName, escapeHtml(item));
  }
  const fields = [...html.matchAll(/\b([A-Za-z_][A-Za-z0-9_]*(?:\.[A-Za-z_][A-Za-z0-9_]*)+)\b/g)]
    .map((match) => match[1])
    .filter((token) => token.startsWith(`${itemName}.`))
    .sort((a, b) => b.length - a.length);
  for (const token of fields) {
    const value = whenValue(item, itemName, token);
    if (value != null && typeof value !== "object") html = html.split(token).join(escapeHtml(value));
  }
  return html;
}

/**
 * @param {string} html
 * @param {Array<{ collection: string, item: string, template: string, when?: string, empty?: string }>} repeats
 * @param {Record<string, unknown>} data
 */
export function expandCwlRepeats(html, repeats, data) {
  let out = html;
  const top = (repeats ?? []).filter((repeat) => !repeat.collection.includes("."));
  for (const repeat of top) {
    const value = data?.[repeat.collection];
    const list = Array.isArray(value) ? value : [];
    const rendered = list.length === 0
      ? (repeat.empty ?? "")
      : list
          .filter((item) => !repeat.when || truthy(whenValue(item, repeat.item, repeat.when)))
          .map((item) => renderItem(repeat.template, repeat.item, item, repeats))
          .join("");
    out = replaceIdent(out, repeat.collection, rendered);
  }
  return out;
}

/**
 * Fill `record.field` from host objects that are not lists.
 * @param {string} html
 * @param {Record<string, unknown>} data
 */
export function fillCwlDataFields(html, data) {
  let out = html;
  for (const [key, value] of Object.entries(data ?? {})) {
    if (value == null || typeof value !== "object" || Array.isArray(value)) continue;
    const fields = [...out.matchAll(new RegExp(`\\b${key}\\.[A-Za-z_][A-Za-z0-9_]*(?:\\.[A-Za-z_][A-Za-z0-9_]*)*\\b`, "g"))]
      .map((match) => match[0])
      .sort((a, b) => b.length - a.length);
    for (const token of fields) {
      let cur = value;
      for (const part of token.split(".").slice(1)) {
        if (cur == null || typeof cur !== "object") {
          cur = undefined;
          break;
        }
        cur = /** @type {Record<string, unknown>} */ (cur)[part];
      }
      if (cur != null && typeof cur === "object") continue;
      out = out.split(token).join(escapeHtml(cur ?? ""));
    }
  }
  return out;
}

/**
 * @param {object[]} guards
 * @param {{ path: Record<string, string>, query: Record<string, string>, data: Record<string, unknown> }} env
 */
function chooseGuard(guards, env) {
  for (const guard of guards ?? []) {
    /** @type {Array<{ cond: string, body: object | null, status: number | null }>} */
    const branches = [{ cond: guard.condExpr, body: guard.body, status: guard.status ?? null }];
    for (const other of guard.elseIfs ?? []) {
      branches.push({ cond: other.condExpr, body: other.body, status: other.status ?? null });
    }
    let matched = false;
    for (const branch of branches) {
      if (!evalCwlDynamicCond(branch.cond, env)) continue;
      matched = true;
      if (branch.body?.kind === "html") return { html: branch.body.value, status: branch.status };
      break;
    }
    if (!matched && guard.elseBody?.kind === "html") {
      return { html: guard.elseBody.value, status: guard.elseStatus ?? null };
    }
  }
  return null;
}

/**
 * Build one page body from CWL repeats and request branches.
 * @param {object} route
 * @param {{ path?: Record<string, string>, query?: Record<string, string>, data?: Record<string, unknown> }} env
 */
/**
 * The branch HTML before request words or host rows are written in.
 * @param {object} route
 * @param {{ path?: Record<string, string>, query?: Record<string, string>, data?: Record<string, unknown> }} env
 */
export function selectCwlDynamicSource(route, env) {
  const scope = {
    path: env.path ?? {},
    query: env.query ?? {},
    data: env.data ?? {},
  };
  const guard = chooseGuard(route.earlyGuards ?? [], scope);
  return {
    html: guard?.html ?? (route.body?.kind === "html" ? route.body.value : ""),
    status: guard?.status ?? route.responseStatus ?? 200,
  };
}

/**
 * Write host rows and record fields into HTML whose request words are already filled.
 * @param {string} html
 * @param {Array<{ collection: string, item: string, template: string, when?: string, empty?: string }>} repeats
 * @param {Record<string, unknown>} data
 */
export function finishCwlDynamicHtml(html, repeats, data) {
  return fillCwlDataFields(expandCwlRepeats(html, repeats ?? [], data ?? {}), data ?? {});
}

/**
 * Build one page body from CWL repeats and request branches.
 * @param {object} route
 * @param {{ path?: Record<string, string>, query?: Record<string, string>, data?: Record<string, unknown> }} env
 */
export function renderCwlDynamicBody(route, env) {
  const selected = selectCwlDynamicSource(route, env);
  return {
    html: finishCwlDynamicHtml(selected.html, route.htmlRepeats ?? [], env.data ?? {}),
    status: selected.status,
  };
}
