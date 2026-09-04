/**
 * @chrysalis/cwl/dna-seed — RFC-0022/0023 CWL surface → draft DNA seed.
 * Canonical source: scripts/hub-ingest/cwl-dna-seed.mjs (staged → ./lib).
 */
export {
  responseKeyFingerprint,
  pathTemplateShapeEqual,
  namesKeyFingerprint,
  contentClassFromBody,
  loadDeployProfile,
  resolveHostFromProfile,
  cwlHolesBridgeReport,
  cwlSurfaceToDraftDna,
  seedDraftDnaFromCwlPath,
  dnaBridgeContractEqual,
} from "./lib/cwl-dna-seed.mjs";
