/**
 * Shared DNA execute smoke helpers: resolve hooks + fixture check allowlist.
 *
 * Matrix discovery requires both:
 *   1. `runtime-ok` marker in fixtures/language-gold/<name>/README.md
 *   2. an entry in RUNTIME_GOLD_CHECKS (no silent invented handlers)
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { registerHooks } from "node:module";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
export const ROOT = resolve(HERE, "..");
export const GOLD_ROOT = join(ROOT, "fixtures/language-gold");
const CONVERT_PACKAGES = resolve(ROOT, "../chrysalis-convert/packages");

/** Marker token in fixture README (case-insensitive word). */
export const RUNTIME_OK_MARKER = "runtime-ok";

/** @type {Record<string, string>} */
const DEP_ENTRIES = {
  "@chrysalis/webir": join(ROOT, "packages/webir/dist/index.js"),
  "@chrysalis/rewrite": join(CONVERT_PACKAGES, "rewrite/dist/index.js"),
  "@chrysalis/emit-shared": join(CONVERT_PACKAGES, "emit-shared/dist/index.js"),
};

/**
 * @typedef {{
 *   method?: string,
 *   path: string,
 *   expectStatus: number,
 *   expectBody?: string | null,
 *   headers?: Record<string, string>,
 *   body?: string,
 *   expectHeaders?: Record<string, string>,
 * }} RuntimeCheck
 */

/**
 * Allowlist of honest simulate checks. Only API literal / object / status
 * surfaces that `simulateHandler` can return without inventing bodies.
 * Pages/UI/auth/holes stay out until the runtime can prove them.
 *
 * @type {Readonly<Record<string, readonly RuntimeCheck[]>>}
 */
