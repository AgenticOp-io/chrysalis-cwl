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
    pageName: route.name,
    navId: route.navId,
    links: route.navLinks,
    drawer: route.drawer,
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
  if (!html.includes('rel="stylesheet" href="/agenticops.css"')) fail(`${route.name} missing stylesheet`);
  if (!html.includes('src="/logo.svg"') && !html.includes('href="/logo.svg"') && !html.includes('href="<!-- cwl:image')) {
    if (!html.includes("/logo.svg")) fail(`${route.name} missing logo path`);
  }
  if (route.layoutName === "site") {
    if (!html.includes('data-cwl-drawer="1"')) fail(`${route.name} missing drawer script`);
    if (!html.includes("<!-- cwl:year -->")) fail(`${route.name} missing year token`);
    if (!html.includes("<!-- cwl:device -->")) fail(`${route.name} missing device token`);
    if (route.deviceHost?.below !== 820) fail(`${route.name} device cut is not 820`);
    if (html.includes("matchMedia")) fail(`${route.name} evaluates a media query`);
    if (!html.includes("cwl-host")) fail(`${route.name} missing firebase host note`);
    if (!html.includes('id="ao-site-nav"')) fail(`${route.name} missing nav`);
    if (html.includes('id="ao-site-nav"></header>')) fail(`${route.name} nav is empty`);
    if (!html.includes('href="/chrysalis.html"')) fail(`${route.name} missing CWL link`);
    if (html.includes("userAgent") || html.includes("matchMedia")) fail(`${route.name} reads the client`);
    const nav = route.navId || route.name;
    if (!html.includes(`data-ao-page="${nav}"`)) fail(`${route.name} page id is not ${nav}`);
  }
  if (route.name === "home" && !html.includes("is the DNA of the web.")) fail("home heading missing");
  if (route.name === "missing" && html.includes("data-cwl-drawer")) fail("404 gained a drawer");
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
