#!/usr/bin/env node
/**
 * Gate: diagnose → LSP map shape stable on language golds.
 */
import { readFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  mapDiagnoseDiagnostic,
  mapDiagnoseSource,
  toLspSeverity,
} from "./hub-ingest/cwl-lsp-map.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const GOLD = join(ROOT, "fixtures/language-gold/11-holes/routes.cwl");

async function main() {
  const holes = await readFile(GOLD, "utf8");
  const mapped = mapDiagnoseSource(holes, GOLD);
  /** @type {string[]} */
  const failures = [];

  if (!Array.isArray(mapped.diagnostics)) {
    failures.push("diagnostics-not-array");
  }
  if ((mapped.diagnostics?.length ?? 0) < 1) {
    failures.push("expected-diagnostics-on-holes-gold");
  }
  for (const d of mapped.diagnostics ?? []) {
    if (!d.range?.start || typeof d.range.start.line !== "number") {
      failures.push(`bad-range:${d.code}`);
    }
    if (!["Error", "Warning", "Information", "Hint"].includes(d.severity)) {
      failures.push(`bad-severity:${d.severity}`);
    }
    if (!d.message) failures.push("empty-message");
    if (d.source !== "cwl") failures.push(`bad-source:${d.source}`);
  }

  // Gold: hole stmts at 1-based lines 7 and 13 → LSP 0-based 6 and 12.
  // Indented `  hole …` → keyword start character 2 (> 0).
  const holeDiags = (mapped.diagnostics ?? []).filter((d) => d.code === "catalogued-hole");
  if (holeDiags.length < 2) {
    failures.push("expected-two-catalogued-hole-diags");
  } else {
    const lines0 = holeDiags.map((d) => d.range.start.line).sort((a, b) => a - b);
    if (lines0[0] !== 6) failures.push(`hole-range-line-expected-6-got-${lines0[0]}`);
    if (lines0[1] !== 12) failures.push(`hole-range-line-expected-12-got-${lines0[1]}`);
    // Must not collapse to document start (pre-range bug).
    if (lines0.every((n) => n === 0)) failures.push("hole-ranges-all-line-0");
  }

  const hasCharGt0 = (mapped.diagnostics ?? []).some(
    (d) => typeof d.range?.start?.character === "number" && d.range.start.character > 0,
  );
  if (!hasCharGt0) {
    failures.push("expected-at-least-one-diagnostic-character-gt-0");
  }

  if (toLspSeverity("error") !== "Error") failures.push("severity-error");
  if (toLspSeverity("warn") !== "Warning") failures.push("severity-warn");
  if (toLspSeverity("info") !== "Information") failures.push("severity-info");

  const synthetic = mapDiagnoseDiagnostic(
    { severity: "error", code: "parse", message: "boom at line 3", line: 3, character: 4 },
    "file:///synth.cwl",
  );
  if (synthetic.severity !== "Error") failures.push("synthetic-severity");
  if (synthetic.range.start.line !== 2) failures.push("synthetic-line0");
  if (synthetic.range.start.character !== 4) failures.push("synthetic-character");

  const syntheticCol = mapDiagnoseDiagnostic(
    { severity: "warn", code: "x", message: "col alias", line: 1, column: 7 },
    "file:///synth-col.cwl",
  );
  if (syntheticCol.range.start.character !== 7) failures.push("synthetic-column-alias");

  const report = {
    kind: "chrysalis.cwl.lsp-map.gate",
    schemaVersion: 1,
    ok: failures.length === 0,
    token: failures.length === 0 ? "CWL_LSP_MAP_OK" : "CWL_LSP_MAP_FAIL",
    gold: GOLD,
    mappedCount: mapped.diagnostics?.length ?? 0,
    holeRangeLines0: (mapped.diagnostics ?? [])
      .filter((d) => d.code === "catalogued-hole")
      .map((d) => d.range.start.line),
    holeRangeCharacters0: (mapped.diagnostics ?? [])
      .filter((d) => d.code === "catalogued-hole")
      .map((d) => d.range.start.character),
    hasCharacterGt0: hasCharGt0,
    failures,
  };
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  if (report.ok) process.stdout.write("CWL_LSP_MAP_OK\n");
  process.exit(report.ok ? 0 : 1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
