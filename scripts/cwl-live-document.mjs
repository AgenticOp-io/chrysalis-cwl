/**
 * Request-time HTML for a CWL module.
 * Each request reads the source, matches one page, and composes the document.
 * Declared path and query names in the page HTML are filled from that request.
 * `year host` digits are filled only when the caller passes a host year.
 * The device token stays. This host does not call matchMedia or read a user agent.
 */
import { createServer } from "node:http";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { resolveCwlModuleFromPath } from "./hub-ingest/cwl-module-graph.mjs";
import { composeLayoutChromeHtml } from "./hub-ingest/cwl-layout.mjs";
import { splitCwlHtmlTemplate } from "./hub-ingest/cwl-html-template.mjs";
import { finishCwlDynamicHtml, selectCwlDynamicSource } from "./cwl-dynamic-html.mjs";
import { applyCwlDb, openCwlEngine } from "./cwl-db-host.mjs";

const YEAR_SLOT = "<!-- cwl:year -->";

/**
 * @param {unknown} value
 */
function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * @param {unknown} value
 */
function asText(value) {
  if (value == null) return "";
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") return String(value);
  return "";
}

/**
 * @param {string} html
 * @param {{ path?: string[], query?: string[] }} bindings
 * @param {{ path?: Record<string, string>, query?: Record<string, string> }} values
 */
export function fillCwlRequestHtml(html, bindings, values) {
  const split = splitCwlHtmlTemplate(html, bindings);
  if (!split) return html;
  let out = "";
  for (const part of split) {
    if (part.kind === "literal") {
      out += part.text;
      continue;
    }
    if (part.source === "path") out += escapeHtml(values.path?.[part.name] ?? "");
    else if (part.source === "query") out += escapeHtml(values.query?.[part.name] ?? "");
    else out += part.name;
  }
  return out;
}

/**
 * @param {string} pattern
 * @param {string} pathname
 * @returns {Record<string, string> | null}
 */
function matchPath(pattern, pathname) {
  if (pattern === "/") return pathname === "/" ? {} : null;
  const expected = pattern.split("/").filter(Boolean);
  const got = pathname.split("/").filter(Boolean);
  if (expected.length !== got.length) return null;
  /** @type {Record<string, string>} */
  const params = {};
  for (let i = 0; i < expected.length; i += 1) {
    const slot = expected[i];
    const value = got[i];
    if (slot.startsWith(":")) {
      try {
        params[slot.slice(1)] = decodeURIComponent(value);
      } catch {
        return null;
      }
    } else if (slot !== value) return null;
  }
  return params;
}

/**
 * @param {object} route
 * @param {Record<string, string>} pathParams
 * @param {Record<string, string>} query
 */
function bindingValues(route, pathParams, query) {
  /** @type {Record<string, string>} */
  const path = {};
  /** @type {Record<string, string>} */
  const queryValues = {};
  for (const name of route.handlerPathParams ?? []) {
    path[name] = pathParams[name] ?? asText(route.handlerPathDefaults?.[name]);
  }
  for (const name of route.handlerQueryParams ?? []) {
    const given = query[name];
    queryValues[name] = given != null && given !== "" ? given : asText(route.handlerQueryDefaults?.[name]);
  }
  return { path, query: queryValues };
}

/**
 * @param {object} route
 * @param {string} body
 * @param {string} head
 */
function composeRoute(route, body, head) {
  return composeLayoutChromeHtml(route.layoutChromeHtml, body, {
    head,
    charset: route.charset,
    viewportDevice: route.viewportDevice,
    title: route.title,
    description: route.description,
    canonical: route.canonical,
    metaCard: route.metaCard,
    icons: route.icons,
    alternates: route.alternates,
    jsonlds: route.jsonlds,
    preconnects: route.preconnects,
    pageName: route.name,
    navId: route.navId,
    links: route.navLinks,
    drawer: route.drawer,
    styles: route.styles,
    images: route.images,
    scripts: route.scripts,
    forms: route.forms,
    hostFirebase: route.hostFirebase,
  });
}

