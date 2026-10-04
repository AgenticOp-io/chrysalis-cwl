#!/usr/bin/env node
/**
 * Prove a CWL page is composed into HTML on each request.
 * Token: CWL_LIVE_DOCUMENT_OK
 */
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { renderCwlLiveDocument, startCwlLiveServer } from "./cwl-live-document.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const GOLD = join(ROOT, "fixtures/language-gold/80-live-document/routes.cwl");
const SITE = join(ROOT, "fixtures/sites/agenticop-io/site.cwl");

const failures = [];
function fail(message) {
  failures.push(message);
}

function check(id, ok) {
  if (!ok) fail(id);
}

const hello = renderCwlLiveDocument(GOLD, { path: "/hello", query: { name: "Ada" } }, { year: 2026 });
check("hello-status", hello.status === 200 && hello.matched);
check("hello-name", hello.body.includes("<h1>Hello Ada</h1>"));
check("hello-title", hello.body.includes("<title>Hello</title>"));
check("hello-year", hello.body.includes("© 2026") && !hello.body.includes("<!-- cwl:year -->"));
check("hello-charset", hello.body.includes('<meta charset="utf-8" />'));

const raw = renderCwlLiveDocument(GOLD, { path: "/hello", query: { name: "<b>" } }, { year: 2026 });
check("escape", raw.body.includes("Hello &lt;b&gt;") && !raw.body.includes("<h1>Hello <b>"));

const doc = renderCwlLiveDocument(GOLD, { path: "/docs/cwl" }, { year: 2026 });
check("param", doc.status === 200 && doc.body.includes("<article>cwl</article>"));

const missing = renderCwlLiveDocument(GOLD, { path: "/nope" }, { year: 2026 });
check("missing", missing.status === 404 && missing.body.includes("<h1>Missing</h1>"));

const held = renderCwlLiveDocument(GOLD, { path: "/hello", query: { name: "Ada" } });
check("year-held", held.body.includes("<!-- cwl:year -->") && !held.body.includes("© 2026"));
check("no-match-media", !hello.body.includes("matchMedia") && !hello.body.includes("userAgent"));

const home = renderCwlLiveDocument(SITE, { path: "/" }, { year: 2026 });
check("site-home", home.status === 200 && home.body.includes("AgenticOps | CWL"));
check("site-icon", home.body.includes('rel="icon"'));
check("site-jsonld", home.body.includes('type="application/ld+json"'));
check("site-no-layout-js", !home.body.includes("/ao-layout.js"));
check("site-year", home.body.includes("2026") && !home.body.includes("<!-- cwl:year -->"));
check("site-device", home.body.includes("<!-- cwl:device -->") && !home.body.includes("matchMedia"));

const siteMissing = renderCwlLiveDocument(SITE, { path: "/not-a-page" }, { year: 2026 });
check("site-404", siteMissing.status === 404 && siteMissing.body.includes("404"));

const server = await startCwlLiveServer({ file: GOLD, port: 0, year: 2026 });
try {
  const response = await fetch(`http://${server.host}:${server.port}/hello?name=Ada`);
  const text = await response.text();
  check("serve-status", response.status === 200);
  check("serve-type", (response.headers.get("content-type") ?? "").includes("text/html"));
  check("serve-body", text.includes("<h1>Hello Ada</h1>"));
} finally {
  await server.close();
}

const ok = failures.length === 0;
const report = {
  kind: "chrysalis.cwl.live-document",
  schemaVersion: 1,
  ok,
  token: ok ? "CWL_LIVE_DOCUMENT_OK" : "CWL_LIVE_DOCUMENT_FAIL",
  failures,
};
console.log(JSON.stringify(report, null, 2));
if (ok) console.log("CWL_LIVE_DOCUMENT_OK");
process.exit(ok ? 0 : 1);
