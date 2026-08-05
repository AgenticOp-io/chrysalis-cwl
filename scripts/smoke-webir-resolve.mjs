#!/usr/bin/env node
/**
 * Minimal Phase 0.3 smoke: resolve and construct WebIR from chrysalis-cwl alone.
 * Does NOT run full cwl-ingest (blocked on convert-local hub-lift helpers — see plan).
 */
import { resolveWebirEntryPath, loadWebir, webirCandidatePaths } from "./hub-ingest/load-webir.mjs";

const entry = resolveWebirEntryPath();
console.log("candidates:");
for (const p of webirCandidatePaths()) {
  console.log(`  ${p}`);
}
console.log(`resolved: ${entry ?? "(package import)"}`);

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
