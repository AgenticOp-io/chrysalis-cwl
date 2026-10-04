#!/usr/bin/env node
/**
 * Prove CWL builds different HTML from the same page as the request and host data change.
 * Token: CWL_DYNAMIC_HTML_OK
 */
import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { renderCwlLiveDocument, startCwlLiveServer } from "./cwl-live-document.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const GOLD = join(ROOT, "fixtures/language-gold/81-dynamic-site/routes.cwl");
const DATA = join(ROOT, "fixtures/language-gold/81-dynamic-site/data.json");
const notes = JSON.parse(readFileSync(DATA, "utf8")).notes;

const failures = [];
function check(id, ok) {
  if (!ok) failures.push(id);
}

const open = renderCwlLiveDocument(GOLD, { path: "/board", query: { view: "today" } }, { data: { notes } });
check("open-status", open.status === 200);
check("open-view", open.body.includes("<p>today</p>"));
check("open-alpha", open.body.includes("<li>Alpha<ul><li>cwl</li><li>html</li></ul></li>"));
check("open-hides-beta", !open.body.includes("Beta"));
check("open-document", open.body.includes("<title>Board</title>") && open.body.includes('<meta charset="utf-8" />'));

const empty = renderCwlLiveDocument(GOLD, { path: "/board", query: { view: "today" } }, { data: { notes: [] } });
check("empty", empty.body.includes("<li>No notes</li>") && !empty.body.includes("Alpha"));

const closed = renderCwlLiveDocument(GOLD, { path: "/board", query: { view: "closed" } }, { data: { notes } });
check("closed", closed.status === 503 && closed.body.includes("<h1>Closed</h1>") && !closed.body.includes("Alpha"));

const unsafe = renderCwlLiveDocument(
  GOLD,
  { path: "/board", query: { view: "today" } },
  { data: { notes: [{ id: "x", title: "<b>", open: true, tags: ["<i>"] }] } },
);
check("escape", unsafe.body.includes("&lt;b&gt;") && unsafe.body.includes("&lt;i&gt;") && !unsafe.body.includes("<li><b>"));

const filtered = renderCwlLiveDocument(
  GOLD,
  { path: "/board" },
  { data: { notes: [{ id: "b", title: "Beta", open: false, tags: [] }] } },
);
check("filter", !filtered.body.includes("Beta") && !filtered.body.includes("No notes"));

function dataFor(request) {
  const id = request.pathParams?.id;
  return { notes, note: notes.find((note) => note.id === id) ?? null };
}

const detail = renderCwlLiveDocument(GOLD, { path: "/notes/a" }, { data: dataFor });
check("detail", detail.status === 200 && detail.body.includes("<h1>Alpha</h1>") && detail.body.includes("<p>a</p>"));

const gone = renderCwlLiveDocument(GOLD, { path: "/notes/missing" }, { data: dataFor });
check("detail-missing", gone.status === 404 && gone.body.includes("<h1>Missing note</h1>"));

const server = await startCwlLiveServer({ file: GOLD, dataPath: DATA, port: 0, year: 2026 });
try {
  const response = await fetch(`http://${server.host}:${server.port}/board?view=today`);
  const text = await response.text();
  check("serve", response.status === 200 && text.includes("Alpha") && !text.includes("Beta"));
  const shut = await fetch(`http://${server.host}:${server.port}/board?view=closed`);
  check("serve-closed", shut.status === 503);
} finally {
  await server.close();
}

const ok = failures.length === 0;
console.log(JSON.stringify({
  kind: "chrysalis.cwl.dynamic-html",
  schemaVersion: 1,
  ok,
  token: ok ? "CWL_DYNAMIC_HTML_OK" : "CWL_DYNAMIC_HTML_FAIL",
  failures,
}, null, 2));
if (ok) console.log("CWL_DYNAMIC_HTML_OK");
process.exitCode = ok ? 0 : 1;
