#!/usr/bin/env node
/**
 * Ingest matrix: CWL → WebIR on several language-gold fixtures (thin lift).
 * Default: 01-literals (hole-free) + 02-path-params + 24-dna-bridge.
 * Token: CWL_INGEST_MATRIX_OK
 */
import { spawnSync } from "node:child_process";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SMOKE = join(ROOT, "scripts/smoke-cwl-ingest.mjs");

const FIXTURES = [
  "fixtures/language-gold/01-literals/routes.cwl",
  "fixtures/language-gold/02-path-params/routes.cwl",
  "fixtures/language-gold/24-dna-bridge/routes.cwl",
];

const results = [];
for (const rel of FIXTURES) {
  const r = spawnSync(process.execPath, [SMOKE, join(ROOT, rel)], {
    cwd: ROOT,
    encoding: "utf8",
    timeout: 120_000,
  });
  const ok = r.status === 0 && /smoke:cwl-ingest OK/.test(r.stdout || "");
  results.push({
    fixture: rel,
    ok,
    detail: ok ? undefined : (r.stderr || r.stdout || `exit=${r.status}`).slice(-400),
  });
}

const ok = results.every((x) => x.ok);
const report = {
  kind: "chrysalis.cwl.ingest-matrix",
  schemaVersion: 1,
  ok,
  token: ok ? "CWL_INGEST_MATRIX_OK" : "CWL_INGEST_MATRIX_FAIL",
  results,
  generatedAt: new Date().toISOString(),
};
console.log(JSON.stringify(report, null, 2));
if (ok) console.log("CWL_INGEST_MATRIX_OK");
if (!ok) process.exit(1);
