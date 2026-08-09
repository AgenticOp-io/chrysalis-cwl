#!/usr/bin/env node
/**
 * CWL formatter (language pillar): parse → print normalize.
 * No WebIR / convert dependency. Convert may keep a WebIR round-trip fmt separately.
 */
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parseCwlModule } from "./cwl-parser.mjs";
import { printCwlModule } from "./cwl-print.mjs";

export const CWL_FMT_KIND = "chrysalis.cwl.fmt";
export const CWL_FMT_SCHEMA_VERSION = 2;

/**
 * @param {string} source
 * @param {string} cwlPath
 */
export function formatCwlSource(source, cwlPath) {
  const parsed = parseCwlModule(source, cwlPath);
  const headerLines = source
    .split(/\r?\n/)
    .filter((l) => l.startsWith("#"));
  const header = headerLines.length ? headerLines.join("\n") : "# Chrysalis Web Language";
  return printCwlModule(parsed, { header });
}

/**
 * @param {string} cwlPath
 * @param {{ write?: boolean }} [opts]
 */
export async function formatCwlFile(cwlPath, opts = {}) {
  const path = resolve(cwlPath);
  const source = await readFile(path, "utf8");
  const formatted = formatCwlSource(source, path);
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
    mode: "parse-print",
  };
}

async function main() {
  const path = process.argv[2];
  if (!path) {
    console.error("usage: cwl-fmt.mjs <path/to/file.cwl>");
    process.exit(2);
  }
  const report = await formatCwlFile(path);
  console.log(JSON.stringify(report, null, 2));
}

const isCli = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isCli) {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
