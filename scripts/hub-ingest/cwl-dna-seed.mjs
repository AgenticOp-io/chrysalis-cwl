/**
 * RFC-0022 — CWL surface → draft app-dna-v1 seed (contract only).
 * Helix owns certify/sign/enforce; this module only maps authored surface → draft DNA shape.
 */
import { parseCwlModule } from "./cwl-parser.mjs";
import { resolveCwlModuleFromPath } from "./cwl-module-graph.mjs";

/**
 * Sorted top-level object keys (Helix responseKeyFingerprint for objects).
 * @param {unknown} value
 */
export function responseKeyFingerprint(value) {
  if (value == null) return null;
  if (typeof value !== "object" || Array.isArray(value)) return "scalar";
  return Object.keys(value).sort().join(",");
}

/**
 * @param {object | null | undefined} body
 * @returns {Record<string, unknown> | null}
 */
function objectEntriesToPlain(body) {
  if (!body) return null;
  if (body.kind === "literal" && body.value && typeof body.value === "object" && !Array.isArray(body.value)) {
    return body.value;
  }
  if (body.kind === "object" && Array.isArray(body.entries)) {
    /** @type {Record<string, unknown>} */
    const out = {};
    for (const e of body.entries) {
      if (e?.key) out[e.key] = true; // key presence only for fingerprint
    }
    return out;
  }
  return null;
}

/**
 * @param {object | null | undefined} body
 * @param {"api"|"page"|string} surfaceKind
 */
export function contentClassFromBody(body, surfaceKind) {
  if (body?.kind === "html" || body?.kind === "ui") return "html";
  if (body?.kind === "object") return "json";
  if (body?.kind === "literal" && body.value && typeof body.value === "object" && !Array.isArray(body.value)) {
    return "json";
  }
  if (surfaceKind === "page") return "html";
  return "other";
}

/**
 * Normalize effects list from route.
 * @param {unknown} effects
 */
function effectsList(effects) {
  if (!effects) return [];
  if (Array.isArray(effects)) {
    return effects
      .map((e) => (typeof e === "string" ? e : e?.name || String(e)))
      .filter((e) => e && e !== "none");
  }
  if (typeof effects === "string" && effects !== "none") return [effects];
  return [];
}

/**
 * @param {ReturnType<typeof parseCwlModule>} mod
 * @param {{ app_id?: string, host?: string, created_at?: string, fixture?: string }} [opts]
 */
export function cwlSurfaceToDraftDna(mod, opts = {}) {
  const host = opts.host || "default";
  const appId = opts.app_id || mod.moduleName || "cwl-seed";
  const createdAt = opts.created_at || new Date().toISOString();

  /** @type {object[]} */
  const routes = [];
  /** @type {object[]} */
  const annotations = [];

  for (const r of mod.routes ?? []) {
    const method = String(r.method || "GET").toUpperCase();
    const path_template = String(r.path || "/");
    const surfaceKind = r.surfaceKind || "api";
    const body = r.body;
    const content_class = contentClassFromBody(body, surfaceKind);
    const obj = objectEntriesToPlain(body);
    const response_key_fingerprint =
      content_class === "json" && obj ? responseKeyFingerprint(obj) : null;

    routes.push({
      host,
      method,
      path_template,
      content_class,
      status_classes: typeof r.responseStatus === "number"
        ? [Math.floor(r.responseStatus / 100) * 100]
        : [],
      response_key_fingerprint,
    });

    annotations.push({
      method,
      path_template,
      cwl_surface: surfaceKind === "page" ? "page" : "route",
      cwl_effects: effectsList(r.effects),
    });
  }

  routes.sort((a, b) => {
    const ka = `${a.host} ${a.method} ${a.path_template}`;
    const kb = `${b.host} ${b.method} ${b.path_template}`;
    return ka.localeCompare(kb);
  });
  annotations.sort((a, b) => {
    const ka = `${a.method} ${a.path_template}`;
    const kb = `${b.method} ${b.path_template}`;
    return ka.localeCompare(kb);
  });

  return {
    schema: "app-dna-v1",
    app_id: appId,
    created_at: createdAt,
    mode: "draft",
    parent_hash: null,
    routes,
    holes: [],
    bridge: {
      kind: "cwl-surface-seed",
      module: mod.moduleName || "main",
      fixture: opts.fixture || null,
      rfc: "0022",
      identity_key: "`${host} ${METHOD} ${path_template}`",
      annotations,
    },
  };
}

/**
 * Seed draft DNA from a `.cwl` path (resolves imports).
 * @param {string} cwlPath
 * @param {{ app_id?: string, host?: string, created_at?: string, fixture?: string }} [opts]
 */
export function seedDraftDnaFromCwlPath(cwlPath, opts = {}) {
  const mod = resolveCwlModuleFromPath(cwlPath);
  return cwlSurfaceToDraftDna(mod, {
    ...opts,
    fixture: opts.fixture ?? cwlPath,
    app_id: opts.app_id,
  });
}

/**
 * Compare seeded DNA to expected contract gold (ignore created_at; deep-ish).
 * @param {object} actual
 * @param {object} expected
 */
export function dnaBridgeContractEqual(actual, expected) {
  const strip = (d) => {
    const { created_at: _c, $comment: _n, ...rest } = d;
    return JSON.parse(JSON.stringify(rest));
  };
  return JSON.stringify(strip(actual)) === JSON.stringify(strip(expected));
}
