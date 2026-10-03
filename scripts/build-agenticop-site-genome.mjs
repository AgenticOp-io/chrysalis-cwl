#!/usr/bin/env node
/**
 * Snapshot the public AgenticOps pages into fixtures/sites/agenticop-io/site.cwl.
 * Reads brand/agenticops-web HTML. Does not edit that tree.
 * The committed .cwl is the genome. Re-run this when those pages change.
 */
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = resolve(ROOT, "../..", "brand/agenticops-web");
const OUT = join(ROOT, "fixtures/sites/agenticop-io/site.cwl");

const BG = `<div class="ao-bg-fx" aria-hidden="true">
    <div class="ao-vignette"></div>
    <div class="ao-orb ao-orb-a"></div>
    <div class="ao-orb ao-orb-b"></div>
    <div class="ao-grid"></div>
    <div class="ao-noise"></div>
  </div>`;

const CHROME = `<!DOCTYPE html>
<html lang="en" data-ao-device="<!-- cwl:device -->">
<head>
<!-- cwl:charset -->
<!-- cwl:viewport -->
<!-- cwl:title -->
<!-- cwl:description -->
<!-- cwl:canonical -->
<!-- cwl:head -->
<!-- cwl:style -->
</head>
<body class="ao-page" data-ao-page="<!-- cwl:page -->">
  ${BG}
  <header class="ao-nav" role="banner" id="ao-site-nav">
    <div class="ao-wrap ao-nav-inner">
      <a class="ao-brand" href="/" aria-label="AgenticOps home">
        <img class="ao-brand-mark" src="<!-- cwl:image logo -->" alt="" width="56" height="56" loading="eager" />
        <span class="ao-brand-stack">
          <span class="ao-brand-name">AgenticOps</span>
          <span class="ao-brand-domain">agenticop.io</span>
        </span>
      </a>
      <nav class="ao-nav-links ao-nav-links--desktop" aria-label="Primary">
        <!-- cwl:links primary ao-nav-link ao-nav-link-active -->
      </nav>
      <button type="button" class="ao-nav-toggle" aria-expanded="false" aria-controls="ao-nav-drawer">
        <span class="ao-nav-toggle-bars" aria-hidden="true"><span></span><span></span><span></span></span>
        Menu
      </button>
    </div>
    <div id="ao-nav-drawer" class="ao-nav-drawer">
      <nav class="ao-nav-links ao-nav-links--mobile" aria-label="Mobile">
        <!-- cwl:links primary ao-nav-link ao-nav-link-active -->
      </nav>
    </div>
  </header>
<!-- cwl:body -->
  <footer class="ao-footer" id="ao-site-footer">
    <div class="ao-wrap ao-footer-inner">
      <div class="ao-footer-top">
        <div class="ao-footer-brand-block">
          <a class="ao-footer-brand" href="/" aria-label="AgenticOps home">
            <img class="ao-footer-mark" src="<!-- cwl:image logo -->" alt="" width="48" height="48" loading="lazy" />
            <span class="ao-brand-stack">
              <span class="ao-brand-name ao-brand-name--footer">AgenticOps</span>
              <span class="ao-brand-domain">agenticop.io</span>
            </span>
          </a>
          <p class="ao-footer-tagline">CWL is the DNA of the web. Convert and Secure consume it. Traffic decides.</p>
        </div>
        <div class="ao-footer-cols">
          <nav class="ao-footer-col" aria-label="Chrysalis">
            <p class="ao-footer-col-title">Chrysalis</p>
            <!-- cwl:links chrysalis ao-footer-link ao-footer-link-active -->
          </nav>
          <nav class="ao-footer-col" aria-label="Projects">
            <p class="ao-footer-col-title">Projects</p>
            <!-- cwl:links projects ao-footer-link ao-footer-link-active -->
          </nav>
          <nav class="ao-footer-col" aria-label="Practice">
            <p class="ao-footer-col-title">Practice</p>
            <!-- cwl:links practice ao-footer-link ao-footer-link-active -->
          </nav>
          <nav class="ao-footer-col" aria-label="Elsewhere">
            <p class="ao-footer-col-title">Elsewhere</p>
            <!-- cwl:links elsewhere ao-footer-link ao-footer-link-active -->
          </nav>
        </div>
      </div>
      <div class="ao-footer-bottom">
        <p class="ao-footer-fine">© <!-- cwl:year --> AgenticOps. CWL tip 1.0.26 is public — Convert and Secure consume it; traffic decides what ships.</p>
      </div>
    </div>
  </footer>
</body>
</html>`;

