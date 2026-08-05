#!/usr/bin/env node
/**
 * Minimal Phase 0.3 smoke: resolve and construct WebIR from chrysalis-cwl alone.
 * Prefers packages/webir (pillar home / junction). Does NOT run full cwl-ingest.
 * See packages/WEBIR.md and docs/history/WEBIR-EXTRACT-PLAN.md.
 */
import { resolveWebirEntryPath, loadWebir, webirCandidatePaths } from "./hub-ingest/load-webir.mjs";

const candidates = webirCandidatePaths();
const entry = resolveWebirEntryPath();
const pillarHome = candidates[0];
const viaPillarHome = Boolean(entry && entry === pillarHome);

console.log("candidates:");
for (const p of candidates) {
  console.log(`  ${p}`);
}
console.log(`resolved: ${entry ?? "(package import)"}`);
console.log(`pillar home (packages/webir): ${viaPillarHome ? "yes" : "no — run npm run link:webir"}`);

const webir = await loadWebir();
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
    "warn: resolved without packages/webir junction; pillar home story incomplete until link:webir",
  );
}
