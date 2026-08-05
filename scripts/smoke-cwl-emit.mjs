#!/usr/bin/env node
/**
 * Phase 0.3 Slice 4 smoke: CWL → WebIR → CWL from chrysalis-cwl alone.
 * Default gold: fixtures/language-gold/01-literals (literal + object returns).
 * Honest holes OK for unsupported shapes — no demo façades.
 */
import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { liftCwlFileToWebir } from "./hub-ingest/cwl-ingest.mjs";
import { emitCwlFromWebirModule } from "./hub-ingest/hub-emit-cwl-webir.mjs";
import { loadWebir, resolveWebirEntryPath } from "./hub-ingest/load-webir.mjs";
import { parseCwlModule } from "./hub-ingest/cwl-parser.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");
const DEFAULT_GOLD = join(ROOT, "fixtures/language-gold/01-literals/routes.cwl");

const cwlPath = resolve(process.argv[2] || DEFAULT_GOLD);
const source = readFileSync(cwlPath, "utf8");

const entry = resolveWebirEntryPath();
console.log(`webir: ${entry ?? "(package import)"}`);
console.log(`cwl:   ${cwlPath}`);

const webir = await loadWebir();
const builder = new webir.ModuleBuilder({ sourceApp: "cwl-emit-smoke" });
const wr = webir.webRequest.builders(builder);

const lift = liftCwlFileToWebir({
  webir,
  builder,
  wr,
  source,
  file: cwlPath,
  entryPath: cwlPath,
  language: "cwl",
});

const module = builder.finish();
if (!lift.routeCount || lift.routeCount < 1) {
  throw new Error(`ingest expected routeCount >= 1, got ${lift.routeCount}`);
}

const { text, holeCount, routeCount } = emitCwlFromWebirModule(module, {
  header: "# Chrysalis Web Language — ingest round-trip emit",
  moduleName: "gold",
});

if (routeCount < 1) {
  throw new Error(`emit expected routeCount >= 1, got ${routeCount}`);
}

const reparsed = parseCwlModule(text, `${cwlPath}.emit-roundtrip`);
const reparseRoutes = Array.isArray(reparsed.routes) ? reparsed.routes.length : 0;
if (reparseRoutes !== routeCount) {
  throw new Error(`reparse route count ${reparseRoutes} !== emit ${routeCount}`);
}

// 01-literals must stay hole-free on the thin surface (bool / number / object).
const expectHoleFree = /01-literals/.test(cwlPath.replace(/\\/g, "/"));
if (expectHoleFree && holeCount !== 0) {
  throw new Error(`01-literals emit expected holeCount 0, got ${holeCount}\n---\n${text}`);
}

console.log("smoke:cwl-emit OK");
console.log(`  ingest routes: ${lift.routeCount}`);
console.log(`  emit routes:   ${routeCount}`);
console.log(`  emit holes:    ${holeCount}`);
console.log(`  reparse:       ${reparseRoutes} routes`);
