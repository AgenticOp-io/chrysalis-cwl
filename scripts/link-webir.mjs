#!/usr/bin/env node
/**
 * Home `@chrysalis/webir` under the CWL pillar via junction/symlink:
 *   packages/webir → ../chrysalis-convert/packages/webir
 *
 * Idempotent. Does not modify convert (flip convert→cwl is Slice 3 — see
 * docs/history/WEBIR-EXTRACT-PLAN.md and packages/WEBIR.md).
 */
import { existsSync, lstatSync, mkdirSync, rmSync, symlinkSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const PACKAGES = join(ROOT, "packages");
const LINK = join(PACKAGES, "webir");
const TARGET = resolve(ROOT, "../chrysalis-convert/packages/webir");

function main() {
  if (!existsSync(TARGET)) {
    console.error(`target missing: ${TARGET}`);
    console.error("Need sibling chrysalis-convert with packages/webir (and built dist/).");
    process.exit(1);
  }
  if (!existsSync(join(TARGET, "dist/index.js"))) {
    console.error(`webir dist missing: ${join(TARGET, "dist/index.js")}`);
    console.error("Build convert webir first: pnpm --filter @chrysalis/webir build");
    process.exit(1);
  }

  mkdirSync(PACKAGES, { recursive: true });

  if (existsSync(LINK)) {
    const st = lstatSync(LINK);
    // Already a reparse / symlink — leave alone if it points at a usable dist
    if (existsSync(join(LINK, "dist/index.js"))) {
      console.log(`ok: pillar home packages/webir resolves dist`);
      console.log(`    ${LINK} → ${TARGET}`);
      console.log("    next: convert flip (convert packages/webir → this tree) — see packages/WEBIR.md");
      return;
    }
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
  console.log(`linked: pillar home ${LINK} → ${TARGET}`);
  console.log("run: npm run smoke:webir");
}

main();
