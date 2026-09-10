/**
 * @chrysalis/cwl/diagnose — re-export authoring diagnostics helpers.
 * Canonical source: scripts/hub-ingest/cwl-diagnose.mjs (staged → ./lib via sync:cwl-package-lib).
 */
export {
  CWL_DIAGNOSE_KIND,
  CWL_DIAGNOSE_SCHEMA_VERSION,
  resolveDiagLine,
  resolveDiagCharacter,
  resolveDiagEndCharacter,
  diagnoseCwlSource,
  diagnoseCwlFile,
} from "./lib/cwl-diagnose.mjs";