const MISSING_CHROME = `<!DOCTYPE html>
<html lang="en">
<head>
<!-- cwl:charset -->
<!-- cwl:viewport -->
<!-- cwl:title -->
<!-- cwl:description -->
<!-- cwl:canonical -->
<!-- cwl:head -->
<!-- cwl:style -->
</head>
<body class="ao-page">
  ${BG}
<!-- cwl:body -->
</body>
</html>`;

function assertBlockSafe(label, text) {
  for (const line of text.split("\n")) {
    if (line.trim() === '""";') throw new Error(`${label} contains a CWL html closer`);
  }
}

function inner(html, open, close) {
  const start = html.indexOf(open);
  const end = html.indexOf(close);
  if (start < 0 || end < 0 || end < start) return null;
  return html.slice(start + open.length, end);
}

function pageName(file) {
  if (file === "index.html") return "home";
  if (file === "404.html") return "missing";
  return file.replace(/\.html$/, "").replace(/-/g, "_");
}

function pagePath(file) {
  if (file === "index.html") return "/";
  return `/${file}`;
}

function decodeEntities(value) {
  return value
    .replace(/&middot;/g, "·")
    .replace(/&mdash;/g, "—")
    .replace(/&ndash;/g, "–")
    .replace(/&rarr;/g, "→")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'");
}

