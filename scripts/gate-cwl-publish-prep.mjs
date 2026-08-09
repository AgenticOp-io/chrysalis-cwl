#!/usr/bin/env node
/**
 * Phase 1.0 publish readiness + pack dry-run (does NOT publish unless --publish).
 * Token: CWL_PUBLISH_PREP_OK (and CWL_EXIT_1_0_PACK_OK when pack succeeds)
 */
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const PKG = join(ROOT, "packages/cwl");
const checks = [];

function ok(id, cond, detail = "") {
  checks.push({ id, ok: !!cond, detail: detail || undefined });
}

// Ensure lib staged
spawnSync(process.execPath, [join(ROOT, "scripts/sync-cwl-package-lib.mjs")], {
  cwd: ROOT,
  encoding: "utf8",
});

const langMd = readFileSync(join(ROOT, "LANGUAGE_VERSION.md"), "utf8");
const langVer = langMd.match(/\|\s*\*\*Version\*\*\s*\|\s*`([^`]+)`/)?.[1];
const pkg = JSON.parse(readFileSync(join(PKG, "package.json"), "utf8"));

ok("version-align", langVer === pkg.version, `${langVer} ≡ ${pkg.version}`);
ok("version-1-0", String(langVer).startsWith("1."), `language=${langVer}`);
ok("package-name", pkg.name === "@chrysalis/cwl");
const registry = pkg.publishConfig?.registry ?? "";
ok(
  "github-packages",
  String(registry).includes("npm.pkg.github.com"),
  registry || "missing publishConfig.registry",
);
ok(
  "not-public-npm-default",
  pkg.publishConfig?.access === "restricted",
  String(pkg.publishConfig?.access),
);
ok(
  "packable-private-flag",
  pkg.private === false,
  "private:false required for registry publish; repos stay private",
);
ok("package-exports", !!pkg.exports?.["."]);
ok("package-export-diagnose", pkg.exports?.["./diagnose"] === "./diagnose.mjs");
ok("package-export-lsp-map", pkg.exports?.["./lsp-map"] === "./lsp-map.mjs");
ok("package-export-parser", pkg.exports?.["./parser"] === "./parser.mjs");
ok("package-export-print", pkg.exports?.["./print"] === "./print.mjs");
ok("package-export-dna-seed", pkg.exports?.["./dna-seed"] === "./dna-seed.mjs");
ok("package-bin", pkg.bin?.cwl === "./bin/cwl.js");
ok("lib-staged", existsSync(join(PKG, "lib/cwl-parser.mjs")));
ok("lib-dna-seed-staged", existsSync(join(PKG, "lib/cwl-dna-seed.mjs")));
ok("lib-module-graph-staged", existsSync(join(PKG, "lib/cwl-module-graph.mjs")));
ok("bin-staged", existsSync(join(PKG, "bin/cwl.js")));

{
  const packBin = join(PKG, "bin/cwl.js");
  const emit = spawnSync(process.execPath, [packBin, "emit-check", "x.cwl"], {
    cwd: ROOT,
    encoding: "utf8",
    timeout: 15_000,
  });
  const emitMsg = `${emit.stderr || ""}${emit.stdout || ""}`;
  ok(
    "packable-cli-no-emit-check",
    emit.status !== 0 && /pillar CLI|no WebIR/i.test(emitMsg),
    emitMsg.slice(0, 200),
  );
  const webirFmt = spawnSync(process.execPath, [packBin, "fmt", "--webir", "x.cwl"], {
    cwd: ROOT,
    encoding: "utf8",
    timeout: 15_000,
  });
  const fmtMsg = `${webirFmt.stderr || ""}${webirFmt.stdout || ""}`;
  ok(
    "packable-cli-no-fmt-webir",
    webirFmt.status !== 0 && /pillar CLI|no WebIR/i.test(fmtMsg),
    fmtMsg.slice(0, 200),
  );
}

ok("publish-doc", existsSync(join(ROOT, "docs/language/CWL-PUBLISH.md")));
ok("exit-1-0-doc", existsSync(join(ROOT, "docs/history/EXIT-1.0.md")));
ok("private-pillars-doc", existsSync(join(ROOT, "docs/history/PRIVATE-PILLARS.md")));
ok("rfc-0023", existsSync(join(ROOT, "docs/language/CWL-RFC-0023-deploy-dna-profiles.md")));
ok("rfc-0024", existsSync(join(ROOT, "docs/language/CWL-RFC-0024-island-kinds.md")));

const lang = spawnSync(process.execPath, [join(ROOT, "scripts/gate-cwl-roundtrip.mjs")], {
  cwd: ROOT,
  encoding: "utf8",
  timeout: 120_000,
});
ok("roundtrip-gate", lang.status === 0, `exit=${lang.status}`);

const pack = spawnSync("npm", ["pack", "--dry-run", "--json", "--ignore-scripts"], {
  cwd: PKG,
  encoding: "utf8",
  shell: true,
  timeout: 120_000,
});
let packOk = pack.status === 0;
let packDetail = `exit=${pack.status}`;
const packOut = String(pack.stdout ?? "");
const jsonStart = packOut.indexOf("[");
const jsonStartObj = packOut.indexOf("{");
const start =
  jsonStart >= 0 && (jsonStartObj < 0 || jsonStart < jsonStartObj) ? jsonStart : jsonStartObj;
try {
  const parsed = JSON.parse(start >= 0 ? packOut.slice(start) : packOut || "[]");
  const entry = Array.isArray(parsed) ? parsed[0] : parsed;
  const files = entry?.files ?? [];
  const names = files.map((f) => f.path || f);
  packOk =
    pack.status === 0 &&
    names.some((n) => String(n).replace(/\\/g, "/").includes("lib/cwl-parser.mjs")) &&
    names.some((n) => String(n).replace(/\\/g, "/").includes("bin/cwl.js"));
  packDetail = packOk
    ? `files=${names.length}`
    : `missing lib/bin in pack: ${pack.stderr || packOut.slice(0, 500)}`;
} catch (e) {
  packOk = false;
  packDetail = `${e instanceof Error ? e.message : String(e)} :: ${packOut.slice(0, 200)}`;
}
ok("npm-pack-dry-run", packOk, packDetail);

const passed = checks.every((c) => c.ok);
const report = {
  kind: "chrysalis.cwl.publish-prep",
  schemaVersion: 2,
  ok: passed,
  token: passed ? "CWL_PUBLISH_PREP_OK" : "CWL_PUBLISH_PREP_FAIL",
  exitToken: passed ? "CWL_EXIT_1_0_PACK_OK" : undefined,
  languageVersion: langVer,
  packageVersion: pkg.version,
  note: "Does not npm publish unless human/CI runs publish with NODE_AUTH_TOKEN. Registry=GitHub Packages only.",
  checks,
  generatedAt: new Date().toISOString(),
};
console.log(JSON.stringify(report, null, 2));
if (passed) {
  console.log("CWL_PUBLISH_PREP_OK");
  console.log("CWL_EXIT_1_0_PACK_OK");
}
process.exit(passed ? 0 : 1);
