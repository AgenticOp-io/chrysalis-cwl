#!/usr/bin/env node
/**
 * Minimal Phase 0.3 smoke: resolve and construct WebIR from chrysalis-cwl alone.
 * Prefers packages/webir (pillar home / junction). Does NOT run full cwl-ingest.
 * See packages/WEBIR.md and docs/history/WEBIR-EXTRACT-PLAN.md.
 */
import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { resolveWebirEntryPath, loadWebir, webirCandidatePaths } from "./hub-ingest/load-webir.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const LINK_DIR = join(ROOT, "packages/webir");
const candidates = webirCandidatePaths();
const entry = resolveWebirEntryPath();
const pillarHome = candidates[0];
const viaPillarHome = Boolean(entry && entry === pillarHome);
const linkPresent = existsSync(LINK_DIR);

console.log("candidates:");
for (const p of candidates) {
  console.log(`  ${p}${existsSync(p) ? "" : "  (missing)"}`);
}
console.log(`resolved: ${entry ?? "(package import or fail)"}`);
console.log(
  `pillar home (packages/webir): ${viaPillarHome ? "yes" : linkPresent ? "no — dist not preferred path" : "no — missing link"}`,
);

if (!linkPresent) {
  console.warn("");
  console.warn("warn: packages/webir is not linked.");
  console.warn("  Pre-flip:  npm run link:webir  (needs sibling Convert + built dist)");
  console.warn("  Post-flip: physical packages/webir should exist in this tree.");
  console.warn("  See packages/WEBIR.md and docs/history/DNA-STEP-E-WEBIR.md");
}

let webir;
try {
  webir = await loadWebir();
} catch (err) {
  console.error("");
  console.error("smoke:webir FAILED — cannot resolve @chrysalis/webir");
  if (!linkPresent) {
    console.error("  Fix: clone private AgenticOp-io/chrysalis as sibling, build webir, then:");
    console.error("       npm run link:webir && npm run smoke:webir");
  }
  console.error(`  ${err instanceof Error ? err.message : String(err)}`);
  process.exit(1);
}

if (typeof webir.ModuleBuilder !== "function") {
  throw new Error("webir.ModuleBuilder missing");
}

const builder = new webir.ModuleBuilder({ sourceApp: "cwl-webir-smoke" });
const module = builder.finish();
if (!module || typeof module !== "object") {
  throw new Error("ModuleBuilder.finish() did not return a module");
}

console.log("smoke:webir-resolve OK");
console.log(`  ModuleBuilder: yes`);
console.log(
  `  dialects: data=${Boolean(webir.dataDialect)} effect=${Boolean(webir.effectDialect)} webRequest=${Boolean(webir.webRequest)}`,
);
if (!viaPillarHome) {
  console.warn(
    "warn: resolved without packages/webir junction; pillar home incomplete — run npm run link:webir (or complete Convert flip)",
  );
}