function takeDocumentFacts(head) {
  let title = null;
  let description = null;
  let canonical = null;
  const kept = [];
  for (const line of head.split("\n")) {
    const t = line.trim();
    const titleMatch = /^<title>([\s\S]*)<\/title>$/i.exec(t);
    if (titleMatch) {
      title = decodeEntities(titleMatch[1]);
      continue;
    }
    if (/^<meta\s+charset=/i.test(t)) continue;
    if (/<meta\s+[^>]*name=["']viewport["']/i.test(t)) continue;
    const described =
      /<meta\s+[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i.exec(t) ||
      /<meta\s+[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i.exec(t);
    if (described) {
      description = decodeEntities(described[1]);
      continue;
    }
    const canon =
      /<link\s+[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i.exec(t) ||
      /<link\s+[^>]*href=["']([^"']+)["'][^>]*rel=["']canonical["']/i.exec(t);
    if (canon) {
      canonical = canon[1];
      continue;
    }
    kept.push(line);
  }
  return { title, description, canonical, head: kept.join("\n").trim() };
}

function cleanHead(head) {
  const facts = takeDocumentFacts(head);
  const lines = facts.head.split("\n").filter((line) => line && !/href=["']\/agenticops\.css["']/.test(line));
  return { ...facts, head: lines.join("\n").replaceAll('href="/logo.svg"', 'href="<!-- cwl:image logo -->"').trim() };
}

function betweenHeaderAndFooter(html) {
  const headerEnd = html.indexOf("</header>");
  const footerAt = html.indexOf("<footer");
  if (headerEnd < 0 || footerAt < 0) return null;
  return html.slice(headerEnd + "</header>".length, footerAt).replace(/\s*<script src="\/ao-layout\.js" defer><\/script>\s*/g, "\n");
}

function extractMain(html) {
  const start = html.indexOf("<main");
  const end = html.lastIndexOf("</main>");
  if (start < 0 || end < 0) return null;
  return html.slice(start, end + "</main>".length);
}

const files = readdirSync(SITE)
  .filter((name) => name.endsWith(".html"))
  .sort((a, b) => pagePath(a).localeCompare(pagePath(b)));

const pages = [];
for (const file of files) {
  const html = readFileSync(join(SITE, file), "utf8");
  const headRaw = inner(html, "<head>", "</head>");
  if (headRaw == null) throw new Error(`${file} has no head`);
  const facts = cleanHead(headRaw);
  const head = facts.head;
  if (!facts.title) throw new Error(`${file} has no title`);
  const nav = /data-ao-page="([^"]+)"/.exec(html)?.[1] ?? "";
  const isMissing = file === "404.html";
  if (!isMissing && !nav) throw new Error(`${file} has no data-ao-page`);
  const body = (isMissing ? extractMain(html) : betweenHeaderAndFooter(html))?.trim();
  if (!body) throw new Error(`${file} has no body`);
  if (body.includes("/ao-layout.js")) throw new Error(`${file} still names ao-layout.js`);
  assertBlockSafe(file, head);
  assertBlockSafe(file, body);
  pages.push({
    file,
    name: pageName(file),
    path: pagePath(file),
    nav,
    head,
    body,
    title: facts.title,
    description: facts.description,
    canonical: facts.canonical,
    layout: isMissing ? "missing" : "site",
  });
}

const lines = [];
lines.push("# AgenticOps public site genome. Page source is CWL. Emit produces the page.");
lines.push("# Host files stay host files: CSS bytes, image bytes, and Firebase deploy are not in this module.");
lines.push("# The menu is drawer. This genome does not load ao-layout.js.");
lines.push("module agenticop_site;");
lines.push("");
lines.push("layout site {");
lines.push("  year host;");
lines.push("  charset utf-8;");
lines.push("  viewport device;");
lines.push("  device host mobile desktop below 820;");
lines.push("  drawer ao-site-nav toggle ao-nav-toggle class is-open panel ao-nav-drawer;");
lines.push('  style "/agenticops.css";');
lines.push('  image logo "/logo.svg";');
lines.push('  host firebase "agenticops" public "." error "/404.html";');
lines.push("  links primary;");
lines.push('  link home "/" "Home";');
lines.push('  link chrysalis "/chrysalis.html" "CWL";');
lines.push('  link convert "/convert.html" "Convert";');
lines.push('  link secure "/secure.html" "Secure";');
lines.push('  link docs "/docs.html" "Docs";');
lines.push('  link published "/published.html" "Published";');
lines.push('  link press "/press.html" "Press";');
lines.push('  link about "/about.html" "About";');
lines.push('  link contact "/contact.html" "Start a Pilot" class ao-nav-cta;');
lines.push("  links chrysalis;");
lines.push('  link chrysalis "/chrysalis.html" "CWL";');
lines.push('  link convert "/convert.html" "Convert";');
lines.push('  link secure "/secure.html" "Secure";');
lines.push('  link docs "/docs.html" "Docs";');
lines.push('  link whitepaper "/whitepaper.html" "System overview";');
lines.push("  links projects;");
lines.push('  link projects "/projects.html" "Catalog";');
lines.push('  link published "/published.html" "Published links";');
lines.push('  link press "/press.html" "Press";');
lines.push('  link wptp "/wptp.html" "WPTP";');
lines.push('  link fde "/fde.html" "FDE";');
lines.push('  link ghosts "/ghosts.html" "Ghost Museum";');
lines.push('  link hub "/hub.html" "Hostnames";');
lines.push("  links practice;");
lines.push('  link method "/method.html" "Method";');
lines.push('  link proof "/proof.html" "Proof";');
lines.push('  link services "/services.html" "Services";');
lines.push('  link trust "/trust.html" "Trust";');
lines.push('  link about "/about.html" "About";');
lines.push('  link contact "/contact.html" "Contact";');
lines.push("  links elsewhere;");
lines.push('  link github "https://github.com/AgenticOp-io" "GitHub org" target blank rel noopener;');
lines.push('  link pypi "https://pypi.org/project/fragility-engine/" "PyPI · FDE" target blank rel noopener;');
lines.push('  link zenodo "https://doi.org/10.5281/zenodo.20455688" "Zenodo · FEL" target blank rel noopener;');
lines.push('  link demo "https://hub.agenticop.io/" "Demo hub" target blank rel noopener;');
lines.push('  link linkedin "https://www.linkedin.com/in/vibe-architect/" "LinkedIn" target blank rel noopener;');
lines.push("  chrome html \"\"\"");
lines.push(CHROME);
lines.push("  \"\"\";");
lines.push("}");
lines.push("");
lines.push("layout missing {");
lines.push("  charset utf-8;");
lines.push("  viewport device;");
lines.push('  style "/agenticops.css";');
lines.push('  image logo "/logo.svg";');
lines.push("  chrome html \"\"\"");
lines.push(MISSING_CHROME);
lines.push("  \"\"\";");
lines.push("}");
lines.push("");

for (const page of pages) {
  lines.push(`@page GET "${page.path}"`);
  lines.push(`page ${page.name} {`);
  lines.push("  effects: none;");
  if (page.nav) lines.push(`  nav ${page.nav};`);
  lines.push(`  layout ${page.layout};`);
  if (page.title) lines.push(`  title ${JSON.stringify(page.title)};`);
  if (page.description) lines.push(`  description ${JSON.stringify(page.description)};`);
  if (page.canonical) lines.push(`  canonical ${JSON.stringify(page.canonical)};`);
  if (page.head) {
    lines.push("  head html \"\"\"");
    lines.push(page.head);
    lines.push("  \"\"\";");
  }
  lines.push("  return html \"\"\"");
  lines.push(page.body);
  lines.push("  \"\"\";");
  lines.push("}");
  lines.push("");
}

assertBlockSafe("chrome", CHROME);
assertBlockSafe("missing", MISSING_CHROME);
mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, `${lines.join("\n")}\n`);
process.stdout.write(`wrote ${pages.length} pages → ${OUT}\n`);
