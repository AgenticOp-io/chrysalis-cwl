#!/usr/bin/env node
/**
 * Gate: LANGUAGE_VERSION ≡ @chrysalis/cwl version; Convert + Secure pin
 * either file: sibling or a GitHub Packages registry version (@agenticop-io/cwl / @chrysalis/cwl).
 * Missing sibling checkouts (CI of chrysalis-cwl alone) are skipped, not failed.
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { languageVersion, VERSION, pillarRoot } from "../packages/cwl/index.mjs";

const ROOT = pillarRoot();
const CONVERT_PKG = resolve(ROOT, "../chrysalis-convert/package.json");
const SECURE_PKG = resolve(ROOT, "../chrysalis-security/package.json");
const FILE_PIN = "file:../chrysalis-cwl/packages/cwl";

function readJson(p) {
  return JSON.parse(readFileSync(p, "utf8"));
}

/**
 * @param {Record<string, unknown>} pkg
 * @returns {string[]}
 */
function allCwlPins(pkg) {
  const names = ["@chrysalis/cwl", "@agenticop-io/cwl"];
  const bags = ["dependencies", "devDependencies", "optionalDependencies"];
  /** @type {string[]} */
  const out = [];
  for (const bag of bags) {
    const block = pkg[bag];
    if (!block || typeof block !== "object") continue;
    for (const name of names) {
      const v = block[name];
      if (typeof v === "string") out.push(v);
    }
  }
  return out;
}

/**
 * @param {string} pin
 */
function isFilePin(pin) {
  return pin.startsWith("file:") && pin.includes("chrysalis-cwl/packages/cwl");
}

/**
 * Registry pin compatible with current language major (1.x accepts 1.0.0 while tip is 1.0.1).
 * @param {string} pin
 * @param {string} version
 */
function isRegistryPinOk(pin, version) {
  if (isFilePin(pin) || pin.startsWith("file:") || pin.startsWith("workspace:")) return false;
  const bare = pin.replace(/^[\^~>=<\s]+/, "").split(/\s+/)[0];
  if (!/^\d+\.\d+\.\d+$/.test(bare)) return false;
  if (bare === version) return true;
  const [maj] = bare.split(".");
  const [wantMaj] = version.split(".");
  return maj === wantMaj;
}

/**
 * @param {string[]} pins
 * @param {string} version
 */
function pinOk(pins, version) {
  if (pins.length < 1) return false;
  if (pins.some(isFilePin)) return true;
  return pins.some((p) => isRegistryPinOk(p, version));
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
  const pins = allCwlPins(readJson(path));
  const ok = pinOk(pins, VERSION);
  const pin = pins.join(" | ") || null;
  checks.push({ consumer: name, pin, ok });
  if (!ok) {
    failures.push(
      `${name} must pin CWL as ${FILE_PIN} and/or @agenticop-io/cwl@${VERSION} (same major) (got ${pin || "none"})`,
    );
  }
}

const report = {
  kind: "chrysalis.cwl.pin.gate",
  schemaVersion: 3,
  ok: failures.length === 0,
  languageVersion: lang,
  packageVersion: VERSION,
  pinExpected: `${FILE_PIN} | @agenticop-io/cwl@${VERSION} (same major)`,
  checks,
  failures,
};

console.log(JSON.stringify(report, null, 2));
process.exit(failures.length === 0 ? 0 : 1);
