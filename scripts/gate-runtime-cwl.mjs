#!/usr/bin/env node
/**
 * Package gate: @chrysalis/runtime-cwl against language-gold (no convert hub-gold).
 * Token: CWL_RUNTIME_CWL_OK
 */
import { join } from "node:path";
import {
  GOLD_ROOT,
  ROOT,
  RUNTIME_GOLD_CHECKS,
  installRuntimeDepHooks,
  loadRuntimeApi,
  runRuntimeChecks,
} from "./cwl-runtime-smoke-lib.mjs";

/** Core package SoR subset — mirrors former hub-gold coverage on language-gold. */
const PACKAGE_GOLD = [
  "01-literals",
  "04-request-context",
  "07-auth-effects",
  "08-response-content-type",
  "09-fullstack-page",
  "10-page-load",
  "15-html-interpolation",
  "25-island-kinds",
];

installRuntimeDepHooks();
const runtimeApi = await loadRuntimeApi();
/** @type {{ fixture: string, ok: boolean, detail?: string }[]} */
const results = [];

for (const name of PACKAGE_GOLD) {
  const checks = RUNTIME_GOLD_CHECKS[name];
  if (!checks?.length) {
    results.push({ fixture: name, ok: false, detail: "missing RUNTIME_GOLD_CHECKS" });
    continue;
  }
  const cwlPath = join(GOLD_ROOT, name, "routes.cwl");
  try {
    await runRuntimeChecks(cwlPath, checks, runtimeApi);
    results.push({ fixture: name, ok: true });
  } catch (e) {
    results.push({
      fixture: name,
      ok: false,
      detail: e instanceof Error ? e.message : String(e),
    });
  }
}

const ok = results.every((r) => r.ok);
const report = {
  kind: "chrysalis.cwl.runtime-cwl.gate",
  schemaVersion: 1,
  ok,
  token: ok ? "CWL_RUNTIME_CWL_OK" : "CWL_RUNTIME_CWL_FAIL",
  root: ROOT,
  results,
  generatedAt: new Date().toISOString(),
};
console.log(JSON.stringify(report, null, 2));
if (ok) console.log("CWL_RUNTIME_CWL_OK");
else process.exit(1);
