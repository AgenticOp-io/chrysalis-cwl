#!/usr/bin/env node
/**
 * Gate: pillar CLI emit-check (CWL → WebIR → thin emit).
 * Skips when WebIR absent unless CWL_REQUIRE_WEBIR=1.
 * Token: CWL_EMIT_CHECK_OK
 */
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { resolveWebirEntryPath } from "./hub-ingest/load-webir.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const CLI = join(ROOT, "scripts/cwl-cli.mjs");
const CONTROL = join(ROOT, "fixtures/language-gold/19-early-exit/routes.cwl");
const HOLES = join(ROOT, "fixtures/language-gold/11-holes/routes.cwl");
const NESTED = join(ROOT, "fixtures/language-gold/23-nested-control/routes.cwl");
const REPEAT = join(ROOT, "fixtures/language-gold/40-html-repeat/routes.cwl");
const REPEAT_FIELDS = join(ROOT, "fixtures/language-gold/41-html-repeat-fields/routes.cwl");
const AUTH_V2 = join(ROOT, "fixtures/language-gold/42-auth-effects-v2/routes.cwl");
const PROXY_UPSTREAM = join(ROOT, "fixtures/language-gold/43-proxy-upstream/routes.cwl");
const HOST_BYTES = join(ROOT, "fixtures/language-gold/44-host-bytes-holes/routes.cwl");
const PROXY_PARAMS = join(ROOT, "fixtures/language-gold/45-proxy-upstream-params/routes.cwl");
const SESSION_COOKIE = join(ROOT, "fixtures/language-gold/46-session-cookie-name/routes.cwl");
const SESSION_COOKIE_ATTRS = join(ROOT, "fixtures/language-gold/51-session-cookie-attrs/routes.cwl");
const CORS_ORIGIN = join(ROOT, "fixtures/language-gold/52-cors-allow-origin/routes.cwl");
const RATE_LIMIT_RPM = join(ROOT, "fixtures/language-gold/53-rate-limit-rpm/routes.cwl");
const CSRF_COOKIE = join(ROOT, "fixtures/language-gold/54-csrf-verify-cookie/routes.cwl");
const AUTH_REQUIRE_COOKIE = join(ROOT, "fixtures/language-gold/55-auth-require-cookie/routes.cwl");
const DB_TABLE = join(ROOT, "fixtures/language-gold/56-db-table-name/routes.cwl");
const MAIL_TEMPLATE = join(ROOT, "fixtures/language-gold/57-mail-send-template/routes.cwl");
const CORS_METHODS = join(ROOT, "fixtures/language-gold/58-cors-allow-methods/routes.cwl");
const CACHE_MAX_AGE = join(ROOT, "fixtures/language-gold/59-cache-max-age/routes.cwl");
const IO_HOST = join(ROOT, "fixtures/language-gold/60-io-host/routes.cwl");
const CORS_CREDENTIALS = join(ROOT, "fixtures/language-gold/61-cors-allow-credentials/routes.cwl");
const SESSION_ACCESS = join(ROOT, "fixtures/language-gold/62-session-access-cookie/routes.cwl");
const CACHE_PRIVATE = join(ROOT, "fixtures/language-gold/63-cache-private/routes.cwl");
const COOKIE_PURPOSE = join(ROOT, "fixtures/language-gold/64-cookie-purpose/routes.cwl");
const REDIRECT_SAME = join(ROOT, "fixtures/language-gold/65-redirect-same-origin/routes.cwl");
const CACHE_NO_STORE = join(ROOT, "fixtures/language-gold/66-cache-no-store/routes.cwl");
const CACHE_NO_CACHE = join(ROOT, "fixtures/language-gold/67-cache-no-cache/routes.cwl");
const SITE_DOCUMENT = join(ROOT, "fixtures/language-gold/68-site-document/routes.cwl");
const SITE_SHELL = join(ROOT, "fixtures/language-gold/69-site-shell/routes.cwl");
const SITE_NAV = join(ROOT, "fixtures/language-gold/70-site-nav-id/routes.cwl");
const SITE_YEAR = join(ROOT, "fixtures/language-gold/71-site-year/routes.cwl");
const SITE_LINKS = join(ROOT, "fixtures/language-gold/72-site-nav-links/routes.cwl");
const SITE_SHELL_BEHAVIOR = join(ROOT, "fixtures/language-gold/73-site-shell-behavior/routes.cwl");
const SITE_ASSETS = join(ROOT, "fixtures/language-gold/74-site-assets/routes.cwl");
const SITE_PAGE = join(ROOT, "fixtures/language-gold/75-site-page/routes.cwl");
const REPEAT_IF = join(ROOT, "fixtures/language-gold/47-html-repeat-if/routes.cwl");
const REPEAT_ELSE = join(ROOT, "fixtures/language-gold/48-html-repeat-else/routes.cwl");
const REPEAT_NESTED = join(ROOT, "fixtures/language-gold/49-html-repeat-nested/routes.cwl");
const REPEAT_NESTED_FILTER = join(ROOT, "fixtures/language-gold/50-html-repeat-nested-filter/routes.cwl");
const LAYOUT_CHROME = join(ROOT, "fixtures/language-gold/36-layout-chrome/routes.cwl");

