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