/**
 * @param {object[]} routes
 * @param {string} method
 * @param {string} pathname
 */
function findRoute(routes, method, pathname) {
  const verb = method.toUpperCase();
  for (const route of routes) {
    if (String(route.method).toUpperCase() !== verb) continue;
    const params = matchPath(route.path, pathname);
    if (params) return { route, params, missing: false };
  }
  const missing = routes.find((route) => route.path === "/404.html" && String(route.method).toUpperCase() === "GET");
  if (missing) return { route: missing, params: {}, missing: true };
  return null;
}

/**
 * @param {string} file
 * @param {{ method?: string, path?: string, query?: Record<string, string>, body?: Record<string, unknown> }} request
 * @param {{ year?: number, data?: Record<string, unknown> | ((request: object) => Record<string, unknown>), database?: { raw: object } }} [host]
 */
export async function renderCwlLiveDocument(file, request, host = {}) {
  const parsed = resolveCwlModuleFromPath(resolve(file));
  const method = String(request.method ?? "GET").toUpperCase();
  const pathname = request.path || "/";
  const read = method === "GET" || method === "HEAD";
  const found = findRoute(parsed.routes ?? [], method, pathname);
  if (!read && (!found || found.missing || found.route.body?.kind !== "html")) {
    return { status: 405, contentType: "text/plain; charset=utf-8", body: "method not allowed", matched: false };
  }
  if (!found || found.route.body?.kind !== "html") {
    return { status: 404, contentType: "text/plain; charset=utf-8", body: "not found", matched: false };
  }
  const { route, params, missing } = found;
  const values = bindingValues(route, params, request.query ?? {});
  const data = typeof host.data === "function"
    ? host.data({ method, path: pathname, query: request.query ?? {}, pathParams: params }) ?? {}
    : { ...(host.data ?? {}) };
  if (route.dbOps?.length) {
    if (!host.database) {
      return { status: 500, contentType: "text/plain; charset=utf-8", body: "cwl:db-closed", matched: true };
    }
    await applyCwlDb(host.database, parsed.tables ?? [], route.dbOps, {
      path: values.path,
      query: values.query,
      body: request.body ?? {},
    }, data);
  }
  const selected = selectCwlDynamicSource(route, { path: values.path, query: values.query, data });
  const bindings = { path: route.handlerPathParams ?? [], query: route.handlerQueryParams ?? [] };
  const templated = fillCwlRequestHtml(selected.html, bindings, values);
  const body = finishCwlDynamicHtml(templated, route.htmlRepeats ?? [], data);
  const head = fillCwlRequestHtml(route.headHtml ?? "", bindings, values);
  let html = composeRoute(route, body, head);
  if (route.yearHost && Number.isInteger(host.year)) {
    html = html.split(YEAR_SLOT).join(String(host.year));
  }
  const status = missing || route.path === "/404.html" ? 404 : selected.status;
  return {
    status,
    contentType: route.responseContentType || "text/html; charset=utf-8",
    body: method === "HEAD" ? "" : html,
    matched: !missing,
  };
}

/**
 * @param {{ file: string, host?: string, port?: number, year?: number, data?: Record<string, unknown> | ((request: object) => Record<string, unknown>), dataPath?: string, dbPath?: string, database?: { raw: object, close?: () => void } }} opts
 */
