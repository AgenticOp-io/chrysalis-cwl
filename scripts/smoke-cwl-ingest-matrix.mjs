#!/usr/bin/env node
/**
 * Ingest matrix: CWL → WebIR across language-gold fixtures (thin lift).
 * Discovers fixtures/language-gold/<fixture>/routes.cwl with expected-webir.json when present.
 * Token: CWL_INGEST_MATRIX_OK
 */
import { spawnSync } from "node:child_process";
import { existsSync, readdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SMOKE = join(ROOT, "scripts/smoke-cwl-ingest.mjs");
const GOLD = join(ROOT, "fixtures/language-gold");

const dirs = readdirSync(GOLD, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .sort();

const fixtures = [];
for (const name of dirs) {
  const routes = join(GOLD, name, "routes.cwl");
  if (existsSync(routes)) fixtures.push(`fixtures/language-gold/${name}/routes.cwl`);
}

if (fixtures.length < 20) {
  console.error(`expected >= 20 language-gold routes.cwl, got ${fixtures.length}`);
  process.exit(1);
}

const results = [];
for (const rel of fixtures) {
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
  schemaVersion: 2,
  ok,
  token: ok ? "CWL_INGEST_MATRIX_OK" : "CWL_INGEST_MATRIX_FAIL",
  fixtureCount: fixtures.length,
  results,
  generatedAt: new Date().toISOString(),
};
console.log(JSON.stringify(report, null, 2));
if (ok) console.log("CWL_INGEST_MATRIX_OK");
if (!ok) process.exit(1);