export const RUNTIME_GOLD_CHECKS = Object.freeze({
  "01-literals": Object.freeze([
    { path: "/health", expectStatus: 200, expectBody: "true" },
    { path: "/ping", expectStatus: 200, expectBody: "42" },
    { path: "/meta", expectStatus: 200, expectBody: '{"ok":true,"version":1}' },
  ]),
  "02-path-params": Object.freeze([
    { path: "/items/42", expectStatus: 200, expectBody: '{"ok":true,"id":"42"}' },
    {
      path: "/users/u1/items/i9",
      expectStatus: 200,
      expectBody: '{"userId":"u1","itemId":"i9"}',
    },
  ]),
  "03-query-params": Object.freeze([
    { path: "/search?q=hello", expectStatus: 200, expectBody: '{"ok":true,"q":"hello"}' },
    {
      path: "/page?page=2&limit=10",
      expectStatus: 200,
      expectBody: '{"page":"2","limit":"10"}',
    },
  ]),
  "04-request-context": Object.freeze([
    {
      path: "/auth",
      expectStatus: 200,
      expectBody: '{"auth":"Bearer tok","sid":"abc"}',
      headers: { authorization: "Bearer tok", cookie: "session_id=abc" },
    },
    {
      path: "/locale?lang=en",
      expectStatus: 200,
      expectBody: '{"accept":"en-US","lang":"en"}',
      headers: { "accept-language": "en-US" },
    },
  ]),
  "05-request-body": Object.freeze([
    {
      method: "POST",
      path: "/items",
      expectStatus: 200,
      expectBody: '{"ok":true,"title":"Widget","qty":"3"}',
      headers: { "content-type": "application/json" },
      body: '{"title":"Widget","qty":3}',
    },
    {
      method: "POST",
      path: "/echo",
      expectStatus: 200,
      expectBody: '{"message":"hi"}',
      headers: { "content-type": "application/json" },
      body: '{"message":"hi"}',
    },
  ]),
  "06-response-status": Object.freeze([
    { method: "POST", path: "/items", expectStatus: 201, expectBody: '{"ok":true}' },
    { path: "/gone", expectStatus: 410, expectBody: '{"gone":true}' },
  ]),
  "07-auth-effects": Object.freeze([
    { path: "/me", expectStatus: 200, expectBody: '{"ok":true}' },
    { method: "POST", path: "/login", expectStatus: 200, expectBody: '{"ok":true}' },
  ]),
  "08-response-content-type": Object.freeze([
    {
      path: "/json",
      expectStatus: 200,
      expectBody: '{"ok":true}',
      expectHeaders: { "content-type": "application/json" },
    },
    {
      path: "/plain",
      expectStatus: 200,
      expectBody: "",
      expectHeaders: { "content-type": "text/plain; charset=utf-8" },
    },
    {
      method: "POST",
      path: "/items",
      expectStatus: 201,
      expectBody: '{"id":1}',
      expectHeaders: { "content-type": "application/json" },
    },
  ]),
  "09-fullstack-page": Object.freeze([
    {
      path: "/",
      expectStatus: 200,
      expectBody: "<!doctype html><html><body><h1>Home</h1></body></html>",
      expectHeaders: { "content-type": "text/html; charset=utf-8" },
    },
    {
      path: "/api/health",
      expectStatus: 200,
      expectBody: '{"ok":true,"surface":"api"}',
    },
  ]),
  "10-page-load": Object.freeze([
    {
      path: "/blog/hello",
      expectStatus: 200,
      expectBody:
        '<h1>Blog</h1>\n<script type="application/json" id="cwl-page-load">{"slug":"hello","source":"page-server"}</script>',
      expectHeaders: { "content-type": "text/html; charset=utf-8" },
    },
  ]),
  "11-holes": Object.freeze([
    { path: "/legacy", expectStatus: 501 },
    { method: "POST", path: "/todo", expectStatus: 501 },
  ]),
  "12-multi-file": Object.freeze([
    { path: "/health", expectStatus: 200, expectBody: "true" },
    { path: "/ping", expectStatus: 200, expectBody: "42" },
    { path: "/meta", expectStatus: 200, expectBody: '{"ok":true,"version":1}' },
  ]),
  "13-middleware": Object.freeze([
    { path: "/ready", expectStatus: 200, expectBody: '{"ready":true}' },
    { method: "POST", path: "/echo", expectStatus: 200, expectBody: '{"ok":true}' },
  ]),
  "14-defaults-headers": Object.freeze([
    {
      path: "/items/x",
      expectStatus: 200,
      expectBody: '{"id":"x","view":"full"}',
      expectHeaders: { cache: "hit" },
    },
    {
      path: "/items/x?view=short",
      expectStatus: 200,
      expectBody: '{"id":"x","view":"short"}',
      expectHeaders: { cache: "hit" },
    },
    {
      method: "POST",
      path: "/redirect",
      expectStatus: 302,
      expectBody: '{"ok":true}',
      expectHeaders: { location: "/items/1" },
    },
  ]),
  "15-html-interpolation": Object.freeze([
    {
      path: "/docs/x",
      expectStatus: 200,
      expectBody: "<p>x: x</p>",
      expectHeaders: { "content-type": "text/html; charset=utf-8" },
    },
    {
      path: "/blog/y",
      expectStatus: 200,
      expectBody:
        '<p>y: y flagship: flagship</p>\n<script type="application/json" id="cwl-page-load">{"slug":"y","source":"flagship"}</script>',
    },
  ]),
  "16-layout": Object.freeze([
    {
      path: "/about",
      expectStatus: 200,
      expectBody: "<html><body><h1>About</h1></body></html>",
    },
    {
      path: "/docs/x",
      expectStatus: 200,
      expectBody: "<html><body><h1>Doc</h1><p>x: x</p></body></html>",
    },
    {
      path: "/api/docs/x",
      expectStatus: 200,
      expectBody: '{"ok":true,"slug":"x"}',
    },
  ]),
  "17-ui-v0": Object.freeze([
    {
      path: "/ui-v0",
      expectStatus: 200,
      expectBody: '<main class="demo"><h1>CWL UI v0</h1><p>Server-rendered element tree.</p></main>',
      expectHeaders: { "content-type": "text/html; charset=utf-8" },
    },
    {
      path: "/ui-v0/card",
      expectStatus: 200,
      expectBody: '<div class="card"><h2>Component reuse</h2></div>',
    },
    {
      path: "/ui-v0/Ada",
      expectStatus: 200,
      expectBody: '<div class="card"><h2>Ada</h2></div>',
    },
  ]),
  "18-ui-v1": Object.freeze([
    {
      path: "/ui-v1",
      expectStatus: 200,
      expectBody:
        '<main class="demo"><h1>CWL UI v1</h1><div data-cwl-island="client"><button id="add" data-cwl-on-click="increment">Add</button></div></main>',
    },
    {
      path: "/ui-v1/load-ui",
      expectStatus: 200,
      expectBody: "<main><p>loaded</p></main>",
    },
    {
      path: "/ui-v1/Ada",
      expectStatus: 200,
      expectBody:
        '<section><p>Ada</p><div data-cwl-island="client"><button data-cwl-on-click="navigate">Go</button></div></section>',
    },
  ]),
  "19-early-exit": Object.freeze([
    {
      method: "POST",
      path: "/login",
      expectStatus: 400,
      expectBody: "Missing credentials",
      headers: { "content-type": "application/json" },
      body: '{"username":"","password":""}',
    },
    {
      method: "POST",
      path: "/login",
      expectStatus: 200,
      expectBody: '{"ok":true}',
      headers: { "content-type": "application/json" },
      body: '{"username":"a","password":"b"}',
    },
    { path: "/gate?mode=off", expectStatus: 503, expectBody: "not ready" },
    { path: "/gate?mode=maint", expectStatus: 503, expectBody: "maintenance" },
    { path: "/gate", expectStatus: 200, expectBody: '{"ready":true}' },
    { path: "/posts", expectStatus: 200, expectBody: "<ul></ul>" },
    { path: "/posts/x", expectStatus: 404, expectBody: "Post not found" },
    { path: "/post/x", expectStatus: 404, expectBody: "<p>missing</p>" },
  ]),
  "20-probes": Object.freeze([
    { path: "/search", expectStatus: 200, expectBody: "<p>search: </p>" },
    {
      path: "/blog/x",
      expectStatus: 200,
      expectBody:
        '<h1>Blog</h1><p>x: x</p>\n<script type="application/json" id="cwl-page-load">{"slug":"x","source":"page-server"}</script>',
    },
  ]),
  "21-form-action": Object.freeze([
    {
      path: "/notify",
      expectStatus: 200,
      expectBody: '<form method="post" action="/notify"><button>Notify</button></form>',
    },
    { method: "POST", path: "/notify", expectStatus: 501 },
  ]),
  "22-effects-middleware": Object.freeze([
    { path: "/admin", expectStatus: 200, expectBody: '{"ok":true}' },
    { path: "/admin/me", expectStatus: 200, expectBody: '{"ok":true,"surface":"admin"}' },
    { method: "POST", path: "/admin/session", expectStatus: 200, expectBody: '{"ok":true}' },
  ]),
  "23-nested-control": Object.freeze([
    {
      method: "POST",
      path: "/login",
      expectStatus: 400,
      expectBody: "Password required",
      headers: { "content-type": "application/json" },
      body: '{"username":"","password":""}',
    },
    {
      method: "POST",
      path: "/login",
      expectStatus: 400,
      expectBody: "Missing credentials",
      headers: { "content-type": "application/json" },
      body: '{"username":"","password":"b"}',
    },
    {
      method: "POST",
      path: "/login",
      expectStatus: 404,
      expectBody: "User not found",
      headers: { "content-type": "application/json" },
      body: '{"username":"a","password":"b"}',
    },
    { path: "/posts", expectStatus: 200, expectBody: "<ul></ul>" },
    { path: "/threads", expectStatus: 200, expectBody: "<div></div>" },
  ]),
  "24-dna-bridge": Object.freeze([
    {
      path: "/",
      expectStatus: 200,
      expectBody: "<!doctype html><html><body><h1>Home</h1></body></html>",
    },
    { method: "POST", path: "/login", expectStatus: 201, expectBody: '{"ok":true}' },
    { path: "/api/health", expectStatus: 200, expectBody: '{"ok":true,"surface":"api","meta":{"v":1}}' },
    { path: "/items/x", expectStatus: 200, expectBody: '{"ok":true,"id":"x"}' },
  ]),
  "25-island-kinds": Object.freeze([
    { path: "/api/health", expectStatus: 200, expectBody: '{"ok":true}' },
    {
      path: "/map",
      expectStatus: 200,
      expectBody: "<!doctype html><html><body><h1>Map</h1></body></html>",
    },
    {
      path: "/compute",
      expectStatus: 200,
      expectBody: "<!doctype html><html><body><h1>Compute</h1></body></html>",
    },
    {
      path: "/legacy-script",
      expectStatus: 200,
      expectBody: "<!doctype html><html><body><h1>Legacy</h1></body></html>",
    },
  ]),
  "26-nested-literals": Object.freeze([
    { path: "/api/nested", expectStatus: 200, expectBody: '{"ok":true,"meta":{"v":1,"tags":["a","b"]}}' },
    { path: "/api/pair", expectStatus: 200, expectBody: '{"outer":{"inner":{"n":2}},"list":[1,2,3]}' },
  ]),
  "27-data-v2": Object.freeze([
    {
      path: "/go",
      expectStatus: 302,
      expectBody: "",
      expectHeaders: { Location: "/landed" },
    },
    { path: "/missing", expectStatus: 404, expectBody: "" },
    {
      path: "/who",
      expectStatus: 200,
      headers: { cookie: "session_id=abc" },
      expectBody:
        "<p>who</p>\n<script type=\"application/json\" id=\"cwl-page-load\">{\"sessionId\":\"abc\",\"source\":\"data-v2\"}</script>",
    },
  ]),
  "28-response-cookie": Object.freeze([
    {
      path: "/login",
      method: "POST",
      expectStatus: 200,
      expectBody: '{"ok":true}',
      expectHeaders: { "set-cookie": "session_id=xyz; Path=/; HttpOnly" },
    },
  ]),
  "30-effects-executable": Object.freeze([
    { path: "/clock", expectStatus: 200, expectBody: '{"ok":true,"surface":"clock"}' },
    { path: "/roll", expectStatus: 200, expectBody: '{"ok":true,"surface":"roll"}' },
    { method: "POST", path: "/notify", expectStatus: 200, expectBody: '{"ok":true,"surface":"notify"}' },
    { path: "/catalog", expectStatus: 200, expectBody: '{"ok":true,"surface":"catalog"}' },
    { method: "POST", path: "/write", expectStatus: 200, expectBody: '{"ok":true,"surface":"write"}' },
  ]),
  "31-multipart-binding": Object.freeze([
    {
      method: "POST",
      path: "/upload",
      expectStatus: 200,
      expectBody: '{"ok":true,"title":"shot","avatar":"a.png"}',
      headers: { "content-type": "application/json" },
      body: '{"title":"shot","avatar":"a.png"}',
    },
    {
      method: "POST",
      path: "/meta-only",
      expectStatus: 200,
      expectBody: '{"ok":true,"label":"x"}',
      headers: { "content-type": "application/json" },
      body: '{"label":"x"}',
    },
  ]),
  "32-stream-sse": Object.freeze([
    {
      path: "/events",
      expectStatus: 200,
      expectBody: '{"ok":true,"tick":1}',
      expectHeaders: { "content-type": "text/event-stream" },
    },
  ]),
  "33-ui-island-contracts": Object.freeze([
    {
      path: "/signup",
      expectStatus: 200,
      expectBody:
        '<main><h1>Signup</h1><div data-cwl-island="client" data-cwl-island-id="signup"><form><input name="email" data-cwl-on-change="email.changed"></input><button data-cwl-on-click="signup.save">Save</button></form></div></main>',
    },
    {
      path: "/anon",
      expectStatus: 200,
      expectBody:
        '<section><div data-cwl-island="client"><button data-cwl-on-click="ping">Ping</button></div></section>',
    },
  ]),
  "34-dna-bridge-surfaces": Object.freeze([
    {
      path: "/events",
      expectStatus: 200,
      expectBody: '{"ok":true,"tick":1}',
      expectHeaders: { "content-type": "text/event-stream" },
    },
    {
      method: "POST",
      path: "/upload",
      expectStatus: 200,
      expectBody: '{"ok":true}',
      headers: { "content-type": "application/json" },
      body: '{"title":"shot","avatar":"a.png"}',
    },
    {
      method: "HEAD",
      path: "/api/health",
      expectStatus: 200,
      expectBody: '{"ok":true}',
    },
  ]),
});

