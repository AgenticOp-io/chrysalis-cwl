/**
 * CWL path parameter extraction (RFC-0002).
 * Language-pillar local copy — no convert / WebIR dependency.
 */

const CWL_PATH_PARAM_RE = /:([a-zA-Z_][a-zA-Z0-9_]*)/g;

/**
 * Ordered unique `:name` segments from a CWL path template.
 * @param {string} path
 * @returns {string[]}
 */
export function extractPathParamsFromCwlPath(path) {
  /** @type {string[]} */
  const names = [];
  for (const m of String(path ?? "").matchAll(CWL_PATH_PARAM_RE)) {
    const n = m[1];
    if (!names.includes(n)) names.push(n);
  }
  return names;
}
