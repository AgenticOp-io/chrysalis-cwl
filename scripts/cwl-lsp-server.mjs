#!/usr/bin/env node
/**
 * Minimal CWL Language Server — JSON-RPC 2.0 over stdio (LSP framing).
 * Wraps mapDiagnoseSource + formatCwlSource. Not a full IDE language server.
 *
 * Usage: node scripts/cwl-lsp-server.mjs
 */
import { pathToFileURL } from "node:url";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { formatCwlSource } from "./hub-ingest/cwl-fmt.mjs";
import { mapDiagnoseSource } from "./hub-ingest/cwl-lsp-map.mjs";
import { parseCwlModule } from "./hub-ingest/cwl-parser.mjs";
import { listCwlImportGraph } from "./hub-ingest/cwl-module-graph.mjs";

export const CWL_LSP_SERVER_KIND = "chrysalis.cwl.lsp-server";
export const CWL_LSP_SERVER_VERSION = "1.0.3";

/** CompletionItemKind.Keyword */
const KIND_KEYWORD = 14;
/** CompletionItemKind.Text */
const KIND_TEXT = 1;
/** CompletionItemKind.Function */
const KIND_FUNCTION = 3;
/** CompletionItemKind.File */
const KIND_FILE = 17;
/** CompletionItemKind.EnumMember */
const KIND_ENUM_MEMBER = 20;

/**
 * Base keyword / surface / effect catalog.
 * @type {ReadonlyArray<{ label: string, kind: number, detail: string, insertText?: string }>}
 */
export const CWL_COMPLETION_CATALOG = Object.freeze([
  { label: "module", kind: KIND_KEYWORD, detail: "CWL module declaration", insertText: "module " },
  { label: "@route", kind: KIND_KEYWORD, detail: "API route surface", insertText: '@route GET "/"' },
  { label: "@page", kind: KIND_KEYWORD, detail: "Page surface", insertText: '@page GET "/"' },
  {
    label: "@component",
    kind: KIND_KEYWORD,
    detail: "UI component declaration",
    insertText: "@component ",
  },
  { label: "handler", kind: KIND_KEYWORD, detail: "Route handler block", insertText: "handler " },
  { label: "page", kind: KIND_KEYWORD, detail: "Page handler block", insertText: "page " },
  { label: "effects", kind: KIND_KEYWORD, detail: "Declared effects line", insertText: "effects: " },
  { label: "hole", kind: KIND_KEYWORD, detail: "Honest unsupported region", insertText: "hole " },
  { label: "return", kind: KIND_KEYWORD, detail: "Handler return", insertText: "return " },
  { label: "load", kind: KIND_KEYWORD, detail: "Page data load", insertText: "load " },
  { label: "use", kind: KIND_KEYWORD, detail: "Module preset (json / auth / …)", insertText: "use " },
]);

/** @type {ReadonlyArray<{ label: string, kind: number, detail: string }>} */
export const CWL_EFFECT_PRESETS = Object.freeze([
  { label: "none", kind: KIND_TEXT, detail: "Effect preset: none" },
  { label: "io", kind: KIND_TEXT, detail: "Effect preset: io" },
  { label: "db.read", kind: KIND_TEXT, detail: "Effect preset: db.read" },
  { label: "db.write", kind: KIND_TEXT, detail: "Effect preset: db.write" },
  { label: "session.read", kind: KIND_TEXT, detail: "Effect preset: session.read" },
  { label: "session.write", kind: KIND_TEXT, detail: "Effect preset: session.write" },
  { label: "time.now", kind: KIND_TEXT, detail: "Effect preset: time.now" },
  { label: "random", kind: KIND_TEXT, detail: "Effect preset: random" },
  { label: "mail.send", kind: KIND_TEXT, detail: "Effect preset: mail.send" },
  { label: "auth.require", kind: KIND_TEXT, detail: "Effect preset: auth.require" },
  { label: "cors.allow", kind: KIND_TEXT, detail: "Effect preset: cors.allow" },
  { label: "csrf.verify", kind: KIND_TEXT, detail: "Effect preset: csrf.verify" },
]);

