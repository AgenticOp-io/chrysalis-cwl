#!/usr/bin/env node
/**
 * Minimal CWL Language Server — JSON-RPC 2.0 over stdio (LSP framing).
 * Wraps mapDiagnoseSource + formatCwlSource. Not a full IDE language server.
 *
 * Usage: node scripts/cwl-lsp-server.mjs
 */
import { pathToFileURL } from "node:url";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, resolve, basename } from "node:path";
import { formatCwlSource } from "./hub-ingest/cwl-fmt.mjs";
import { mapDiagnoseSource } from "./hub-ingest/cwl-lsp-map.mjs";
import { parseCwlModule } from "./hub-ingest/cwl-parser.mjs";
import { listCwlImportGraph } from "./hub-ingest/cwl-module-graph.mjs";

export const CWL_LSP_SERVER_KIND = "chrysalis.cwl.lsp-server";
export const CWL_LSP_SERVER_VERSION = "1.0.17";

/** CompletionItemKind.Keyword */
const KIND_KEYWORD = 14;
/** CompletionItemKind.Snippet */
const KIND_SNIPPET = 15;
/** CompletionItemKind.Text */
const KIND_TEXT = 1;
/** CompletionItemKind.Function */
const KIND_FUNCTION = 3;
/** CompletionItemKind.File */
const KIND_FILE = 17;
/** CompletionItemKind.EnumMember */
const KIND_ENUM_MEMBER = 20;
/** InsertTextFormat.Snippet */
const INSERT_SNIPPET = 2;

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
  // RFC-0021 control (snippets)
  {
    label: "if",
    kind: KIND_SNIPPET,
    detail: "Early-exit / nested guard (RFC-0021)",
    insertText: "if ${1:cond} {\n  $0\n}",
  },
  {
    label: "else",
    kind: KIND_SNIPPET,
    detail: "Else branch after if (RFC-0021)",
    insertText: "else {\n  $0\n}",
  },
  {
    label: "else if",
    kind: KIND_SNIPPET,
    detail: "Else-if chain (RFC-0021)",
    insertText: "else if ${1:cond} {\n  $0\n}",
  },
  {
    label: "foreach",
    kind: KIND_SNIPPET,
    detail: "Collection binding (empty-iter / docs; RFC-0021)",
    insertText: "foreach ${1:items} as ${2:item} {\n  $0\n}",
  },
  {
    label: "repeat",
    kind: KIND_SNIPPET,
    detail: "Repeat markup per collection item (RFC-0031)",
    insertText: 'repeat ${1:items} as ${2:item} html "${3:<li>item</li>}";',
  },
  {
    label: "proxy upstream",
    kind: KIND_SNIPPET,
    detail: "Forward this route to a declared upstream (RFC-0033)",
    insertText: 'proxy upstream "${1:https://upstream.internal/path}";',
  },
  { label: "status", kind: KIND_SNIPPET, detail: "Response status", insertText: "status ${1:400};" },
  {
    label: "content-type",
    kind: KIND_SNIPPET,
    detail: "Authored response content-type",
    insertText: 'content-type "${1:application/json}";',
  },
  {
    label: "response-header",
    kind: KIND_SNIPPET,
    detail: "Authored response header",
    insertText: 'response-header ${1:name} = "${2:value}";',
  },
  // UI / islands (SSR surface)
  {
    label: "return ui",
    kind: KIND_SNIPPET,
    detail: "UI tree return (RFC-0017)",
    insertText: 'return ui {\n  element "${1:div}" {\n    $0\n  }\n};',
  },
  {
    label: "return html",
    kind: KIND_SNIPPET,
    detail: "HTML string return",
    insertText: 'return html "${1:<p></p>}";',
  },
  {
    label: "client ui",
    kind: KIND_SNIPPET,
    detail: "Client island (SSR markers; no event invent)",
    insertText: "client ui {\n  $0\n}",
  },
  {
    label: 'client ui "name"',
    kind: KIND_SNIPPET,
    detail: "Named client island (RFC-0028)",
    insertText: 'client ui "${1:island}" {\n  $0\n}',
  },
  {
    label: "element",
    kind: KIND_SNIPPET,
    detail: "UI element node",
    insertText: 'element "${1:div}" {\n  $0\n}',
  },
  { label: "text", kind: KIND_SNIPPET, detail: "UI text node", insertText: 'text "${1:}";' },
  {
    label: "on click",
    kind: KIND_SNIPPET,
    detail: "Island event surface (action name only)",
    insertText: 'on click { action "${1:noop}"; }',
  },
  {
    label: "on change",
    kind: KIND_SNIPPET,
    detail: "Change event metadata (RFC-0028)",
    insertText: 'on change { action "${1:changed}"; }',
  },
  {
    label: "on submit",
    kind: KIND_SNIPPET,
    detail: "Submit event metadata (RFC-0028)",
    insertText: 'on submit { action "${1:save}"; }',
  },
  { label: "param", kind: KIND_KEYWORD, detail: "Path param binding", insertText: "param " },
  { label: "query", kind: KIND_KEYWORD, detail: "Query binding", insertText: "query " },
  { label: "body", kind: KIND_KEYWORD, detail: "Body field binding", insertText: "body " },
  { label: "multipart field", kind: KIND_SNIPPET, detail: "Multipart form field (RFC-0026)", insertText: "multipart field ${1:name};" },
  { label: "multipart file", kind: KIND_SNIPPET, detail: "Multipart file part (RFC-0026)", insertText: "multipart file ${1:name};" },
  { label: "stream sse", kind: KIND_SNIPPET, detail: "SSE single-shot surface (RFC-0027)", insertText: "stream sse;" },
  { label: "header", kind: KIND_KEYWORD, detail: "Request header binding", insertText: "header " },
  { label: "cookie", kind: KIND_KEYWORD, detail: "Cookie binding", insertText: "cookie " },
  {
    label: "layout",
    kind: KIND_SNIPPET,
    detail: "Layout chrome wrap decl or use (RFC-0029)",
    insertText: "layout ${1:shell} {\n  chrome html \"${2:}\";\n}",
  },
  {
    label: "chrome html",
    kind: KIND_SNIPPET,
    detail: "Layout chrome HTML prefix (RFC-0029)",
    insertText: 'chrome html "${1:<header></header>}";',
  },
  {
    label: "year host",
    kind: KIND_SNIPPET,
    detail: "Host calendar year token <!-- cwl:year --> (RFC-0029). CWL does not read the clock.",
    insertText: "year host;",
  },
  {
    label: "link",
    kind: KIND_SNIPPET,
    detail: "Shared nav row. <!-- cwl:links base active --> expands every copy. Optional class replaces the base class.",
    insertText: 'link ${1:home} "${2:/}" "${3:Home}";',
  },
  {
    label: "links",
    kind: KIND_SNIPPET,
    detail: "Name the following link rows. <!-- cwl:links name base active --> fills that list.",
    insertText: "links ${1:primary};",
  },
  {
    label: "charset",
    kind: KIND_SNIPPET,
    detail: "Document charset. <!-- cwl:charset --> becomes the meta tag.",
    insertText: "charset utf-8;",
  },
  {
    label: "viewport device",
    kind: KIND_SNIPPET,
    detail: "HTML viewport meta. <!-- cwl:viewport --> stays a fixed content string. CWL does not evaluate it.",
    insertText: "viewport device;",
  },
  {
    label: "title",
    kind: KIND_SNIPPET,
    detail: "Document title. <!-- cwl:title --> becomes the title element.",
    insertText: 'title "${1:Page title}";',
  },
  {
    label: "description",
    kind: KIND_SNIPPET,
    detail: "Meta description. <!-- cwl:description --> becomes the meta tag.",
    insertText: 'description "${1:Page description}";',
  },
  {
    label: "meta robots",
    kind: KIND_SNIPPET,
    detail: "Robots meta. <!-- cwl:meta --> expands the card.",
    insertText: 'meta robots "${1:index, follow}";',
  },
  {
    label: "meta author",
    kind: KIND_SNIPPET,
    detail: "Author meta.",
    insertText: 'meta author "${1:AgenticOps}";',
  },
  {
    label: "meta theme",
    kind: KIND_SNIPPET,
    detail: "theme-color as #rrggbb. Other values are cwl:meta-theme.",
    insertText: 'meta theme "${1:#020208}";',
  },
  {
    label: "meta og",
    kind: KIND_SNIPPET,
    detail: "Open Graph field: type, site, locale, url, title, description, image.",
    insertText: 'meta og ${1|type,site,locale,url,title,description,image|} "${2:website}";',
  },
  {
    label: "meta keywords",
    kind: KIND_SNIPPET,
    detail: "Keywords meta. <!-- cwl:meta --> expands it with the rest of the card.",
    insertText: 'meta keywords "${1:CWL, WebIR}";',
  },
  {
    label: "jsonld",
    kind: KIND_SNIPPET,
    detail: "JSON-LD document. <!-- cwl:jsonld --> becomes the script tag. Schema.org is not interpreted.",
    insertText: "jsonld \"\"\"\n${1:{\"@context\":\"https://schema.org\"}}\n\"\"\";",
  },
  {
    label: "icon",
    kind: KIND_SNIPPET,
    detail: "Icon from a declared image. Optional apple adds the touch icon.",
    insertText: "icon ${1:logo} apple;",
  },
  {
    label: "preconnect",
    kind: KIND_SNIPPET,
    detail: "Preconnect hint. Optional crossorigin. CWL does not fetch the host.",
    insertText: 'preconnect "${1:https://fonts.googleapis.com}" crossorigin;',
  },
  {
    label: "alternate",
    kind: KIND_SNIPPET,
    detail: "Alternate link. Type, href, and title.",
    insertText: 'alternate "${1:text/plain}" "${2:https://agenticop.io/llms.txt}" "${3:LLM digest}";',
  },
  {
    label: "meta twitter",
    kind: KIND_SNIPPET,
    detail: "Twitter card field: card, title, description, image.",
    insertText: 'meta twitter ${1|card,title,description,image|} "${2:summary_large_image}";',
  },
  {
    label: "canonical",
    kind: KIND_SNIPPET,
    detail: "Canonical URL. An absolute http(s) URL or a same-site path. javascript: is cwl:canonical-not-url.",
    insertText: 'canonical "${1:https://agenticop.io/}";',
  },
  {
    label: "device host",
    kind: KIND_SNIPPET,
    detail: "Host device classes. Optional below <px> names the cut. <!-- cwl:device --> stays. CWL does not call matchMedia.",
    insertText: "device host ${1:mobile} ${2:desktop} below ${3:820};",
  },
  {
    label: "style",
    kind: KIND_SNIPPET,
    detail: "Stylesheet URL. <!-- cwl:style --> expands the link tag. CWL does not parse CSS.",
    insertText: 'style "${1:/agenticops.css}";',
  },
  {
    label: "image",
    kind: KIND_SNIPPET,
    detail: "Image URL. <!-- cwl:image id --> expands the path. CWL does not read the bytes.",
    insertText: 'image ${1:logo} "${2:/logo.svg}";',
  },
  {
    label: "script",
    kind: KIND_SNIPPET,
    detail: "Script URL. <!-- cwl:script --> expands the tag. CWL does not parse or run the file.",
    insertText: 'script "${1:/site.js}";',
  },
  {
    label: "form",
    kind: KIND_SNIPPET,
    detail: "Same-site form. <!-- cwl:form id --> expands it. Off-site actions stay a hole.",
    insertText: 'form ${1:contact} method ${2:post} action "${3:/contact}";',
  },
  {
    label: "field",
    kind: KIND_SNIPPET,
    detail: "Input on the current form.",
    insertText: 'field ${1:email} "${2:email}";',
  },
  {
    label: "submit",
    kind: KIND_SNIPPET,
    detail: "Submit button label on the current form.",
    insertText: 'submit "${1:Send}";',
  },
  {
    label: "host firebase",
    kind: KIND_SNIPPET,
    detail: "Firebase Hosting target and public root. CWL does not deploy.",
    insertText: 'host firebase "${1:agenticops}" public "${2:.}" error "${3:/404.html}";',
  },
  {
    label: "drawer",
    kind: KIND_SNIPPET,
    detail: "Menu drawer. Click, Escape, and a link close it. No user-agent read.",
    insertText: "drawer ${1:ao-site-nav} toggle ${2:ao-nav-toggle} class ${3:is-open} panel ${4:ao-nav-drawer};",
  },
  {
    label: "nav",
    kind: KIND_SNIPPET,
    detail: "Shared nav id for <!-- cwl:page --> and <!-- cwl:active --> (RFC-0029)",
    insertText: "nav ${1:docs};",
  },
  {
    label: "head html",
    kind: KIND_SNIPPET,
    detail: "Per-page head fragment for <!-- cwl:head --> (RFC-0029)",
    insertText: 'head html "${1:<title></title>}";',
  },
  {
    label: "engine",
    kind: KIND_SNIPPET,
    detail: "Database engine. Statements stay the same. The host speaks that dialect.",
    insertText: "engine ${1|sqlite,postgres,mysql,mariadb,sqlserver,oracle|};",
  },
  {
    label: "table",
    kind: KIND_SNIPPET,
    detail: "Named table. The host stores the rows. No SQL string.",
    insertText: "table ${1:notes} {\n  ${2:id} text key;\n  ${3:title} text;\n}",
  },
  {
    label: "db select",
    kind: KIND_SNIPPET,
    detail: "Bound select. Request values stay parameters.",
    insertText: "db select ${1:notes} where ${2:open} == true as ${3:notes};",
  },
  {
    label: "db insert",
    kind: KIND_SNIPPET,
    detail: "Bound insert into a declared table.",
    insertText: "db insert ${1:notes} { id: ${2:id}, title: ${3:title} };",
  },
  {
    label: "db update",
    kind: KIND_SNIPPET,
    detail: "Bound update. A missing where is a hole.",
    insertText: "db update ${1:notes} where id == ${2:id} { title: ${3:title} };",
  },
  {
    label: "db delete",
    kind: KIND_SNIPPET,
    detail: "Bound delete. A missing where is a hole.",
    insertText: "db delete ${1:notes} where id == ${2:id};",
  },
]);

