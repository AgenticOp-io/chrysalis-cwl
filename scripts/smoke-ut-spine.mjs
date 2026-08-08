#!/usr/bin/env node
/**
 * UT ↔ Helix spine (CWL owns language side; Helix dispose when Secure present).
 *
 * Always: RFC-0022 DNA contract gate (24-dna-bridge).
 * When sibling chrysalis-security present: seed → strip → promote → compare ⊆ DNA → enforce.
 *
 * Convert does NOT own this — see CWL-PILLAR-HOME / THREE_PILLARS.
 * Token: UT_SPINE_OK
 */
import { spawnSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
  rmSync,
} from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = join(ROOT, "reports/ut-spine");
const ARTIFACT_DIR = join(OUT_DIR, "artifacts");
const OUT_JSON = join(OUT_DIR, "ut-spine.json");
const GOLD = join(ROOT, "fixtures/language-gold/24-dna-bridge/routes.cwl");
const DEPLOY_PROFILE = join(
  ROOT,
  "fixtures/language-gold/24-dna-bridge/deploy-profile.json",
);

function resolveSecureRoot() {
  if (process.env.CHRYSALIS_SECURITY_ROOT) {
    return resolve(process.env.CHRYSALIS_SECURITY_ROOT);
  }
  return resolve(ROOT, "..", "chrysalis-security");
}

function fileUrl(p) {
  return pathToFileURL(resolve(p)).href;
}

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

