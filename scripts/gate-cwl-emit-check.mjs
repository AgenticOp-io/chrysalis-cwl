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
const NESTED = join(ROOT, "fixtures/language-gold/23-nested-control/routes.cwl");

const webirEntry = resolveWebirEntryPath();
const webirReady = Boolean(webirEntry && existsSync(webirEntry));
const requireWebir = process.env.CWL_REQUIRE_WEBIR === "1" || process.env.CWL_REQUIRE_WEBIR === "true";

/** @type {{ id: string, ok: boolean, detail?: string, skipped?: boolean }[]} */
const checks = [];

/**
 * @param {string} id
 * @param {string} file
 * @param {(report: object, emittedText: string) => boolean} assertFn
 * @param {{ stdout?: boolean }} [opts]
 */
function runEmitCheck(id, file, assertFn, opts = {}) {
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
  const args = [CLI, "emit-check", file];
  if (opts.stdout) args.push("--stdout");
  const r = spawnSync(process.execPath, args, {
    cwd: ROOT,
    encoding: "utf8",
    timeout: 60_000,
  });
  const out = r.stdout || "";
  let report = null;
  let emittedText = "";
  try {
    const start = out.indexOf("{");
    if (start >= 0) {
      let depth = 0;
      let end = -1;
      for (let i = start; i < out.length; i++) {
        if (out[i] === "{") depth += 1;
        else if (out[i] === "}") {
          depth -= 1;
          if (depth === 0) {
            end = i;
            break;
          }
        }
      }
      if (end >= 0) {
        report = JSON.parse(out.slice(start, end + 1));
        emittedText = out.slice(end + 1);
      }
    }
  } catch {
    report = null;
  }
  const ok = r.status === 0 && report?.ok === true && assertFn(report, emittedText);
  checks.push({
    id,
    ok,
    detail: ok ? undefined : (r.stderr || out || `exit=${r.status}`).slice(-300),
  });
}

runEmitCheck("emit-check-19-else-if", CONTROL, (rep) => {
  return rep.token === "CWL_EMIT_CHECK_OK" && (rep.holeCount ?? 1) === 0 && (rep.emitRoutes ?? 0) >= 1;
});
runEmitCheck("emit-check-11-honest-holes", HOLES, (rep) => {
  return rep.token === "CWL_EMIT_CHECK_OK" && (rep.holeCount ?? 0) >= 1;
});
runEmitCheck(
  "emit-check-23-nested-foreach",
  NESTED,
  (rep, text) => {
    return (
      rep.token === "CWL_EMIT_CHECK_OK" &&
      (rep.holeCount ?? 1) === 0 &&
      /foreach\s+comments\s+as\s+c\s*\{/.test(text)
    );
  },
  { stdout: true },
);

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
