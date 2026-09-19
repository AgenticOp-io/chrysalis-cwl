#!/usr/bin/env node
/**
 * Package gate: @chrysalis/runtime-cwl against language-gold (no convert hub-gold).
 * Token: CWL_RUNTIME_CWL_OK
 */
import { join } from "node:path";
import {
  GOLD_ROOT,
  ROOT,
  RUNTIME_GOLD_CHECKS,
  installRuntimeDepHooks,
  loadRuntimeApi,
  runRuntimeChecks,
} from "./cwl-runtime-smoke-lib.mjs";

/** Core package SoR subset — mirrors former hub-gold coverage on language-gold. */
const PACKAGE_GOLD = [
  "01-literals",
  "04-request-context",
  "07-auth-effects",
  "08-response-content-type",
  "09-fullstack-page",
  "10-page-load",
  "15-html-interpolation",
  "25-island-kinds",
];

installRuntimeDepHooks();
const runtimeApi = await loadRuntimeApi();
/** @type {{ fixture: string, ok: boolean, detail?: string }[]} */
const results = [];

for (const name of PACKAGE_GOLD) {
  const checks = RUNTIME_GOLD_CHECKS[name];
  if (!checks?.length) {
    results.push({ fixture: name, ok: false, detail: "missing RUNTIME_GOLD_CHECKS" });
    continue;
  }
  const cwlPath = join(GOLD_ROOT, name, "routes.cwl");
  try {
    await runRuntimeChecks(cwlPath, checks, runtimeApi);
    results.push({ fixture: name, ok: true });
  } catch (e) {
    results.push({
      fixture: name,
      ok: false,
      detail: e instanceof Error ? e.message : String(e),
    });
  }
}

// RFC-0033: host transport must reach simulateHandler; default stays inconclusive.
{
  const id = "upstream-passthrough";
  try {
    const cwlPath = join(GOLD_ROOT, "43-proxy-upstream/routes.cwl");
    const module = runtimeApi.loadModuleFromCwlFile(cwlPath, ROOT);
    const bare = runtimeApi.createCwlRuntime({ module });
    const bareRes = await bare.fetch({
      method: "GET",
      url: "http://127.0.0.1/api/tower-status",
    });
    if (bareRes.status !== 501) {
      throw new Error(`default upstream expected 501, got ${bareRes.status}`);
    }
    const bareBody = JSON.parse(await bareRes.text());
    if (bareBody.error !== "cwl-runtime:simulation-inconclusive") {
      throw new Error(`default upstream expected inconclusive, got ${JSON.stringify(bareBody)}`);
    }

    /** @type {string[]} */
    const seen = [];
    const withTransport = runtimeApi.createCwlRuntime({
      module,
      upstream: {
        forward({ target, method }) {
          seen.push(`${method} ${target}`);
          return { status: 200, body: '{"ok":true,"from":"stub"}' };
        },
      },
    });
    const okRes = await withTransport.fetch({
      method: "GET",
      url: "http://127.0.0.1/api/tower-status",
    });
    const okText = await okRes.text();
    if (okRes.status !== 200 || okText !== '{"ok":true,"from":"stub"}') {
      throw new Error(`stub upstream expected 200 stub body, got ${okRes.status} ${okText}`);
    }
    if (seen.join("|") !== "GET https://backend-services.internal/tower-status") {
      throw new Error(`stub upstream target mismatch: ${seen.join("|")}`);
    }

    const paramsPath = join(GOLD_ROOT, "45-proxy-upstream-params/routes.cwl");
    const paramsMod = runtimeApi.loadModuleFromCwlFile(paramsPath, ROOT);
    /** @type {string[]} */
    const paramSeen = [];
    const paramsRt = runtimeApi.createCwlRuntime({
      module: paramsMod,
      upstream: {
        forward({ target }) {
          paramSeen.push(target);
          return { status: 202, body: "accepted" };
        },
      },
    });
    const pRes = await paramsRt.fetch({
      method: "GET",
      url: "http://127.0.0.1/api/site/alpha/tower/t7",
    });
    if (pRes.status !== 202 || (await pRes.text()) !== "accepted") {
      throw new Error(`param upstream expected 202 accepted, got ${pRes.status}`);
    }
    if (paramSeen[0] !== "https://backend-services.internal/sites/alpha/towers/t7") {
      throw new Error(`param substitution failed: ${paramSeen[0]}`);
    }

    results.push({ fixture: id, ok: true });
  } catch (e) {
    results.push({
      fixture: id,
      ok: false,
      detail: e instanceof Error ? e.message : String(e),
    });
  }
}

const ok = results.every((r) => r.ok);
const report = {
  kind: "chrysalis.cwl.runtime-cwl.gate",
  schemaVersion: 1,
  ok,
  token: ok ? "CWL_RUNTIME_CWL_OK" : "CWL_RUNTIME_CWL_FAIL",
  root: ROOT,
  results,
  generatedAt: new Date().toISOString(),
};
console.log(JSON.stringify(report, null, 2));
if (ok) console.log("CWL_RUNTIME_CWL_OK");
else process.exit(1);
