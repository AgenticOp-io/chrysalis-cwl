/**
 * @chrysalis/cwl/diagnose — re-export authoring diagnostics helpers.
 * Canonical implementation: scripts/hub-ingest/cwl-diagnose.mjs
 */
export {
  CWL_DIAGNOSE_KIND,
  CWL_DIAGNOSE_SCHEMA_VERSION,
  resolveDiagLine,
  resolveDiagCharacter,
  diagnoseCwlSource,
  diagnoseCwlFile,
} from '../../scripts/hub-ingest/cwl-diagnose.mjs';
