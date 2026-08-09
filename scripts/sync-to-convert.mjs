#!/usr/bin/env node
/**
 * Sync language-owned hub-ingest scripts into chrysalis-convert.
 * Source of truth: this pillar. Prefer convert→pillar reparse points
 * (`npm run setup:mirrors`); copy only when the convert path is a plain file.
 * Skips cwl-fmt / cwl-ingest. See CWL-PILLAR-HOME §7.
 */
import {
  copyFileSync,
  existsSync,
  lstatSync,
  mkdirSync,
  readFileSync,
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
 * CWL-specific WebIR helpers owned by the language pillar (Agent G).
 * Plain `sync:convert` copies only — never part of `setup:mirrors` / junction gate.
 */
export const CWL_WEBIR_HELPERS = [
  "hub-t.mjs",
  "hub-cwl-path-params.mjs",
  "hub-cwl-middleware.mjs",
  "hub-cwl-auth-presets.mjs",
  "hub-cwl-effects.mjs",
  "cwl-control-lower.mjs",
];

/**
 * @param {string} name
 */
function syncOne(name) {
  const from = join(SRC, name);
  const to = join(DST, name);
  if (!existsSync(from)) {
    return { file: name, action: "missing-source" };
  }
  if (existsSync(to) && isReparsePoint(to)) {
    return { file: name, action: "junction-noop" };
  }
  const before = existsSync(to) ? readFileSync(to, "utf8") : null;
  const after = readFileSync(from, "utf8");
  if (before === after) {
    return { file: name, action: "unchanged" };
  }
  copyFileSync(from, to);
  return { file: name, action: before == null ? "created" : "updated" };
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
    results.push(syncOne(file));
  }
  for (const file of CWL_WEBIR_HELPERS) {
    results.push(syncOne(file));
  }

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
        reason: "pillar uses thin hub-lift-cwl-webir; convert keeps fat hub-lift until dual-mode agreed",
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
