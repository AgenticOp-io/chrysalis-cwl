#!/usr/bin/env node
/**
 * CWL authoring diagnostics v0 (G1152): parse errors, duplicate routes, hole catalog.
 */
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { isCataloguedFullstackHole, lookupFullstackHole } from "./cwl-fullstack-holes.mjs";
import { parseCwlModule } from "./cwl-parser.mjs";

export const CWL_DIAGNOSE_KIND = "chrysalis.cwl.diagnose";
export const CWL_DIAGNOSE_SCHEMA_VERSION = 4;

/**
 * Prefer explicit 1-based `line`, else parse "line N" / "at N" from a message.
 * @param {unknown} line
 * @param {string} [message]
 * @returns {number | undefined}
 */
export function resolveDiagLine(line, message) {
  if (Number.isFinite(line) && /** @type {number} */ (line) >= 1) {
    return Math.floor(/** @type {number} */ (line));
  }
  const m = String(message ?? "").match(/(?:line|at)\s+(\d+)/i);
  if (m) {
    const n = Number(m[1]);
    if (Number.isFinite(n) && n >= 1) return Math.floor(n);
  }
  return undefined;
}

/**
 * Prefer 0-based `character`, else alias `column`.
 * @param {unknown} character
 * @param {unknown} [column]
 * @returns {number | undefined}
 */
export function resolveDiagCharacter(character, column) {
  for (const v of [character, column]) {
    if (Number.isFinite(v) && /** @type {number} */ (v) >= 0) {
      return Math.floor(/** @type {number} */ (v));
    }
  }
  return undefined;
}

/**
 * @param {{ severity: "error"|"warn"|"info", code: string, message: string, line?: number, character?: number, column?: number }} d
 * @param {number | undefined} character
 */
function attachCharacter(d, character) {
  if (character != null) {
    d.character = character;
    d.column = character;
  }
  return d;
}

/**
 * @param {string} source
 * @param {string} [file]
 */
