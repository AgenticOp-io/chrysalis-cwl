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
  pathTemplateShapeEqual,
  responseKeyFingerprint,
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
const FIX34 = resolve(ROOT, "fixtures/language-gold/34-dna-bridge-surfaces");
const CWL34 = resolve(FIX34, "routes.cwl");
const EXPECTED34 = resolve(FIX34, "expected-dna.json");

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

  if (!pathTemplateShapeEqual("/items/:id", "/items/:userId")) {
    failures.push("path-shape-named-params");
  }
  if (pathTemplateShapeEqual("/items/:id", "/items/x")) {
    failures.push("path-shape-static-mismatch-should-fail");
  }
  const nestedFp = responseKeyFingerprint({ ok: true, meta: { v: 1 } });
  if (nestedFp !== "meta,meta.v,ok") {
    failures.push(`response-fp-depth2-got-${nestedFp}`);
  }
  const health = (actual.routes ?? []).find(
    (r) => r.method === "GET" && r.path_template === "/api/health",
  );
  if (!health?.status_classes?.includes(200)) {
    failures.push("status-classes-health-200");
  }
  if (health?.response_key_fingerprint !== "meta,meta.v,ok,surface") {
    failures.push("nested-fp-health");
  }
  const login = (actual.routes ?? []).find(
    (r) => r.method === "POST" && r.path_template === "/login",
  );
  if (login?.request_key_fingerprint !== "password,username") {
    failures.push("request-fp-login");
  }

  // 1.0.24 deepen: SSE / multipart / HEAD seed honesty
  const expected34 = JSON.parse(await readFile(EXPECTED34, "utf8"));
  const actual34 = seedDraftDnaFromCwlPath(CWL34, {
    app_id: expected34.app_id,
    created_at: expected34.created_at,
    host: "default",
    fixture: "fixtures/language-gold/34-dna-bridge-surfaces/routes.cwl",
  });
  if (!dnaBridgeContractEqual(actual34, expected34)) {
    failures.push("surfaces-seed-mismatch");
  }
  const sse = (actual34.routes ?? []).find(
    (r) => r.method === "GET" && r.path_template === "/events",
  );
  if (sse?.content_class !== "other") failures.push("sse-content-class-other");
  if (sse?.response_key_fingerprint != null) failures.push("sse-response-fp-null");
  const sseAnn = (actual34.bridge?.annotations ?? []).find(
    (a) => a.method === "GET" && a.path_template === "/events",
  );
  if (sseAnn?.cwl_stream !== "sse") failures.push("sse-annotation-stream");
  const upload = (actual34.routes ?? []).find(
    (r) => r.method === "POST" && r.path_template === "/upload",
  );
  if (upload?.request_key_fingerprint !== "avatar,title") {
    failures.push("multipart-request-fp");
  }
  const uploadAnn = (actual34.bridge?.annotations ?? []).find(
    (a) => a.method === "POST" && a.path_template === "/upload",
  );
  if (!uploadAnn?.cwl_multipart_fields?.includes("title")) {
    failures.push("multipart-ann-fields");
  }
  if (!uploadAnn?.cwl_multipart_files?.includes("avatar")) {
    failures.push("multipart-ann-files");
  }
  const head = (actual34.routes ?? []).find(
    (r) => r.method === "HEAD" && r.path_template === "/api/health",
  );
  if (!head || head.content_class !== "json") failures.push("head-identity-seed");

  const ok = failures.length === 0;
  const report = {
    kind: "chrysalis.cwl.dna-bridge.gate",
    schemaVersion: 4,
    ok,
    rfc: ["0022", "0023"],
    token: ok ? "CWL_DNA_BRIDGE_OK" : "CWL_DNA_BRIDGE_FAIL",
    cwl: CWL,
    cwlSurfaces: CWL34,
    checks: {
      defaultHost: !failures.includes("default-host-seed-mismatch"),
      multiHostApi: !failures.includes("api-host-seed-mismatch"),
      hostsValidation: !failures.includes("unknown-host-should-throw"),
      pathShape: !failures.some((f) => f.startsWith("path-shape")),
      fingerprintDepth: !failures.some((f) => f.includes("fp") || f.includes("nested")),
      statusClasses: !failures.includes("status-classes-health-200"),
      holesBridgeReport: !failures.includes("holes-report-empty"),
      surfacesDeepen: !failures.some((f) =>
        f.startsWith("surfaces-") ||
        f.startsWith("sse-") ||
        f.startsWith("multipart-") ||
        f.startsWith("head-")
      ),
    },
    actualRoutes: actual.routes?.length ?? 0,
    expectedRoutes: expected.routes?.length ?? 0,
    surfacesRoutes: actual34.routes?.length ?? 0,
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