/** @type {ReadonlyArray<{ label: string, kind: number, detail: string }>} */
export const CWL_EFFECT_PRESETS = Object.freeze([
  { label: "none", kind: KIND_TEXT, detail: "Effect preset: none" },
  { label: "io", kind: KIND_TEXT, detail: "Effect preset: io" },
  {
    label: "io host",
    kind: KIND_SNIPPET,
    detail: "Named io host (RFC-0020 deepen; transfer stays host-side)",
    insertText: "io host ${1:api.example.com}",
  },
  { label: "db.read", kind: KIND_TEXT, detail: "Effect preset: db.read" },
  { label: "db.write", kind: KIND_TEXT, detail: "Effect preset: db.write" },
  { label: "session.read", kind: KIND_TEXT, detail: "Effect preset: session.read" },
  { label: "session.write", kind: KIND_TEXT, detail: "Effect preset: session.write" },
  {
    label: "session.read cookie",
    kind: KIND_SNIPPET,
    detail: "Read a named session cookie (name only)",
    insertText: "session.read cookie ${1:sid}",
  },
  {
    label: "session.write cookie",
    kind: KIND_SNIPPET,
    detail: "Touch a named session cookie (name only)",
    insertText: "session.write cookie ${1:sid}",
  },
  { label: "time.now", kind: KIND_TEXT, detail: "Effect preset: time.now" },
  { label: "random", kind: KIND_TEXT, detail: "Effect preset: random" },
  { label: "mail.send", kind: KIND_TEXT, detail: "Effect preset: mail.send" },
  {
    label: "mail.send template",
    kind: KIND_SNIPPET,
    detail: "Named mail template (RFC-0020 deepen; host sends — no SMTP invent)",
    insertText: "mail.send template ${1:welcome}",
  },
  { label: "auth.require", kind: KIND_TEXT, detail: "Effect preset: auth.require" },
  { label: "auth.verify", kind: KIND_TEXT, detail: "Effect preset: auth.verify (host hashes; RFC-0032)" },
  { label: "session.mint", kind: KIND_TEXT, detail: "Effect preset: session.mint (RFC-0032)" },
  {
    label: "session.mint cookie",
    kind: KIND_SNIPPET,
    detail: "Mint a session and name the cookie (RFC-0032 deepen; name only)",
    insertText: "session.mint cookie ${1:sid}",
  },
  {
    label: "session.revoke cookie",
    kind: KIND_SNIPPET,
    detail: "Revoke a session cookie by name (RFC-0032 deepen; name only)",
    insertText: "session.revoke cookie ${1:sid}",
  },
  { label: "session.revoke", kind: KIND_TEXT, detail: "Effect preset: session.revoke (RFC-0032)" },
  { label: "cors.allow", kind: KIND_TEXT, detail: "Effect preset: cors.allow" },
  {
    label: "cors.allow methods",
    kind: KIND_SNIPPET,
    detail: "Named CORS methods (RFC-0020 deepen; host enforces)",
    insertText: "cors.allow methods ${1:GET} ${2:POST}",
  },
  {
    label: "cors.allow origin methods",
    kind: KIND_SNIPPET,
    detail: "Named CORS origin + methods (RFC-0020 deepen)",
    insertText: "cors.allow origin ${1:https://app.example.com} methods ${2:GET} ${3:POST}",
  },
  {
    label: "cors.allow credentials",
    kind: KIND_SNIPPET,
    detail: "CORS credentials intent (RFC-0020 deepen; host sets the header)",
    insertText: "cors.allow origin ${1:https://app.example.com} credentials",
  },
  {
    label: "cache.max-age",
    kind: KIND_SNIPPET,
    detail: "Cache-Control max-age seconds (RFC-0020 deepen; host sets headers)",
    insertText: "cache.max-age ${1:3600}",
  },
  { label: "cache.private", kind: KIND_TEXT, detail: "Cache-Control private (RFC-0020 deepen; host sets the header)" },
  { label: "cache.no-store", kind: KIND_TEXT, detail: "Cache-Control no-store (RFC-0020 deepen; host sets the header)" },
  { label: "cache.no-cache", kind: KIND_TEXT, detail: "Cache-Control no-cache (RFC-0020 deepen; revalidate before reuse)" },
  { label: "csrf.verify", kind: KIND_TEXT, detail: "Effect preset: csrf.verify" },
  { label: "rate.limit", kind: KIND_TEXT, detail: "Effect preset: rate.limit" },
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
  if (/^\s*import\s+"/.test(before) && !before.includes('";')) {
    return "import-path";
  }
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
 * Sibling .cwl files for `import "…"` completion (same directory).
 * @param {string} fileHint
 * @param {string} prefixInsideQuotes
 */
function importPathCompletions(fileHint, prefixInsideQuotes) {
  /** @type {Array<{ label: string, kind: number, detail: string, insertText?: string }>} */
  const items = [];
  try {
    const dir = dirname(resolve(fileHint));
    if (!existsSync(dir)) return items;
    const self = basename(resolve(fileHint));
    for (const name of readdirSync(dir)) {
      if (!name.endsWith(".cwl") || name === self) continue;
      if (prefixInsideQuotes && !name.startsWith(prefixInsideQuotes)) continue;
      items.push({
        label: name,
        kind: KIND_FILE,
        detail: "CWL import (same directory)",
        insertText: name,
      });
    }
  } catch {
    /* ignore */
  }
  return items;
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
    /** @type {{ label: string, kind: number, detail: string, insertText?: string, insertTextFormat?: number }} */
    const item = {
      label: entry.label,
      kind: entry.kind,
      detail: entry.detail,
    };
    if (entry.insertText) {
      item.insertText = entry.insertText;
      if (entry.kind === KIND_SNIPPET || /\$\{\d|\$\d/.test(entry.insertText)) {
        item.insertTextFormat = INSERT_SNIPPET;
      }
    }
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

  if (ctx === "import-path") {
    const before = lineText.slice(0, Math.max(0, position.character));
    const m = /import\s+"([^"]*)$/.exec(before);
    const pathPrefix = m ? m[1] : "";
    return importPathCompletions(fileHint, pathPrefix);
  }

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
