/**
 * Prove a CWL page reads and writes rows through bound operations.
 * Token: CWL_DATABASE_OK
 */
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parseCwlModule } from "./hub-ingest/cwl-parser.mjs";
import { canonicalizeCwlModule, printCwlModule } from "./hub-ingest/cwl-print.mjs";
import { CWL_DB_DRIVER, CWL_DB_ENGINES } from "./hub-ingest/cwl-db.mjs";
import { compileInsert, compileSelect, placeholder, quoteIdent } from "./cwl-db-sql.mjs";
import { openCwlDatabase } from "./cwl-db-host.mjs";
import { renderCwlLiveDocument, startCwlLiveServer } from "./cwl-live-document.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const GOLD = join(ROOT, "fixtures/language-gold/82-database/routes.cwl");

const failures = [];
function check(id, ok) {
  if (!ok) failures.push(id);
}

const parsed = parseCwlModule(readFileSync(GOLD, "utf8"), GOLD);
const again = canonicalizeCwlModule(parseCwlModule(printCwlModule(parsed, { header: null }), GOLD));
check("roundtrip", JSON.stringify(canonicalizeCwlModule(parsed)) === JSON.stringify(again));
const bad = parsed.routes.find((route) => route.path === "/bad");
const nowhere = parsed.routes.find((route) => route.path === "/nowhere");
check("unknown-column", bad?.attachmentHoles?.includes("cwl:unknown-db-column") && (bad.dbOps ?? []).length === 0);
check("where-required", nowhere?.attachmentHoles?.includes("cwl:db-where-required") && (nowhere.dbOps ?? []).length === 0);
check("engine", parsed.engine === "sqlite");

const odd = parseCwlModule('module m;\nengine mongo;\n@route GET "/"\nhandler h {\n  return { ok: true };\n}\n', "mem.cwl");
check("unknown-engine", odd.engine == null && odd.engineHoles.includes("cwl:unknown-db-engine"));
const clash = parseCwlModule('module m;\nengine sqlite;\nengine postgres;\n@route GET "/"\nhandler h {\n  return { ok: true };\n}\n', "mem.cwl");
check("one-engine", clash.engine === "sqlite" && clash.engineHoles.includes("cwl:db-engine"));

const notesTable = parsed.tables.find((table) => table.name === "notes");
const insert = parsed.routes.find((route) => route.path === "/notes" && route.method === "POST").dbOps[0];
const unsafeTitle = "<b>'; DROP TABLE notes;--";
for (const engine of CWL_DB_ENGINES) {
  const compiled = compileInsert(engine, notesTable, insert, {
    path: {},
    query: {},
    body: { id: "c", title: unsafeTitle, open: true, body: "kept" },
  }, null);
  const mark = placeholder(engine, 1);
  check(`bound-${engine}`, compiled.sql.includes(mark) && compiled.sql.includes(quoteIdent(engine, "title")) && !compiled.sql.includes("DROP") && compiled.params[1] === unsafeTitle);
  if (engine === "postgres") check("postgres-bool", compiled.params[2] === true);
  if (engine === "sqlite") check("sqlite-bool", compiled.params[2] === 1);
}
const one = parsed.routes.find((route) => route.path === "/notes/:id" && route.method === "GET").dbOps[0];
check("sqlserver-top", compileSelect("sqlserver", notesTable, one, { path: { id: "a" }, query: {}, body: {} }, null).sql.startsWith("SELECT TOP 1 "));
check("oracle-fetch", compileSelect("oracle", notesTable, one, { path: { id: "a" }, query: {}, body: {} }, null).sql.includes("FETCH FIRST 1 ROWS ONLY"));
check("drivers", CWL_DB_ENGINES.every((engine) => typeof CWL_DB_DRIVER[engine] === "string"));

const database = openCwlDatabase(":memory:");
const dir = mkdtempSync(join(tmpdir(), "cwl-db-"));
const dbFile = join(dir, "notes.sqlite");

