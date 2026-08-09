#!/usr/bin/env node
/**
 * Gate: pillar CLI emit-check (CWL → WebIR → thin emit).
 * Skips when WebIR absent unless CWL_REQUIRE_WEBIR=1.
 * Token: CWL_EMIT_CHECK_OK
 */
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { resolveWebirEntryPath } from "./hub-ingest/load-webir.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const CLI = join(ROOT, "scripts/cwl-cli.mjs");
const CONTROL = join(ROOT, "fixtures/language-gold/19-early-exit/routes.cwl");
const HOLES = join(ROOT, "fixtures/language-gold/11-holes/routes.cwl");

const webirEntry = resolveWebirEntryPath();
const webirReady = Boolean(webirEntry && existsSync(webirEntry));
const requireWebir = process.env.CWL_REQUIRE_WEBIR === "1" || process.env.CWL_REQUIRE_WEBIR === "true";

/** @type {{ id: string, ok: boolean, detail?: string, skipped?: boolean }[]} */
const checks = [];

/**
 * @param {string} id
 * @param {string} file
 * @param {(report: object) => boolean} assertFn
 */
function runEmitCheck(id, file, assertFn) {
  if (!webirReady) {
    checks.push({
      id,
      ok: !requireWebir,
      skipped: !requireWebir,
      detail: requireWebir
        ? "webir dist required (CWL_REQUIRE_WEBIR=1) — run npm run build:webir"
        : "webir dist absent — skip",
    });
    return;
  }
  const r = spawnSync(process.execPath, [CLI, "emit-check", file], {
    cwd: ROOT,
    encoding: "utf8",
    timeout: 60_000,
  });
  let report = null;
  try {
    report = JSON.parse((r.stdout || "").trim().split(/\n(?=\{)/).pop() || "{}");
  } catch {
    report = null;
  }
  const ok = r.status === 0 && report?.ok === true && assertFn(report);
  checks.push({
    id,
    ok,
    detail: ok ? undefined : (r.stderr || r.stdout || `exit=${r.status}`).slice(-300),
  });
}

runEmitCheck("emit-check-19-else-if", CONTROL, (rep) => {
  return rep.token === "CWL_EMIT_CHECK_OK" && (rep.holeCount ?? 1) === 0 && (rep.emitRoutes ?? 0) >= 1;
});
runEmitCheck("emit-check-11-honest-holes", HOLES, (rep) => {
  return rep.token === "CWL_EMIT_CHECK_OK" && (rep.holeCount ?? 0) >= 1;
});

const ok = checks.every((c) => c.ok);
const report = {
  kind: "chrysalis.cwl.emit-check.gate",
  schemaVersion: 1,
  ok,
  token: ok ? "CWL_EMIT_CHECK_OK" : "CWL_EMIT_CHECK_FAIL",
  checks,
  generatedAt: new Date().toISOString(),
};
console.log(JSON.stringify(report, null, 2));
if (ok) console.log("CWL_EMIT_CHECK_OK");
process.exit(ok ? 0 : 1);
