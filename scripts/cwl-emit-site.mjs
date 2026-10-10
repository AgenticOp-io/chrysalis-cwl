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
  const assetsDir = opts.assetsDir
    ? resolve(opts.assetsDir)
    : defaultCwlSiteAssetsDir(file);
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
  const localAssetRe =
    /(?:src|href)=["']\/([A-Za-z0-9._/-]+\.(?:css|svg|png|jpe?g|webp|ico|gif|woff2?|ttf|otf))["']/g;
  const cssUrlRe = /url\(\s*["']?\/([A-Za-z0-9._/-]+\.(?:css|svg|png|jpe?g|webp|ico|gif|woff2?|ttf|otf))["']?\s*\)/g;
  for (const route of routes) {
    for (const href of route.styles ?? []) {
      if (typeof href === "string" && href.startsWith("/") && !href.startsWith("//")) {
        assetNames.add(href.slice(1));
      }
    }
    for (const image of route.images ?? []) {
      const href = typeof image === "string" ? image : image?.path;
      if (typeof href === "string" && href.startsWith("/") && !href.startsWith("//")) {
        assetNames.add(href.slice(1));
      }
    }
  }
  for (const rel of written) {
    const html = readFileSync(join(outDir, rel), "utf8");
    localAssetRe.lastIndex = 0;
    let match;
    while ((match = localAssetRe.exec(html)) != null) {
      assetNames.add(match[1]);
    }
  }
  /** @type {string[]} */
  const copied = [];
  /** @type {string[]} */
  const missingAssets = [];
  if (assetsDir) {
    const pending = [...assetNames];
    while (pending.length) {
      const name = pending.pop();
      if (copied.includes(name) || missingAssets.includes(name)) continue;
      const src = join(assetsDir, name);
      if (!existsSync(src)) {
        missingAssets.push(name);
        continue;
      }
      const dest = join(outDir, name);
      mkdirSync(dirname(dest), { recursive: true });
      copyFileSync(src, dest);
      copied.push(name);
      if (/\.css$/i.test(name)) {
        const css = readFileSync(src, "utf8");
        cssUrlRe.lastIndex = 0;
        let match;
        while ((match = cssUrlRe.exec(css)) != null) {
          if (!assetNames.has(match[1])) {
            assetNames.add(match[1]);
            pending.push(match[1]);
          }
        }
      }
    }
  }
  const existingFirebasePath = join(outDir, "firebase.json");
  let wroteFirebase = false;
  if (existsSync(existingFirebasePath)) {
    // Preserve site-lane firebase.json (targets / multi-hosting). Do not clobber.
    wroteFirebase = false;
  } else {
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
    writeFileSync(existingFirebasePath, `${JSON.stringify(hosting, null, 2)}\n`, "utf8");
    wroteFirebase = true;
  }
  return {
    kind: "chrysalis.cwl.host-site-emit",
    schemaVersion: 1,
    file,
    outDir,
    year,
    pages: written.length,
    written,
    assets: copied,
    missingAssets,
    assetsDir,
    errorDocument: errorDoc,
    wroteFirebase,
  };
}

/**
 * Default asset root next to a site genome: <dir>/assets
 * @param {string} cwlFile
 */
export function defaultCwlSiteAssetsDir(cwlFile) {
  const beside = join(dirname(resolve(cwlFile)), "assets");
  return existsSync(beside) ? beside : null;
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
  const resolvedAssets = assetsDir ?? defaultCwlSiteAssetsDir(file);
  const report = await emitCwlSite({
    file,
    outDir,
    assetsDir: resolvedAssets,
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
