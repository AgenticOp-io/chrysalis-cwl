#!/usr/bin/env node
/**
 * Gate: convert hub-ingest language mirrors must be byte-identical to this pillar
 * OR be reparse points (Windows file symlinks / junctions) into this tree.
 * Does not touch convert cwl-fmt.mjs / cwl-ingest.mjs.
 */
import { createHash } from "node:crypto";
import { existsSync, readFileSync, realpathSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { ALWAYS, isReparsePoint } from "./sync-to-convert.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const CONVERT = resolve(ROOT, "../chrysalis-convert");
const SRC = join(ROOT, "scripts/hub-ingest");
const DST = join(CONVERT, "scripts/hub-ingest");

/**
 * @param {string} path
 */
function sha256File(path) {
  return createHash("sha256").update(readFileSync(path)).digest("hex");
}

/**
 * @param {string} path
 */
function safeReal(path) {
  try {
    return realpathSync(path);
  } catch {
    return null;
  }
}

function main() {
  if (!existsSync(CONVERT)) {
    console.error(`convert tree not found: ${CONVERT}`);
    process.exit(2);
  }

  /** @type {object[]} */
  const results = [];
  let ok = true;

  for (const file of ALWAYS) {
    const from = join(SRC, file);
    const to = join(DST, file);
    if (!existsSync(from)) {
      results.push({ file, ok: false, error: "missing-source" });
      ok = false;
      continue;
    }
    if (!existsSync(to)) {
      results.push({ file, ok: false, error: "missing-dest" });
      ok = false;
      continue;
    }

    const reparse = isReparsePoint(to);
    const srcHash = sha256File(from);
    const dstHash = sha256File(to);
    const identical = srcHash === dstHash;
    const srcReal = safeReal(from);
    const dstReal = safeReal(to);
    const sameInode = Boolean(srcReal && dstReal && srcReal === dstReal);

    // Fail only when hashes diverge AND path is not a reparse point.
    const fileOk = identical || reparse;
    if (!fileOk) ok = false;

    results.push({
      file,
      ok: fileOk,
      reparse,
      identical,
      sameInode,
      srcHash,
      dstHash,
      ...(fileOk
        ? {}
        : {
            error: "hash-diverge-not-reparse",
            hint: "run npm run sync:convert, or replace convert copy with a file symlink to chrysalis-cwl",
          }),
      ...(reparse && !identical && !sameInode
        ? {
            warn: "reparse-but-content-diverges",
            srcReal,
            dstReal,
          }
        : {}),
    });
  }

  const report = {
    kind: "chrysalis.cwl.gate-mirrors",
    schemaVersion: 1,
    ok,
    source: SRC.replace(/\\/g, "/"),
    dest: DST.replace(/\\/g, "/"),
    results,
  };
  console.log(JSON.stringify(report, null, 2));
  process.exit(ok ? 0 : 1);
}

main();
