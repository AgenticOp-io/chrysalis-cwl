#!/usr/bin/env node
/**
 * Recreate convert → chrysalis-cwl file symlinks for the six always-sync hub-ingest scripts.
 * Idempotent. Does **not** touch convert `cwl-fmt.mjs` / `cwl-ingest.mjs`.
 *
 * Fresh-checkout story: after cloning both pillars as siblings, run:
 *   npm run setup:mirrors
 * then `npm run test:cwl-mirrors`.
 *
 * Windows: file symlinks need Developer Mode or an elevated shell (not directory junctions —
 * `mklink /J` cannot target a file). Unix: ordinary file symlinks.
 *
 * Convert git currently stores plain-file blobs for these paths; this script overlays
 * OS reparse points in the working tree. Prefer `git config core.symlinks true` in CI
 * if you ever commit mode-120000 links; otherwise CI can keep byte-identical copies
 * and rely on `test:cwl-mirrors` hash equality without creating links.
 */
import {
  existsSync,
  lstatSync,
  mkdirSync,
  readlinkSync,
  realpathSync,
  rmSync,
  symlinkSync,
} from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { spawnSync } from "node:child_process";
import { ALWAYS, isReparsePoint } from "./sync-to-convert.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const CONVERT = resolve(ROOT, "../chrysalis-convert");
const SRC = join(ROOT, "scripts/hub-ingest");
const DST = join(CONVERT, "scripts/hub-ingest");

/**
 * @param {string} linkPath
 * @param {string} targetPath
 */
function createFileSymlink(linkPath, targetPath) {
  if (process.platform === "win32") {
    const r = spawnSync("cmd", ["/c", "mklink", linkPath, targetPath], {
      encoding: "utf8",
    });
    if (r.status !== 0) {
      const detail = (r.stdout || r.stderr || "").trim();
      // Fallback: Node may succeed under Developer Mode when cmd mklink fails.
      try {
        symlinkSync(targetPath, linkPath, "file");
        return;
      } catch (e) {
        const err = e instanceof Error ? e.message : String(e);
        throw new Error(
          `file symlink failed for ${linkPath}\n` +
            `  mklink: ${detail || `exit ${r.status}`}\n` +
            `  symlinkSync: ${err}\n` +
            `  Enable Windows Developer Mode, or run an elevated shell.`,
        );
      }
    }
    return;
  }
  symlinkSync(targetPath, linkPath, "file");
}

/**
 * @param {string} linkPath
 * @param {string} expectedTarget
 */
function alreadyCorrect(linkPath, expectedTarget) {
  if (!existsSync(linkPath) || !isReparsePoint(linkPath)) return false;
  try {
    const raw = readlinkSync(linkPath);
    const resolvedLink = resolve(dirname(linkPath), raw);
    if (resolve(resolvedLink) === resolve(expectedTarget)) return true;
    const a = realpathSync(linkPath);
    const b = realpathSync(expectedTarget);
    return a === b;
  } catch {
    return false;
  }
}

function main() {
  if (!existsSync(CONVERT)) {
    console.error(`convert tree not found: ${CONVERT}`);
    console.error("Clone chrysalis-convert as a sibling of chrysalis-cwl.");
    process.exit(2);
  }
  mkdirSync(DST, { recursive: true });

  /** @type {object[]} */
  const results = [];
  let ok = true;

  for (const file of ALWAYS) {
    const from = join(SRC, file);
    const to = join(DST, file);
    if (!existsSync(from)) {
      results.push({ file, action: "missing-source", ok: false });
      ok = false;
      continue;
    }

    if (alreadyCorrect(to, from)) {
      results.push({ file, action: "unchanged", ok: true, target: from.replace(/\\/g, "/") });
      continue;
    }

    try {
      if (existsSync(to)) {
        const st = lstatSync(to);
        // Remove plain file or previous reparse so we can recreate the link.
        if (st.isSymbolicLink() || st.isFile()) {
          rmSync(to, { force: true });
        } else {
          results.push({
            file,
            action: "refused",
            ok: false,
            error: "dest is not a file or symlink — refusing to replace",
          });
          ok = false;
          continue;
        }
      }
      createFileSymlink(to, from);
      results.push({
        file,
        action: "linked",
        ok: true,
        target: from.replace(/\\/g, "/"),
      });
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      results.push({ file, action: "error", ok: false, error: msg });
      ok = false;
    }
  }

  const report = {
    kind: "chrysalis.cwl.setup-mirrors",
    schemaVersion: 1,
    ok,
    source: SRC.replace(/\\/g, "/"),
    dest: DST.replace(/\\/g, "/"),
    results,
    skipped: [
      {
        file: "cwl-fmt.mjs",
        reason: "convert-owned WebIR fmt — never junctioned",
      },
      {
        file: "cwl-ingest.mjs",
        reason: "convert-owned ingest — never junctioned",
      },
    ],
    notes: [
      "Prefer edit-in-cwl → test:language → test:cwl-mirrors.",
      "sync:convert is a no-op when these paths are already reparse points.",
      "Without symlink privilege, use sync:convert for byte-identical copies instead.",
    ],
  };
  console.log(JSON.stringify(report, null, 2));
  process.exit(ok ? 0 : 1);
}

const isDirectRun =
  process.argv[1] != null &&
  import.meta.url === pathToFileURL(resolve(process.argv[1])).href;

if (isDirectRun) {
  main();
}