/** @type {ReadonlyArray<{ label: string, kind: number, detail: string, insertText?: string }>} */
export const CWL_HTTP_METHODS = Object.freeze(
  ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"].map((m) => ({
    label: m,
    kind: KIND_ENUM_MEMBER,
    detail: `HTTP method ${m}`,
    insertText: `${m} `,
  })),
);

/** @type {Map<string, { uri: string, text: string, version: number }>} */
const documents = new Map();

let buffer = Buffer.alloc(0);
let shuttingDown = false;
let exitCode = 1;

/**
 * @param {unknown} msg
 */
function writeMessage(msg) {
  const body = Buffer.from(JSON.stringify(msg), "utf8");
  const header = Buffer.from(`Content-Length: ${body.length}\r\n\r\n`, "utf8");
  process.stdout.write(Buffer.concat([header, body]));
}

/**
 * @param {string|number|null} id
 * @param {unknown} result
 */
function respond(id, result) {
  writeMessage({ jsonrpc: "2.0", id, result });
}

/**
 * @param {string|number|null} id
 * @param {number} code
 * @param {string} message
 */
function respondError(id, code, message) {
  writeMessage({ jsonrpc: "2.0", id, error: { code, message } });
}

/**
 * @param {string} method
 * @param {unknown} params
 */
function notify(method, params) {
  writeMessage({ jsonrpc: "2.0", method, params });
}

/**
 * @param {"Error"|"Warning"|"Information"|"Hint"} severity
 * @returns {number}
 */
function lspSeverityNumber(severity) {
  if (severity === "Error") return 1;
  if (severity === "Warning") return 2;
  if (severity === "Hint") return 4;
  return 3;
}

/**
 * @param {string} uri
 * @param {string} text
 */
function publishDiagnostics(uri, text) {
  const file = uriToPath(uri);
  const mapped = mapDiagnoseSource(text, file, uri);
  const diagnostics = (mapped.diagnostics ?? []).map((d) => ({
    range: d.range,
    severity: lspSeverityNumber(d.severity),
    code: d.code,
    source: d.source || "cwl",
    message: d.message,
  }));
  notify("textDocument/publishDiagnostics", { uri, diagnostics });
}

/**
 * @param {string} uri
 */
