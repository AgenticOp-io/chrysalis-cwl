#!/usr/bin/env node
/**
 * Prove the CWL host can emit a static demo site without a Cloud Function.
 * Token: CWL_HOST_SITE_OK
 */
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { emitCwlSite, cwlRoutePathToFile } from "./cwl-emit-site.mjs";
import { assertCwlDemoHostingSite, deployCwlSite, CWL_DEMO_HOSTING_SITE } from "./cwl-deploy-site.mjs";
import { applyCwlHostDocumentTokens } from "./cwl-host-document.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const GOLD = join(ROOT, "fixtures/language-gold/83-host-site-emit/routes.cwl");
const SITE = join(ROOT, "fixtures/sites/agenticop-io/site.cwl");

const failures = [];
function fail(message) {
  failures.push(message);
}
function check(id, ok) {
  if (!ok) fail(id);
}

check("path-root", cwlRoutePathToFile("/") === "index.html");
check("path-html", cwlRoutePathToFile("/about.html") === "about.html");

const hosted = applyCwlHostDocumentTokens(
  '<p>© <!-- cwl:year --></p><!-- cwl:device --><body></body>',
  { year: 2026, devices: ["mobile", "desktop"], below: 820 },
);
check("host-year", hosted.includes("© 2026") && !hosted.includes("<!-- cwl:year -->"));
check("host-device", hosted.includes('data-cwl-device="1"') && hosted.includes("max-width: 820px"));
check("host-no-ua", !hosted.includes("userAgent"));

try {
  assertCwlDemoHostingSite("agenticops");
  fail("forbid-agenticops");
} catch (error) {
  check("forbid-agenticops", String(error.message).includes("cwl:host-site-forbidden"));
}
try {
  assertCwlDemoHostingSite("other-site");
  fail("forbid-other");
} catch (error) {
  check("forbid-other", String(error.message).includes("cwl:host-site-not-demo"));
}
check("allow-demo", assertCwlDemoHostingSite(CWL_DEMO_HOSTING_SITE) === CWL_DEMO_HOSTING_SITE);

const outDir = mkdtempSync(join(tmpdir(), "cwl-host-site-"));
const assetsDir = mkdtempSync(join(tmpdir(), "cwl-host-assets-"));
try {
  writeFileSync(join(assetsDir, "agenticops.css"), "/* demo */\n", "utf8");
  writeFileSync(join(assetsDir, "logo.svg"), "<svg xmlns=\"http://www.w3.org/2000/svg\"/>\n", "utf8");
  const report = await emitCwlSite({ file: GOLD, outDir, assetsDir, year: 2026 });
  check("pages", report.pages === 3);
  const home = readFileSync(join(outDir, "index.html"), "utf8");
  const about = readFileSync(join(outDir, "about.html"), "utf8");
  const missing = readFileSync(join(outDir, "404.html"), "utf8");
  check("home-title", home.includes("<title>Demo Home</title>"));
  check("home-year", home.includes("© 2026") && !home.includes("<!-- cwl:year -->"));
  check("home-device", home.includes('data-cwl-device="1"') && !home.includes("<!-- cwl:device -->"));
  check("home-css-url", home.includes('href="/agenticops.css"'));
  check("home-logo-url", home.includes('src="/logo.svg"'));
  check("about", about.includes("<h1>About</h1>"));
  check("missing", missing.includes("<h1>Missing</h1>"));
  check("assets", report.assets.includes("agenticops.css") && report.assets.includes("logo.svg"));
  check("css-file", readFileSync(join(outDir, "agenticops.css"), "utf8").includes("demo"));
  check("firebase-json", readFileSync(join(outDir, "firebase.json"), "utf8").includes("404.html"));
  const dry = deployCwlSite({ dir: outDir, site: CWL_DEMO_HOSTING_SITE, dryRun: true });
  check("dry-deploy", dry.token === "CWL_HOST_SITE_DEPLOY_DRY_OK");

  const siteOut = mkdtempSync(join(tmpdir(), "cwl-agenticop-emit-"));
  try {
    const siteAssets = resolve(ROOT, "fixtures/sites/agenticop-io/assets");
    const siteReport = await emitCwlSite({
      file: SITE,
      outDir: siteOut,
      assetsDir: siteAssets,
      year: 2026,
    });
    check("site-pages", siteReport.pages === 26);
    const siteHome = readFileSync(join(siteOut, "index.html"), "utf8");
    check("site-no-ao-layout", !siteHome.includes("/ao-layout.js"));
    check("site-year", siteHome.includes("2026") && !siteHome.includes("<!-- cwl:year -->"));
    check(
      "site-device",
      siteHome.includes('data-cwl-device="1"') &&
        siteHome.includes("max-width: 820px") &&
        !siteHome.includes("userAgent"),
    );
    check("site-css", siteHome.includes('href="/agenticops.css"'));
    check("site-404", readFileSync(join(siteOut, "404.html"), "utf8").includes("404"));
  } finally {
    rmSync(siteOut, { recursive: true, force: true });
  }
} finally {
  rmSync(outDir, { recursive: true, force: true });
  rmSync(assetsDir, { recursive: true, force: true });
}

const ok = failures.length === 0;
const report = {
  kind: "chrysalis.cwl.host-site",
  schemaVersion: 1,
  ok,
  token: ok ? "CWL_HOST_SITE_OK" : "CWL_HOST_SITE_FAIL",
  failures,
};
process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
if (ok) process.stdout.write("CWL_HOST_SITE_OK\n");
process.exitCode = ok ? 0 : 1;
