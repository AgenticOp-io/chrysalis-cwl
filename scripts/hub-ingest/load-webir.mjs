/**
 * Resolve `@chrysalis/webir` from the language pillar without convert cwd hacks.
 *
 * Order:
 * 1. `packages/webir/dist` (junction or future in-tree extract)
 * 2. Sibling `../chrysalis-convert/packages/webir/dist`
 * 3. Package name import (when workspace / file: dep is installed)
 */
import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const CWL_ROOT = resolve(HERE, "../..");

/**
 * @returns {string[]}
 */
export function webirCandidatePaths() {
  return [
    join(CWL_ROOT, "packages/webir/dist/index.js"),
    join(CWL_ROOT, "../chrysalis-convert/packages/webir/dist/index.js"),
  ];
}

/**
 * Absolute path to a loadable webir entry, or null if only package-name import remains.
 * @returns {string | null}
 */
export function resolveWebirEntryPath() {
  for (const p of webirCandidatePaths()) {
    if (existsSync(p)) return p;
  }
  return null;
}

/**
 * @returns {Promise<typeof import("@chrysalis/webir")>}
 */
export async function loadWebir() {
  const entry = resolveWebirEntryPath();
  if (entry) {
    return import(pathToFileURL(entry).href);
  }
  try {
    return await import("@chrysalis/webir");
  } catch (err) {
    const tried = webirCandidatePaths().join("\n  - ");
    throw new Error(
      `Cannot resolve @chrysalis/webir. Tried:\n  - ${tried}\n  - import("@chrysalis/webir")\n` +
        `Run: npm run link:webir  (junction to convert) or install a file:/workspace dep.\n` +
        `See docs/history/WEBIR-EXTRACT-PLAN.md.\n` +
        `Cause: ${err instanceof Error ? err.message : String(err)}`,
    );
  }
}
