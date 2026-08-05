#!/usr/bin/env node
/**
 * Phase 0.3 smoke: parse a language-gold .cwl and lift to WebIR from chrysalis-cwl alone.
 *
 * Default gold: fixtures/language-gold/01-literals/routes.cwl
 * Optional golden: same dir expected-webir.json (origin.file paths relativized).
 *
 * Flags:
 *   --write-golden  rewrite expected-webir.json from this run
 *   --no-golden     skip golden compare even if expected-webir.json exists
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { liftCwlFileToWebir } from "./hub-ingest/cwl-ingest.mjs";
import { loadWebir, resolveWebirEntryPath } from "./hub-ingest/load-webir.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");
const DEFAULT_GOLD = join(ROOT, "fixtures/language-gold/01-literals/routes.cwl");

const argv = process.argv.slice(2);
const writeGolden = argv.includes("--write-golden");
const noGolden = argv.includes("--no-golden");
const positional = argv.filter((a) => !a.startsWith("--"));
const cwlPath = resolve(positional[0] || DEFAULT_GOLD);
const fixtureDir = dirname(cwlPath);
const goldenPath = join(fixtureDir, "expected-webir.json");

/**
 * Relativize absolute origin.file paths under fixtureDir (or CWL root) for portable goldens.
 * WebIR moduleToGoldenSnapshot only relativizes php/form Locator kinds.
 * @param {string} snapshotJson
 * @param {string} projectRoot
 */
function normalizeSnapshotPaths(snapshotJson, projectRoot) {
  const root = resolve(projectRoot);
  /** @param {unknown} v */
  function walk(v) {
    if (typeof v === "string") {
      const abs = resolve(v);
      // Only rewrite strings that look like absolute paths under projectRoot.
      if (
        (v.includes("/") || v.includes("\\")) &&
        (abs === root || abs.startsWith(root + sep) || abs.startsWith(root + "/"))
      ) {
        let rel = relative(root, abs);
        if (sep === "\\") rel = rel.split("\\").join("/");
        return rel || ".";
      }
      return v.replace(/\r\n/g, "\n");
    }
    if (v === null || typeof v !== "object") return v;
    if (Array.isArray(v)) return v.map(walk);
    /** @type {Record<string, unknown>} */
    const out = {};
    for (const k of Object.keys(v).sort()) {
      out[k] = walk(/** @type {Record<string, unknown>} */ (v)[k]);
    }
    return out;
  }
  const parsed = JSON.parse(snapshotJson);
  return `${JSON.stringify(walk(parsed), null, 2)}\n`;
}

const source = readFileSync(cwlPath, "utf8");

const entry = resolveWebirEntryPath();
console.log(`webir: ${entry ?? "(package import)"}`);
console.log(`cwl:   ${cwlPath}`);

const webir = await loadWebir();
const builder = new webir.ModuleBuilder({ sourceApp: "cwl-ingest-smoke" });
const wr = webir.webRequest.builders(builder);

const result = liftCwlFileToWebir({
  webir,
  builder,
  wr,
  source,
  file: cwlPath,
  entryPath: cwlPath,
  language: "cwl",
});

const module = builder.finish();
if (!module || typeof module !== "object") {
  throw new Error("ModuleBuilder.finish() did not return a module");
}
if (!result.routeCount || result.routeCount < 1) {
  throw new Error(`expected routeCount >= 1, got ${result.routeCount}`);
}

const rootCount = Array.isArray(module.roots) ? module.roots.length : 0;
if (rootCount < 1) {
  throw new Error(`expected module.roots length >= 1, got ${rootCount}`);
}

if (typeof webir.moduleToGoldenSnapshot !== "function") {
  throw new Error("webir.moduleToGoldenSnapshot missing");
}

const rawSnapshot = webir.moduleToGoldenSnapshot(module, {
  relativizeProjectRoot: fixtureDir,
});
const snapshot = normalizeSnapshotPaths(rawSnapshot, fixtureDir);
if (snapshot.length < 2) {
  throw new Error("normalized golden snapshot empty/invalid");
}

if (writeGolden) {
  mkdirSync(fixtureDir, { recursive: true });
  writeFileSync(goldenPath, snapshot, "utf8");
  console.log(`wrote golden: ${goldenPath}`);
}

if (!noGolden && existsSync(goldenPath)) {
  const expected = readFileSync(goldenPath, "utf8").replace(/\r\n/g, "\n");
  if (expected !== snapshot) {
    throw new Error(
      `WebIR golden mismatch vs ${goldenPath}\n` +
        `Re-run with --write-golden after intentional ingest changes.`,
    );
  }
  console.log(`golden: OK (${goldenPath})`);
} else if (!noGolden && !writeGolden) {
  console.log(`golden: (none — add ${goldenPath} or pass --write-golden)`);
}

console.log("smoke:cwl-ingest OK");
console.log(`  routes: ${result.routeCount} (ast=${result.astRouteCount})`);
console.log(`  roots: ${rootCount}`);
console.log(`  snapshot: ${snapshot.length} chars`);
