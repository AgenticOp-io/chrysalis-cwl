/**
 * RFC-0022 / RFC-0023 — CWL surface → draft app-dna-v1 seed (contract only).
 * Helix owns certify/sign/enforce; this module only maps authored surface → draft DNA shape.
 */
import { readFileSync, existsSync } from "node:fs";
import { parseCwlModule } from "./cwl-parser.mjs";
import { resolveCwlModuleFromPath } from "./cwl-module-graph.mjs";

/**
 * Sorted JSON key paths (depth ≤ 2) — matches Helix `dna-core` responseKeyFingerprint.
 * Flat `{a,b}` → `a,b`. Nested `{data:{x:1}}` → `data,data.x`.
 * @param {unknown} value
 * @param {{ maxDepth?: number }} [opts]
 */
export function responseKeyFingerprint(value, opts = {}) {
  if (value == null) return null;
  if (typeof value !== "object" || Array.isArray(value)) return "scalar";
  const maxDepth = opts.maxDepth == null ? 2 : Number(opts.maxDepth);
  /** @type {string[]} */
  const paths = [];
  collectKeyPaths(/** @type {Record<string, unknown>} */ (value), "", 1, maxDepth, paths);
  return paths.sort().join(",");
}

/**
 * @param {Record<string, unknown>} obj
 * @param {string} prefix
 * @param {number} depth 1 = top-level
 * @param {number} maxDepth
 * @param {string[]} out
 */
function collectKeyPaths(obj, prefix, depth, maxDepth, out) {
  for (const k of Object.keys(obj)) {
    const path = prefix ? `${prefix}.${k}` : k;
    out.push(path);
    if (depth >= maxDepth) continue;
    const v = obj[k];
    if (v != null && typeof v === "object" && !Array.isArray(v)) {
      collectKeyPaths(/** @type {Record<string, unknown>} */ (v), path, depth + 1, maxDepth, out);
    }
  }
}

/**
 * Segment-shape equality: `:param` aligns with `:id`; statics exact.
 * Language SoR for RFC-0022 §5 (Secure bridge may thin-wrap).
 * @param {unknown} a
 * @param {unknown} b
 */
export function pathTemplateShapeEqual(a, b) {
  const left = String(a || "/");
  const right = String(b || "/");
  if (left === right) return true;
  const seg = (p) => {
    const parts = String(p).split("/");
    if (parts[0] === "") parts.shift();
    return parts;
  };
  const sa = seg(left);
  const sb = seg(right);
  if (sa.length !== sb.length) return false;
  for (let i = 0; i < sa.length; i++) {
    const x = sa[i];
    const y = sb[i];
    if (x.startsWith(":") && y.startsWith(":")) continue;
    if (x !== y) return false;
  }
  return true;
}

/**
 * Sorted unique query/body *names* (values ignored).
 * @param {unknown} names
 */
export function namesKeyFingerprint(names) {
  if (!Array.isArray(names) || names.length === 0) return null;
  const set = new Set(
    names.map((n) => String(n || "").trim()).filter((n) => /^[A-Za-z_][A-Za-z0-9_]*$/.test(n)),
  );
  if (set.size === 0) return null;
  return [...set].sort().join(",");
}

/**
 * @param {unknown} node
 * @returns {unknown}
 */
function valueNodeToPlain(node) {
  if (!node || typeof node !== "object") return true;
  const n = /** @type {Record<string, unknown>} */ (node);
  if (n.kind === "literal") {
    const v = n.value;
    if (v != null && typeof v === "object" && !Array.isArray(v)) return v;
    return true;
  }
  if (n.kind === "object" && Array.isArray(n.entries)) {
    /** @type {Record<string, unknown>} */
    const out = {};
    for (const e of n.entries) {
      if (!e || typeof e !== "object") continue;
      const key = /** @type {{ key?: string, value?: unknown }} */ (e).key;
      if (!key) continue;
      out[key] = valueNodeToPlain(/** @type {{ key?: string, value?: unknown }} */ (e).value);
    }
    return out;
  }
  return true;
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
    const plain = valueNodeToPlain(body);
    return plain && typeof plain === "object" && !Array.isArray(plain)
      ? /** @type {Record<string, unknown>} */ (plain)
      : null;
  }
  return null;
}