export function diagnoseCwlSource(source, file = "input.cwl") {
  /** @type {Array<{ severity: "error"|"warn"|"info", code: string, message: string, line?: number, character?: number, column?: number }>} */
  const diagnostics = [];

  let mod;
  try {
    mod = parseCwlModule(source, file);
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    const line = resolveDiagLine(undefined, message);
    /** @type {{ severity: "error", code: string, message: string, line?: number, character?: number, column?: number }} */
    const d = { severity: "error", code: "parse", message };
    if (line != null) d.line = line;
    diagnostics.push(d);
    return { kind: CWL_DIAGNOSE_KIND, schemaVersion: CWL_DIAGNOSE_SCHEMA_VERSION, ok: false, diagnostics };
  }

  const moduleChar = resolveDiagCharacter(mod.moduleCharacter);

  if (mod.moduleLine == null) {
    diagnostics.push({
      severity: "warn",
      code: "module-name",
      message: "missing module declaration",
      line: 1,
      character: 0,
      column: 0,
    });
  }

  const routeCount = mod.routes?.length ?? 0;
  if (routeCount === 0 && (mod.components?.length ?? 0) === 0) {
    diagnostics.push(
      attachCharacter(
        {
          severity: "info",
          code: "no-routes",
          message: "module declares no routes or components",
          line: mod.moduleLine ?? 1,
        },
        moduleChar ?? 0,
      ),
    );
  }

  const seen = new Map();
  for (const r of mod.routes ?? []) {
    const key = `${r.method} ${r.path}`;
    const routeLine = Number.isFinite(r.line) && r.line >= 1 ? r.line : undefined;
    const routeChar = resolveDiagCharacter(r.character, r.column);
    if (seen.has(key)) {
      /** @type {{ severity: "warn", code: string, message: string, line?: number, character?: number, column?: number }} */
      const d = {
        severity: "warn",
        code: "duplicate-route",
        message: `duplicate route surface ${key} (handlers ${seen.get(key)} and ${r.name})`,
      };
      if (routeLine != null) d.line = routeLine;
      attachCharacter(d, routeChar);
      diagnostics.push(d);
    } else {
      seen.set(key, r.name);
    }

    /** @type {Array<{ reason: string, line?: number, character?: number }>} */
    const holeSites = [];
    const att = r.attachmentHoles ?? [];
    const attLines = r.attachmentHoleLines ?? [];
    const attChars = r.attachmentHoleCharacters ?? [];
    for (let hi = 0; hi < att.length; hi++) {
      const reason = String(att[hi]);
      const hl = attLines[hi];
      const hc = resolveDiagCharacter(attChars[hi]);
      holeSites.push({
        reason,
        line: Number.isFinite(hl) && hl >= 1 ? hl : routeLine,
        character: hc ?? routeChar,
      });
    }
    if (r.body?.kind === "hole") {
      const reason = String(r.body.reason ?? "unknown");
      if (!holeSites.some((h) => h.reason === reason)) {
        const bl = r.body.line;
        const bc = resolveDiagCharacter(r.body.character, r.body.column);
        holeSites.push({
          reason,
          line: Number.isFinite(bl) && bl >= 1 ? bl : routeLine,
          character: bc ?? routeChar,
        });
      }
    }
    for (const site of holeSites) {
      /** @type {{ severity: "info"|"warn", code: string, message: string, line?: number, character?: number, column?: number }} */
      let d;
      if (isCataloguedFullstackHole(site.reason)) {
        const entry = lookupFullstackHole(site.reason);
        d = {
          severity: "info",
          code: "catalogued-hole",
          message: `${site.reason}: ${entry?.summary ?? "catalogued"}`,
        };
      } else {
        d = {
          severity: "warn",
          code: "uncatalogued-hole",
          message: `hole ${site.reason} is not in the language hole catalog`,
        };
      }
      if (site.line != null) d.line = site.line;
      attachCharacter(d, site.character);
      diagnostics.push(d);
    }
  }

  let pageRouteCount = 0;
  let loadRouteCount = 0;
  let interpolationRouteCount = 0;
  let effectNoneRouteCount = 0;
  let effectRouteCount = 0;
  let holeRouteCount = 0;
  const layoutImports = (mod.imports ?? []).filter((imp) => /layout/i.test(imp));
  const layoutImportLines = [];
  for (let ii = 0; ii < (mod.imports ?? []).length; ii++) {
    if (/layout/i.test(mod.imports[ii])) {
      const il = mod.importLines?.[ii];
      layoutImportLines.push(Number.isFinite(il) && il >= 1 ? il : undefined);
    }
  }
  for (const r of mod.routes ?? []) {
    const routeChar = resolveDiagCharacter(r.character, r.column);
    if (r.surfaceKind === "page") pageRouteCount += 1;
    if (r.loadBody) loadRouteCount += 1;
    const effects = r.effects ?? [];
    if (effects.length === 0) effectNoneRouteCount += 1;
    else effectRouteCount += 1;
    if (r.body?.kind === "hole" || (r.attachmentHoles?.length ?? 0) > 0) {
      holeRouteCount += 1;
    }

    const bodyKind = r.body?.kind;
    if (r.surfaceKind === "page" && (bodyKind === "object" || bodyKind === "literal")) {
      diagnostics.push(
        attachCharacter(
          {
            severity: "warn",
            code: "surface-mismatch",
            message: `page route ${r.name} returns non-HTML body (${bodyKind})`,
            line: r.line,
          },
          routeChar,
        ),
      );
    }
    if (r.surfaceKind === "api" && bodyKind === "html") {
      diagnostics.push(
        attachCharacter(
          {
            severity: "warn",
            code: "surface-mismatch",
            message: `api route ${r.name} returns HTML body`,
            line: r.line,
          },
          routeChar,
        ),
      );
    }

    if (r.body?.kind === "html" && typeof r.body.value === "string") {
      const html = r.body.value;
      const names = [...(r.handlerPathParams ?? []), ...(r.handlerQueryParams ?? [])];
      if (names.some((name) => new RegExp(`\\b${name}\\b`).test(html))) interpolationRouteCount += 1;
      for (const name of names) {
        if (!new RegExp(`\\b${name}\\b`).test(html)) {
          diagnostics.push(
            attachCharacter(
              {
                severity: "warn",
                code: "param-unused",
                message: `route ${r.name} declares param ${name} but HTML does not reference it`,
                line: r.line,
              },
              routeChar,
            ),
          );
        }
      }
    }
  }

  if (layoutImports.length > 0 && pageRouteCount === 0) {
    diagnostics.push(
      attachCharacter(
        {
          severity: "warn",
          code: "layout-import-unused",
          message: `layout import(s) ${layoutImports.join(", ")} but no @page routes`,
          line: layoutImportLines[0] ?? mod.moduleLine ?? 1,
        },
        moduleChar,
      ),
    );
  } else if (layoutImports.length > 0) {
    diagnostics.push(
      attachCharacter(
        {
          severity: "info",
          code: "layout-import",
          message: `layout module(s): ${layoutImports.join(", ")}`,
          line: layoutImportLines[0] ?? mod.moduleLine ?? 1,
        },
        moduleChar,
      ),
    );
  }

  const errors = diagnostics.filter((d) => d.severity === "error").length;
  const warnCount = diagnostics.filter((d) => d.severity === "warn").length;
  const infoCount = diagnostics.filter((d) => d.severity === "info").length;
  return {
    kind: CWL_DIAGNOSE_KIND,
    schemaVersion: CWL_DIAGNOSE_SCHEMA_VERSION,
    ok: errors === 0,
    routeCount,
    pageRouteCount,
    loadRouteCount,
    interpolationRouteCount,
    effectNoneRouteCount,
    effectRouteCount,
    holeRouteCount,
    layoutImportCount: layoutImports.length,
    warnCount,
    infoCount,
    diagnostics,
  };
}

/**
 * @param {string} cwlPath
 */
export async function diagnoseCwlFile(cwlPath) {
  const abs = resolve(cwlPath);
  const source = await readFile(abs, "utf8");
  return diagnoseCwlSource(source, abs);
}

async function main() {
  const cwlPath = process.argv[2];
  if (!cwlPath) {
    console.error("usage: cwl-diagnose.mjs <path/to/file.cwl>");
    process.exit(1);
  }
  const report = await diagnoseCwlFile(cwlPath);
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  process.exit(report.ok ? 0 : 1);
}

const isCli = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isCli) {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
