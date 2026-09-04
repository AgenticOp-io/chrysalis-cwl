#!/usr/bin/env node
/**
 * DNA Execute slice: language-gold → WebIR → @chrysalis/runtime-cwl fetch.
 *
 * Default gold: fixtures/language-gold/01-literals (literal + object returns).
 * Path: export-cwl-webir (pillar ingest) → createCwlRuntime → simulateHandler.
 * Not Convert emit (Hono/Fastify). Honest 501 holes for unsupported IR ops.
 *
 * Matrix expansion: npm run smoke:cwl-runtime-matrix → CWL_RUNTIME_MATRIX_OK
 * (README runtime-ok + allowlist in cwl-runtime-smoke-lib.mjs).
 *
 * Runtime deps (@chrysalis/webir|rewrite|emit-shared) still live under sibling
 * convert until WebIR/workspace flip (Slice 3.4). This smoke registers ESM
 * resolve hooks to those dists — same honesty as link:webir, not a second SoR.
 */
import { basename, dirname, join, resolve } from "node:path";
import {
  GOLD_ROOT,
  RUNTIME_GOLD_CHECKS,
  ROOT,
  installRuntimeDepHooks,
  loadRuntimeApi,
  runRuntimeChecks,
} from "./cwl-runtime-smoke-lib.mjs";

const DEFAULT_GOLD = join(GOLD_ROOT, "01-literals/routes.cwl");
const cwlPath = resolve(process.argv[2] || DEFAULT_GOLD);

const depMap = installRuntimeDepHooks();
console.log("deps:");
for (const [pkg, entry] of Object.entries(depMap)) {
  console.log(`  ${pkg}: ${entry}`);
}
console.log(`cwl: ${cwlPath}`);

const fixtureDir = basename(dirname(cwlPath));
const checks = RUNTIME_GOLD_CHECKS[fixtureDir];
if (!checks) {
  throw new Error(
    `No allowlisted runtime checks for fixture "${fixtureDir}".\n` +
      `Add RUNTIME_GOLD_CHECKS + README runtime-ok, or use a known gold path.\n` +
      `See docs/history/DNA-STEP-EXECUTE.md.`,
  );
}

const runtimeApi = await loadRuntimeApi();
const { runtime, results } = await runRuntimeChecks(cwlPath, checks, runtimeApi);

for (const r of results) {
  console.log(`  ${r.method} ${r.path} → ${r.status} ${r.body}`);
}

console.log("CWL_RUNTIME_GOLD_OK");
console.log(`  routes: ${runtime.routes.length}`);
console.log(`  gold:   ${cwlPath}`);
console.log(`  root:   ${ROOT}`);
console.log("  note:   WebIR simulateHandler path (not Convert emit)");
