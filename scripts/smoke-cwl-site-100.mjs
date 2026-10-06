#!/usr/bin/env node
/**
 * Prove the agenticop.io 100% CWL contract.
 * Token: CWL_SITE_100_OK
 */
import { existsSync, mkdtempSync, readFileSync, rmSync, copyFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { emitCwlSite, defaultCwlSiteAssetsDir } from "./cwl-emit-site.mjs";
import { assertCwlDemoHostingSite, CWL_DEMO_HOSTING_SITE } from "./cwl-deploy-site.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = join(ROOT, "fixtures/sites/agenticop-io/site.cwl");
const ASSETS = join(ROOT, "fixtures/sites/agenticop-io/assets");
const GOLD = join(ROOT, "fixtures/language-gold/84-site-100-contract/routes.cwl");
const CONTRACT = join(ROOT, "docs/language/CWL-SITE-100.md");

const failures = [];
function fail(message) {
  failures.push(message);
}
function check(id, ok) {
  if (!ok) fail(id);
}

check("contract-doc", existsSync(CONTRACT) && readFileSync(CONTRACT, "utf8").includes("Certified freeze"));
check("default-assets", defaultCwlSiteAssetsDir(SITE) === ASSETS);
for (const name of [
  "agenticops.css",
  "logo.svg",
  "cwl-explainer.png",
  "chrysalis-explainer.png",
  "helix-explainer.png",
  "linkedin-cwl-release.png",
]) {
  check(`asset-${name}`, existsSync(join(ASSETS, name)));
}

const goldAssets = mkdtempSync(join(tmpdir(), "cwl-site-100-gold-assets-"));
const goldOut = mkdtempSync(join(tmpdir(), "cwl-site-100-gold-out-"));
try {
  copyFileSync(join(ASSETS, "agenticops.css"), join(goldAssets, "agenticops.css"));
  copyFileSync(join(ASSETS, "logo.svg"), join(goldAssets, "logo.svg"));
  copyFileSync(join(ASSETS, "cwl-explainer.png"), join(goldAssets, "cwl-explainer.png"));
  const goldReport = await emitCwlSite({ file: GOLD, outDir: goldOut, assetsDir: goldAssets, year: 2026 });
  const home = readFileSync(join(goldOut, "index.html"), "utf8");
  check("gold-pages", goldReport.pages === 2);
  check("gold-year", home.includes("© 2026") && !home.includes("<!-- cwl:year -->"));
  check("gold-device", home.includes('data-cwl-device="1"') && home.includes("max-width: 820px"));
  check("gold-drawer", home.includes('data-cwl-drawer="1"'));
  check("gold-no-ao-layout", !home.includes("/ao-layout.js"));
  check("gold-css-file", existsSync(join(goldOut, "agenticops.css")));
  check("gold-png", existsSync(join(goldOut, "cwl-explainer.png")));
  check("gold-no-ua", !home.includes("userAgent"));
} finally {
  rmSync(goldAssets, { recursive: true, force: true });
  rmSync(goldOut, { recursive: true, force: true });
}

const siteOut = mkdtempSync(join(tmpdir(), "cwl-site-100-emit-"));
try {
  const report = await emitCwlSite({ file: SITE, outDir: siteOut, year: 2026 });
  check("site-pages", report.pages === 26);
  check("site-assets-dir", report.assetsDir === ASSETS);
  check("site-css", report.assets.includes("agenticops.css"));
  check("site-logo", report.assets.includes("logo.svg"));
  check("site-explainer", report.assets.includes("cwl-explainer.png"));
  check("site-missing-none", (report.missingAssets ?? []).length === 0);
  const siteHome = readFileSync(join(siteOut, "index.html"), "utf8");
  check("site-no-ao-layout", !siteHome.includes("/ao-layout.js"));
  check("site-year", siteHome.includes("2026") && !siteHome.includes("<!-- cwl:year -->"));
  check("site-device", siteHome.includes('data-cwl-device="1"'));
  check("site-drawer", siteHome.includes('data-cwl-drawer="1"'));
  check("site-offsite-font", siteHome.includes("fonts.googleapis.com"));
  check("site-css-bytes", existsSync(join(siteOut, "agenticops.css")));
  check("forbid-live-deploy", (() => {
    try {
      assertCwlDemoHostingSite("agenticops");
      return false;
    } catch (error) {
      return String(error.message).includes("cwl:host-site-forbidden");
    }
  })());
  check("allow-demo-deploy", assertCwlDemoHostingSite(CWL_DEMO_HOSTING_SITE) === CWL_DEMO_HOSTING_SITE);
} finally {
  rmSync(siteOut, { recursive: true, force: true });
}

const ok = failures.length === 0;
const report = {
  kind: "chrysalis.cwl.site-100",
  schemaVersion: 1,
  ok,
  token: ok ? "CWL_SITE_100_OK" : "CWL_SITE_100_FAIL",
  failures,
  note: "Off-site Google Fonts and live Firebase CLI remain outside language bytes (see CWL-SITE-100.md).",
};
process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
if (ok) process.stdout.write("CWL_SITE_100_OK\n");
process.exitCode = ok ? 0 : 1;
