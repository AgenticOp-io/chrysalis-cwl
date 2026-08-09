#!/usr/bin/env node
/**
 * Gate: LANGUAGE_VERSION ≡ @chrysalis/cwl version; Convert + Secure pin file: sibling when present.
 * Missing sibling checkouts (CI of chrysalis-cwl alone) are skipped, not failed.
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { languageVersion, VERSION, pillarRoot } from "../packages/cwl/index.mjs";

const ROOT = pillarRoot();
const CONVERT_PKG = resolve(ROOT, "../chrysalis-convert/package.json");
const SECURE_PKG = resolve(ROOT, "../chrysalis-security/package.json");
const PIN = "file:../chrysalis-cwl/packages/cwl";

function readJson(p) {
  return JSON.parse(readFileSync(p, "utf8"));
}

function depPin(pkg) {
  return (
    pkg.dependencies?.["@chrysalis/cwl"] ||
    pkg.dependencies?.["@agenticop-io/cwl"] ||
    pkg.devDependencies?.["@chrysalis/cwl"] ||
    pkg.devDependencies?.["@agenticop-io/cwl"] ||
    pkg.optionalDependencies?.["@chrysalis/cwl"] ||
    pkg.optionalDependencies?.["@agenticop-io/cwl"] ||
    null
  );
}

const failures = [];
const lang = languageVersion();
if (lang !== VERSION) {
  failures.push(`LANGUAGE_VERSION ${lang} !== package ${VERSION}`);
}

const checks = [];
for (const [name, path] of [
  ["convert", CONVERT_PKG],
  ["secure", SECURE_PKG],
]) {
  if (!existsSync(path)) {
    checks.push({ consumer: name, pin: null, ok: true, skipped: true, detail: "sibling not checked out" });
    continue;
  }
  const pin = depPin(readJson(path));
  const ok = pin === PIN || (typeof pin === "string" && pin.includes("chrysalis-cwl/packages/cwl"));
  checks.push({ consumer: name, pin, ok });
  if (!ok) failures.push(`${name} must pin CWL as ${PIN} (got ${pin || "none"})`);
}

const report = {
  kind: "chrysalis.cwl.pin.gate",
  schemaVersion: 2,
  ok: failures.length === 0,
  languageVersion: lang,
  packageVersion: VERSION,
  pinExpected: PIN,
  checks,
  failures,
};

console.log(JSON.stringify(report, null, 2));
process.exit(failures.length === 0 ? 0 : 1);
