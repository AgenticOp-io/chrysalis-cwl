#!/usr/bin/env node
/**
 * Language-pillar gate: parse → print → parse AST equality + print idempotence.
 * Does not require WebIR or convert hub helpers.
 */
import { readdir, readFile } from "node:fs/promises";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parseCwlModule } from "./hub-ingest/cwl-parser.mjs";
import { canonicalizeCwlModule, printCwlModule } from "./hub-ingest/cwl-print.mjs";
import { resolveCwlModuleFromPath } from "./hub-ingest/cwl-module-graph.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const FIXTURES = resolve(ROOT, "fixtures/language-gold");

/**
 * @param {string} dir
 * @returns {Promise<string[]>}
 */
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

/**
 * @param {unknown} a
 * @param {unknown} b
 */
function deepEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

/**
 * @param {string} file
 */
async function checkRoundTrip(file) {
  const source = await readFile(file, "utf8");
  const ast1 = parseCwlModule(source, file);
  const printed = printCwlModule(ast1, { header: null });
  const ast2 = parseCwlModule(printed, file);
  const c1 = canonicalizeCwlModule(ast1);
  const c2 = canonicalizeCwlModule(ast2);
  if (!deepEqual(c1, c2)) {
    return {
      ok: false,
      file,
      error: "ast-mismatch-after-print",
      left: c1,
      right: c2,
      printed,
    };
  }
  const printed2 = printCwlModule(ast2, { header: null });
  if (printed2 !== printed) {
    return { ok: false, file, error: "print-not-idempotent", printed, printed2 };
  }
  if (ast1.routes.length === 0 && !(ast1.imports?.length > 0)) {
    return { ok: false, file, error: "no-routes-parsed" };
  }
  return {
    ok: true,
    file,
    routes: ast1.routes.length,
    moduleName: ast1.moduleName,
  };
}

/**
 * @param {string} entry
 */
async function checkMultiResolve(entry) {
  const resolved = resolveCwlModuleFromPath(entry);
  const methods = resolved.routes.map((r) => `${r.method} ${r.path}`).sort();
  const expected = ["GET /health", "GET /meta", "GET /ping"];
  if (!deepEqual(methods, expected)) {
    return { ok: false, entry, error: "multi-resolve-routes", methods, expected };
  }
  return { ok: true, entry, routes: methods.length };
}

async function main() {
  const files = await listCwlFiles(FIXTURES);
  if (files.length === 0) {
    console.error(`no .cwl fixtures under ${FIXTURES}`);
    process.exit(2);
  }

  /** @type {object[]} */
  const failures = [];
  /** @type {object[]} */
  const passes = [];

  for (const file of files) {
    const result = await checkRoundTrip(file);
    if (result.ok) passes.push(result);
    else failures.push(result);
  }

  const multiEntry = resolve(FIXTURES, "12-multi-file/routes.cwl");
  const multi = await checkMultiResolve(multiEntry);
  if (multi.ok) passes.push(multi);
  else failures.push(multi);

  const layoutEntry = resolve(FIXTURES, "16-layout/routes.cwl");
  const layoutResolved = resolveCwlModuleFromPath(layoutEntry);
  const layoutMethods = layoutResolved.routes.map((r) => `${r.method} ${r.path}`).sort();
  const layoutExpected = ["GET /about", "GET /api/docs/:slug", "GET /docs/:slug"];
  const layout = deepEqual(layoutMethods, layoutExpected)
    ? { ok: true, entry: layoutEntry, routes: layoutMethods.length }
    : { ok: false, entry: layoutEntry, error: "layout-resolve-routes", methods: layoutMethods, expected: layoutExpected };
  if (layout.ok) passes.push(layout);
  else failures.push(layout);

  const report = {
    kind: "chrysalis.cwl.roundtrip",
    schemaVersion: 1,
    ok: failures.length === 0,
    fixtureRoot: relative(ROOT, FIXTURES).replace(/\\/g, "/"),
    checkedFiles: files.length,
    passCount: passes.length,
    failCount: failures.length,
    failures: failures.map((f) => ({
      file: f.file ? relative(ROOT, f.file).replace(/\\/g, "/") : undefined,
      entry: f.entry ? relative(ROOT, f.entry).replace(/\\/g, "/") : undefined,
      error: f.error,
      methods: f.methods,
      expected: f.expected,
    })),
  };

  console.log(JSON.stringify(report, null, 2));
  if (!report.ok) {
    for (const f of failures) {
      if (f.error === "ast-mismatch-after-print") {
        console.error(`\nAST mismatch: ${f.file}`);
        console.error("printed:\n", f.printed);
        console.error("left:", JSON.stringify(f.left, null, 2));
        console.error("right:", JSON.stringify(f.right, null, 2));
      } else if (f.error === "print-not-idempotent") {
        console.error(`\nPrint not idempotent: ${f.file}`);
        console.error("printed:\n", f.printed);
        console.error("printed2:\n", f.printed2);
      } else {
        console.error(`\nFail: ${f.error}`, f.file ?? f.entry);
      }
    }
    process.exit(1);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