function resolveDepEntry(pkg) {
  const preferred = DEP_ENTRIES[pkg];
  if (preferred && existsSync(preferred)) return preferred;
  if (pkg === "@chrysalis/webir") {
    const sibling = join(CONVERT_PACKAGES, "webir/dist/index.js");
    if (existsSync(sibling)) return sibling;
  }
  return null;
}

/** @returns {Record<string, string>} */
export function installRuntimeDepHooks() {
  /** @type {Record<string, string>} */
  const map = {};
  for (const pkg of Object.keys(DEP_ENTRIES)) {
    const entry = resolveDepEntry(pkg);
    if (!entry) {
      throw new Error(
        `Cannot resolve ${pkg} for runtime-cwl execute.\n` +
          `Tried: ${DEP_ENTRIES[pkg]}\n` +
          (pkg === "@chrysalis/webir"
            ? "Run: npm run link:webir (and build convert webir dist).\n"
            : "Need sibling chrysalis-convert with built packages/rewrite + packages/emit-shared.\n") +
          "See docs/history/DNA-STEP-EXECUTE.md.",
      );
    }
    map[pkg] = entry;
  }

  registerHooks({
    resolve(specifier, context, nextResolve) {
      const entry = map[specifier];
      if (entry) {
        return { shortCircuit: true, url: pathToFileURL(entry).href };
      }
      return nextResolve(specifier, context);
    },
  });

  return map;
}

