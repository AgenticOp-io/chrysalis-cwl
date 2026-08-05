#!/usr/bin/env node
/**
 * Emit CWL source from a WebIR module (pillar Slice 4 path).
 *
 * Pillar modes (chrysalis-cwl alone — thin emit, no convert hub-load):
 *   emit-cwl-from-hub.mjs --from-cwl <routes.cwl> [--out <file>]
 *   emit-cwl-from-hub.mjs --from-webir-json <module.json> [--out <file>]
 *
 * Full convert projectDir + --origin path still lives in convert (needs
 * hub-load-routes / fat hub-webir-routes). Pillar does not overwrite convert fmt.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { liftCwlFileToWebir } from "./cwl-ingest.mjs";
import { emitCwlFromWebirModule, listCwlRoutes, renderCwlRoutes } from "./hub-emit-cwl-webir.mjs";
import { loadWebir } from "./load-webir.mjs";

export { emitCwlFromWebirModule, listCwlRoutes, renderCwlRoutes };

/**
 * @param {string[]} argv
 */
function parseArgs(argv) {
  /** @type {{ fromCwl?: string, fromWebirJson?: string, out?: string }} */
  const out = {};
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--from-cwl" && argv[i + 1]) out.fromCwl = argv[++i];
    else if (a === "--from-webir-json" && argv[i + 1]) out.fromWebirJson = argv[++i];
    else if (a === "--out" && argv[i + 1]) out.out = argv[++i];
    else if (a === "--help" || a === "-h") out.help = true;
  }
  return out;
}

/**
 * Rebuild a Map-backed module from golden JSON (`moduleToGoldenSnapshot` shape).
 * @param {object} json
 * @param {typeof import('@chrysalis/webir')} webir
 */
async function moduleFromGoldenJson(json, webir) {
  // Prefer package helper when present; else accept { roots, nodes: [[id,node],...] }.
  if (typeof webir.moduleFromGoldenSnapshot === "function") {
    return webir.moduleFromGoldenSnapshot(typeof json === "string" ? json : JSON.stringify(json));
  }
  const roots = json.roots ?? json.module?.roots;
  const rawNodes = json.nodes ?? json.module?.nodes;
  if (!roots || !rawNodes) {
    throw new Error("--from-webir-json needs module.roots + module.nodes (or package moduleFromGoldenSnapshot)");
  }
  const nodes = new Map(Array.isArray(rawNodes) ? rawNodes : Object.entries(rawNodes));
  return { roots, nodes };
}

async function emitFromCwl(cwlPath) {
  const file = resolve(cwlPath);
  const source = readFileSync(file, "utf8");
  const webir = await loadWebir();
  const builder = new webir.ModuleBuilder({ sourceApp: "emit-cwl-from-hub" });
  const wr = webir.webRequest.builders(builder);
  liftCwlFileToWebir({
    webir,
    builder,
    wr,
    source,
    file,
    entryPath: file,
    language: "cwl",
  });
  const module = builder.finish();
  return emitCwlFromWebirModule(module, {
    header: "# Chrysalis Web Language — hub emit from cwl (thin)",
    moduleName: "hub",
  });
}

async function main() {
  const args = parseArgs(process.argv);
  if (args.help || (!args.fromCwl && !args.fromWebirJson)) {
    console.error(`usage:
  emit-cwl-from-hub.mjs --from-cwl <routes.cwl> [--out file]
  emit-cwl-from-hub.mjs --from-webir-json <module.json> [--out file]

Pillar thin emit only (literals / flat objects / honest holes).
Convert projectDir --origin path is not mirrored here.`);
    process.exit(args.help ? 0 : 1);
  }

  let result;
  if (args.fromCwl) {
    result = await emitFromCwl(args.fromCwl);
  } else {
    const raw = readFileSync(resolve(args.fromWebirJson), "utf8");
    const json = JSON.parse(raw);
    const webir = await loadWebir();
    const module = await moduleFromGoldenJson(json, webir);
    result = emitCwlFromWebirModule(module, {
      header: "# Chrysalis Web Language — hub emit from webir json (thin)",
      moduleName: "hub",
    });
  }

  const report = {
    kind: "chrysalis.hub.emit",
    schemaVersion: 1,
    origin: args.fromCwl ? "cwl" : "webir-json",
    output: "cwl",
    path: "pillar-thin-webir-cwl",
    routeCount: result.routeCount,
    holeCount: result.holeCount,
    generatedAt: new Date().toISOString(),
  };

  if (args.out) {
    writeFileSync(resolve(args.out), result.text, "utf8");
    report.out = resolve(args.out);
  } else {
    process.stdout.write(result.text);
  }
  console.error(JSON.stringify(report));
}

const isCli = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isCli) {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