function uriToPath(uri) {
  try {
    if (uri.startsWith("file://")) {
      let p = decodeURIComponent(uri.slice("file://".length));
      if (/^\/[A-Za-z]:/.test(p)) p = p.slice(1);
      return p.replace(/\//g, process.platform === "win32" ? "\\" : "/");
    }
  } catch {
    /* fall through */
  }
  return uri.replace(/^file:\/\//, "") || "stdin.cwl";
}

/**
 * Prefix under the cursor for cheap filtering (word / @word / dotted effect).
 * @param {string} lineText
 * @param {number} character
 */
function completionPrefix(lineText, character) {
  const before = lineText.slice(0, Math.max(0, character));
  const m = /(@?[A-Za-z_][\w.-]*)$/.exec(before);
  return m ? m[1] : "";
}

/**
 * @param {string} lineText
 * @param {number} character
 */
function lineContext(lineText, character) {
  const before = lineText.slice(0, Math.max(0, character));
  if (/^\s*effects\s*:/.test(before) || /\beffects\s*:\s*[^;]*$/.test(before)) {
    return "effects";
  }
  if (/^\s*@(?:route|page)\s+$/.test(before) || /^\s*@(?:route|page)\s+[A-Za-z]*$/.test(before)) {
    return "http-method";
  }
  if (/^\s*(?:handler|page)\s+$/.test(before) || /^\s*(?:handler|page)\s+[A-Za-z_][\w]*$/.test(before)) {
    return "handler-name";
  }
  return "general";
}

/**
 * @param {Array<{ label: string, kind: number, detail: string, insertText?: string }>} items
 * @param {string} prefix
 * @param {{ pathMode?: boolean }} [opts]
 */
function filterByPrefix(items, prefix, opts = {}) {
  const lower = prefix.toLowerCase();
  /** @type {typeof items} */
  const out = [];
  /** @type {Set<string>} */
  const seen = new Set();
  for (const entry of items) {
    if (lower) {
      const lab = entry.label.toLowerCase();
      if (opts.pathMode) {
        if (!entry.label.startsWith(prefix)) continue;
      } else if (!lab.startsWith(lower)) {
        continue;
      }
    }
    if (seen.has(entry.label)) continue;
    seen.add(entry.label);
    /** @type {{ label: string, kind: number, detail: string, insertText?: string }} */
    const item = {
      label: entry.label,
      kind: entry.kind,
      detail: entry.detail,
    };
    if (entry.insertText) item.insertText = entry.insertText;
    out.push(item);
  }
  return out;
}

/**
 * Keyword / surface / effect completion (v1 — same-file AST hints).
 * @param {string} text
 * @param {{ line: number, character: number }} position
 * @param {string} [fileHint]
 * @returns {Array<{ label: string, kind: number, detail: string, insertText?: string }>}
 */
export function completionsAt(text, position, fileHint = "buffer.cwl") {
  const lines = text.split(/\r?\n/);
  const lineText = lines[position.line] ?? "";
  const prefix = completionPrefix(lineText, position.character);
  const ctx = lineContext(lineText, position.character);

  /** @type {Array<{ label: string, kind: number, detail: string, insertText?: string }>} */
  let pool = [];

  if (ctx === "effects") {
    pool = [...CWL_EFFECT_PRESETS];
  } else if (ctx === "http-method") {
    pool = [...CWL_HTTP_METHODS];
  } else if (ctx === "handler-name") {
    try {
      const ast = parseCwlModule(text, fileHint);
      for (const r of ast.routes ?? []) {
        if (!r?.name) continue;
        pool.push({
          label: r.name,
          kind: KIND_FUNCTION,
          detail: `Same-file ${r.surfaceKind === "page" ? "page" : "handler"} (${r.method} ${r.path})`,
          insertText: `${r.name} `,
        });
      }
    } catch {
      /* catalog empty ok */
    }
  } else {
    pool = [...CWL_COMPLETION_CATALOG, ...CWL_EFFECT_PRESETS, ...CWL_HTTP_METHODS];
    try {
      const ast = parseCwlModule(text, fileHint);
      for (const r of ast.routes ?? []) {
        if (r?.name) {
          pool.push({
            label: r.name,
            kind: KIND_FUNCTION,
            detail: `Handler ${r.method} ${r.path}`,
          });
        }
        if (typeof r?.path === "string") {
          pool.push({
            label: r.path,
            kind: KIND_FILE,
            detail: `Path → ${r.name}`,
            insertText: `"${r.path}"`,
          });
        }
      }
    } catch {
      /* keep catalog */
    }
  }

  // Path-prefix: if typing inside / after quote, also match path labels
  const before = lineText.slice(0, Math.max(0, position.character));
  const pathPrefix = /"([^"]*)$/.exec(before)?.[1];
  if (pathPrefix !== undefined && ctx === "general") {
    try {
      const ast = parseCwlModule(text, fileHint);
      for (const r of ast.routes ?? []) {
        if (typeof r?.path === "string" && r.path.startsWith(pathPrefix)) {
          pool.push({
            label: r.path,
            kind: KIND_FILE,
            detail: `Path → ${r.name}`,
            insertText: r.path,
          });
        }
      }
    } catch {
      /* ignore */
    }
    return filterByPrefix(
      pool.filter((i) => i.kind === KIND_FILE),
      pathPrefix,
      { pathMode: true },
    );
  }

  return filterByPrefix(pool, prefix);
}

/**
 * Identifier or path-string token under the cursor (cheap; line-local).
 * @param {string} lineText
 * @param {number} character
 * @returns {{ kind: "ident"|"path", value: string, start: number, end: number }|null}
 */
export function tokenAt(lineText, character) {
  const ch = Math.max(0, Math.min(character, lineText.length));
  // Prefer string literal when cursor is inside "…"
  for (let i = 0; i < lineText.length; i++) {
    if (lineText[i] !== '"') continue;
    let j = i + 1;
    let value = "";
    while (j < lineText.length) {
      const c = lineText[j];
      if (c === '"') break;
      if (c === "\\" && j + 1 < lineText.length) {
        value += lineText[j + 1];
        j += 2;
        continue;
      }
      value += c;
      j += 1;
    }
    if (j >= lineText.length) break;
    // Inclusive of closing quote so click on trailing " still resolves
    if (ch >= i && ch <= j) {
      return { kind: "path", value, start: i, end: j + 1 };
    }
    i = j;
  }
  let start = ch;
  let end = ch;
  while (start > 0 && /[A-Za-z0-9_]/.test(lineText[start - 1])) start -= 1;
  while (end < lineText.length && /[A-Za-z0-9_]/.test(lineText[end])) end += 1;
  if (start === end) return null;
  if (!/^[A-Za-z_]/.test(lineText[start])) return null;
  return {
    kind: "ident",
    value: lineText.slice(start, end),
    start,
    end,
  };
}

