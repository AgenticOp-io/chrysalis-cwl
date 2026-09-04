#!/usr/bin/env node
/**
 * Dual-mode cwl-fmt gate: parse→print always; --webir when WebIR resolves.
 * Token: CWL_FMT_OK
 */
import { existsSync, readFileSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { formatCwlSource, formatCwlSourceViaWebir } from "./hub-ingest/cwl-fmt.mjs";
import { parseCwlModule } from "./hub-ingest/cwl-parser.mjs";
import { canonicalizeCwlModule } from "./hub-ingest/cwl-print.mjs";
import { resolveWebirEntryPath } from "./hub-ingest/load-webir.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const GOLD = join(ROOT, "fixtures/language-gold/01-literals/routes.cwl");
const CONTROL = join(ROOT, "fixtures/language-gold/19-early-exit/routes.cwl");
const NESTED = join(ROOT, "fixtures/language-gold/23-nested-control/routes.cwl");

/** @type {{ id: string, ok: boolean, detail?: string, skipped?: boolean }[]} */
const checks = [];

{
  const src = readFileSync(GOLD, "utf8");
  const formatted = formatCwlSource(src, GOLD);
  const a = canonicalizeCwlModule(parseCwlModule(src, GOLD));
  const b = canonicalizeCwlModule(parseCwlModule(formatted, GOLD));
  const ok = JSON.stringify(a) === JSON.stringify(b);
  checks.push({ id: "parse-print-01", ok, detail: ok ? undefined : "ast mismatch" });
}

const webirEntry = resolveWebirEntryPath();
const webirReady = Boolean(webirEntry && existsSync(webirEntry));
const requireWebir = process.env.CWL_REQUIRE_WEBIR === "1" || process.env.CWL_REQUIRE_WEBIR === "true";
if (!webirReady) {
  for (const id of ["webir-emit-19-else-if", "webir-emit-23-nested-foreach"]) {
    checks.push({
      id,
      ok: !requireWebir,
      skipped: !requireWebir,
      detail: requireWebir
        ? "webir dist required (CWL_REQUIRE_WEBIR=1) — run npm run build:webir"
        : "webir dist absent — skip (set CWL_REQUIRE_WEBIR=1 after build:webir)",
    });
  }
} else {
  {
    const src = readFileSync(CONTROL, "utf8");
    const formatted = await formatCwlSourceViaWebir(src, CONTROL);
    const re = parseCwlModule(formatted, CONTROL);
    const gate = (re.routes ?? []).find((r) => r.name === "gate");
    const ok = Boolean(gate?.earlyGuards?.[0]?.elseIfs?.length);
    checks.push({
      id: "webir-emit-19-else-if",
      ok,
      detail: ok ? undefined : "webir fmt lost else-if",
    });
  }
  {
    const src = readFileSync(NESTED, "utf8");
    const formatted = await formatCwlSourceViaWebir(src, NESTED);
    const re = parseCwlModule(formatted, NESTED);
    const threads = (re.routes ?? []).find((r) => r.name === "threads_nested_foreach");
    const inner = threads?.foreachBindings?.[0]?.stmts?.find((s) => s.kind === "foreach");
    const ok = inner?.collection === "comments" && inner?.item === "c";
    checks.push({
      id: "webir-emit-23-nested-foreach",
      ok,
      detail: ok ? undefined : "webir fmt lost nested foreach comments as c",
    });
  }
}

const ok = checks.every((c) => c.ok);
const report = {
  kind: "chrysalis.cwl.fmt.gate",
  schemaVersion: 1,
  ok,
  token: ok ? "CWL_FMT_OK" : "CWL_FMT_FAIL",
  checks,
  generatedAt: new Date().toISOString(),
};
console.log(JSON.stringify(report, null, 2));
if (ok) console.log("CWL_FMT_OK");
else process.exit(1);
