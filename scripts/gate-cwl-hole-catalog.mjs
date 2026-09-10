#!/usr/bin/env node
/**
 * Gate: every `hole <reason>;` in language-gold must be catalogued
 * (CWL_FULLSTACK_HOLE_CATALOG or cwl:* / diagnose-owned reasons).
 * Token: CWL_HOLE_CATALOG_OK
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { isCataloguedFullstackHole } from "./hub-ingest/cwl-fullstack-holes.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const GOLD = join(ROOT, "fixtures/language-gold");

/** Reasons allowed without fullstack catalog entry (parser/diagnose owned). */
const DIAGNOSE_OWNED = new Set([
  "cwl:duplicate-route",
  "cwl:empty-handler",
  "cwl:parse-error",
]);

/**
 * @param {string} dir
 * @returns {string[]}
 */
function listCwl(dir) {
  /** @type {string[]} */
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) out.push(...listCwl(p));
    else if (st.isFile() && name.endsWith(".cwl")) out.push(p);
  }
  return out;
}

/** @type {string[]} */
const failures = [];
/** @type {Array<{ file: string, reason: string }>} */
const found = [];

for (const file of listCwl(GOLD)) {
  const src = readFileSync(file, "utf8");
  const re = /\bhole\s+([a-zA-Z0-9_.:-]+)\s*;/g;
  let m;
  while ((m = re.exec(src))) {
    const reason = m[1];
    found.push({ file: relative(ROOT, file).replace(/\\/g, "/"), reason });
    if (DIAGNOSE_OWNED.has(reason) || isCataloguedFullstackHole(reason)) continue;
    // cwl:* reserved for language-owned honesty codes
    if (reason.startsWith("cwl:")) continue;
    failures.push(`${relative(ROOT, file).replace(/\\/g, "/")}: uncatalogued hole reason "${reason}"`);
  }
}

const ok = failures.length === 0;
const report = {
  kind: "chrysalis.cwl.hole-catalog.gate",
  schemaVersion: 1,
  ok,
  token: ok ? "CWL_HOLE_CATALOG_OK" : "CWL_HOLE_CATALOG_FAIL",
  holeSites: found.length,
  uniqueReasons: [...new Set(found.map((f) => f.reason))].sort(),
  failures,
};
console.log(JSON.stringify(report, null, 2));
if (ok) console.log("CWL_HOLE_CATALOG_OK");
process.exit(ok ? 0 : 1);
