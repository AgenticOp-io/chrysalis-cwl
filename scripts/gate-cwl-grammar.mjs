#!/usr/bin/env node
/**
 * Gate: TextMate keyword catalog covers LSP completion surface (control/UI).
 * Token: CWL_GRAMMAR_OK
 */
import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { CWL_COMPLETION_CATALOG } from "./cwl-lsp-server.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const TM = join(ROOT, "editors/vscode/syntaxes/cwl.tmLanguage.json");

/** Labels → TextMate word tokens (multi-word / hyphenated surface). */
const LABEL_TO_WORDS = {
  "@route": null, // decorator pattern
  "@page": null,
  "@component": null,
  "else if": ["else", "if"],
  "return ui": ["return", "ui"],
  "return html": ["return", "html"],
  "client ui": ["client", "ui"],
  "on click": ["on"],
  "content-type": ["content-type"],
  "response-header": ["response-header"],
  "multipart field": ["multipart"],
  "multipart file": ["multipart"],
  "stream sse": ["stream"],
};

const tm = JSON.parse(readFileSync(TM, "utf8"));
const matchSources = (tm.repository?.keywords?.patterns ?? [])
  .map((p) => String(p.match ?? ""))
  .join("\n");
const decoratorMatch = String(tm.repository?.decorators?.patterns?.[0]?.match ?? "");

/** @type {string[]} */
const failures = [];

/**
 * @param {string} word
 */
function grammarHasWord(word) {
  if (word.startsWith("@")) {
    const name = word.slice(1);
    return new RegExp(`@\\([^)]*\\b${name}\\b`).test(decoratorMatch) || decoratorMatch.includes(name);
  }
  if (word.includes("-")) {
    return matchSources.includes(word);
  }
  return new RegExp(`\\\\b\\([^)]*\\b${word}\\b`).test(matchSources) || new RegExp(`\\b${word}\\b`).test(matchSources);
}

for (const entry of CWL_COMPLETION_CATALOG) {
  const label = entry.label;
  if (LABEL_TO_WORDS[label] === null) {
    const name = label.startsWith("@") ? label.slice(1) : label;
    if (!decoratorMatch.includes(name)) failures.push(`decorator-missing:${label}`);
    continue;
  }
  const words = LABEL_TO_WORDS[label] ?? [label];
  for (const w of words) {
    if (!grammarHasWord(w)) failures.push(`keyword-missing:${label}->${w}`);
  }
}

const ok = failures.length === 0;
const report = {
  kind: "chrysalis.cwl.grammar.gate",
  schemaVersion: 1,
  ok,
  token: ok ? "CWL_GRAMMAR_OK" : "CWL_GRAMMAR_FAIL",
  catalogSize: CWL_COMPLETION_CATALOG.length,
  failures,
};
console.log(JSON.stringify(report, null, 2));
if (ok) console.log("CWL_GRAMMAR_OK");
process.exit(ok ? 0 : 1);
