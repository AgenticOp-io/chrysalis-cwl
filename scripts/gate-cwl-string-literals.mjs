#!/usr/bin/env node
/**
 * Language-pillar gate: punctuation inside string literals stays inside them.
 * A comma in prose used to split an object pair, so the handler body parsed as
 * invalid-object-pair and the route vanished from the module.
 */
import { parseCwlModule } from "./hub-ingest/cwl-parser.mjs";
import { canonicalizeCwlModule, printCwlModule } from "./hub-ingest/cwl-print.mjs";

const SOURCE = [
  "module gold_strings;",
  "",
  '@route GET "/prose"',
  "handler prose {",
  "  effects: none;",
  '  return { note: "one, two", tail: ["a, b", "c"], quoted: "say \\" then, stop", n: 3 };',
  "}",
  "",
].join("\n");

const failures = [];
const ast = parseCwlModule(SOURCE, "gold-strings.cwl");
const route = (ast.routes ?? [])[0];
const entries = route?.body?.entries ?? [];
const byKey = Object.fromEntries(entries.map((e) => [e.key, e.value]));

if ((ast.routes ?? []).length !== 1) failures.push(`route-count:${(ast.routes ?? []).length}`);
if (entries.length !== 4) failures.push(`entry-count:${entries.length}`);
if (byKey.note?.value !== "one, two") failures.push(`note:${JSON.stringify(byKey.note)}`);
if (byKey.quoted?.value !== 'say " then, stop') failures.push(`quoted:${JSON.stringify(byKey.quoted)}`);
const tail = (byKey.tail?.elements ?? []).map((e) => e.value);
if (tail.join("|") !== "a, b|c") failures.push(`tail:${JSON.stringify(tail)}`);

// Print → reparse: commas must survive the round trip too.
const printed = printCwlModule(canonicalizeCwlModule(ast));
const again = parseCwlModule(printed, "gold-strings.cwl");
if (JSON.stringify(canonicalizeCwlModule(again)) !== JSON.stringify(canonicalizeCwlModule(ast))) {
  failures.push("roundtrip-mismatch");
}

const ok = failures.length === 0;
const report = {
  kind: "chrysalis.cwl.string-literals.gate",
  schemaVersion: 1,
  ok,
  token: ok ? "CWL_STRING_LITERALS_OK" : "CWL_STRING_LITERALS_FAIL",
  failures,
};
console.log(JSON.stringify(report, null, 2));
if (ok) console.log("CWL_STRING_LITERALS_OK");
process.exit(ok ? 0 : 1);
