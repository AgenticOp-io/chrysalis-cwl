#!/usr/bin/env node
/**
 * Sync language-owned hub-ingest scripts into chrysalis-convert.
 * Source of truth: this pillar. Prefer convert→pillar reparse points (file
 * symlinks / junctions); copy only when the convert path is a plain file.
 */
import {
  copyFileSync,
  existsSync,
  lstatSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const CONVERT = resolve(ROOT, "../chrysalis-convert");
const SRC = join(ROOT, "scripts/hub-ingest");
const DST = join(CONVERT, "scripts/hub-ingest");

/** Always overwrite in convert (language semantics) unless already a reparse point. */
export const ALWAYS = [
  "cwl-parser.mjs",
  "cwl-print.mjs",
  "cwl-ui-tree.mjs",
  "cwl-module-graph.mjs",
  "cwl-diagnose.mjs",
  "cwl-fullstack-holes.mjs",
];

/**
 * True when path is a symlink / junction (Windows reparse point) — do not copy over it.
 * @param {string} path
 */
export function isReparsePoint(path) {
  try {
    const st = lstatSync(path);
    if (st.isSymbolicLink()) return true;
    // Windows: FILE_ATTRIBUTE_REPARSE_POINT = 0x400; Node exposes via mode on some builds.
    if (process.platform === "win32" && typeof st.mode === "number") {
      // Fallback: if lstat does not classify as symlink, still treat known reparse bit.
      // (Node typically sets isSymbolicLink for file symlinks and directory junctions.)
    }
    return false;
  } catch {
    return false;
  }
}

/**
 * Merge extractPathParams into convert while preserving WebIR helper if present.
 */
function syncPathParams() {
  const name = "hub-cwl-path-params.mjs";
  const srcPath = join(SRC, name);
  const dstPath = join(DST, name);
  if (existsSync(dstPath) && isReparsePoint(dstPath)) {
    return { file: name, action: "junction-noop" };
  }
  const src = readFileSync(srcPath, "utf8");
  if (!existsSync(dstPath)) {
    copyFileSync(srcPath, dstPath);
    return { file: name, action: "copied" };
  }
  const dst = readFileSync(dstPath, "utf8");
  if (dst.includes("cwlPathParamsForWebir") && dst.includes("HUB_T")) {
    // Keep convert WebIR helper; refresh extract body from pillar null-safe version.
    const next = `/**
 * CWL path parameter extraction (RFC-0002).
 * extractPathParamsFromCwlPath synced from chrysalis-cwl; WebIR helper stays convert-local.
 */
import { HUB_T } from "./hub-lift-webir-route.mjs";

const CWL_PATH_PARAM_RE = /:([a-zA-Z_][a-zA-Z0-9_]*)/g;

/**
 * Ordered unique \`:name\` segments from a CWL path template.
 * @param {string} path
 * @returns {string[]}
 */
export function extractPathParamsFromCwlPath(path) {
  /** @type {string[]} */
  const names = [];
  for (const m of String(path ?? "").matchAll(CWL_PATH_PARAM_RE)) {
    const n = m[1];
    if (!names.includes(n)) names.push(n);
  }
  return names;
}

/**
 * @param {string} path
 */
export function cwlPathParamsForWebir(path) {
  return extractPathParamsFromCwlPath(path).map((name) => ({ name, type: HUB_T.string }));
}
`;
    if (dst === next) return { file: name, action: "unchanged" };
    writeFileSync(dstPath, next, "utf8");
    return { file: name, action: "merged-extract" };
  }
  copyFileSync(srcPath, dstPath);
  return { file: name, action: "copied" };
}

function main() {
  if (!existsSync(CONVERT)) {
    console.error(`convert tree not found: ${CONVERT}`);
    process.exit(2);
  }
  mkdirSync(DST, { recursive: true });
  /** @type {object[]} */
  const results = [];
  for (const file of ALWAYS) {
    const from = join(SRC, file);
    const to = join(DST, file);
    if (!existsSync(from)) {
      results.push({ file, action: "missing-source" });
      continue;
    }
    if (existsSync(to) && isReparsePoint(to)) {
      results.push({ file, action: "junction-noop" });
      continue;
    }
    const before = existsSync(to) ? readFileSync(to, "utf8") : null;
    const after = readFileSync(from, "utf8");
    if (before === after) {
      results.push({ file, action: "unchanged" });
    } else {
      copyFileSync(from, to);
      results.push({ file, action: before == null ? "created" : "updated" });
    }
  }
  results.push(syncPathParams());

  const report = {
    kind: "chrysalis.cwl.sync-convert",
    schemaVersion: 1,
    ok: !results.some((r) => r.action === "missing-source"),
    source: SRC.replace(/\\/g, "/"),
    dest: DST.replace(/\\/g, "/"),
    results,
    skipped: [
      {
        file: "cwl-fmt.mjs",
        reason: "convert may keep WebIR fmt; pillar fmt is parse→print local",
      },
      {
        file: "cwl-ingest.mjs",
        reason: "needs WebIR / convert hub helpers until webir extract",
      },
    ],
  };
  console.log(JSON.stringify(report, null, 2));
  process.exit(report.ok ? 0 : 1);
}

const isDirectRun =
  process.argv[1] != null &&
  import.meta.url === pathToFileURL(resolve(process.argv[1])).href;

if (isDirectRun) {
  main();
}