/**
 * Positive marker only: a line that is (or starts with) `**runtime-ok**`.
 * Mentions like "Not runtime-ok" / "Why not runtime-ok" must not match.
 *
 * @param {string} fixtureName
 * @returns {boolean}
 */
export function fixtureHasRuntimeOkMarker(fixtureName) {
  const readme = join(GOLD_ROOT, fixtureName, "README.md");
  if (!existsSync(readme)) return false;
  const text = readFileSync(readme, "utf8");
  return /^\s*\*\*runtime-ok\*\*/im.test(text);
}

/**
 * Discover fixtures that are both marked runtime-ok and allowlisted.
 * Throws if marker/allowlist disagree (avoids silent invented coverage).
 *
 * @returns {string[]}
 */
export function discoverRuntimeOkFixtures() {
  const dirs = readdirSync(GOLD_ROOT, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();

  const marked = [];
  const markedMissingChecks = [];
  for (const name of dirs) {
    const routes = join(GOLD_ROOT, name, "routes.cwl");
    if (!existsSync(routes)) continue;
    if (!fixtureHasRuntimeOkMarker(name)) continue;
    if (!RUNTIME_GOLD_CHECKS[name]) {
      markedMissingChecks.push(name);
      continue;
    }
    marked.push(name);
  }

  const checksWithoutMarker = Object.keys(RUNTIME_GOLD_CHECKS).filter(
    (name) => !fixtureHasRuntimeOkMarker(name),
  );

  if (markedMissingChecks.length > 0 || checksWithoutMarker.length > 0) {
    const parts = [];
    if (markedMissingChecks.length > 0) {
      parts.push(
        `README runtime-ok without allowlist checks (add RUNTIME_GOLD_CHECKS, do not invent): ${markedMissingChecks.join(", ")}`,
      );
    }
    if (checksWithoutMarker.length > 0) {
      parts.push(
        `allowlist checks without README runtime-ok marker: ${checksWithoutMarker.join(", ")}`,
      );
    }
    throw new Error(parts.join("\n"));
  }

  return marked;
}

/**
 * @param {string} cwlPath
 * @param {readonly RuntimeCheck[]} checks
 * @param {{ createCwlRuntime: Function, loadModuleFromCwlFile: Function }} runtimeApi
 */
export async function runRuntimeChecks(cwlPath, checks, runtimeApi) {
  if (!existsSync(cwlPath)) {
    throw new Error(`CWL gold missing: ${cwlPath}`);
  }
  if (!Array.isArray(checks) || checks.length < 1) {
    throw new Error(`no runtime checks for ${cwlPath}`);
  }

  const module = runtimeApi.loadModuleFromCwlFile(cwlPath, ROOT);
  const runtime = runtimeApi.createCwlRuntime({ module });

  if (!Array.isArray(runtime.routes) || runtime.routes.length < 1) {
    throw new Error(`expected compiled routes >= 1, got ${runtime.routes?.length}`);
  }

  /** @type {{ method: string, path: string, status: number, body: string }[]} */
  const results = [];
  for (const check of checks) {
    const method = (check.method || "GET").toUpperCase();
    /** @type {Record<string, string>} */
    const reqHeaders = { ...(check.headers ?? {}) };
    const res = await runtime.fetch({
      method,
      url: `http://127.0.0.1${check.path}`,
      headers: reqHeaders,
      body: check.body,
    });
    const body = await res.text();
    if (res.status !== check.expectStatus) {
      throw new Error(
        `${method} ${check.path}: status ${res.status} !== ${check.expectStatus}; body=${body}`,
      );
    }
    if (check.expectBody !== null && check.expectBody !== undefined && body !== check.expectBody) {
      throw new Error(
        `${method} ${check.path}: body ${JSON.stringify(body)} !== ${JSON.stringify(check.expectBody)}`,
      );
    }
    if (check.expectHeaders) {
      for (const [name, want] of Object.entries(check.expectHeaders)) {
        const got = res.headers.get(name);
        if (got !== want) {
          throw new Error(
            `${method} ${check.path}: header ${name}=${JSON.stringify(got)} !== ${JSON.stringify(want)}`,
          );
        }
      }
    }
    results.push({ method, path: check.path, status: res.status, body });
  }

  return { runtime, results };
}

/**
 * @returns {Promise<{ createCwlRuntime: Function, loadModuleFromCwlFile: Function }>}
 */
export async function loadRuntimeApi() {
  const runtimeUrl = pathToFileURL(join(ROOT, "packages/runtime-cwl/dist/index.js")).href;
  return import(runtimeUrl);
}
