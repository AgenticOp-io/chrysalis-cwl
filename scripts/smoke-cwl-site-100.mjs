#!/usr/bin/env node
/**
 * Prove the agenticop.io 100% CWL contract.
 * Token: CWL_SITE_100_OK
 */
import { existsSync, mkdtempSync, readFileSync, rmSync, copyFileSync, mkdirSync, readdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { emitCwlSite, defaultCwlSiteAssetsDir } from "./cwl-emit-site.mjs";
import { assertCwlDemoHostingSite, CWL_DEMO_HOSTING_SITE } from "./cwl-deploy-site.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = join(ROOT, "fixtures/sites/agenticop-io/site.cwl");
const ASSETS = join(ROOT, "fixtures/sites/agenticop-io/assets");
const GOLD84 = join(ROOT, "fixtures/language-gold/84-site-100-contract/routes.cwl");
const GOLD85 = join(ROOT, "fixtures/language-gold/85-site-owned-fonts/routes.cwl");
const CONTRACT = join(ROOT, "docs/language/CWL-SITE-100.md");

const failures = [];
function fail(message) {
  failures.push(message);
}
function check(id, ok) {
  if (!ok) fail(id);
}

check("contract-doc", existsSync(CONTRACT) && readFileSync(CONTRACT, "utf8").includes("Certified freeze"));
check("contract-owned-fonts", readFileSync(CONTRACT, "utf8").includes("/fonts.css"));
check("default-assets", defaultCwlSiteAssetsDir(SITE) === ASSETS);
for (const name of [
  "agenticops.css",
  "fonts.css",
  "logo.svg",
  "cwl-explainer.png",
  "chrysalis-explainer.png",
  "helix-explainer.png",
  "linkedin-cwl-release.png",
]) {
  check(`asset-${name}`, existsSync(join(ASSETS, name)));
}
const fontFaces = readdirSync(join(ASSETS, "fonts")).filter((n) => n.endsWith(".woff2"));
check("asset-font-faces", fontFaces.length >= 8);

const goldAssets = mkdtempSync(join(tmpdir(), "cwl-site-100-gold-assets-"));
const goldOut = mkdtempSync(join(tmpdir(), "cwl-site-100-gold-out-"));
try {
  copyFileSync(join(ASSETS, "agenticops.css"), join(goldAssets, "agenticops.css"));
  copyFileSync(join(ASSETS, "logo.svg"), join(goldAssets, "logo.svg"));
  copyFileSync(join(ASSETS, "cwl-explainer.png"), join(goldAssets, "cwl-explainer.png"));
  const goldReport = await emitCwlSite({ file: GOLD84, outDir: goldOut, assetsDir: goldAssets, year: 2026 });
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

const fontsAssets = mkdtempSync(join(tmpdir(), "cwl-site-100-fonts-assets-"));
const fontsOut = mkdtempSync(join(tmpdir(), "cwl-site-100-fonts-out-"));
try {
  copyFileSync(join(ASSETS, "fonts.css"), join(fontsAssets, "fonts.css"));
  copyFileSync(join(ASSETS, "agenticops.css"), join(fontsAssets, "agenticops.css"));
  copyFileSync(join(ASSETS, "logo.svg"), join(fontsAssets, "logo.svg"));
  mkdirSync(join(fontsAssets, "fonts"), { recursive: true });
  for (const name of fontFaces) {
    copyFileSync(join(ASSETS, "fonts", name), join(fontsAssets, "fonts", name));
  }
  const fontsReport = await emitCwlSite({ file: GOLD85, outDir: fontsOut, assetsDir: fontsAssets, year: 2026 });
  const fontsHome = readFileSync(join(fontsOut, "index.html"), "utf8");
  check("gold85-pages", fontsReport.pages === 2);
  check("gold85-fonts-css", fontsHome.includes("/fonts.css") && existsSync(join(fontsOut, "fonts.css")));
  check("gold85-woff2", existsSync(join(fontsOut, "fonts", "dm-sans-latin-400-normal.woff2")));
  check("gold85-no-google", !fontsHome.includes("fonts.googleapis.com") && !fontsHome.includes("fonts.gstatic.com"));
} finally {
  rmSync(fontsAssets, { recursive: true, force: true });
  rmSync(fontsOut, { recursive: true, force: true });
}

const siteOut = mkdtempSync(join(tmpdir(), "cwl-site-100-emit-"));
try {
  const report = await emitCwlSite({ file: SITE, outDir: siteOut, year: 2026 });
  check("site-pages", report.pages === 26);
  check("site-assets-dir", report.assetsDir === ASSETS);
  check("site-css", report.assets.includes("agenticops.css"));
  check("site-fonts-css", report.assets.includes("fonts.css"));
  check("site-font-face", report.assets.includes("fonts/dm-sans-latin-400-normal.woff2"));
  check("site-logo", report.assets.includes("logo.svg"));
  check("site-explainer", report.assets.includes("cwl-explainer.png"));
  check("site-missing-none", (report.missingAssets ?? []).length === 0);
  const siteHome = readFileSync(join(siteOut, "index.html"), "utf8");
  check("site-no-ao-layout", !siteHome.includes("/ao-layout.js"));
  check("site-year", siteHome.includes("2026") && !siteHome.includes("<!-- cwl:year -->"));
  check("site-complete-no-device-js", !siteHome.includes('data-cwl-device="1"') && !siteHome.includes("matchMedia"));
  check("site-complete-no-drawer-js", !siteHome.includes('data-cwl-drawer="1"'));
  check("site-complete-checkbox", siteHome.includes('id="ao-nav-open"'));
  check("site-owned-font", siteHome.includes("/fonts.css"));
  check("site-no-google-font", !siteHome.includes("fonts.googleapis.com") && !siteHome.includes("fonts.gstatic.com"));
  check("site-css-bytes", existsSync(join(siteOut, "agenticops.css")));
  check("site-woff2-bytes", existsSync(join(siteOut, "fonts", "dm-sans-latin-400-normal.woff2")));
  check("forbid-live-deploy", (() => {
    try {
      assertCwlDemoHostingSite("agenticops");
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
  note: "Owned fonts under assets/fonts. Live Firebase CLI remains ops outside language bytes (see CWL-SITE-100.md).",
};
process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
if (ok) process.stdout.write("CWL_SITE_100_OK\n");
process.exitCode = ok ? 0 : 1;
