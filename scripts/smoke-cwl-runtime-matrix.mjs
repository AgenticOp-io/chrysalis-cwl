#!/usr/bin/env node
/**
 * Runtime execute matrix: language-gold fixtures marked runtime-ok.
 *
 * Discovery: fixtures/language-gold/<name>/README.md contains `runtime-ok`
 * AND an allowlist entry in cwl-runtime-smoke-lib.mjs RUNTIME_GOLD_CHECKS.
 * Marker without checks (or checks without marker) fails — no invented handlers.
 *
 * Token: CWL_RUNTIME_MATRIX_OK
 */
import { join } from "node:path";
import {
  GOLD_ROOT,
  RUNTIME_GOLD_CHECKS,
  discoverRuntimeOkFixtures,
  installRuntimeDepHooks,
  loadRuntimeApi,
  runRuntimeChecks,
} from "./cwl-runtime-smoke-lib.mjs";

const depMap = installRuntimeDepHooks();
console.log("deps:");
for (const [pkg, entry] of Object.entries(depMap)) {
  console.log(`  ${pkg}: ${entry}`);
}

const fixtures = discoverRuntimeOkFixtures();
if (fixtures.length < 31) {
  throw new Error(
    `expected >= 31 runtime-ok fixtures (all language-gold with routes), got ${fixtures.length}: ${fixtures.join(", ")}`,
  );
}

const runtimeApi = await loadRuntimeApi();
/** @type {{ fixture: string, ok: boolean, routes?: number, checks?: number, detail?: string }[]} */
const results = [];

for (const name of fixtures) {
  const cwlPath = join(GOLD_ROOT, name, "routes.cwl");
  const checks = RUNTIME_GOLD_CHECKS[name];
  try {
    const { runtime, results: hits } = await runRuntimeChecks(cwlPath, checks, runtimeApi);
    for (const h of hits) {
      console.log(`  [${name}] ${h.method} ${h.path} → ${h.status} ${h.body}`);
    }
    results.push({
      fixture: name,
      ok: true,
      routes: runtime.routes.length,
      checks: hits.length,
    });
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    console.error(`  [${name}] FAIL ${detail}`);
    results.push({ fixture: name, ok: false, detail });
  }
}

const ok = results.every((x) => x.ok);
const report = {
  kind: "chrysalis.cwl.runtime-matrix",
  schemaVersion: 1,
  ok,
  token: ok ? "CWL_RUNTIME_MATRIX_OK" : "CWL_RUNTIME_MATRIX_FAIL",
  fixtureCount: fixtures.length,
  fixtures,
  results,
  generatedAt: new Date().toISOString(),
};
console.log(JSON.stringify(report, null, 2));
if (ok) console.log("CWL_RUNTIME_MATRIX_OK");
if (!ok) process.exit(1);
