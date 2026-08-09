#!/usr/bin/env node
/**
 * Phase 0.3 Slice 4 smoke: CWL → WebIR → CWL from chrysalis-cwl alone.
 * Default gold: fixtures/language-gold/01-literals (literal + object returns).
 * Honest holes OK for unsupported shapes — no demo façades.
 * 1.0.10: projectable early-guards / else / foreach reverse on 19 / 23.
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
const DEFAULT_GOLDS = [
  join(ROOT, "fixtures/language-gold/01-literals/routes.cwl"),
  join(ROOT, "fixtures/language-gold/19-early-exit/routes.cwl"),
  join(ROOT, "fixtures/language-gold/23-nested-control/routes.cwl"),
];

/**
 * @param {string} cwlPath
 */
async function runOne(cwlPath) {
  const source = readFileSync(cwlPath, "utf8");
  const norm = cwlPath.replace(/\\/g, "/");

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
  const expectHoleFree = /01-literals/.test(norm);
  if (expectHoleFree && holeCount !== 0) {
    throw new Error(`01-literals emit expected holeCount 0, got ${holeCount}\n---\n${text}`);
  }

  if (/19-early-exit/.test(norm)) {
    const byName = Object.fromEntries((reparsed.routes ?? []).map((r) => [r.name, r]));
    const login = byName.login;
    if (!login?.earlyGuards?.some((g) => /username/.test(g.condExpr))) {
      throw new Error(`19 emit: login missing projectable early-guard\n---\n${text}`);
    }
    if (login.earlyGuards.some((g) => /^g_/.test(g.condExpr))) {
      throw new Error(`19 emit: invented opaque g_* guard\n---\n${text}`);
    }
    const gate = byName.gate;
    if (!gate?.earlyGuards?.[0]?.elseIfs?.length) {
      throw new Error(`19 emit: gate missing else-if reverse\n---\n${text}`);
    }
    const posts = byName.posts_list;
    if (!posts?.foreachBindings?.some((fe) => fe.collection === "posts")) {
      throw new Error(`19 emit: posts_list missing foreach reverse\n---\n${text}`);
    }
    const page = byName.post_view;
    if (!page?.earlyGuards?.some((g) => /post/.test(g.condExpr))) {
      throw new Error(`19 emit: post_view missing page early-exit\n---\n${text}`);
    }
  }

  if (/23-nested-control/.test(norm)) {
    const login = (reparsed.routes ?? []).find((r) => r.name === "login_nested");
    const g0 = login?.earlyGuards?.[0];
    const nested = g0?.stmts?.find((s) => s.kind === "if");
    if (!nested || !Array.isArray(nested.elseStmts) || nested.elseStmts.length < 1) {
      throw new Error(`23 emit: login_nested missing nested if/else reverse\n---\n${text}`);
    }
    const posts = (reparsed.routes ?? []).find((r) => r.path === "/posts");
    if (!posts?.foreachBindings?.length) {
      throw new Error(`23 emit: posts missing foreach reverse\n---\n${text}`);
    }
  }

  console.log("smoke:cwl-emit OK");
  console.log(`  ingest routes: ${lift.routeCount}`);
  console.log(`  emit routes:   ${routeCount}`);
  console.log(`  emit holes:    ${holeCount}`);
  console.log(`  reparse:       ${reparseRoutes} routes`);
}

const args = process.argv.slice(2);
const targets = args.length > 0 ? args.map((a) => resolve(a)) : DEFAULT_GOLDS;
for (const t of targets) await runOne(t);