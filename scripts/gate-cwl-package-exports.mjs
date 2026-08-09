#!/usr/bin/env node
/**
 * Gate: @chrysalis/cwl package exports for diagnose + lsp-map resolve.
 * Proves import('@chrysalis/cwl/diagnose') and import('@chrysalis/cwl/lsp-map')
 * (Node package self-reference from packages/cwl).
 * Token: CWL_PACKAGE_EXPORTS_OK
 */
import { readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { spawnSync } from 'node:child_process';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const PKG = join(ROOT, 'packages/cwl');
/** @type {string[]} */
const failures = [];

function readJson(p) {
  return JSON.parse(readFileSync(p, 'utf8'));
}

const pkg = readJson(join(PKG, 'package.json'));
if (pkg.private !== true) failures.push('package-not-private');
if (pkg.name !== '@chrysalis/cwl') failures.push(`bad-name:${pkg.name}`);

const exportsMap = pkg.exports ?? {};
for (const sub of ['./diagnose', './lsp-map']) {
  const target = exportsMap[sub];
  if (typeof target !== 'string' || !target.endsWith('.mjs')) {
    failures.push(`missing-or-bad-export:${sub}`);
  }
}

// Resolve documented export targets from pillar tree.
/** @type {Record<string, object>} */
const loaded = {};
for (const [sub, key] of [
  ['./diagnose', 'diagnose'],
  ['./lsp-map', 'lspMap'],
]) {
  const target = exportsMap[sub];
  if (typeof target !== 'string') continue;
  try {
    loaded[key] = await import(pathToFileURL(join(PKG, target)).href);
  } catch (e) {
    failures.push(`import-target-fail:${sub}:${e instanceof Error ? e.message : String(e)}`);
  }
}

const d = loaded.diagnose;
const l = loaded.lspMap;
if (d) {
  if (typeof d.diagnoseCwlSource !== 'function') failures.push('diagnoseCwlSource-missing');
  if (d.CWL_DIAGNOSE_KIND !== 'chrysalis.cwl.diagnose') failures.push('diagnose-kind');
  if (d.CWL_DIAGNOSE_SCHEMA_VERSION !== 4) failures.push('diagnose-schema');
  try {
    const report = d.diagnoseCwlSource('module m;\n', 'gate.cwl');
    if (!report || report.kind !== d.CWL_DIAGNOSE_KIND) failures.push('diagnose-smoke');
  } catch (e) {
    failures.push(`diagnose-smoke-throw:${e instanceof Error ? e.message : String(e)}`);
  }
}
if (l) {
  if (typeof l.mapDiagnoseSource !== 'function') failures.push('mapDiagnoseSource-missing');
  if (l.CWL_LSP_MAP_KIND !== 'chrysalis.cwl.lsp-map') failures.push('lsp-map-kind');
  try {
    const mapped = l.mapDiagnoseSource('module m;\n', 'gate.cwl');
    if (!mapped || mapped.kind !== l.CWL_LSP_MAP_KIND) failures.push('lsp-map-smoke');
  } catch (e) {
    failures.push(`lsp-map-smoke-throw:${e instanceof Error ? e.message : String(e)}`);
  }
}

// Package-name subpaths (consumer form) via Node self-reference from packages/cwl.
const probe = `
const d = await import('@chrysalis/cwl/diagnose');
const l = await import('@chrysalis/cwl/lsp-map');
if (typeof d.diagnoseCwlSource !== 'function') { console.error('no-diagnose'); process.exit(2); }
if (typeof l.mapDiagnoseSource !== 'function') { console.error('no-lsp-map'); process.exit(3); }
const r = d.diagnoseCwlSource('module m;\\n', 't.cwl');
if (!r || r.kind !== d.CWL_DIAGNOSE_KIND) { console.error('diagnose-kind'); process.exit(4); }
const m = l.mapDiagnoseSource('module m;\\n', 't.cwl');
if (!m || m.kind !== l.CWL_LSP_MAP_KIND) { console.error('lsp-kind'); process.exit(5); }
console.log('SUBPATH_OK');
`;
const child = spawnSync(process.execPath, ['--input-type=module', '-e', probe], {
  cwd: PKG,
  encoding: 'utf8',
  timeout: 30_000,
});
if (child.status !== 0 || !String(child.stdout ?? '').includes('SUBPATH_OK')) {
  failures.push(
    `package-name-import-fail:exit=${child.status}:stderr=${String(child.stderr ?? '').trim()}`,
  );
}

const ok = failures.length === 0;
const report = {
  kind: 'chrysalis.cwl.package-exports.gate',
  schemaVersion: 1,
  ok,
  token: ok ? 'CWL_PACKAGE_EXPORTS_OK' : 'CWL_PACKAGE_EXPORTS_FAIL',
  packageVersion: pkg.version,
  exports: {
    diagnose: '@chrysalis/cwl/diagnose',
    lspMap: '@chrysalis/cwl/lsp-map',
  },
  failures,
};

console.log(JSON.stringify(report, null, 2));
if (ok) console.log('CWL_PACKAGE_EXPORTS_OK');
process.exit(ok ? 0 : 1);
