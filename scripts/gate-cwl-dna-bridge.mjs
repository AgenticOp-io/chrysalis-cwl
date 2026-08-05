#!/usr/bin/env node
/**
 * RFC-0022 contract gate: seed draft DNA from 24-dna-bridge CWL ≡ expected-dna.json.
 */
import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  seedDraftDnaFromCwlPath,
  dnaBridgeContractEqual,
} from "./hub-ingest/cwl-dna-seed.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const CWL = resolve(ROOT, "fixtures/language-gold/24-dna-bridge/routes.cwl");
const EXPECTED = resolve(ROOT, "fixtures/language-gold/24-dna-bridge/expected-dna.json");

async function main() {
  const expected = JSON.parse(await readFile(EXPECTED, "utf8"));
  const actual = seedDraftDnaFromCwlPath(CWL, {
    app_id: expected.app_id,
    created_at: expected.created_at,
    host: "default",
    fixture: "fixtures/language-gold/24-dna-bridge/routes.cwl",
  });

  const ok = dnaBridgeContractEqual(actual, expected);
  const report = {
    kind: "chrysalis.cwl.dna-bridge.gate",
    schemaVersion: 1,
    ok,
    rfc: "0022",
    cwl: CWL,
    expected: EXPECTED,
    actualRoutes: actual.routes?.length ?? 0,
    expectedRoutes: expected.routes?.length ?? 0,
  };
  if (!ok) {
    report.actual = actual;
    report.expectedBody = expected;
    console.error(JSON.stringify(report, null, 2));
    process.exit(1);
  }
  console.log(JSON.stringify(report, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