/**
 * Location of a route/page surface line (AST `line` is 1-based).
 * @param {string} uri
 * @param {string} text
 * @param {{ line?: number, path?: string, method?: string, name?: string }} route
 */
function routeSurfaceLocation(uri, text, route) {
  if (typeof route.line !== "number" || route.line < 1) return null;
  const lines = text.split(/\r?\n/);
  const line0 = route.line - 1;
  const lineText = lines[line0] ?? "";
  return {
    uri,
    range: {
      start: { line: line0, character: 0 },
      end: { line: line0, character: lineText.length },
    },
  };
}

/** Keywords that are never handler/route names. */
const NON_HANDLER_IDENTS = new Set([
  "handler",
  "page",
  "module",
  "effects",
  "return",
  "load",
  "hole",
  "use",
  "route",
  "component",
]);

/**
 * Import-graph files for LSP (RFC-0009). Falls back to the current file only.
 * @param {string} file
 * @param {string} [graphEntry]
 * @returns {string[]}
 */
function graphFilesFor(file, graphEntry) {
  const entry = resolve(graphEntry || file);
  if (!existsSync(entry)) return [resolve(file)];
  try {
    return listCwlImportGraph(entry);
  } catch {
    return [resolve(file)];
  }
}

/**
 * @param {string} absPath
 * @param {string} currentFile
 * @param {string} currentText
 * @param {string} currentUri
 */
function textAndUriFor(absPath, currentFile, currentText, currentUri) {
  const abs = resolve(absPath);
  const cur = resolve(currentFile);
  if (abs === cur) return { text: currentText, uri: currentUri };
  return { text: readFileSync(abs, "utf8"), uri: pathToFileURL(abs).href };
}

/**
 * Cheap go-to-definition: handler name or path string → @route/@page line
 * (searches RFC-0009 import graph when on disk).
 * @param {string} text
 * @param {string} uri
 * @param {{ line: number, character: number }} position
 * @param {{ graphEntry?: string }} [opts]
 * @returns {Array<{ uri: string, range: { start: { line: number, character: number }, end: { line: number, character: number } } }>}
 */
export function definitionAt(text, uri, position, opts = {}) {
  const file = uriToPath(uri);
  const lines = text.split(/\r?\n/);
  const lineText = lines[position.line] ?? "";
  const tok = tokenAt(lineText, position.character);
  if (!tok) return [];
  if (tok.kind === "ident" && NON_HANDLER_IDENTS.has(tok.value)) return [];

  /** @type {Array<{ uri: string, range: { start: { line: number, character: number }, end: { line: number, character: number } } }>} */
  const locs = [];
  /** @type {Set<string>} */
  const seen = new Set();

  for (const f of graphFilesFor(file, opts.graphEntry)) {
    try {
      const { text: t, uri: u } = textAndUriFor(f, file, text, uri);
      const ast = parseCwlModule(t, f);
      const routes = ast.routes ?? [];
      /** @type {typeof routes} */
      let matches = [];
      if (tok.kind === "path") {
        matches = routes.filter((r) => r.path === tok.value && typeof r.line === "number");
      } else {
        matches = routes.filter((r) => r.name === tok.value && typeof r.line === "number");
      }
      for (const r of matches) {
        const loc = routeSurfaceLocation(u, t, r);
        if (!loc) continue;
        const key = `${loc.uri}:${loc.range.start.line}:${loc.range.start.character}`;
        if (seen.has(key)) continue;
        seen.add(key);
        locs.push(loc);
      }
    } catch {
      /* skip unreadable fragment */
    }
  }
  return locs;
}

/**
 * Escape a string for use inside a RegExp source.
 * @param {string} s
 */
