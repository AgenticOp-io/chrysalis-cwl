#!/usr/bin/env node
/**
 * RFC-0022/0023 contract gate:
 * - default host seed ≡ expected-dna.json
 * - multi-host profile (host=api) ≡ expected-dna-api.json
 * - hosts{} rejects unknown host keys
 * - holes bridge report (RFC-0022 §6) is side-channel only
 */
import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  seedDraftDnaFromCwlPath,
  dnaBridgeContractEqual,
  loadDeployProfile,
  resolveHostFromProfile,
  cwlHolesBridgeReport,
} from "./hub-ingest/cwl-dna-seed.mjs";
import { resolveCwlModuleFromPath } from "./hub-ingest/cwl-module-graph.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const FIX = resolve(ROOT, "fixtures/language-gold/24-dna-bridge");
const CWL = resolve(FIX, "routes.cwl");
const EXPECTED = resolve(FIX, "expected-dna.json");
const EXPECTED_API = resolve(FIX, "expected-dna-api.json");
const PROFILE = resolve(FIX, "deploy-profile.json");
const PROFILE_API = resolve(FIX, "deploy-profile-api.json");
const HOLES_CWL = resolve(ROOT, "fixtures/language-gold/11-holes/routes.cwl");

async function main() {
  /** @type {string[]} */
  const failures = [];

  const expected = JSON.parse(await readFile(EXPECTED, "utf8"));
  const actual = seedDraftDnaFromCwlPath(CWL, {
    app_id: expected.app_id,
    created_at: expected.created_at,
    host: "default",
    fixture: "fixtures/language-gold/24-dna-bridge/routes.cwl",
  });
  if (!dnaBridgeContractEqual(actual, expected)) {
    failures.push("default-host-seed-mismatch");
  }

  const profileDefault = loadDeployProfile(PROFILE);
  if (resolveHostFromProfile(profileDefault) !== "default") {
    failures.push("profile-default-host");
  }
  if (!profileDefault.hosts?.api?.public_origin) {
    failures.push("profile-missing-api-host-entry");
  }

  const expectedApi = JSON.parse(await readFile(EXPECTED_API, "utf8"));
  const actualApi = seedDraftDnaFromCwlPath(CWL, {
    app_id: expectedApi.app_id,
    created_at: expectedApi.created_at,
    profilePath: PROFILE_API,
    fixture: "fixtures/language-gold/24-dna-bridge/routes.cwl",
  });
  if (!dnaBridgeContractEqual(actualApi, expectedApi)) {
    failures.push("api-host-seed-mismatch");
  }
  if (!actualApi.routes?.every((r) => r.host === "api")) {
    failures.push("api-host-routes-not-api");
  }

  let threw = false;
  try {
    resolveHostFromProfile(profileDefault, "staging");
  } catch {
    threw = true;
  }
  if (!threw) failures.push("unknown-host-should-throw");

  const holesMod = resolveCwlModuleFromPath(HOLES_CWL);
  const holesReport = cwlHolesBridgeReport(holesMod, {
    fixture: "fixtures/language-gold/11-holes/routes.cwl",
  });
  if (holesReport.kind !== "chrysalis.cwl.holes-bridge-report") {
    failures.push("holes-report-kind");
  }
  if (!Array.isArray(holesReport.cwl_holes) || holesReport.cwl_holes.length < 1) {
    failures.push("holes-report-empty");
  }
  if (!Array.isArray(holesReport.dna_gaps) || holesReport.dna_gaps.length !== 0) {
    failures.push("holes-report-dna-gaps-should-start-empty");
  }

  const ok = failures.length === 0;
  const report = {
    kind: "chrysalis.cwl.dna-bridge.gate",
    schemaVersion: 2,
    ok,
    rfc: ["0022", "0023"],
    token: ok ? "CWL_DNA_BRIDGE_OK" : "CWL_DNA_BRIDGE_FAIL",
    cwl: CWL,
    checks: {
      defaultHost: !failures.includes("default-host-seed-mismatch"),
      multiHostApi: !failures.includes("api-host-seed-mismatch"),
      hostsValidation: !failures.includes("unknown-host-should-throw"),
      holesBridgeReport: !failures.includes("holes-report-empty"),
    },
    actualRoutes: actual.routes?.length ?? 0,
    expectedRoutes: expected.routes?.length ?? 0,
    failures,
  };
  if (!ok) {
    report.actualApiSample = actualApi?.routes?.[0];
    console.error(JSON.stringify(report, null, 2));
    process.exit(1);
  }
  console.log(JSON.stringify(report, null, 2));
  console.log("CWL_DNA_BRIDGE_OK");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
