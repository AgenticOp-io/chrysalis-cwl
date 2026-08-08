/**
 * Map CWL diagnose reports → editor/LSP diagnostic shapes (range + severity).
 * Used by editors and `gate-cwl-lsp-map`. Not a Language Server process.
 */
import { diagnoseCwlSource } from "./cwl-diagnose.mjs";

export const CWL_LSP_MAP_KIND = "chrysalis.cwl.lsp-map";
export const CWL_LSP_MAP_SCHEMA_VERSION = 1;

/** @typedef {"Error"|"Warning"|"Information"|"Hint"} LspSeverity */

/**
 * @param {"error"|"warn"|"info"} severity
 * @returns {LspSeverity}
 */
export function toLspSeverity(severity) {
  if (severity === "error") return "Error";
  if (severity === "warn") return "Warning";
  return "Information";
}

/**
 * @param {string} message
 * @param {number|undefined} line
 * @returns {number} 0-based line
 */
export function resolveLine0(message, line) {
  if (Number.isFinite(line) && /** @type {number} */ (line) >= 1) {
    return Math.max(0, Math.floor(/** @type {number} */ (line)) - 1);
  }
  const m = String(message ?? "").match(/(?:line|at)\s+(\d+)/i);
  if (m) return Math.max(0, Number(m[1]) - 1);
  return 0;
}

/**
 * @param {{ severity: string, code?: string, message: string, line?: number }} d
 * @param {string} [uri]
 */
export function mapDiagnoseDiagnostic(d, uri = "file:///input.cwl") {
  const line0 = resolveLine0(d.message, d.line);
  return {
    uri,
    severity: toLspSeverity(/** @type {"error"|"warn"|"info"} */ (d.severity)),
    code: d.code ?? "cwl",
    message: d.message,
    source: "cwl",
    range: {
      start: { line: line0, character: 0 },
      end: { line: line0, character: 1 << 20 },
    },
  };
}

/**
 * @param {string} source
 * @param {string} [file]
 * @param {string} [uri]
 */
export function mapDiagnoseSource(source, file = "input.cwl", uri) {
  const report = diagnoseCwlSource(source, file);
  const fileUri = uri ?? `file://${file.replace(/\\/g, "/")}`;
  const diagnostics = (report.diagnostics ?? []).map((d) => mapDiagnoseDiagnostic(d, fileUri));
  return {
    kind: CWL_LSP_MAP_KIND,
    schemaVersion: CWL_LSP_MAP_SCHEMA_VERSION,
    ok: report.ok,
    diagnoseOk: report.ok,
    warnCount: report.warnCount ?? 0,
    infoCount: report.infoCount ?? 0,
    diagnostics,
    raw: report,
  };
}
