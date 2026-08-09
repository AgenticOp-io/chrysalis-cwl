#!/usr/bin/env node
/**
 * DNA Execute slice: language-gold → WebIR → @chrysalis/runtime-cwl fetch.
 *
 * Default gold: fixtures/language-gold/01-literals (literal + object returns).
 * Path: export-cwl-webir (pillar ingest) → createCwlRuntime → simulateHandler.
 * Not Convert emit (Hono/Fastify). Honest 501 holes for unsupported IR ops.
 *
 * Runtime deps (@chrysalis/webir|rewrite|emit-shared) still live under sibling
 * convert until WebIR/workspace flip (Slice 3.4). This smoke registers ESM
 * resolve hooks to those dists — same honesty as link:webir, not a second SoR.
 */
import { existsSync } from "node:fs";
import { registerHooks } from "node:module";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");
const DEFAULT_GOLD = join(ROOT, "fixtures/language-gold/01-literals/routes.cwl");
const CONVERT_PACKAGES = resolve(ROOT, "../chrysalis-convert/packages");

/** @type {Record<string, string>} */
const DEP_ENTRIES = {
  "@chrysalis/webir": join(ROOT, "packages/webir/dist/index.js"),
  "@chrysalis/rewrite": join(CONVERT_PACKAGES, "rewrite/dist/index.js"),
  "@chrysalis/emit-shared": join(CONVERT_PACKAGES, "emit-shared/dist/index.js"),
};

function resolveDepEntry(pkg) {
  const preferred = DEP_ENTRIES[pkg];
  if (preferred && existsSync(preferred)) return preferred;
  // webir: pillar junction first, then sibling convert
  if (pkg === "@chrysalis/webir") {
    const sibling = join(CONVERT_PACKAGES, "webir/dist/index.js");
    if (existsSync(sibling)) return sibling;
  }
  return null;
}

function installRuntimeDepHooks() {
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

const cwlPath = resolve(process.argv[2] || DEFAULT_GOLD);
if (!existsSync(cwlPath)) {
  throw new Error(`CWL gold missing: ${cwlPath}`);
}

const depMap = installRuntimeDepHooks();
console.log("deps:");
for (const [pkg, entry] of Object.entries(depMap)) {
  console.log(`  ${pkg}: ${entry}`);
}
console.log(`cwl: ${cwlPath}`);

const runtimeUrl = pathToFileURL(join(ROOT, "packages/runtime-cwl/dist/index.js")).href;
const { createCwlRuntime, loadModuleFromCwlFile } = await import(runtimeUrl);

const module = loadModuleFromCwlFile(cwlPath, ROOT);
const runtime = createCwlRuntime({ module });

if (!Array.isArray(runtime.routes) || runtime.routes.length < 1) {
  throw new Error(`expected compiled routes >= 1, got ${runtime.routes?.length}`);
}

/** @type {{ path: string, expectStatus: number, expectBody: string }[]} */
const checks = [
  { path: "/health", expectStatus: 200, expectBody: "true" },
  { path: "/ping", expectStatus: 200, expectBody: "42" },
  { path: "/meta", expectStatus: 200, expectBody: '{"ok":true,"version":1}' },
];

const isLiterals = /01-literals/.test(cwlPath.replace(/\\/g, "/"));
const toRun = isLiterals
  ? checks
  : [{ path: checks[0].path, expectStatus: 200, expectBody: null }];

for (const check of toRun) {
  const res = await runtime.fetch({
    method: "GET",
    url: `http://127.0.0.1${check.path}`,
  });
  const body = await res.text();
  if (res.status !== check.expectStatus) {
    throw new Error(`${check.path}: status ${res.status} !== ${check.expectStatus}; body=${body}`);
  }
  if (check.expectBody !== null && body !== check.expectBody) {
    throw new Error(`${check.path}: body ${JSON.stringify(body)} !== ${JSON.stringify(check.expectBody)}`);
  }
  console.log(`  GET ${check.path} → ${res.status} ${body}`);
}

console.log("CWL_RUNTIME_GOLD_OK");
console.log(`  routes: ${runtime.routes.length}`);
console.log(`  gold:   ${cwlPath}`);
console.log("  note:   WebIR simulateHandler path (not Convert emit)");
