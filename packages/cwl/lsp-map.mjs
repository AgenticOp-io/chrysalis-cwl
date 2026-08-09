/**
 * @chrysalis/cwl/lsp-map — re-export diagnose → LSP diagnostic map helpers.
 * Canonical implementation: scripts/hub-ingest/cwl-lsp-map.mjs
 */
export {
  CWL_LSP_MAP_KIND,
  CWL_LSP_MAP_SCHEMA_VERSION,
  toLspSeverity,
  resolveLine0,
  resolveCharacter0,
  mapDiagnoseDiagnostic,
  mapDiagnoseSource,
} from '../../scripts/hub-ingest/cwl-lsp-map.mjs';