export async function runUtSpine(opts = {}) {
  /** @type {Array<{ id: string, ok: boolean, detail?: string }>} */
  const steps = [];
  const generatedAt = new Date().toISOString();
  const secureRoot = resolveSecureRoot();

  steps.push({
    id: "cwl-gold",
    ok: existsSync(GOLD),
    detail: existsSync(GOLD)
      ? GOLD.replace(/\\/g, "/")
      : "missing fixtures/language-gold/24-dna-bridge/routes.cwl",
  });

  /** @type {{ schema?: string, app_id?: string, host?: string } | null} */
  let deployProfile = null;
  if (existsSync(DEPLOY_PROFILE)) {
    try {
      deployProfile = JSON.parse(readFileSync(DEPLOY_PROFILE, "utf8"));
    } catch {
      deployProfile = null;
    }
  }
  const profileOk =
    !!deployProfile &&
    deployProfile.schema === "cwl-deploy-profile-v1" &&
    typeof deployProfile.host === "string";
  steps.push({
    id: "cwl-deploy-profile",
    ok: profileOk || !existsSync(DEPLOY_PROFILE),
    detail: profileOk
      ? `RFC-0023 ${deployProfile.host}`
      : existsSync(DEPLOY_PROFILE)
        ? "invalid deploy-profile.json"
        : "absent — host default",
  });

  // Always: language contract (no Helix required)
  const gateScript = join(ROOT, "scripts/gate-cwl-dna-bridge.mjs");
  const gate = spawnSync(process.execPath, [gateScript], {
    cwd: ROOT,
    encoding: "utf8",
    env: process.env,
    timeout: 60_000,
  });
  const gateOk = gate.status === 0;
  steps.push({
    id: "cwl-dna-bridge-contract",
    ok: gateOk,
    detail: gateOk
      ? "RFC-0022 expected-dna.json"
      : (gate.stderr || gate.stdout || `exit=${gate.status}`).slice(-500),
  });

  const securePresent = existsSync(
    join(secureRoot, "packages/cwl-bridge/index.mjs"),
  );
  steps.push({
    id: "secure-pillar",
    ok: true,
    detail: securePresent
      ? secureRoot.replace(/\\/g, "/")
      : "SKIP Helix cutover — set CHRYSALIS_SECURITY_ROOT or sibling chrysalis-security",
  });

  let helix = {
    ok: !securePresent, // skip = soft ok for language-only CI
    skipped: !securePresent,
    cutover: null,
    token: null,
    detail: securePresent ? "not-run" : "secure-absent",
  };

  if (securePresent && steps.every((s) => s.ok)) {
    try {
      rmSync(ARTIFACT_DIR, { recursive: true, force: true });
      mkdirSync(ARTIFACT_DIR, { recursive: true });

      const bridge = await import(
        fileUrl(join(secureRoot, "packages/cwl-bridge/index.mjs"))
      );
      const dna = await import(
        fileUrl(join(secureRoot, "packages/dna-core/index.mjs"))
      );

      const seedHost =
        typeof deployProfile?.host === "string" ? deployProfile.host : "default";
      const seedAppId =
        typeof deployProfile?.app_id === "string"
          ? deployProfile.app_id
          : "ut-spine";
      const seeded = await bridge.seedDnaFromCwlFile(GOLD, {
        app_id: seedAppId,
        host: seedHost,
        mode: "draft",
        fixture: "fixtures/language-gold/24-dna-bridge/routes.cwl",
        cwlRoot: ROOT,
      });
      assert(seeded.schema === "app-dna-v1", "schema app-dna-v1");
      assert(seeded.bridge?.kind === "cwl-surface-seed", "bridge envelope");
      writeFileSync(
        join(ARTIFACT_DIR, "seeded.dna.json"),
        `${JSON.stringify(seeded, null, 2)}\n`,
      );

      const stripped = bridge.stripBridgeEnvelope(seeded);
      assert(!("bridge" in stripped), "bridge stripped");

      const LAB_KEY = "helix-lab-ut-spine-key-v1";
      const LAB_KEY_ID = "lab";
      let certified = {
        ...stripped,
        mode: "certified",
        created_at: generatedAt,
      };
      certified = dna.signDna(certified, {
        secret: LAB_KEY,
        key_id: LAB_KEY_ID,
      });
      const verified = dna.verifyDna(certified, {
        secret: LAB_KEY,
        key_id: LAB_KEY_ID,
        require: true,
      });
      assert(verified.ok === true, `DNA verify: ${JSON.stringify(verified)}`);
      writeFileSync(
        join(ARTIFACT_DIR, "certified.dna.json"),
        `${JSON.stringify(certified, null, 2)}\n`,
      );
      steps.push({ id: "helix-promote-sign", ok: true });

      const cmp = bridge.compareCwlSurfaceToDna(seeded, certified);
      assert(cmp.ok === true, `compare failed: ${JSON.stringify(cmp)}`);
      assert(
        cmp.cutover === "cwl_surface_subseteq_dna",
        `cutover label: ${cmp.cutover}`,
      );
      steps.push({
        id: "helix-compare-cwl",
        ok: true,
        detail: "cwl_surface_subseteq_dna",
      });

      const known = dna.scoreRequest(certified, {
        method: "GET",
        path: "/api/health",
        host: seedHost,
      });
      assert(known.allow === true, `known deny: ${JSON.stringify(known)}`);
      const unknown = dna.scoreRequest(certified, {
        method: "GET",
        path: "/api/backdoor",
        host: seedHost,
      });
      assert(unknown.allow === false, "unknown must deny");
      steps.push({ id: "helix-enforce", ok: true });

      const cutoverScript = join(secureRoot, "scripts/cutover-smoke.mjs");
      if (existsSync(cutoverScript)) {
        const r = spawnSync(process.execPath, [cutoverScript], {
          cwd: secureRoot,
          encoding: "utf8",
          env: { ...process.env, CHRYSALIS_CWL_ROOT: ROOT },
          timeout: 120_000,
        });
        const tokenOk =
          r.status === 0 && /CUTOVER_SMOKE_OK/.test(r.stdout || "");
        steps.push({
          id: "secure-cutover-smoke",
          ok: tokenOk,
          detail: tokenOk
            ? "CUTOVER_SMOKE_OK"
            : (r.stderr || r.stdout || "").slice(-400),
        });
      }

      helix = {
        ok: true,
        skipped: false,
        cutover: "cwl_surface_subseteq_dna",
        token: "UT_SPINE_OK",
        detail: "CWL gold → Helix cutover + enforce",
      };
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      steps.push({ id: "helix-cutover", ok: false, detail: msg });
      helix = {
        ok: false,
        skipped: false,
        cutover: null,
        token: null,
        detail: msg,
      };
    }
  }

  const hardOk = steps
    .filter((s) => s.id !== "secure-pillar")
    .every((s) => s.ok);
  const ok = hardOk && helix.ok === true;
  const report = {
    kind: "chrysalis.cwl.ut-spine",
    schemaVersion: 1,
    ok,
    token: ok ? "UT_SPINE_OK" : "UT_SPINE_FAIL",
    owner: "chrysalis-cwl",
    invariant:
      "CWL owns surface contract; Helix disposes DNA; Convert does not own this spine",
    loop: [
      "CWL language gold (24-dna-bridge)",
      "RFC-0022 contract gate",
      "Helix seed → strip → promote → compare ⊆ DNA → enforce (when Secure present)",
    ],
    pillars: {
      cwl: ROOT.replace(/\\/g, "/"),
      secure: secureRoot.replace(/\\/g, "/"),
    },
    steps,
    helix,
    artifacts: ARTIFACT_DIR.replace(/\\/g, "/"),
    generatedAt,
  };

  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(OUT_JSON, `${JSON.stringify(report, null, 2)}\n`);
  return report;
}

async function main() {
  const requireHelix =
    process.argv.includes("--require-helix") ||
    process.env.CHRYSALIS_UT_SPINE_REQUIRE_HELIX === "1";
  const r = await runUtSpine();
  if (requireHelix && r.helix?.skipped) {
    r.ok = false;
    r.token = "UT_SPINE_FAIL";
    r.helix.detail = "Helix required (--require-helix) but Secure absent";
  }
  console.log(JSON.stringify(r, null, 2));
  if (r.ok) console.log("UT_SPINE_OK");
  if (!r.ok) process.exit(1);
}

if (process.argv[1]?.includes("smoke-ut-spine")) {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