function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Same-file range of the `handler`/`page` declaration name for a route (AST-visible only).
 * AST stores `name` + `@route`/`@page` line; the name token lives on the following block line.
 * @param {string} text
 * @param {{ name?: string, line?: number, surfaceKind?: string }} route
 * @returns {{ start: { line: number, character: number }, end: { line: number, character: number } }|null}
 */
export function handlerNameDeclRange(text, route) {
  if (!route?.name || typeof route.line !== "number" || route.line < 1) return null;
  const lines = text.split(/\r?\n/);
  const kw = route.surfaceKind === "page" ? "page" : "handler";
  const re = new RegExp(`^(\\s*${kw}\\s+)(${escapeRegExp(route.name)})\\b`);
  // Parser requires the block line immediately after the surface; scan a few lines for resilience.
  const startIdx = Math.max(0, route.line - 1);
  const endIdx = Math.min(lines.length, startIdx + 6);
  for (let i = startIdx; i < endIdx; i++) {
    const m = re.exec(lines[i] ?? "");
    if (!m) continue;
    const startChar = m[1].length;
    return {
      start: { line: i, character: startChar },
      end: { line: i, character: startChar + route.name.length },
    };
  }
  return null;
}

/**
 * @param {string} name
 */
function isValidHandlerName(name) {
  return /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(name);
}

/**
 * prepareRename: handler/route `name` token only (same-file declaration).
 * @param {string} text
 * @param {string} uri
 * @param {{ line: number, character: number }} position
 * @returns {{ range: object, placeholder: string }|null}
 */
