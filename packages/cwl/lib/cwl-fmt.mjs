#!/usr/bin/env node
/**
 * CWL formatter (language pillar).
 * Default: parse → print normalize (no WebIR).
 * Opt-in: --webir  ingest → thin emit reverse (Rosetta; needs @chrysalis/webir).
 */
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parseCwlModule } from "./cwl-parser.mjs";
import { printCwlModule } from "./cwl-print.mjs";

export const CWL_FMT_KIND = "chrysalis.cwl.fmt";
export const CWL_FMT_SCHEMA_VERSION = 3;

/**
 * @param {string} source
 * @param {string} cwlPath
 */
export function formatCwlSource(source, cwlPath) {
  const parsed = parseCwlModule(source, cwlPath);
  const headerLines = source.split(/\r?\n/).filter((l) => l.startsWith("#"));
  const header = headerLines.length ? headerLines.join("\n") : "# Chrysalis Web Language";
  return printCwlModule(parsed, { header });
}

/**
 * WebIR round-trip format (thin emit reverse). Explicit opt-in only.
 * @param {string} source
 * @param {string} cwlPath
 */
export async function formatCwlSourceViaWebir(source, cwlPath) {
  const { liftCwlFileToWebir } = await import("./cwl-ingest.mjs");
  const { emitCwlFromWebirModule } = await import("./hub-emit-cwl-webir.mjs");
  const { loadWebir } = await import("./load-webir.mjs");
  const webir = await loadWebir();
  const builder = new webir.ModuleBuilder({ sourceApp: "cwl-fmt-webir" });
  const wr = webir.webRequest.builders(builder);
  liftCwlFileToWebir({
    webir,
    builder,
    wr,
    source,
    file: cwlPath,
    entryPath: cwlPath,
    language: "cwl",
  });
  const module = builder.finish();
  const headerLines = source.split(/\r?\n/).filter((l) => l.startsWith("#"));
  const header = headerLines.length ? headerLines.join("\n") : "# Chrysalis Web Language";
  const { text } = emitCwlFromWebirModule(module, { header, moduleName: parseCwlModule(source, cwlPath).moduleName ?? "main" });
  return text;
}

/**
 * @param {string} cwlPath
 * @param {{ write?: boolean, webir?: boolean }} [opts]
 */
export async function formatCwlFile(cwlPath, opts = {}) {
  const path = resolve(cwlPath);
  const source = await readFile(path, "utf8");
  const mode = opts.webir ? "webir-emit" : "parse-print";
  const formatted = opts.webir
    ? await formatCwlSourceViaWebir(source, path)
    : formatCwlSource(source, path);
  const changed = formatted !== source;
  if (opts.write !== false && changed) {
    await writeFile(path, formatted, "utf8");
  }
  return {
    kind: CWL_FMT_KIND,
    schemaVersion: CWL_FMT_SCHEMA_VERSION,
    ok: true,
    path,
    changed,
    byteLength: formatted.length,
    mode,
  };
}

async function main() {
  const args = process.argv.slice(2);
  const webir = args.includes("--webir");
  const write = !args.includes("--stdout") && !args.includes("--check");
  const path = args.find((a) => !a.startsWith("-"));
  if (!path) {
    console.error("usage: cwl-fmt.mjs <path/to/file.cwl> [--webir] [--stdout]");
    process.exit(2);
  }
  if (args.includes("--stdout")) {
    const source = await readFile(resolve(path), "utf8");
    const text = webir
      ? await formatCwlSourceViaWebir(source, resolve(path))
      : formatCwlSource(source, resolve(path));
    process.stdout.write(text);
    return;
  }
  const report = await formatCwlFile(path, { write, webir });
  console.log(JSON.stringify(report, null, 2));
}

const isCli = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isCli) {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
