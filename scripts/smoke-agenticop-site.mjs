#!/usr/bin/env node
/**
 * Prove the AgenticOps public site genome composes without ao-layout.js.
 * Token: CWL_AGENTICOP_SITE_OK
 */
import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parseCwlModule } from "./hub-ingest/cwl-parser.mjs";
import { printCwlModule } from "./hub-ingest/cwl-print.mjs";
import { applyLayoutsToParsedModule, composeLayoutChromeHtml } from "./hub-ingest/cwl-layout.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const FILE = join(ROOT, "fixtures/sites/agenticop-io/site.cwl");

const failures = [];
function fail(message) {
  failures.push(message);
}

const source = readFileSync(FILE, "utf8");
const parsed = parseCwlModule(source, FILE);
if (!parsed?.routes?.length) fail("parse produced no routes");
const printed = printCwlModule(parsed, { header: null });
const again = parseCwlModule(printed, FILE);
const printed2 = printCwlModule(again, { header: null });
if (printed !== printed2) fail("print is not idempotent");

applyLayoutsToParsedModule(parsed);
if (parsed.routes.length !== 26) fail(`expected 26 pages, got ${parsed.routes.length}`);

for (const route of parsed.routes) {
  const html = composeLayoutChromeHtml(route.layoutChromeHtml, route.body?.value ?? "", {
    head: route.headHtml ?? "",
    charset: route.charset,
    viewportDevice: route.viewportDevice,
    title: route.title,
    description: route.description,
    canonical: route.canonical,
    metaCard: route.metaCard,
    icons: route.icons,
    alternates: route.alternates,
    jsonlds: route.jsonlds,
    preconnects: route.preconnects,
    pageName: route.name,
    navId: route.navId,
    links: route.navLinks,
    drawer: route.drawer,
    yearLiteral: route.yearLiteral,
    styles: route.styles,
    images: route.images,
    scripts: route.scripts,
    forms: route.forms,
    hostFirebase: route.hostFirebase,
  });
  const holes = route.attachmentHoles ?? [];
  if (holes.length) fail(`${route.name} holes: ${holes.join(", ")}`);
  if (html.includes("/ao-layout.js")) fail(`${route.name} still loads ao-layout.js`);
  if (html.includes("<!-- cwl:links")) fail(`${route.name} left a links slot`);
  if (html.includes("<!-- cwl:style -->")) fail(`${route.name} left a style slot`);
  if (html.includes("<!-- cwl:image ")) fail(`${route.name} left an image slot`);
  if (html.includes("<!-- cwl:body -->")) fail(`${route.name} left a body slot`);
  if (html.includes("<!-- cwl:head -->")) fail(`${route.name} left a head slot`);
  if (html.includes("<!-- cwl:title -->") || html.includes("<!-- cwl:charset -->") || html.includes("<!-- cwl:viewport -->") || html.includes("<!-- cwl:meta -->") || html.includes("<!-- cwl:icon -->") || html.includes("<!-- cwl:jsonld -->") || html.includes("<!-- cwl:preconnect -->") || html.includes("<!-- cwl:alternate -->")) {
    fail(`${route.name} left a document slot`);
  }
  if (!html.includes('rel="icon"')) fail(`${route.name} missing icon`);
  if (route.icons?.some((icon) => icon.apple) && !html.includes("apple-touch-icon")) fail(`${route.name} missing apple icon`);
  if (route.icons?.length && !route.icons.some((icon) => icon.apple) && html.includes("apple-touch-icon")) {
    fail(`${route.name} invented an apple icon`);
  }
  if (route.jsonlds?.length && !html.includes('type="application/ld+json"')) fail(`${route.name} missing JSON-LD`);
  if (route.metaCard?.og?.title && !html.includes(`property="og:title" content="${route.metaCard.og.title.replace(/&/g, "&amp;").replace(/"/g, "&quot;")}"`)) {
    fail(`${route.name} missing Open Graph title`);
  }
  if (route.metaCard?.robots && !html.includes(`name="robots" content="${route.metaCard.robots.replace(/&/g, "&amp;").replace(/"/g, "&quot;")}"`)) {
    fail(`${route.name} missing robots`);
  }
  if (!route.title || !html.includes(`<title>${route.title.replace(/&/g, "&amp;")}</title>`)) fail(`${route.name} missing title`);
  if (route.charset !== "utf-8" || !html.includes('<meta charset="utf-8" />')) fail(`${route.name} missing charset`);
  if (!route.viewportDevice || !html.includes('content="width=device-width, initial-scale=1"')) fail(`${route.name} missing viewport meta`);
  if (route.description && !html.includes(`content="${route.description.replace(/&/g, "&amp;").replace(/"/g, "&quot;")}"`)) {
    fail(`${route.name} missing description`);
  }
  if (route.canonical && !html.includes(`rel="canonical" href="${route.canonical}"`)) fail(`${route.name} missing canonical`);
  if (!html.includes('rel="stylesheet" href="/agenticops.css"')) fail(`${route.name} missing stylesheet`);
  if (route.layoutName === "site" || route.layoutName === "missing") {
    if (!html.includes('rel="stylesheet" href="/fonts.css"')) fail(`${route.name} missing font stylesheet`);
  }
  if (!html.includes('src="/logo.svg"') && !html.includes('href="/logo.svg"') && !html.includes('href="<!-- cwl:image')) {
    if (!html.includes("/logo.svg")) fail(`${route.name} missing logo path`);
  }
  if (route.layoutName === "site") {
    if (html.includes('data-cwl-drawer="1"')) fail(`${route.name} still injects drawer script`);
    if (html.includes('data-cwl-device="1"') || html.includes("matchMedia")) fail(`${route.name} still injects device script`);
    if (route.yearLiteral !== 2026) fail(`${route.name} year literal is not 2026`);
    if (!html.includes("© 2026") || html.includes("<!-- cwl:year -->")) fail(`${route.name} year literal not filled`);
    if (!html.includes('id="ao-nav-open"') || !html.includes('for="ao-nav-open"')) fail(`${route.name} missing CSS menu checkbox`);
    if (!html.includes("cwl-host")) fail(`${route.name} missing firebase host note`);
    if (!html.includes('id="ao-site-nav"')) fail(`${route.name} missing nav`);
    if (html.includes('id="ao-site-nav"></header>')) fail(`${route.name} nav is empty`);
    if (!html.includes('href="/chrysalis.html"')) fail(`${route.name} missing CWL link`);
    if (html.includes("userAgent") || html.includes("matchMedia")) fail(`${route.name} reads the client`);
    const nav = route.navId || route.name;
    if (!html.includes(`data-ao-page="${nav}"`)) fail(`${route.name} page id is not ${nav}`);
  }
  if (route.name === "home" && !html.includes("is the DNA of the web.")) fail("home heading missing");
  if (route.name === "home" && !html.includes("application/ld+json")) fail("home lost JSON-LD");
  if (route.name === "missing" && html.includes("data-cwl-drawer")) fail("404 gained a drawer");
  if (route.name === "missing" && html.includes('property="og:title"')) fail("404 invented an Open Graph title");
  if (route.name === "contact" && !html.includes("ao-nav-cta ao-nav-link-active")) fail("contact CTA is not active");
  if (/<form[^>]+action="https?:/.test(html)) fail(`${route.name} posts a form off-site`);
}

const report = {
  kind: "chrysalis.cwl.agenticop-site",
  ok: failures.length === 0,
  token: failures.length === 0 ? "CWL_AGENTICOP_SITE_OK" : "CWL_AGENTICOP_SITE_FAIL",
  pages: parsed.routes?.length ?? 0,
  failures,
};
process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
if (report.ok) process.stdout.write("CWL_AGENTICOP_SITE_OK\n");
process.exit(report.ok ? 0 : 1);