function render(request) {
  return renderCwlLiveDocument(GOLD, request, { database, year: 2026 });
}

try {
  const empty = await render({ path: "/board" });
  check("empty", empty.status === 200 && empty.body.includes("<li>No notes</li>"));

  const saved = await render({
    method: "POST",
    path: "/notes",
    body: { id: "a", title: "Alpha", open: true, body: "hello" },
  });
  check("insert", saved.status === 200 && saved.body.includes("<h1>Alpha</h1>"));

  const closed = await render({
    method: "POST",
    path: "/notes",
    body: { id: "b", title: "Beta", open: false, body: "later" },
  });
  check("insert-closed", closed.body.includes("<h1>Beta</h1>"));

  const injected = await render({
    method: "POST",
    path: "/notes",
    body: { id: "c", title: "<b>'; DROP TABLE notes;--", open: true, body: "kept" },
  });
  check("insert-unsafe", injected.body.includes("&lt;b&gt;'; DROP TABLE notes;--") && !injected.body.includes("<h1><b>"));

  const tables = database.raw.prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'notes'").all();
  const count = database.raw.prepare("SELECT COUNT(*) AS n FROM notes").get();
  check("bound", tables.length === 1 && count.n === 3);

  await render({ method: "POST", path: "/notes/a/tags", body: { tag: "cwl" } });
  await render({ method: "POST", path: "/notes/a/tags", body: { tag: "<i>" } });
  const board = await render({ path: "/board" });
  check("board-open", board.body.includes("<li>Alpha<ul><li>cwl</li><li>&lt;i&gt;</li></ul></li>"));
  check("board-hides-closed", !board.body.includes("Beta"));
  check("board-keeps-bound-text", board.body.includes("DROP TABLE notes") && board.body.includes("&lt;b&gt;"));

  const detail = await render({ path: "/notes/a" });
  check("detail", detail.status === 200 && detail.body.includes("<p>hello</p>"));
  const gone = await render({ path: "/notes/missing" });
  check("missing", gone.status === 404 && gone.body.includes("<h1>Missing note</h1>"));

  const edited = await render({
    method: "POST",
    path: "/notes/a",
    body: { title: "Alpha 2", open: true },
  });
  check("update", edited.body.includes("<h1>Alpha 2</h1>"));

  const refused = await render({ method: "POST", path: "/nowhere", body: { title: "wiped" } });
  const still = database.raw.prepare("SELECT COUNT(*) AS n FROM notes").get();
  check("no-where", refused.body.includes("<p>no</p>") && still.n === 3);

  const removed = await render({ method: "DELETE", path: "/notes/b" });
  const after = database.raw.prepare("SELECT COUNT(*) AS n FROM notes").get();
  check("delete", removed.body.includes("<p>removed</p>") && after.n === 2);

  const server = await startCwlLiveServer({ file: GOLD, dbPath: dbFile, port: 0, year: 2026 });
  try {
    const created = await fetch(`http://${server.host}:${server.port}/notes`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ id: "a", title: "From HTTP", open: true, body: "wire" }),
    });
    const createdText = await created.text();
    check("http-insert", created.status === 200 && createdText.includes("<h1>From HTTP</h1>"));
    const listed = await fetch(`http://${server.host}:${server.port}/board`);
    const listedText = await listed.text();
    check("http-board", listed.status === 200 && listedText.includes("From HTTP") && !listedText.includes("Beta"));
  } finally {
    await server.close();
  }
} finally {
  database.close();
  rmSync(dir, { recursive: true, force: true });
}

const ok = failures.length === 0;
console.log(JSON.stringify({
  kind: "chrysalis.cwl.database",
  schemaVersion: 1,
  ok,
  token: ok ? "CWL_DATABASE_OK" : "CWL_DATABASE_FAIL",
  failures,
}, null, 2));
if (ok) console.log("CWL_DATABASE_OK");
process.exitCode = ok ? 0 : 1;
