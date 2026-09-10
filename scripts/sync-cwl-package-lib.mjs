#!/usr/bin/env node
/**
 * Stage language modules into packages/cwl/lib for a packable registry artifact.
 * Source of truth remains scripts/hub-ingest/; this copies for npm files/.
 */
import { cpSync, mkdirSync, rmSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(ROOT, "scripts/hub-ingest");
const LIB = join(ROOT, "packages/cwl/lib");

/** Canonical modules required by parser/print/diagnose/lsp-map/fmt. */
const FILES = [
  "cwl-parser.mjs",
  "cwl-print.mjs",
  "cwl-diagnose.mjs",
  "cwl-lsp-map.mjs",
  "cwl-fullstack-holes.mjs",
  "cwl-fmt.mjs",
  "cwl-ui-tree.mjs",
  "hub-cwl-path-params.mjs",
  "hub-t.mjs",
  "cwl-module-graph.mjs",
  "cwl-dna-seed.mjs",
];

mkdirSync(LIB, { recursive: true });
for (const name of FILES) {
  const from = join(SRC, name);
  if (!existsSync(from)) throw new Error(`missing source ${from}`);
  cpSync(from, join(LIB, name));
}

const manifest = {
  kind: "chrysalis.cwl.package-lib",
  schemaVersion: 1,
  stagedAt: new Date().toISOString(),
  files: FILES,
};
writeFileSync(join(LIB, "STAGE.json"), `${JSON.stringify(manifest, null, 2)}\n`);
process.stdout.write(`staged ${FILES.length} modules → packages/cwl/lib\n`);
