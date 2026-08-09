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
  "06-response-status": Object.freeze([
    { method: "POST", path: "/items", expectStatus: 201, expectBody: '{"ok":true}' },
    { path: "/gone", expectStatus: 410, expectBody: '{"gone":true}' },
  ]),
  "12-multi-file": Object.freeze([
    { path: "/health", expectStatus: 200, expectBody: "true" },
    { path: "/ping", expectStatus: 200, expectBody: "42" },
    { path: "/meta", expectStatus: 200, expectBody: '{"ok":true,"version":1}' },
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
 * @param {string} fixtureName
 * @returns {boolean}
 */
export function fixtureHasRuntimeOkMarker(fixtureName) {
  const readme = join(GOLD_ROOT, fixtureName, "README.md");
  if (!existsSync(readme)) return false;
  const text = readFileSync(readme, "utf8");
  return new RegExp(`\\b${RUNTIME_OK_MARKER}\\b`, "i").test(text);
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
    const res = await runtime.fetch({
      method,
      url: `http://127.0.0.1${check.path}`,
      headers: check.headers,
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