export async function startCwlLiveServer(opts) {
  const file = resolve(opts.file);
  const year = Number.isInteger(opts.year) ? opts.year : new Date().getUTCFullYear();
  const dataPath = opts.dataPath ? resolve(opts.dataPath) : null;
  const parsed = resolveCwlModuleFromPath(file);
  const named = String(opts.engine ?? parsed.engine ?? "sqlite").toLowerCase();
  if (parsed.engine && opts.engine && String(opts.engine).toLowerCase() !== parsed.engine) {
    throw new Error("cwl:db-engine");
  }
  const ownsDatabase = !opts.database && (Boolean(opts.dbPath) || (parsed.tables?.length ?? 0) > 0);
  const database = opts.database
    ?? (ownsDatabase
      ? await openCwlEngine(named, named === "sqlite" ? (opts.dbPath ? resolve(opts.dbPath) : ":memory:") : opts.dbPath ?? "")
      : null);
  const server = createServer(async (req, res) => {
    const url = new URL(req.url ?? "/", "http://127.0.0.1");
    /** @type {Record<string, string>} */
    const query = {};
    for (const [key, value] of url.searchParams) {
      if (query[key] == null) query[key] = value;
    }
    let rendered;
    try {
      const fileData = dataPath ? JSON.parse(readFileSync(dataPath, "utf8")) : {};
      const data = typeof opts.data === "function" ? opts.data : { ...fileData, ...(opts.data ?? {}) };
      const body = await readRequestRecord(req);
      rendered = await renderCwlLiveDocument(
        file,
        { method: req.method, path: url.pathname, query, body },
        { year, data, ...(database ? { database } : {}) },
      );
    } catch (error) {
      res.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
      res.end(error instanceof Error ? error.message : "live render failed");
      return;
    }
    res.writeHead(rendered.status, { "content-type": rendered.contentType, connection: "close" });
    res.end(rendered.body);
  });
  const host = opts.host ?? "127.0.0.1";
  const port = opts.port ?? 0;
  return new Promise((resolvePromise, reject) => {
    server.once("error", reject);
    server.listen(port, host, () => {
      const addr = server.address();
      const actual = typeof addr === "object" && addr ? addr.port : port;
      resolvePromise({
        host,
        port: actual,
        close: () =>
          new Promise((done, fail) => {
            Promise.resolve(ownsDatabase ? database?.close?.() : null).then(
              () => server.close((err) => (err ? fail(err) : done())),
              fail,
            );
          }),
      });
    });
  });
}

/**
 * Declared body fields arrive as JSON or urlencoded scalars.
 * Nested objects are not copied into a row.
 * @param {import("node:http").IncomingMessage} req
 */
function readRequestRecord(req) {
  const method = String(req.method ?? "GET").toUpperCase();
  if (method === "GET" || method === "HEAD") return Promise.resolve({});
  return new Promise((resolvePromise, reject) => {
    /** @type {Buffer[]} */
    const chunks = [];
    let size = 0;
    req.on("data", (chunk) => {
      const buf = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
      size += buf.length;
      if (size > 1_000_000) {
        reject(new Error("cwl:db-body"));
        req.destroy();
        return;
      }
      chunks.push(buf);
    });
    req.on("end", () => {
      const text = Buffer.concat(chunks).toString("utf8");
      if (!text) {
        resolvePromise({});
        return;
      }
      const type = String(req.headers["content-type"] ?? "");
      try {
        if (type.includes("json")) {
          const parsed = JSON.parse(text);
          resolvePromise(scalarRecord(parsed));
          return;
        }
        const params = new URLSearchParams(text);
        /** @type {Record<string, string>} */
        const out = {};
        for (const [key, value] of params) {
          if (out[key] == null) out[key] = value;
        }
        resolvePromise(out);
      } catch {
        resolvePromise({});
      }
    });
    req.on("error", reject);
  });
}

/**
 * @param {unknown} value
 */
function scalarRecord(value) {
  /** @type {Record<string, unknown>} */
  const out = {};
  if (value == null || typeof value !== "object" || Array.isArray(value)) return out;
  for (const [key, item] of Object.entries(value)) {
    if (item == null || typeof item === "string" || typeof item === "number" || typeof item === "boolean") {
      out[key] = item;
    }
  }
  return out;
}