const webirEntry = resolveWebirEntryPath();
const webirReady = Boolean(webirEntry && existsSync(webirEntry));
const requireWebir = process.env.CWL_REQUIRE_WEBIR === "1" || process.env.CWL_REQUIRE_WEBIR === "true";

/** @type {{ id: string, ok: boolean, detail?: string, skipped?: boolean }[]} */
const checks = [];

/**
 * @param {string} id
 * @param {string} file
 * @param {(report: object, emittedText: string) => boolean} assertFn
 * @param {{ stdout?: boolean }} [opts]
 */
function runEmitCheck(id, file, assertFn, opts = {}) {
  if (!webirReady) {
    checks.push({
      id,
      ok: !requireWebir,
      skipped: !requireWebir,
      detail: requireWebir
        ? "webir dist required (CWL_REQUIRE_WEBIR=1) — run npm run build:webir"
        : "webir dist absent — skip",
    });
    return;
  }
  const args = [CLI, "emit-check", file];
  if (opts.stdout) args.push("--stdout");
  const r = spawnSync(process.execPath, args, {
    cwd: ROOT,
    encoding: "utf8",
    timeout: 60_000,
  });
  const out = r.stdout || "";
  let report = null;
  let emittedText = "";
  try {
    const start = out.indexOf("{");
    if (start >= 0) {
      let depth = 0;
      let end = -1;
      for (let i = start; i < out.length; i++) {
        if (out[i] === "{") depth += 1;
        else if (out[i] === "}") {
          depth -= 1;
          if (depth === 0) {
            end = i;
            break;
          }
        }
      }
      if (end >= 0) {
        report = JSON.parse(out.slice(start, end + 1));
        emittedText = out.slice(end + 1);
      }
    }
  } catch {
    report = null;
  }
  const ok = r.status === 0 && report?.ok === true && assertFn(report, emittedText);
  checks.push({
    id,
    ok,
    detail: ok ? undefined : (r.stderr || out || `exit=${r.status}`).slice(-300),
  });
}

