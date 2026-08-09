#!/usr/bin/env node
/**
 * Phase 0.3 Slice 4 smoke: CWL → WebIR → CWL from chrysalis-cwl alone.
 * Default: hole-free / control / chrome golds (1.0.10–1.0.11 Rosetta reverse).
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

/** @type {string[]} */
const DEFAULT_GOLDS = [
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
  "14-defaults-headers",
  "19-early-exit",
  "22-effects-middleware",
  "23-nested-control",
].map((n) => join(ROOT, "fixtures/language-gold", n, "routes.cwl"));

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

  const expectHoleFree =
    /01-literals|02-path-params|03-query-params|04-request-context|05-request-body|06-response-status|07-auth-effects|08-response-content-type|09-fullstack-page|10-page-load|12-multi-file|14-defaults-headers|19-early-exit|22-effects-middleware|23-nested-control/.test(
      norm,
    );
  if (expectHoleFree && holeCount !== 0) {
    throw new Error(`emit expected holeCount 0, got ${holeCount}\n---\n${text}`);
  }

  if (/06-response-status/.test(norm)) {
    const gone = (reparsed.routes ?? []).find((r) => r.name === "gone");
    if (gone?.responseStatus !== 410) throw new Error(`06 emit: gone status !== 410\n---\n${text}`);
  }
  if (/08-response-content-type/.test(norm)) {
    const plain = (reparsed.routes ?? []).find((r) => r.name === "plain_ok");
    if (!String(plain?.responseContentType ?? "").includes("text/plain")) {
      throw new Error(`08 emit: plain content-type missing\n---\n${text}`);
    }
  }
  if (/14-defaults-headers/.test(norm)) {
    const item = (reparsed.routes ?? []).find((r) => r.name === "item_show");
    const cache = (item?.responseHeaders ?? []).find((h) => h.name === "cache");
    if (cache?.default !== "hit") throw new Error(`14 emit: response-header cache missing\n---\n${text}`);
    if (item?.handlerPathDefaults?.id !== "anon") {
      throw new Error(`14 emit: param default id missing\n---\n${text}`);
    }
  }
  if (/07-auth-effects/.test(norm)) {
    const me = (reparsed.routes ?? []).find((r) => r.name === "me");
    if (!me?.effects?.includes("session.read")) {
      throw new Error(`07 emit: session.read effect missing\n---\n${text}`);
    }
  }
  if (/10-page-load/.test(norm)) {
    const blog = (reparsed.routes ?? []).find((r) => r.name === "blog_show");
    if (!blog?.loadBody) throw new Error(`10 emit: load body missing\n---\n${text}`);
    if (blog.body?.kind !== "html") throw new Error(`10 emit: html return missing\n---\n${text}`);
  }
  if (/22-effects-middleware/.test(norm)) {
    const admin = (reparsed.routes ?? []).find((r) => r.name === "admin_index");
    for (const tag of ["auth.require", "cors.allow", "csrf.verify"]) {
      if (!admin?.effects?.includes(tag)) {
        throw new Error(`22 emit: missing effect ${tag}\n---\n${text}`);
      }
    }
  }
  if (/19-early-exit/.test(norm)) {
    const byName = Object.fromEntries((reparsed.routes ?? []).map((r) => [r.name, r]));
    if (!byName.login?.earlyGuards?.some((g) => /username/.test(g.condExpr))) {
      throw new Error(`19 emit: login missing projectable early-guard\n---\n${text}`);
    }
    if (byName.login.earlyGuards.some((g) => /^g_/.test(g.condExpr))) {
      throw new Error(`19 emit: invented opaque g_* guard\n---\n${text}`);
    }
    if (!byName.gate?.earlyGuards?.[0]?.elseIfs?.length) {
      throw new Error(`19 emit: gate missing else-if reverse\n---\n${text}`);
    }
    if (!byName.posts_list?.foreachBindings?.some((fe) => fe.collection === "posts")) {
      throw new Error(`19 emit: posts_list missing foreach reverse\n---\n${text}`);
    }
  }
  if (/23-nested-control/.test(norm)) {
    const login = (reparsed.routes ?? []).find((r) => r.name === "login_nested");
    const nested = login?.earlyGuards?.[0]?.stmts?.find((s) => s.kind === "if");
    if (!nested || !Array.isArray(nested.elseStmts) || nested.elseStmts.length < 1) {
      throw new Error(`23 emit: login_nested missing nested if/else reverse\n---\n${text}`);
    }
  }
  if (/04-request-context/.test(norm)) {
    const locale = (reparsed.routes ?? []).find((r) => r.name === "locale");
    if (!(locale?.handlerHeaders ?? []).includes("Accept-Language")) {
      throw new Error(`04 emit: Accept-Language header missing\n---\n${text}`);
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
console.log("CWL_EMIT_SMOKE_OK");
