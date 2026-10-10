#!/usr/bin/env node
/**
 * Prove the complete CWL marketing-site contract (tip 1.0.78+; messaging 1.0.80).
 * Token: CWL_SITE_COMPLETE_OK
 */
import { copyFileSync, existsSync, mkdtempSync, mkdirSync, readFileSync, readdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { emitCwlSite, defaultCwlSiteAssetsDir } from "./cwl-emit-site.mjs";
import { assertCwlDemoHostingSite, CWL_DEMO_HOSTING_SITE } from "./cwl-deploy-site.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = join(ROOT, "fixtures/sites/agenticop-io/site.cwl");
const ASSETS = join(ROOT, "fixtures/sites/agenticop-io/assets");
const GOLD = join(ROOT, "fixtures/language-gold/86-site-complete/routes.cwl");
const CONTRACT = join(ROOT, "docs/language/CWL-SITE-COMPLETE.md");

const failures = [];
function fail(message) {
  failures.push(message);
}
function check(id, ok) {
  if (!ok) fail(id);
}

const contract = readFileSync(CONTRACT, "utf8");
check("contract-doc", contract.includes("Complete CWL site") && contract.includes("emit:site"));
check("contract-no-host-js", contract.includes("No host-injected drawer") && contract.includes("year literal"));
check("contract-certified", contract.includes("CWL Certified") && contract.includes("cwl-certified.svg"));
check("default-assets", defaultCwlSiteAssetsDir(SITE) === ASSETS);

const siteSrc = readFileSync(SITE, "utf8");
check("genome-year-literal", siteSrc.includes("year 2026;"));
check("genome-no-year-host", !siteSrc.includes("year host;"));
check("genome-no-device-host", !siteSrc.includes("device host"));
check("genome-no-drawer-stmt", !siteSrc.includes("drawer ao-site-nav"));
check("genome-checkbox", siteSrc.includes('id="ao-nav-open"'));

for (const name of ["agenticops.css", "fonts.css", "logo.svg", "cwl-explainer.png", "cwl-certified.svg"]) {
  check(`asset-${name}`, existsSync(join(ASSETS, name)));
}
check("asset-woff2", readdirSync(join(ASSETS, "fonts")).filter((n) => n.endsWith(".woff2")).length >= 8);
check("css-has-open", readFileSync(join(ASSETS, "agenticops.css"), "utf8").includes(":has(.ao-nav-open:checked)"));

const goldAssets = mkdtempSync(join(tmpdir(), "cwl-site-complete-gold-assets-"));
const goldOut = mkdtempSync(join(tmpdir(), "cwl-site-complete-gold-out-"));
try {
  copyFileSync(join(ASSETS, "agenticops.css"), join(goldAssets, "agenticops.css"));
  copyFileSync(join(ASSETS, "fonts.css"), join(goldAssets, "fonts.css"));
  copyFileSync(join(ASSETS, "logo.svg"), join(goldAssets, "logo.svg"));
  mkdirSync(join(goldAssets, "fonts"), { recursive: true });
  for (const name of readdirSync(join(ASSETS, "fonts")).filter((n) => n.endsWith(".woff2"))) {
    copyFileSync(join(ASSETS, "fonts", name), join(goldAssets, "fonts", name));
  }
  const goldReport = await emitCwlSite({ file: GOLD, outDir: goldOut, assetsDir: goldAssets });
  const home = readFileSync(join(goldOut, "index.html"), "utf8");
  check("gold-pages", goldReport.pages === 2);
  check("gold-year", home.includes("© 2026") && !home.includes("<!-- cwl:year -->"));
  check("gold-checkbox", home.includes('id="ao-nav-open"') && home.includes('for="ao-nav-open"'));
  check("gold-no-drawer-js", !home.includes('data-cwl-drawer="1"'));
  check("gold-no-device-js", !home.includes('data-cwl-device="1"') && !home.includes("matchMedia"));
  check("gold-fonts", existsSync(join(goldOut, "fonts.css")) && existsSync(join(goldOut, "fonts", "dm-sans-latin-400-normal.woff2")));
} finally {
  rmSync(goldAssets, { recursive: true, force: true });
  rmSync(goldOut, { recursive: true, force: true });
}

const siteOut = mkdtempSync(join(tmpdir(), "cwl-site-complete-emit-"));
try {
  const report = await emitCwlSite({ file: SITE, outDir: siteOut });
  check("site-pages", report.pages === 27);
  check("site-missing-none", (report.missingAssets ?? []).length === 0);
  const siteHome = readFileSync(join(siteOut, "index.html"), "utf8");
  check("site-year", siteHome.includes("© 2026") && !siteHome.includes("<!-- cwl:year -->"));
  check("site-checkbox", siteHome.includes('id="ao-nav-open"'));
  check("site-no-drawer-js", !siteHome.includes('data-cwl-drawer="1"'));
  check("site-no-device-js", !siteHome.includes('data-cwl-device="1"') && !siteHome.includes("matchMedia"));
  check("site-no-google", !siteHome.includes("fonts.googleapis.com"));
  check("site-no-ao-layout", !siteHome.includes("/ao-layout.js"));
  check("site-no-hole-slogan", !/honest\s+holes/i.test(siteHome));
  check("site-fonts", existsSync(join(siteOut, "fonts.css")));
  check("site-css", existsSync(join(siteOut, "agenticops.css")));
  check("site-certified-svg", existsSync(join(siteOut, "cwl-certified.svg")));
  check("site-certified-footer", siteHome.includes('class="ao-cwl-certified"') && siteHome.includes("/cwl-certified.html"));
  check("site-certified-page", existsSync(join(siteOut, "cwl-certified.html")));
  const certifiedPage = readFileSync(join(siteOut, "cwl-certified.html"), "utf8");
  check("site-certified-body", certifiedPage.includes("Get CWL Certified") && certifiedPage.includes('src="/cwl-certified.svg"'));
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
  kind: "chrysalis.cwl.site-complete",
  schemaVersion: 1,
  ok,
  token: ok ? "CWL_SITE_COMPLETE_OK" : "CWL_SITE_COMPLETE_FAIL",
  failures,
  note: "Complete marketing site: literal year, CSS menu, owned assets, emit freeze. Deploy stays site/ops.",
};
process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
if (ok) process.stdout.write("CWL_SITE_COMPLETE_OK\n");
process.exitCode = ok ? 0 : 1;