/**
 * @param {object | null | undefined} body
 * @param {"api"|"page"|string} surfaceKind
 * @param {{ streamKind?: string | null }} [opts]
 */
export function contentClassFromBody(body, surfaceKind, opts = {}) {
  // SSE wire is text/event-stream — not certified JSON traffic DNA (RFC-0022 deepen 1.0.24).
  if (opts.streamKind === "sse") return "other";
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
 * Load RFC-0023 deploy profile JSON (external artifact; not CWL grammar).
 * @param {string} profilePath
 */
export function loadDeployProfile(profilePath) {
  if (!existsSync(profilePath)) {
    throw new Error(`deploy profile missing: ${profilePath}`);
  }
  const profile = JSON.parse(readFileSync(profilePath, "utf8"));
  if (profile?.schema !== "cwl-deploy-profile-v1") {
    throw new Error(`deploy profile schema must be cwl-deploy-profile-v1 (got ${profile?.schema})`);
  }
  return profile;
}

/**
 * Resolve DNA host label from RFC-0023 profile.
 * Prefer explicit `hostOverride`, else profile.host, else "default".
 * When hosts{} is present, the chosen key must exist.
 * @param {object | null | undefined} profile
 * @param {string} [hostOverride]
 */
export function resolveHostFromProfile(profile, hostOverride) {
  const host =
    (typeof hostOverride === "string" && hostOverride) ||
    (typeof profile?.host === "string" && profile.host) ||
    "default";
  const hosts = profile?.hosts;
  if (hosts && typeof hosts === "object" && !Array.isArray(hosts)) {
    const keys = Object.keys(hosts);
    if (keys.length > 0 && !(host in hosts)) {
      throw new Error(
        `deploy profile host "${host}" not in hosts{} (${keys.join(", ")})`,
      );
    }
  }
  return host;
}

/**
 * RFC-0022 §6 — side-by-side report only (does not merge into DNA holes[]).
 * @param {ReturnType<typeof parseCwlModule>} mod
 * @param {{ fixture?: string }} [opts]
 */
export function cwlHolesBridgeReport(mod, opts = {}) {
  /** @type {Array<{ reason: string, line?: number, surface?: string }>} */
  const cwl_holes = [];
  for (const h of mod.holes ?? []) {
    cwl_holes.push({
      reason: String(h.reason || h.message || "hole"),
      ...(typeof h.line === "number" ? { line: h.line } : {}),
    });
  }
  for (const r of mod.routes ?? []) {
    const body = r.body;
    if (body?.kind === "hole") {
      cwl_holes.push({
        reason: String(body.reason || "hole"),
        surface: `${r.method} ${r.path}`,
        ...(typeof r.line === "number" ? { line: r.line } : {}),
      });
    }
    const stmts = body?.stmts || body?.statements || r.stmts;
    if (Array.isArray(stmts)) {
      for (const s of stmts) {
        if (s?.kind === "hole") {
          cwl_holes.push({
            reason: String(s.reason || "hole"),
            surface: `${r.method} ${r.path}`,
            ...(typeof s.line === "number" ? { line: s.line } : {}),
          });
        }
      }
    }
  }
  return {
    kind: "chrysalis.cwl.holes-bridge-report",
    schemaVersion: 1,
    rfc: "0022",
    fixture: opts.fixture ?? null,
    module: mod.moduleName || null,
    cwl_holes,
    dna_gaps: [],
    note: "CWL holes and DNA gaps are separate honesty domains — do not auto-merge.",
  };
}

/**
 * @param {ReturnType<typeof parseCwlModule>} mod
 * @param {{
 *   app_id?: string,
 *   host?: string,
 *   created_at?: string,
 *   fixture?: string,
 *   profile?: object,
 *   includeHolesReport?: boolean,
 * }} [opts]
 */
export function cwlSurfaceToDraftDna(mod, opts = {}) {
  const host = resolveHostFromProfile(opts.profile, opts.host);
  const appId = opts.app_id || opts.profile?.app_id || mod.moduleName || "cwl-seed";
  const createdAt = opts.created_at || new Date().toISOString();
  const contentFromCwl = opts.profile?.content_class_from_cwl !== false;

  /** @type {object[]} */
  const routes = [];
  /** @type {object[]} */
  const annotations = [];

  for (const r of mod.routes ?? []) {
    const method = String(r.method || "GET").toUpperCase();
    const path_template = String(r.path || "/");
    const surfaceKind = r.surfaceKind || "api";
    const body = r.body;
    const streamKind = r.streamKind ?? null;
    const content_class = contentFromCwl
      ? contentClassFromBody(body, surfaceKind, { streamKind })
      : "other";
    const obj = objectEntriesToPlain(body);
    const response_key_fingerprint =
      content_class === "json" && obj ? responseKeyFingerprint(obj) : null;
    // Union JSON body names with multipart field/file part names (RFC-0026).
    const request_key_fingerprint = namesKeyFingerprint([
      ...(Array.isArray(r.handlerBodyParams) ? r.handlerBodyParams : []),
      ...(Array.isArray(r.handlerMultipartFields) ? r.handlerMultipartFields : []),
      ...(Array.isArray(r.handlerMultipartFiles) ? r.handlerMultipartFiles : []),
    ]);
    const query_key_fingerprint = namesKeyFingerprint(r.handlerQueryParams);

    /** @type {Record<string, unknown>} */
    const route = {
      host,
      method,
      path_template,
      content_class,
      status_classes: typeof r.responseStatus === "number"
        ? [Math.floor(r.responseStatus / 100) * 100]
        : [],
      response_key_fingerprint,
    };
    if (request_key_fingerprint) route.request_key_fingerprint = request_key_fingerprint;
    if (query_key_fingerprint) route.query_key_fingerprint = query_key_fingerprint;
    routes.push(route);

    /** @type {Record<string, unknown>} */
    const ann = {
      method,
      path_template,
      cwl_surface: surfaceKind === "page" ? "page" : "route",
      cwl_effects: effectsList(r.effects),
    };
    if (streamKind === "sse") ann.cwl_stream = "sse";
    const mpFields = Array.isArray(r.handlerMultipartFields) ? r.handlerMultipartFields : [];
    const mpFiles = Array.isArray(r.handlerMultipartFiles) ? r.handlerMultipartFiles : [];
    if (mpFields.length) ann.cwl_multipart_fields = [...mpFields];
    if (mpFiles.length) ann.cwl_multipart_files = [...mpFiles];
    annotations.push(ann);
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

  /** @type {Record<string, unknown>} */
  const draft = {
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
      ...(opts.profile?.schema
        ? {
            deploy_host: host,
            deploy_profile: {
              schema: opts.profile.schema,
              host,
              path_shape_equality: opts.profile.path_shape_equality !== false,
            },
          }
        : {}),
      annotations,
    },
  };

  if (opts.includeHolesReport) {
    draft.bridge.holes_report = cwlHolesBridgeReport(mod, { fixture: opts.fixture });
  }

  return draft;
}

/**
 * Seed draft DNA from a `.cwl` path (resolves imports).
 * @param {string} cwlPath
 * @param {{
 *   app_id?: string,
 *   host?: string,
 *   created_at?: string,
 *   fixture?: string,
 *   profile?: object,
 *   profilePath?: string,
 *   includeHolesReport?: boolean,
 * }} [opts]
 */
export function seedDraftDnaFromCwlPath(cwlPath, opts = {}) {
  const mod = resolveCwlModuleFromPath(cwlPath);
  const profile =
    opts.profile ||
    (opts.profilePath ? loadDeployProfile(opts.profilePath) : undefined);
  return cwlSurfaceToDraftDna(mod, {
    ...opts,
    profile,
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
