#!/usr/bin/env node
/**
 * Phase 1.0 publish readiness (does NOT publish).
 * Token: CWL_PUBLISH_PREP_OK
 */
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const checks = [];

function ok(id, cond, detail = "") {
  checks.push({ id, ok: !!cond, detail: detail || undefined });
}

const langMd = readFileSync(join(ROOT, "LANGUAGE_VERSION.md"), "utf8");
const langVer = langMd.match(/\|\s*\*\*Version\*\*\s*\|\s*`([^`]+)`/)?.[1];
const pkg = JSON.parse(readFileSync(join(ROOT, "packages/cwl/package.json"), "utf8"));

ok("version-align", langVer === pkg.version, `${langVer} ≡ ${pkg.version}`);
ok("package-private", pkg.private === true, "must stay private until human opens Exit 1.0");
ok("package-name", pkg.name === "@chrysalis/cwl");
ok("package-exports", !!pkg.exports?.["."]);
ok("package-export-diagnose", pkg.exports?.["./diagnose"] === "./diagnose.mjs");
ok("package-export-lsp-map", pkg.exports?.["./lsp-map"] === "./lsp-map.mjs");
ok("package-bin", !!pkg.bin?.cwl);
ok("publish-doc", existsSync(join(ROOT, "docs/language/CWL-PUBLISH.md")));
ok("private-pillars-doc", existsSync(join(ROOT, "docs/history/PRIVATE-PILLARS.md")));
ok("rfc-0023", existsSync(join(ROOT, "docs/language/CWL-RFC-0023-deploy-dna-profiles.md")));
ok("rfc-0024", existsSync(join(ROOT, "docs/language/CWL-RFC-0024-island-kinds.md")));
ok("lsp-map-module", existsSync(join(ROOT, "scripts/hub-ingest/cwl-lsp-map.mjs")));
const deployPath = join(
  ROOT,
  "fixtures/language-gold/24-dna-bridge/deploy-profile.json",
);
let deployOk = existsSync(deployPath);
let deployDetail = "";
if (deployOk) {
  try {
    const profile = JSON.parse(readFileSync(deployPath, "utf8"));
    deployOk =
      profile.schema === "cwl-deploy-profile-v1" &&
      typeof profile.host === "string" &&
      typeof profile.app_id === "string";
    deployDetail = deployOk
      ? `${profile.app_id}@${profile.host}`
      : "missing schema/host/app_id";
  } catch (e) {
    deployOk = false;
    deployDetail = e instanceof Error ? e.message : String(e);
  }
}
ok("deploy-profile-gold", deployOk, deployDetail);
ok(
  "island-kinds-gold",
  existsSync(join(ROOT, "fixtures/language-gold/25-island-kinds/routes.cwl")),
);

const lang = spawnSync(process.execPath, [join(ROOT, "scripts/gate-cwl-roundtrip.mjs")], {
  cwd: ROOT,
  encoding: "utf8",
  timeout: 120_000,
});
ok("roundtrip-gate", lang.status === 0, `exit=${lang.status}`);

const passed = checks.every((c) => c.ok);
const report = {
  kind: "chrysalis.cwl.publish-prep",
  schemaVersion: 1,
  ok: passed,
  token: passed ? "CWL_PUBLISH_PREP_OK" : "CWL_PUBLISH_PREP_FAIL",
  languageVersion: langVer,
  packageVersion: pkg.version,
  note: "Does not npm publish. Human opens Exit 1.0 per CWL-PUBLISH.md.",
  checks,
  generatedAt: new Date().toISOString(),
};
console.log(JSON.stringify(report, null, 2));
if (passed) console.log("CWL_PUBLISH_PREP_OK");
process.exit(passed ? 0 : 1);
