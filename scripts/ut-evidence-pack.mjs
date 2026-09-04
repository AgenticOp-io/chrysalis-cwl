#!/usr/bin/env node
/**
 * UT evidence pack — customer-facing prove that CWL surface ⊆ DNA cutover works.
 * Owns language side; Helix dispose when Secure present.
 *
 * Writes reports/ut-spine/evidence.{json,md}
 * Token: UT_EVIDENCE_OK
 */
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = join(ROOT, "reports/ut-spine");
const requireHelix =
  process.argv.includes("--require-helix") ||
  process.env.CHRYSALIS_UT_SPINE_REQUIRE_HELIX === "1";

function runNode(script, args = []) {
  const r = spawnSync(process.execPath, [script, ...args], {
    cwd: ROOT,
    encoding: "utf8",
    env: process.env,
    timeout: 180_000,
    maxBuffer: 8 * 1024 * 1024,
  });
  return {
    status: r.status ?? 1,
    stdout: r.stdout || "",
    stderr: r.stderr || "",
  };
}

const steps = [];

const lang = runNode(join(ROOT, "scripts/gate-cwl-dna-bridge.mjs"));
steps.push({
  id: "rfc-0022-contract",
  ok: lang.status === 0,
  detail: lang.status === 0 ? "expected-dna.json" : (lang.stderr || lang.stdout).slice(-300),
});

const spineArgs = requireHelix ? ["--require-helix"] : [];
const spine = runNode(join(ROOT, "scripts/smoke-ut-spine.mjs"), spineArgs);
let spineJson = null;
const spineReportPath = join(OUT_DIR, "ut-spine.json");
if (existsSync(spineReportPath)) {
  try {
    spineJson = JSON.parse(readFileSync(spineReportPath, "utf8"));
  } catch {
    /* ignore */
  }
}
if (!spineJson) {
  try {
    const m = spine.stdout.match(/\{[\s\S]*"kind":\s*"chrysalis\.cwl\.ut-spine"[\s\S]*\}\s*$/);
    if (m) spineJson = JSON.parse(m[0]);
  } catch {
    /* ignore */
  }
}
steps.push({
  id: "ut-spine",
  ok: spine.status === 0 && /UT_SPINE_OK/.test(spine.stdout),
  detail: spineJson?.helix?.detail || (spine.status === 0 ? "UT_SPINE_OK" : spine.stderr.slice(-300)),
});

const matrix = runNode(join(ROOT, "scripts/smoke-cwl-ingest-matrix.mjs"));
steps.push({
  id: "ingest-matrix",
  ok: matrix.status === 0 && /CWL_INGEST_MATRIX_OK/.test(matrix.stdout),
  detail: matrix.status === 0 ? "01+02+24-dna-bridge" : matrix.stderr.slice(-300),
});

const ok = steps.every((s) => s.ok);
const generatedAt = new Date().toISOString();
function readLanguageVersion() {
  const path = join(ROOT, "LANGUAGE_VERSION.md");
  if (!existsSync(path)) return "unknown";
  const md = readFileSync(path, "utf8");
  // Table form: | **Version** | `1.0.14` |
  const table = md.match(/\|\s*\*\*Version\*\*\s*\|\s*`([^`]+)`/);
  if (table) return table[1];
  const bare = md.match(/^\s*(\d+\.\d+\.\d+)/m);
  return bare?.[1] || "unknown";
}
const version = readLanguageVersion();

const evidence = {
  kind: "chrysalis.cwl.ut-evidence",
  schemaVersion: 1,
  ok,
  token: ok ? "UT_EVIDENCE_OK" : "UT_EVIDENCE_FAIL",
  languageVersion: version,
  narrative:
    "Translated surface (CWL) matches certified traffic DNA for cutover. LLM proposes; verify/DNA dispose. Never invent.",
  steps,
  spine: spineJson
    ? {
        token: spineJson.token,
        helix: spineJson.helix,
        owner: spineJson.owner,
      }
    : null,
  docs: [
    "docs/language/CWL-RFC-0022-dna-surface-bridge.md",
    "AgenticOps/docs/UT-CONVERT-SECURE-SPINE.md",
  ],
  generatedAt,
};

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(join(OUT_DIR, "evidence.json"), `${JSON.stringify(evidence, null, 2)}\n`);

const md = `# UT evidence pack

**Token:** \`${evidence.token}\`  
**Language:** CWL ${version}  
**Generated:** ${generatedAt}

## Story

${evidence.narrative}

## Steps

| Step | OK | Detail |
|------|----|--------|
${steps.map((s) => `| ${s.id} | ${s.ok ? "yes" : "no"} | ${s.detail || ""} |`).join("\n")}

## Commands

\`\`\`bash
npm run smoke:ut-evidence
npm run smoke:ut-spine:helix   # Helix required
\`\`\`

Convert consumes CWL; Secure enforces DNA. Convert does **not** own this pack.
`;
writeFileSync(join(OUT_DIR, "EVIDENCE.md"), md);

console.log(JSON.stringify(evidence, null, 2));
if (ok) console.log("UT_EVIDENCE_OK");
if (!ok) process.exit(1);