export function prepareRenameAt(text, uri, position) {
  const file = uriToPath(uri);
  const lines = text.split(/\r?\n/);
  const lineText = lines[position.line] ?? "";
  const tok = tokenAt(lineText, position.character);
  if (!tok || tok.kind !== "ident" || NON_HANDLER_IDENTS.has(tok.value)) return null;

  try {
    const ast = parseCwlModule(text, file);
    const matches = (ast.routes ?? []).filter(
      (r) => r.name === tok.value && typeof r.line === "number",
    );
    if (matches.length < 1) return null;
    // Prefer the declaration whose name range contains the cursor; else first AST match.
    for (const r of matches) {
      const range = handlerNameDeclRange(text, r);
      if (!range) continue;
      if (
        position.line === range.start.line &&
        position.character >= range.start.character &&
        position.character <= range.end.character
      ) {
        return { range, placeholder: r.name };
      }
    }
    const range = handlerNameDeclRange(text, matches[0]);
    if (!range) return null;
    // Cursor on a name ident that matches a route but not on the decl span — still allow rename of decl.
    if (tok.value === matches[0].name) {
      return { range, placeholder: matches[0].name };
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * textDocument/rename: handler/route `name` declarations across the import graph.
 * @param {string} text
 * @param {string} uri
 * @param {{ line: number, character: number }} position
 * @param {string} newName
 * @param {{ graphEntry?: string }} [opts]
 * @returns {{ changes: Record<string, Array<{ range: object, newText: string }>> }|null}
 */
export function renameAt(text, uri, position, newName, opts = {}) {
  if (typeof newName !== "string" || !isValidHandlerName(newName)) return null;
  const prepared = prepareRenameAt(text, uri, position);
  if (!prepared) return null;

  const file = uriToPath(uri);
  const lines = text.split(/\r?\n/);
  const lineText = lines[position.line] ?? "";
  const tok = tokenAt(lineText, position.character);
  if (!tok || tok.kind !== "ident") return null;
  const oldName = tok.value;

  /** @type {Record<string, Array<{ range: object, newText: string }>>} */
  const changes = {};
  for (const f of graphFilesFor(file, opts.graphEntry)) {
    try {
      const { text: t, uri: u } = textAndUriFor(f, file, text, uri);
      const ast = parseCwlModule(t, f);
      const matches = (ast.routes ?? []).filter(
        (r) => r.name === oldName && typeof r.line === "number",
      );
      /** @type {Set<string>} */
      const seen = new Set();
      for (const r of matches) {
        const range = handlerNameDeclRange(t, r);
        if (!range) continue;
        const key = `${range.start.line}:${range.start.character}:${range.end.character}`;
        if (seen.has(key)) continue;
        seen.add(key);
        if (!changes[u]) changes[u] = [];
        changes[u].push({ range, newText: newName });
      }
    } catch {
      /* skip */
    }
  }
  if (Object.keys(changes).length < 1) return null;
  return { changes };
}

/**
 * Find-references across the RFC-0009 import graph (handler name / path surfaces).
 * @param {string} text
 * @param {string} uri
 * @param {{ line: number, character: number }} position
 * @param {boolean} [includeDeclaration]
 * @param {{ graphEntry?: string }} [opts]
 * @returns {Array<{ uri: string, range: object }>}
 */
export function referencesAt(text, uri, position, includeDeclaration = true, opts = {}) {
  const file = uriToPath(uri);
  const lines = text.split(/\r?\n/);
  const lineText = lines[position.line] ?? "";
  const tok = tokenAt(lineText, position.character);
  if (!tok) return [];
  if (tok.kind === "ident" && NON_HANDLER_IDENTS.has(tok.value)) return [];

  /** @type {Array<{ uri: string, range: object }>} */
  const locs = [];
  /** @type {Set<string>} */
  const seen = new Set();

  /**
   * @param {{ uri: string, range: object }|null} loc
   */
  function push(loc) {
    if (!loc) return;
    const key = `${loc.uri}:${loc.range.start.line}:${loc.range.start.character}:${loc.range.end.character}`;
    if (seen.has(key)) return;
    seen.add(key);
    locs.push(loc);
  }

  for (const f of graphFilesFor(file, opts.graphEntry)) {
    try {
      const { text: t, uri: u } = textAndUriFor(f, file, text, uri);
      const ast = parseCwlModule(t, f);
      const routes = ast.routes ?? [];
      if (tok.kind === "path") {
        for (const r of routes) {
          if (r.path !== tok.value) continue;
          push(routeSurfaceLocation(u, t, r));
        }
        continue;
      }
      const matches = routes.filter((r) => r.name === tok.value && typeof r.line === "number");
      for (const r of matches) {
        const decl = handlerNameDeclRange(t, r);
        if (decl && includeDeclaration) push({ uri: u, range: decl });
        push(routeSurfaceLocation(u, t, r));
      }
    } catch {
      /* skip */
    }
  }
  return locs;
}

/** SymbolKind.Function */
const SYMBOL_KIND_FUNCTION = 12;

/**
 * Document outline: @route/@page surfaces from parse AST (when lines exist).
 * @param {string} text
 * @param {string} uri
 * @returns {Array<{ name: string, detail?: string, kind: number, range: object, selectionRange: object }>}
 */
export function documentSymbols(text, uri) {
  const file = uriToPath(uri);
  try {
    const ast = parseCwlModule(text, file);
    const routes = ast.routes ?? [];
    /** @type {Array<{ name: string, detail?: string, kind: number, range: object, selectionRange: object }>} */
    const symbols = [];
    for (const r of routes) {
      const loc = routeSurfaceLocation(uri, text, r);
      if (!loc) continue;
      const surface = r.surfaceKind === "page" ? "@page" : "@route";
      symbols.push({
        name: `${r.method} ${r.path}`,
        detail: `${surface} → ${r.name}`,
        kind: SYMBOL_KIND_FUNCTION,
        range: loc.range,
        selectionRange: loc.range,
      });
    }
    return symbols;
  } catch {
    return [];
  }
}

/**
 * Cheap hover from parse AST: module name or @route/@page surface.
 * @param {string} text
 * @param {string} uri
 * @param {{ line: number, character: number }} position
 */
export function hoverAt(text, uri, position) {
  const file = uriToPath(uri);
  const line0 = position.line;
  const line1 = line0 + 1;
  const lines = text.split(/\r?\n/);
  const lineText = lines[line0] ?? "";
  const tok = tokenAt(lineText, position.character);

  try {
    const ast = parseCwlModule(text, file);
    const modLine = lines.findIndex((l) => /^\s*module\s+[a-zA-Z_]/.test(l));
    if (modLine === line0 && ast.moduleName) {
      return {
        contents: {
          kind: "markdown",
          value: `**CWL module** \`${ast.moduleName}\``,
        },
        range: {
          start: { line: line0, character: 0 },
          end: { line: line0, character: lineText.length },
        },
      };
    }
    const route = (ast.routes ?? []).find((r) => r.line === line1);
    if (route) {
      const surface = route.surfaceKind === "page" ? "@page" : "@route";
      return {
        contents: {
          kind: "markdown",
          value: `**${surface}** \`${route.method} ${route.path}\` → handler \`${route.name}\``,
        },
        range: {
          start: { line: line0, character: 0 },
          end: { line: line0, character: lineText.length },
        },
      };
    }
    // Handler / page name ident → same surface summary
    if (tok?.kind === "ident" && !NON_HANDLER_IDENTS.has(tok.value)) {
      const named = (ast.routes ?? []).find((r) => r.name === tok.value);
      if (named) {
        const surface = named.surfaceKind === "page" ? "@page" : "@route";
        return {
          contents: {
            kind: "markdown",
            value: `**${surface}** \`${named.method} ${named.path}\` → \`${named.name}\``,
          },
          range: {
            start: { line: line0, character: tok.start },
            end: { line: line0, character: tok.end },
          },
        };
      }
    }
  } catch {
    return null;
  }
  return null;
}

/**
 * @param {string} text
 * @param {string} uri
 */
function formatDocument(text, uri) {
  const file = uriToPath(uri);
  try {
    const formatted = formatCwlSource(text, file);
    if (formatted === text) return [];
    const endLine = Math.max(0, text.split(/\r?\n/).length - 1);
    const endChar = (text.split(/\r?\n/).pop() ?? "").length;
    return [
      {
        range: {
          start: { line: 0, character: 0 },
          end: { line: endLine, character: endChar },
        },
        newText: formatted,
      },
    ];
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    throw new Error(`cwl fmt failed: ${msg}`);
  }
}

/**
 * @param {{ jsonrpc?: string, id?: string|number|null, method?: string, params?: any, result?: unknown, error?: unknown }} msg
 */
function handleMessage(msg) {
  if (msg.id !== undefined && msg.method === undefined) {
    // response to a request we never send — ignore
    return;
  }
  const { id, method, params } = msg;
  if (!method) return;

  switch (method) {
    case "initialize": {
      respond(id ?? null, {
        capabilities: {
          textDocumentSync: {
            openClose: true,
            change: 1, // Full
          },
          documentFormattingProvider: true,
          hoverProvider: true,
          completionProvider: {
            triggerCharacters: ["@", ".", ":", '"', "/"],
            resolveProvider: false,
          },
          definitionProvider: true,
          referencesProvider: true,
          documentSymbolProvider: true,
          renameProvider: {
            prepareProvider: true,
          },
        },
        serverInfo: {
          name: "cwl-lsp-server",
          version: CWL_LSP_SERVER_VERSION,
        },
      });
      break;
    }
    case "initialized":
      break;
    case "shutdown": {
      shuttingDown = true;
      respond(id ?? null, null);
      break;
    }
    case "exit": {
      exitCode = shuttingDown ? 0 : 1;
      process.exit(exitCode);
      break;
    }
    case "textDocument/didOpen": {
      const doc = params?.textDocument;
      if (!doc?.uri) break;
      documents.set(doc.uri, {
        uri: doc.uri,
        text: doc.text ?? "",
        version: doc.version ?? 0,
      });
      publishDiagnostics(doc.uri, doc.text ?? "");
      break;
    }
    case "textDocument/didChange": {
      const uri = params?.textDocument?.uri;
      if (!uri) break;
      const changes = params.contentChanges ?? [];
      const last = changes[changes.length - 1];
      const text = last?.text ?? documents.get(uri)?.text ?? "";
      documents.set(uri, {
        uri,
        text,
        version: params.textDocument?.version ?? 0,
      });
      publishDiagnostics(uri, text);
      break;
    }
    case "textDocument/didClose": {
      const uri = params?.textDocument?.uri;
      if (!uri) break;
      documents.delete(uri);
      notify("textDocument/publishDiagnostics", { uri, diagnostics: [] });
      break;
    }
    case "textDocument/formatting": {
      const uri = params?.textDocument?.uri;
      const doc = uri ? documents.get(uri) : undefined;
      if (!doc) {
        respond(id ?? null, []);
        break;
      }
      try {
        respond(id ?? null, formatDocument(doc.text, uri));
      } catch (e) {
        const message = e instanceof Error ? e.message : String(e);
        respondError(id ?? null, -32603, message);
      }
      break;
    }
    case "textDocument/hover": {
      const uri = params?.textDocument?.uri;
      const doc = uri ? documents.get(uri) : undefined;
      if (!doc || !params?.position) {
        respond(id ?? null, null);
        break;
      }
      respond(id ?? null, hoverAt(doc.text, uri, params.position));
      break;
    }
    case "textDocument/completion": {
      const uri = params?.textDocument?.uri;
      const doc = uri ? documents.get(uri) : undefined;
      if (!doc || !params?.position) {
        respond(id ?? null, []);
        break;
      }
      respond(id ?? null, completionsAt(doc.text, params.position, uriToPath(uri)));
      break;
    }
    case "textDocument/references": {
      const uri = params?.textDocument?.uri;
      const doc = uri ? documents.get(uri) : undefined;
      if (!doc || !params?.position) {
        respond(id ?? null, []);
        break;
      }
      const includeDeclaration = params.context?.includeDeclaration !== false;
      respond(id ?? null, referencesAt(doc.text, uri, params.position, includeDeclaration));
      break;
    }
    case "textDocument/definition": {
      const uri = params?.textDocument?.uri;
      const doc = uri ? documents.get(uri) : undefined;
      if (!doc || !params?.position) {
        respond(id ?? null, null);
        break;
      }
      const locs = definitionAt(doc.text, uri, params.position);
      respond(id ?? null, locs.length === 0 ? null : locs.length === 1 ? locs[0] : locs);
      break;
    }
    case "textDocument/documentSymbol": {
      const uri = params?.textDocument?.uri;
      const doc = uri ? documents.get(uri) : undefined;
      if (!doc) {
        respond(id ?? null, []);
        break;
      }
      respond(id ?? null, documentSymbols(doc.text, uri));
      break;
    }
    case "textDocument/prepareRename": {
      const uri = params?.textDocument?.uri;
      const doc = uri ? documents.get(uri) : undefined;
      if (!doc || !params?.position) {
        respond(id ?? null, null);
        break;
      }
      respond(id ?? null, prepareRenameAt(doc.text, uri, params.position));
      break;
    }
    case "textDocument/rename": {
      const uri = params?.textDocument?.uri;
      const doc = uri ? documents.get(uri) : undefined;
      if (!doc || !params?.position || typeof params?.newName !== "string") {
        respond(id ?? null, null);
        break;
      }
      respond(id ?? null, renameAt(doc.text, uri, params.position, params.newName));
      break;
    }
    case "$/cancelRequest":
      break;
    default: {
      if (id !== undefined && id !== null) {
        respondError(id, -32601, `Method not found: ${method}`);
      }
      break;
    }
  }
}

/**
 * @param {Buffer} chunk
 */
function onData(chunk) {
  buffer = Buffer.concat([buffer, chunk]);
  while (true) {
    const headerEnd = buffer.indexOf("\r\n\r\n");
    if (headerEnd < 0) return;
    const header = buffer.slice(0, headerEnd).toString("utf8");
    const match = /Content-Length:\s*(\d+)/i.exec(header);
    if (!match) {
      // Drop until next plausible header
      buffer = buffer.slice(headerEnd + 4);
      continue;
    }
    const length = Number(match[1]);
    const total = headerEnd + 4 + length;
    if (buffer.length < total) return;
    const body = buffer.slice(headerEnd + 4, total).toString("utf8");
    buffer = buffer.slice(total);
    try {
      handleMessage(JSON.parse(body));
    } catch (e) {
      process.stderr.write(`[cwl-lsp] bad message: ${e}\n`);
    }
  }
}

function main() {
  process.stdin.on("data", onData);
  process.stdin.on("end", () => {
    process.exit(shuttingDown ? 0 : exitCode);
  });
  process.stderr.write(
    `[cwl-lsp] ${CWL_LSP_SERVER_KIND} ${CWL_LSP_SERVER_VERSION} listening on stdio\n`,
  );
}

const isCli =
  process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url;
if (isCli) {
  main();
}
