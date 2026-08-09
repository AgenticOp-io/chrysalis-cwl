#!/usr/bin/env node
/**
 * Language-pillar diagnose gate over fixtures/language-gold.
 * Fails on parse/diagnose errors. Warns are reported but allowed
 * (honest holes, unused-param hints, etc.).
 */
import { readdir, readFile } from "node:fs/promises";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { diagnoseCwlSource } from "./hub-ingest/cwl-diagnose.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const FIXTURES = resolve(ROOT, "fixtures/language-gold");

/** @param {string} dir */
async function listCwlFiles(dir) {
  /** @type {string[]} */
  const out = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const ent of entries) {
    const p = join(dir, ent.name);
    if (ent.isDirectory()) out.push(...(await listCwlFiles(p)));
    else if (ent.isFile() && ent.name.endsWith(".cwl")) out.push(p);
  }
  return out.sort();
}

async function main() {
  const files = await listCwlFiles(FIXTURES);
  /** @type {object[]} */
  const failures = [];
  /** @type {object[]} */
  const passes = [];
  let warnTotal = 0;
  let opaqueResidualHits = 0;

  for (const file of files) {
    const source = await readFile(file, "utf8");
    const report = diagnoseCwlSource(source, file);
    warnTotal += report.warnCount ?? 0;
    const rel = relative(ROOT, file).replace(/\\/g, "/");
    const opaque = (report.diagnostics ?? []).filter((d) => d.code === "opaque-residual");
    opaqueResidualHits += opaque.length;
    if (!report.ok) {
      failures.push({
        file: rel,
        error: "diagnose-errors",
        diagnostics: (report.diagnostics ?? []).filter((d) => d.severity === "error"),
      });
    } else {
      passes.push({ file: rel, routeCount: report.routeCount, warnCount: report.warnCount });
    }
  }

  if (opaqueResidualHits < 1) {
    failures.push({
      file: "fixtures/language-gold/23-nested-control/routes.cwl",
      error: "opaque-residual-missing",
      diagnostics: [],
    });
  }

  const out = {
    kind: "chrysalis.cwl.diagnose.gate",
    schemaVersion: 2,
    ok: failures.length === 0,
    fixtureRoot: relative(ROOT, FIXTURES).replace(/\\/g, "/"),
    checkedFiles: files.length,
    passCount: passes.length,
    failCount: failures.length,
    warnTotal,
    opaqueResidualHits,
    failures,
  };
  console.log(JSON.stringify(out, null, 2));
  process.exit(out.ok ? 0 : 1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
