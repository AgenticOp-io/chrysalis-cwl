#!/usr/bin/env node
/**
 * CWL → WebIR → CWL thin emit smoke (full language-gold matrix).
 * Honest holes remain holes (11, 21 POST form-action). Token: CWL_EMIT_SMOKE_OK
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { liftCwlFileToWebir } from "./hub-ingest/cwl-ingest.mjs";
import { emitCwlFromWebirModule } from "./hub-ingest/hub-emit-cwl-webir.mjs";
import { loadWebir, resolveWebirEntryPath } from "./hub-ingest/load-webir.mjs";
import { parseCwlModule } from "./hub-ingest/cwl-parser.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");
const GOLD = join(ROOT, "fixtures/language-gold");

/** Fixtures that must emit hole-free (projectable Rosetta surface). */
const HOLE_FREE = new Set([
  "01-literals",
  "02-path-params",
  "03-query-params",
  "04-request-context",
  "05-request-body",
  "06-response-status",
  "07-auth-effects",
  "08-response-content-type",
  "09-fullstack-page",
  "10-page-load",
  "12-multi-file",
  "13-middleware",
  "14-defaults-headers",
  "15-html-interpolation",
  "16-layout",
  "17-ui-v0",
  "18-ui-v1",
  "19-early-exit",
  "20-probes",
  "22-effects-middleware",
  "23-nested-control",
  "24-dna-bridge",
  "25-island-kinds",
  "26-nested-literals",
  "27-data-v2",
  "28-response-cookie",
  "30-effects-executable",
]);

/** Honest remaining emit holes (catalogued / form-action). */
const HONEST_HOLES = {
  "11-holes": { min: 1 },
  "21-form-action": { min: 1 },
  "29-transport-holes": { min: 3 },
};

/**
 * @param {string} cwlPath
 * @param {string} name
 */
async function runOne(cwlPath, name) {
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
    throw new Error(`${name}: ingest routeCount < 1`);
  }

  const { text, holeCount, routeCount } = emitCwlFromWebirModule(module, {
    header: "# Chrysalis Web Language — ingest round-trip emit",
    moduleName: "gold",
  });
  if (routeCount < 1) throw new Error(`${name}: emit routeCount < 1`);

  const reparsed = parseCwlModule(text, `${cwlPath}.emit-roundtrip`);
  if ((reparsed.routes ?? []).length !== routeCount) {
    throw new Error(`${name}: reparse routes !== emit`);
  }

  if (HOLE_FREE.has(name) && holeCount !== 0) {
    throw new Error(`${name}: expected holeCount 0, got ${holeCount}\n---\n${text}`);
  }
  const honest = HONEST_HOLES[name];
  if (honest && holeCount < honest.min) {
    throw new Error(`${name}: expected >= ${honest.min} honest holes, got ${holeCount}`);
  }

  if (name === "18-ui-v1" && !/client ui/.test(text)) {
    throw new Error(`18 emit: missing client ui island surface\n---\n${text}`);
  }
  if (name === "17-ui-v0" && !/return ui \{/.test(text)) {
    throw new Error(`17 emit: missing return ui\n---\n${text}`);
  }
  if (name === "25-island-kinds") {
    const map = (reparsed.routes ?? []).find((r) => r.name === "map_view");
    if (!(map?.attachmentHoles ?? []).some((h) => /vendor-sdk/.test(h))) {
      throw new Error(`25 emit: attachment hole missing on map_view\n---\n${text}`);
    }
  }
  if (name === "19-early-exit") {
    const gate = (reparsed.routes ?? []).find((r) => r.name === "gate");
    if (!gate?.earlyGuards?.[0]?.elseIfs?.length) {
      throw new Error(`19 emit: gate else-if missing\n---\n${text}`);
    }
  }
  if (name === "23-nested-control") {
    const login = (reparsed.routes ?? []).find((r) => r.name === "login_nested");
    const nestedIf = login?.earlyGuards?.[0]?.stmts?.find((s) => s.kind === "if");
    if (!nestedIf?.elseBody && !(nestedIf?.elseStmts ?? []).length) {
      throw new Error(`23 emit: login_nested nested else missing\n---\n${text}`);
    }
    const posts = (reparsed.routes ?? []).find((r) => r.name === "posts_nested_if");
    const pIf = posts?.foreachBindings?.[0]?.stmts?.find((s) => s.kind === "if");
    if (!pIf?.elseBody && !(pIf?.elseStmts ?? []).length) {
      throw new Error(`23 emit: posts_nested_if foreach/else missing\n---\n${text}`);
    }
    const threads = (reparsed.routes ?? []).find((r) => r.name === "threads_nested_foreach");
    const outer = threads?.foreachBindings?.[0];
    const inner = outer?.stmts?.find((s) => s.kind === "foreach");
    if (inner?.collection !== "comments" || inner?.item !== "c") {
      throw new Error(`23 emit: nested foreach comments as c missing\n---\n${text}`);
    }
  }

  console.log("smoke:cwl-emit OK");
  console.log(`  ingest routes: ${lift.routeCount}`);
  console.log(`  emit routes:   ${routeCount}`);
  console.log(`  emit holes:    ${holeCount}`);
  return { name, ok: true, holeCount, routeCount };
}

const args = process.argv.slice(2);
/** @type {string[]} */
let targets;
if (args.length > 0) {
  targets = args.map((a) => resolve(a));
} else {
  targets = readdirSync(GOLD, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort()
    .map((n) => join(GOLD, n, "routes.cwl"))
    .filter((p) => existsSync(p));
}

const results = [];
for (const t of targets) {
  const name = t.replace(/\\/g, "/").split("/").slice(-2, -1)[0] ?? t;
  results.push(await runOne(t, name));
}
console.log(JSON.stringify({ kind: "chrysalis.cwl.emit-smoke", ok: true, count: results.length, results }, null, 2));
console.log("CWL_EMIT_SMOKE_OK");
