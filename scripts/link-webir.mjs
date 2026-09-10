#!/usr/bin/env node
/**
 * Ensure `@chrysalis/webir` is usable from the CWL pillar.
 *
 * Preferred: physical `packages/webir` in this repo (Phase 0.3 flip — CWL SoR).
 * Fallback: junction → sibling Convert (legacy link-until-pnpm) when physical
 * tree is absent (fresh clone without package, or pre-flip checkout).
 *
 * Convert must still reverse-junction / file: pin at CWL — see
 * docs/history/WEBIR-FLIP-REQUESTED.md.
 */
import { existsSync, lstatSync, mkdirSync, rmSync, symlinkSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const PACKAGES = join(ROOT, "packages");
const LINK = join(PACKAGES, "webir");
const TARGET = resolve(ROOT, "../chrysalis-convert/packages/webir");
const PKG = join(LINK, "package.json");
const DIST = join(LINK, "dist/index.js");

function physicalHome() {
  if (!existsSync(PKG)) return false;
  try {
    const st = lstatSync(LINK);
    if (st.isSymbolicLink()) return false;
  } catch {
    return false;
  }
  // Windows junction still exposes target package.json — detect reparse
  if (process.platform === "win32") {
    const r = spawnSync("fsutil", ["reparsepoint", "query", LINK], { encoding: "utf8" });
    if (r.status === 0) return false;
  }
  return true;
}

function main() {
  mkdirSync(PACKAGES, { recursive: true });

  if (physicalHome()) {
    if (!existsSync(DIST)) {
      console.error(`physical packages/webir present but dist missing: ${DIST}`);
      console.error("Build in-pillar:");
      console.error("  npm run build:webir");
      process.exit(1);
    }
    console.log(`ok: physical WebIR home ${LINK}`);
    console.log("    SoR: chrysalis-cwl (Convert must reverse-junction — WEBIR-FLIP-REQUESTED.md)");
    console.log("    prove: npm run smoke:webir");
    return;
  }

  if (!existsSync(TARGET)) {
    console.error(`target missing: ${TARGET}`);
    console.error("Need either committed packages/webir in this repo, or sibling Convert webir.");
    console.error("See packages/WEBIR.md");
    process.exit(1);
  }
  if (!existsSync(join(TARGET, "dist/index.js"))) {
    console.error(`webir dist missing: ${join(TARGET, "dist/index.js")}`);
    console.error("Build Convert webir first, or prefer in-pillar: npm run build:webir");
    process.exit(1);
  }

  if (existsSync(LINK)) {
    if (existsSync(DIST)) {
      console.log(`ok: packages/webir resolves dist (legacy link)`);
      console.log(`    ${LINK} → ${TARGET}`);
      return;
    }
    const st = lstatSync(LINK);
    if (st.isSymbolicLink() || (process.platform === "win32" && !st.isFile())) {
      rmSync(LINK, { recursive: true, force: true });
    } else {
      console.error(`refusing to replace non-link path: ${LINK}`);
      process.exit(1);
    }
  }

  if (process.platform === "win32") {
    const r = spawnSync("cmd", ["/c", "mklink", "/J", LINK, TARGET], { encoding: "utf8" });
    if (r.status !== 0) {
      console.error(r.stdout || r.stderr || "mklink failed");
      process.exit(r.status ?? 1);
    }
  } else {
    symlinkSync(TARGET, LINK, "dir");
  }
  console.log(`linked (legacy): ${LINK} → ${TARGET}`);
  console.log("Prefer physical home in chrysalis-cwl — see WEBIR-FLIP-REQUESTED.md");
}

main();
