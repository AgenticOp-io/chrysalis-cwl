#!/usr/bin/env node
/**
 * Dual-mode cwl-fmt gate: parse→print + opt-in --webir emit reverse.
 * Token: CWL_FMT_OK
 */
import { readFileSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { formatCwlSource, formatCwlSourceViaWebir } from "./hub-ingest/cwl-fmt.mjs";
import { parseCwlModule } from "./hub-ingest/cwl-parser.mjs";
import { canonicalizeCwlModule } from "./hub-ingest/cwl-print.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const GOLD = join(ROOT, "fixtures/language-gold/01-literals/routes.cwl");
const CONTROL = join(ROOT, "fixtures/language-gold/19-early-exit/routes.cwl");

/** @type {{ id: string, ok: boolean, detail?: string }[]} */
const checks = [];

{
  const src = readFileSync(GOLD, "utf8");
  const formatted = formatCwlSource(src, GOLD);
  const a = canonicalizeCwlModule(parseCwlModule(src, GOLD));
  const b = canonicalizeCwlModule(parseCwlModule(formatted, GOLD));
  const ok = JSON.stringify(a) === JSON.stringify(b);
  checks.push({ id: "parse-print-01", ok, detail: ok ? undefined : "ast mismatch" });
}

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
