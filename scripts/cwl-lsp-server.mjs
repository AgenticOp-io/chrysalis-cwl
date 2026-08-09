#!/usr/bin/env node
/**
 * Minimal CWL Language Server — JSON-RPC 2.0 over stdio (LSP framing).
 * Wraps mapDiagnoseSource + formatCwlSource. Not a full IDE language server.
 *
 * Usage: node scripts/cwl-lsp-server.mjs
 */
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";
import { formatCwlSource } from "./hub-ingest/cwl-fmt.mjs";
import { mapDiagnoseSource } from "./hub-ingest/cwl-lsp-map.mjs";
import { parseCwlModule } from "./hub-ingest/cwl-parser.mjs";

export const CWL_LSP_SERVER_KIND = "chrysalis.cwl.lsp-server";
export const CWL_LSP_SERVER_VERSION = "0.1.11";

/** CompletionItemKind.Keyword */
const KIND_KEYWORD = 14;
/** CompletionItemKind.Text */
const KIND_TEXT = 1;

/**
 * v0 keyword / surface / effect catalog (context-light; no import or path smarts).
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
  // Common effect presets (RFC-0007)
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
 * Keyword / surface / effect completion (v0 — context-light).
 * @param {string} text
 * @param {{ line: number, character: number }} position
 * @returns {Array<{ label: string, kind: number, detail: string, insertText?: string }>}
 */
export function completionsAt(text, position) {
  const lines = text.split(/\r?\n/);
  const lineText = lines[position.line] ?? "";
  const prefix = completionPrefix(lineText, position.character);
  const lower = prefix.toLowerCase();
  const items = [];
  for (const entry of CWL_COMPLETION_CATALOG) {
    if (lower && !entry.label.toLowerCase().startsWith(lower)) continue;
    /** @type {{ label: string, kind: number, detail: string, insertText?: string }} */
    const item = {
      label: entry.label,
      kind: entry.kind,
      detail: entry.detail,
    };
    if (entry.insertText) item.insertText = entry.insertText;
    items.push(item);
  }
  return items;
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
            triggerCharacters: ["@", "."],
            resolveProvider: false,
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
      respond(id ?? null, completionsAt(doc.text, params.position));
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
