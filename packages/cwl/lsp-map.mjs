/**
 * @chrysalis/cwl/lsp-map — re-export diagnose → LSP map helpers.
 * Canonical source: scripts/hub-ingest/cwl-lsp-map.mjs (staged → ./lib).
 */
export {
  CWL_LSP_MAP_KIND,
  CWL_LSP_MAP_SCHEMA_VERSION,
  CWL_LSP_LINE_END_CHARACTER,
  toLspSeverity,
  resolveLine0,
  resolveCharacter0,
  resolveEndCharacter0,
  mapDiagnoseDiagnostic,
  mapDiagnoseSource,
} from "./lib/cwl-lsp-map.mjs";