runEmitCheck("emit-check-19-else-if", CONTROL, (rep) => {
  return rep.token === "CWL_EMIT_CHECK_OK" && (rep.holeCount ?? 1) === 0 && (rep.emitRoutes ?? 0) >= 1;
});
runEmitCheck("emit-check-11-honest-holes", HOLES, (rep) => {
  return rep.token === "CWL_EMIT_CHECK_OK" && (rep.holeCount ?? 0) >= 1;
});
runEmitCheck(
  "emit-check-23-nested-foreach",
  NESTED,
  (rep, text) => {
    return (
      rep.token === "CWL_EMIT_CHECK_OK" &&
      (rep.holeCount ?? 1) === 0 &&
      /foreach\s+comments\s+as\s+c\s*\{/.test(text)
    );
  },
  { stdout: true },
);

// RFC-0031: the repeat statement must survive WebIR reverse, not collapse to markup.
runEmitCheck(
  "emit-check-40-html-repeat",
  REPEAT,
  (rep, text) => {
    return (
      rep.token === "CWL_EMIT_CHECK_OK" &&
      (rep.holeCount ?? 1) === 0 &&
      /repeat\s+pops\s+as\s+pop\s+html\s+"<li>pop<\/li>";/.test(text)
    );
  },
  { stdout: true },
);

// RFC-0031 deepen: dotted item fields survive as member chains, not flattened text.
runEmitCheck(
  "emit-check-41-html-repeat-fields",
  REPEAT_FIELDS,
  (rep, text) => {
    return (
      rep.token === "CWL_EMIT_CHECK_OK" &&
      (rep.holeCount ?? 1) === 0 &&
      /repeat\s+sessions\s+as\s+s\s+html\s+"<tr><td>s\.user<\/td><td>s\.site\.city<\/td><\/tr>";/.test(text)
    );
  },
  { stdout: true },
);

// RFC-0032: credential/session effect tags must survive reverse, not degrade to a hole.
runEmitCheck(
  "emit-check-42-auth-effects-v2",
  AUTH_V2,
  (rep, text) => {
    return (
      rep.token === "CWL_EMIT_CHECK_OK" &&
      (rep.holeCount ?? 1) === 0 &&
      /effects:\s*auth\.verify,\s*session\.mint;/.test(text) &&
      /effects:\s*session\.revoke;/.test(text)
    );
  },
  { stdout: true },
);

// RFC-0033: the declared upstream target must come back verbatim, never guessed.
runEmitCheck(
  "emit-check-43-proxy-upstream",
  PROXY_UPSTREAM,
  (rep, text) => {
    return (
      rep.token === "CWL_EMIT_CHECK_OK" &&
      (rep.holeCount ?? 1) === 0 &&
      /proxy\s+upstream\s+"https:\/\/backend-services\.internal\/tower-status";/.test(text) &&
      /proxy\s+upstream\s+"https:\/\/backend-services\.internal\/provision";/.test(text)
    );
  },
  { stdout: true },
);

// Host-byte residuals: the hole stays, but the declared media type must not be lost with it.
runEmitCheck(
  "emit-check-44-host-bytes-holes",
  HOST_BYTES,
  (rep, text) => {
    return (
      rep.token === "CWL_EMIT_CHECK_OK" &&
      /content-type\s+"image\/png";\s*\n\s*hole\s+hub-cwl:binary-render;/.test(text) &&
      /content-type\s+"application\/json";\s*\n\s*hole\s+hub-cwl:keypair-gen;/.test(text)
    );
  },
  { stdout: true },
);

// RFC-0033 deepen: path params reach the upstream target; an unowned `:name` holes out.
runEmitCheck(
  "emit-check-45-proxy-upstream-params",
  PROXY_PARAMS,
  (rep, text) => {
    return (
      rep.token === "CWL_EMIT_CHECK_OK" &&
      /param\s+id;\s*\n\s*proxy\s+upstream\s+"https:\/\/backend-services\.internal\/device\/:id\/status";/.test(text) &&
      /proxy\s+upstream\s+"https:\/\/backend-services\.internal\/sites\/:site\/towers\/:tower";/.test(text) &&
      /hole\s+cwl:unknown-proxy-param:region;/.test(text)
    );
  },
  { stdout: true },
);

// RFC-0032 deepen: session.mint/revoke may name the cookie (name only, never a value).
runEmitCheck(
  "emit-check-46-session-cookie-name",
  SESSION_COOKIE,
  (rep, text) => {
    return (
      rep.token === "CWL_EMIT_CHECK_OK" &&
      (rep.holeCount ?? 1) === 0 &&
      /effects:\s*auth\.verify,\s*session\.mint\s+cookie\s+sid;/.test(text) &&
      /effects:\s*session\.revoke\s+cookie\s+sid;/.test(text)
    );
  },
  { stdout: true },
);

// RFC-0032 deepen: cookie policy attrs (httponly/secure/path/samesite) — never a token value.
runEmitCheck(
  "emit-check-51-session-cookie-attrs",
  SESSION_COOKIE_ATTRS,
  (rep, text) => {
    return (
      rep.token === "CWL_EMIT_CHECK_OK" &&
      (rep.holeCount ?? 1) === 0 &&
      /effects:\s*auth\.verify,\s*session\.mint\s+cookie\s+sid\s+httponly\s+secure\s+path\s+\/\s+samesite\s+lax;/.test(
        text,
      ) &&
      /effects:\s*session\.revoke\s+cookie\s+sid\s+path\s+\/;/.test(text)
    );
  },
  { stdout: true },
);

// RFC-0031 deepen: optional `if item.field` filter survives reverse.
runEmitCheck(
  "emit-check-47-html-repeat-if",
  REPEAT_IF,
  (rep, text) => {
    return (
      rep.token === "CWL_EMIT_CHECK_OK" &&
      (rep.holeCount ?? 1) === 0 &&
      /repeat\s+sessions\s+as\s+s\s+if\s+s\.active\s+html\s+"<tr><td>s\.user<\/td><\/tr>";/.test(text)
    );
  },
  { stdout: true },
);

// RFC-0031 deepen: empty-collection `else html` survives reverse.
runEmitCheck(
  "emit-check-48-html-repeat-else",
  REPEAT_ELSE,
  (rep, text) => {
    return (
      rep.token === "CWL_EMIT_CHECK_OK" &&
      (rep.holeCount ?? 1) === 0 &&
      /repeat\s+sessions\s+as\s+s\s+if\s+s\.active\s+html\s+"<tr><td>s\.user<\/td><\/tr>"\s+else\s+html\s+"<tr><td>none<\/td><\/tr>";/.test(
        text,
      )
    );
  },
  { stdout: true },
);

// RFC-0031 deepen: one-level nested repeat (`outerItem.field`) survives reverse.
runEmitCheck(
  "emit-check-49-html-repeat-nested",
  REPEAT_NESTED,
  (rep, text) => {
    return (
      rep.token === "CWL_EMIT_CHECK_OK" &&
      (rep.holeCount ?? 1) === 0 &&
      /repeat\s+regions\s+as\s+region\s+html\s+"<section><h2>region\.name<\/h2><ul>towers<\/ul><\/section>";/.test(
        text,
      ) &&
      /repeat\s+region\.towers\s+as\s+tower\s+html\s+"<li>tower\.id<\/li>";/.test(text)
    );
  },
  { stdout: true },
);

// RFC-0031 composition: nested repeat + if/else on both levels.
runEmitCheck(
  "emit-check-50-html-repeat-nested-filter",
  REPEAT_NESTED_FILTER,
  (rep, text) => {
    return (
      rep.token === "CWL_EMIT_CHECK_OK" &&
      (rep.holeCount ?? 1) === 0 &&
      /repeat\s+regions\s+as\s+region\s+html\s+"<section><h2>region\.name<\/h2><ul>towers<\/ul><\/section>"\s+else\s+html\s+"<p>no regions<\/p>";/.test(
        text,
      ) &&
      /repeat\s+region\.towers\s+as\s+tower\s+if\s+tower\.up\s+html\s+"<li>tower\.id<\/li>"\s+else\s+html\s+"<li>offline<\/li>";/.test(
        text,
      )
    );
  },
  { stdout: true },
);


// RFC-0020 deepen: named CORS origin survives reverse (bare cors.allow stays *).
runEmitCheck(
  "emit-check-52-cors-allow-origin",
  CORS_ORIGIN,
  (rep, text) => {
    return (
      rep.token === "CWL_EMIT_CHECK_OK" &&
      (rep.holeCount ?? 1) === 0 &&
      /effects:\s*cors\.allow\s+origin\s+https:\/\/app\.example\.com;/.test(text) &&
      /effects:\s*cors\.allow;/.test(text)
    );
  },
  { stdout: true },
);

// RFC-0020 deepen: named rate.limit rpm survives reverse.
runEmitCheck(
  "emit-check-53-rate-limit-rpm",
  RATE_LIMIT_RPM,
  (rep, text) => {
    return (
      rep.token === "CWL_EMIT_CHECK_OK" &&
      (rep.holeCount ?? 1) === 0 &&
      /effects:\s*rate\.limit\s+rpm\s+60;/.test(text) &&
      /effects:\s*rate\.limit;/.test(text)
    );
  },
  { stdout: true },
);

// RFC-0020 deepen: csrf.verify cookie <name> survives reverse.
runEmitCheck(
  "emit-check-54-csrf-verify-cookie",
  CSRF_COOKIE,
  (rep, text) => {
    return (
      rep.token === "CWL_EMIT_CHECK_OK" &&
      (rep.holeCount ?? 1) === 0 &&
      /effects:\s*csrf\.verify\s+cookie\s+csrf;/.test(text) &&
      /effects:\s*csrf\.verify;/.test(text)
    );
  },
  { stdout: true },
);

// RFC-0007 deepen: auth.require cookie <name> survives reverse.
runEmitCheck(
  "emit-check-55-auth-require-cookie",
  AUTH_REQUIRE_COOKIE,
  (rep, text) => {
    return (
      rep.token === "CWL_EMIT_CHECK_OK" &&
      (rep.holeCount ?? 1) === 0 &&
      /effects:\s*auth\.require\s+cookie\s+sid;/.test(text) &&
      /effects:\s*auth\.require;/.test(text)
    );
  },
  { stdout: true },
);

// RFC-0020 deepen: db.read|write table <name> survives reverse.
runEmitCheck(
  "emit-check-56-db-table-name",
  DB_TABLE,
  (rep, text) => {
    return (
      rep.token === "CWL_EMIT_CHECK_OK" &&
      (rep.holeCount ?? 1) === 0 &&
      /effects:\s*db\.read\s+table\s+users;/.test(text) &&
      /effects:\s*auth\.require,\s*db\.write\s+table\s+users;/.test(text) &&
      /effects:\s*db\.read;/.test(text)
    );
  },
  { stdout: true },
);

// RFC-0020 deepen: mail.send template <name> survives reverse.
runEmitCheck(
  "emit-check-57-mail-send-template",
  MAIL_TEMPLATE,
  (rep, text) => {
    return (
      rep.token === "CWL_EMIT_CHECK_OK" &&
      (rep.holeCount ?? 1) === 0 &&
      /effects:\s*mail\.send\s+template\s+welcome;/.test(text) &&
      /effects:\s*mail\.send;/.test(text)
    );
  },
  { stdout: true },
);

// RFC-0020 deepen: cors.allow methods (+ origin composition) survives reverse.
runEmitCheck(
  "emit-check-58-cors-allow-methods",
  CORS_METHODS,
  (rep, text) => {
    return (
      rep.token === "CWL_EMIT_CHECK_OK" &&
      (rep.holeCount ?? 1) === 0 &&
      /effects:\s*cors\.allow\s+methods\s+GET\s+POST;/.test(text) &&
      /effects:\s*cors\.allow\s+origin\s+https:\/\/app\.example\.com\s+methods\s+GET\s+POST\s+PUT;/.test(
        text,
      ) &&
      /effects:\s*cors\.allow;/.test(text)
    );
  },
  { stdout: true },
);

// RFC-0020 deepen: cache.max-age <seconds> survives reverse.
runEmitCheck(
  "emit-check-59-cache-max-age",
  CACHE_MAX_AGE,
  (rep, text) => {
    return (
      rep.token === "CWL_EMIT_CHECK_OK" &&
      /effects:\s*cache\.max-age\s+86400;/.test(text) &&
      /effects:\s*cache\.max-age\s+0;/.test(text)
    );
  },
  { stdout: true },
);

// RFC-0020 deepen: io host <name> survives reverse.
runEmitCheck(
  "emit-check-60-io-host",
  IO_HOST,
  (rep, text) => {
    return (
      rep.token === "CWL_EMIT_CHECK_OK" &&
      (rep.holeCount ?? 1) === 0 &&
      /effects:\s*io\s+host\s+api\.example\.com;/.test(text) &&
      /effects:\s*io;/.test(text)
    );
  },
  { stdout: true },
);

// RFC-0020 deepen: cors.allow credentials survives reverse.
runEmitCheck(
  "emit-check-61-cors-allow-credentials",
  CORS_CREDENTIALS,
  (rep, text) => {
    return (
      rep.token === "CWL_EMIT_CHECK_OK" &&
      (rep.holeCount ?? 1) === 0 &&
      /effects:\s*cors\.allow\s+origin\s+https:\/\/app\.example\.com\s+credentials;/.test(text) &&
      /effects:\s*cors\.allow\s+methods\s+GET\s+POST\s+credentials;/.test(text) &&
      /effects:\s*cors\.allow;/.test(text)
    );
  },
  { stdout: true },
);

runEmitCheck(
  "emit-check-62-session-access-cookie",
  SESSION_ACCESS,
  (rep, text) => {
    return (
      rep.token === "CWL_EMIT_CHECK_OK" &&
      (rep.holeCount ?? 1) === 0 &&
      /effects:\s*session\.read\s+cookie\s+sid;/.test(text) &&
      /effects:\s*session\.write\s+cookie\s+sid;/.test(text) &&
      /effects:\s*session\.read;/.test(text)
    );
  },
  { stdout: true },
);

runEmitCheck(
  "emit-check-63-cache-private",
  CACHE_PRIVATE,
  (rep, text) => {
    return (
      rep.token === "CWL_EMIT_CHECK_OK" &&
      (rep.holeCount ?? 1) === 0 &&
      /effects:\s*cache\.max-age\s+0,\s*cache\.private;/.test(text) &&
      /effects:\s*cache\.max-age\s+3600;/.test(text)
    );
  },
  { stdout: true },
);

runEmitCheck(
  "emit-check-64-cookie-purpose",
  COOKIE_PURPOSE,
  (rep, text) => {
    return (
      rep.token === "CWL_EMIT_CHECK_OK" &&
      (rep.holeCount ?? 0) >= 2 &&
      (rep.holeReasons ?? []).includes("unsupported:tracking-cookie") &&
      /cookie\s+theme\s+purpose\s+preference\s+values\s+light\s+dark;/.test(text) &&
      /cookie\s+sid\s+purpose\s+session;/.test(text) &&
      /effects:\s*auth\.require\s+cookie\s+sid;/.test(text) &&
      !/samesite\s+none/.test(text) &&
      !/cookie\s+_ga\b/.test(text)
    );
  },
  { stdout: true },
);

runEmitCheck(
  "emit-check-65-redirect-same-origin",
  REDIRECT_SAME,
  (rep, text) => {
    return (
      rep.token === "CWL_EMIT_CHECK_OK" &&
      (rep.holeCount ?? 0) >= 1 &&
      (rep.holeReasons ?? []).includes("unsupported:open-redirect") &&
      /redirect\s+"\/account";/.test(text) &&
      /redirect\s+"\/home"\s+status\s+301;/.test(text) &&
      !/https:\/\/evil\.example/.test(text)
    );
  },
  { stdout: true },
);

runEmitCheck(
  "emit-check-66-cache-no-store",
  CACHE_NO_STORE,
  (rep, text) => {
    return (
      rep.token === "CWL_EMIT_CHECK_OK" &&
      (rep.holeCount ?? 1) === 0 &&
      /effects:\s*cache\.no-store,\s*cache\.private;/.test(text) &&
      /effects:\s*cache\.no-store;/.test(text) &&
      /effects:\s*cache\.max-age\s+86400;/.test(text)
    );
  },
  { stdout: true },
);

runEmitCheck(
  "emit-check-67-cache-no-cache",
  CACHE_NO_CACHE,
  (rep, text) => {
    return (
      rep.token === "CWL_EMIT_CHECK_OK" &&
      (rep.holeCount ?? 1) === 0 &&
      /effects:\s*cache\.no-cache;/.test(text) &&
      /effects:\s*cache\.no-cache,\s*cache\.private;/.test(text) &&
      /effects:\s*cache\.no-store;/.test(text)
    );
  },
  { stdout: true },
);

runEmitCheck(
  "emit-check-68-site-document",
  SITE_DOCUMENT,
  (rep, text) => {
    return (
      rep.token === "CWL_EMIT_CHECK_OK" &&
      (rep.holeCount ?? 0) === 1 &&
      (rep.holeReasons ?? []).includes("unsupported:opaque-script") &&
      /<!doctype html>/.test(text) &&
      /class=\\"hero\\"/.test(text) &&
      /application\/ld\+json/.test(text) &&
      /class=\\"top\\"/.test(text) &&
      !/<!-- cwl:body -->/.test(text)
    );
  },
  { stdout: true },
);

runEmitCheck(
  "emit-check-69-site-shell",
  SITE_SHELL,
  (rep, text) => {
    return (
      rep.token === "CWL_EMIT_CHECK_OK" &&
      (rep.holeCount ?? 0) >= 3 &&
      (rep.holeReasons ?? []).includes("unsupported:opaque-script") &&
      (rep.holeReasons ?? []).includes("cwl:missing-head-slot") &&
      /<title>Home<\/title>/.test(text) &&
      /<title>Docs<\/title>/.test(text) &&
      /data-ao-page=\\"home\\"/.test(text) &&
      /data-ao-page=\\"docs\\"/.test(text) &&
      /ao-nav-link ao-nav-link-active\\" href=\\"\/\\"/.test(text) &&
      /ao-nav-link ao-nav-link-active\\" href=\\"\/docs\.html\\"/.test(text) &&
      !/<!-- cwl:/.test(text) &&
      !/<title>Bare<\/title>/.test(text) &&
      /<p>bare<\/p>/.test(text)
    );
  },
  { stdout: true },
);

runEmitCheck(
  "emit-check-70-site-nav-id",
  SITE_NAV,
  (rep, text) => {
    return (
      rep.token === "CWL_EMIT_CHECK_OK" &&
      (rep.holeReasons ?? []).includes("unsupported:opaque-script") &&
      /data-ao-page=\\"home\\"/.test(text) &&
      /data-ao-page=\\"docs\\"/.test(text) &&
      /data-ao-page=\\"about\\"/.test(text) &&
      /ao-nav-link ao-nav-link-active\\" href=\\"\/docs\.html\\"/.test(text) &&
      /ao-footer-link ao-footer-link-active\\" href=\\"\/docs\.html\\"/.test(text) &&
      /ao-nav-link ao-nav-link-active\\" href=\\"\/about\.html\\"/.test(text) &&
      /ao-footer-link ao-footer-link-active\\" href=\\"\/about\.html\\"/.test(text) &&
      /page paper_cwl/.test(text) &&
      /page whitepaper/.test(text) &&
      !/<!-- cwl:/.test(text)
    );
  },
  { stdout: true },
);

runEmitCheck(
  "emit-check-71-site-year",
  SITE_YEAR,
  (rep, text) => {
    return (
      rep.token === "CWL_EMIT_CHECK_OK" &&
      (rep.holeReasons ?? []).includes("unsupported:opaque-script") &&
      (rep.holeReasons ?? []).includes("cwl:missing-year-slot") &&
      /<!-- cwl:year -->/.test(text) &&
      !/©\s+20\d\d/.test(text)
    );
  },
  { stdout: true },
);

runEmitCheck(
  "emit-check-72-site-nav-links",
  SITE_LINKS,
  (rep, text) => {
    return (
      rep.token === "CWL_EMIT_CHECK_OK" &&
      (rep.holeReasons ?? []).includes("unsupported:opaque-script") &&
      (rep.holeReasons ?? []).includes("cwl:missing-links-slot") &&
      /ao-nav-links--desktop/.test(text) &&
      /ao-nav-links--mobile/.test(text) &&
      /ao-nav-link ao-nav-link-active\\" href=\\"\/\\">Home/.test(text) &&
      /ao-nav-link ao-nav-link-active\\" href=\\"\/docs\.html\\"/.test(text) &&
      /ao-nav-cta ao-nav-link-active\\" href=\\"\/contact\.html\\"/.test(text) &&
      /ao-nav-toggle/.test(text) &&
      !/<!-- cwl:links/.test(text)
    );
  },
  { stdout: true },
);

runEmitCheck(
  "emit-check-73-site-shell-behavior",
  SITE_SHELL_BEHAVIOR,
  (rep, text) => {
    return (
      rep.token === "CWL_EMIT_CHECK_OK" &&
      (rep.holeReasons ?? []).includes("cwl:missing-device-slot") &&
      (rep.holeReasons ?? []).includes("cwl:missing-drawer-target") &&
      (rep.holeReasons ?? []).includes("cwl:missing-links-slot") &&
      /data-cwl-drawer=\\"1\\"/.test(text) &&
      /Escape/.test(text) &&
      /<!-- cwl:device -->/.test(text) &&
      /href=\\"\/method\.html\\">Method/.test(text) &&
      /ao-nav-cta ao-nav-link-active/.test(text) &&
      !/userAgent/.test(text) &&
      !/matchMedia/.test(text) &&
      !/data-ao-device=\\"(mobile|desktop)\\"/.test(text)
    );
  },
  { stdout: true },
);

runEmitCheck(
  "emit-check-74-site-assets",
  SITE_ASSETS,
  (rep, text) => {
    return (
      rep.token === "CWL_EMIT_CHECK_OK" &&
      (rep.holeReasons ?? []).includes("cwl:missing-style-slot") &&
      (rep.holeReasons ?? []).includes("cwl:missing-image-slot") &&
      /rel=\\"stylesheet\\" href=\\"\/agenticops\.css\\"/.test(text) &&
      /src=\\"\/logo\.svg\\"/.test(text) &&
      /cwl-host/.test(text) &&
      /agenticops/.test(text) &&
      /public=/.test(text) &&
      /404\.html/.test(text) &&
      !/<!-- cwl:style -->/.test(text) &&
      !/<!-- cwl:image /.test(text)
    );
  },
  { stdout: true },
);

runEmitCheck(
  "emit-check-75-site-page",
  SITE_PAGE,
  (rep, text) => {
    return (
      rep.token === "CWL_EMIT_CHECK_OK" &&
      (rep.holeReasons ?? []).includes("cwl:missing-script-slot") &&
      (rep.holeReasons ?? []).includes("cwl:missing-form-slot") &&
      (rep.holeReasons ?? []).includes("unsupported:offsite-form") &&
      /<script src=\\"\/site\.js\\" defer><\/script>/.test(text) &&
      /<form method=\\"post\\" action=\\"\/contact\\">/.test(text) &&
      /name=\\"email\\" type=\\"email\\"/.test(text) &&
      /type=\\"submit\\">Send</.test(text) &&
      /target=\\"_blank\\" rel=\\"noopener\\"/.test(text) &&
      /github\.com\/AgenticOp-io/.test(text) &&
      !/<form method=\\"post\\" action=\\"https:\/\/evil\.example/.test(text) &&
      !/<!-- cwl:script -->/.test(text) &&
      !/<!-- cwl:form contact -->/.test(text)
    );
  },
  { stdout: true },
);

// Attachment holes count toward holeCount (Convert fat emit alignment; gold 36).
runEmitCheck(
  "emit-check-36-layout-chrome-hole-count",
  LAYOUT_CHROME,
  (rep, text) => {
    return (
      rep.token === "CWL_EMIT_CHECK_OK" &&
      (rep.holeCount ?? 0) === 2 &&
      (rep.holeReasons ?? []).includes("unsupported:opaque-script") &&
      /hole\s+unsupported:opaque-script;/.test(text)
    );
  },
  { stdout: true },
);

const ok = checks.every((c) => c.ok);
const report = {
  kind: "chrysalis.cwl.emit-check.gate",
  schemaVersion: 1,
  ok,
  token: ok ? "CWL_EMIT_CHECK_OK" : "CWL_EMIT_CHECK_FAIL",
  checks,
  generatedAt: new Date().toISOString(),
};
console.log(JSON.stringify(report, null, 2));
if (ok) console.log("CWL_EMIT_CHECK_OK");
process.exit(ok ? 0 : 1);
