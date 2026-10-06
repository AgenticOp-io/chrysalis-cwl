/**
 * Emit a CWL module as static HTML files for Hosting.
 * Host year and device tokens are filled. CSS/image bytes stay host files.
 * Usage: node scripts/cwl-emit-site.mjs <file.cwl> --out <dir> [--assets <dir>] [--year 2026]
 */
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { resolveCwlModuleFromPath } from "./hub-ingest/cwl-module-graph.mjs";
import { renderCwlLiveDocument } from "./cwl-live-document.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

/**
 * @param {string} routePath
 */
export function cwlRoutePathToFile(routePath) {
  if (routePath === "/" || routePath === "") return "index.html";
  const cleaned = routePath.replace(/^\//, "");
  if (cleaned.endsWith(".html")) return cleaned;
  if (cleaned.endsWith("/")) return `${cleaned}index.html`;
  return `${cleaned}.html`;
}

/**
 * @param {{ file: string, outDir: string, assetsDir?: string | null, year?: number }} opts
 */
export async function emitCwlSite(opts) {
  const file = resolve(opts.file);
  const outDir = resolve(opts.outDir);
  const year = Number.isInteger(opts.year) ? opts.year : new Date().getUTCFullYear();
  const assetsDir = opts.assetsDir ? resolve(opts.assetsDir) : null;
  const parsed = resolveCwlModuleFromPath(file);
  const routes = (parsed.routes ?? []).filter(
    (route) => String(route.method).toUpperCase() === "GET" && route.body?.kind === "html",
  );
  mkdirSync(outDir, { recursive: true });
  /** @type {string[]} */
  const written = [];
  /** @type {string | null} */
  let errorDoc = null;
  for (const route of routes) {
    if (route.hostFirebase?.errorDoc) errorDoc = route.hostFirebase.errorDoc;
    const rendered = await renderCwlLiveDocument(
      file,
      { method: "GET", path: route.path, query: {} },
      { year },
    );
    if (rendered.status >= 500) {
      throw new Error(`emit failed for ${route.path}: ${rendered.body}`);
    }
    const rel = cwlRoutePathToFile(route.path);
    const dest = join(outDir, rel);
    mkdirSync(dirname(dest), { recursive: true });
    writeFileSync(dest, rendered.body, "utf8");
    written.push(rel);
  }
  const assetNames = new Set();
  for (const route of routes) {
    for (const href of route.styles ?? []) {
      if (typeof href === "string" && href.startsWith("/")) assetNames.add(href.slice(1));
    }
    for (const image of route.images ?? []) {
      const href = typeof image === "string" ? image : image?.path;
      if (typeof href === "string" && href.startsWith("/")) assetNames.add(href.slice(1));
    }
  }
  /** @type {string[]} */
  const copied = [];
  if (assetsDir) {
    for (const name of assetNames) {
      const src = join(assetsDir, name);
      if (!existsSync(src)) continue;
      const dest = join(outDir, name);
      mkdirSync(dirname(dest), { recursive: true });
      copyFileSync(src, dest);
      copied.push(name);
    }
  }
  const hosting = {
    hosting: {
      public: ".",
      ignore: ["firebase.json", "**/.*", "**/node_modules/**", "**/*.md"],
      ...(errorDoc ? { errorDocument: basename(errorDoc) } : {}),
      headers: [
        {
          source: "**/*.@(html)",
          headers: [{ key: "Cache-Control", value: "no-cache, no-store, must-revalidate" }],
        },
      ],
    },
  };
  writeFileSync(join(outDir, "firebase.json"), `${JSON.stringify(hosting, null, 2)}\n`, "utf8");
  return {
    kind: "chrysalis.cwl.host-site-emit",
    schemaVersion: 1,
    file,
    outDir,
    year,
    pages: written.length,
    written,
    assets: copied,
    errorDocument: errorDoc,
  };
}

async function main(argv) {
  let file = null;
  let outDir = null;
  let assetsDir = null;
  let year = null;
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--out" && argv[i + 1]) outDir = argv[++i];
    else if (arg === "--assets" && argv[i + 1]) assetsDir = argv[++i];
    else if (arg === "--year" && argv[i + 1]) year = Number(argv[++i]);
    else if (!arg.startsWith("--") && !file) file = arg;
  }
  if (!file || !outDir) {
    console.error("usage: node scripts/cwl-emit-site.mjs <file.cwl> --out <dir> [--assets <dir>] [--year 2026]");
    process.exit(1);
  }
  const report = await emitCwlSite({
    file,
    outDir,
    assetsDir,
    ...(Number.isInteger(year) ? { year } : {}),
  });
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main(process.argv.slice(2)).catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  });
}
