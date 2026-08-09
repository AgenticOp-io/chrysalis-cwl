#!/usr/bin/env node
/**
 * @chrysalis/cwl bin — packable CLI (parse/print/fmt/diagnose/check).
 * Uses staged packages/cwl/lib (synced from scripts/hub-ingest).
 */
import { readdir, readFile, stat } from "node:fs/promises";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { diagnoseCwlSource } from "../lib/cwl-diagnose.mjs";
import { formatCwlFile, formatCwlSource } from "../lib/cwl-fmt.mjs";
import { mapDiagnoseSource } from "../lib/cwl-lsp-map.mjs";
import { parseCwlModule } from "../lib/cwl-parser.mjs";
import { canonicalizeCwlModule, printCwlModule } from "../lib/cwl-print.mjs";

const PKG = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const ROOT = resolve(PKG, "../..");

const USAGE = `Usage: cwl <command> [options] <path>

Commands:
  parse <file.cwl>              Parse and print AST JSON
  print <file.cwl>              Parse → print normalized source
  fmt <file.cwl> [--write|--stdout]
  diagnose <file.cwl>           Authoring diagnostics JSON
  diagnose --stdin [--lsp]      Diagnose buffer from stdin
  check <file-or-dir>           Round-trip + diagnose

Options:
  -h, --help
  --stdin / --lsp / --name <path>
`;

async function listCwlFiles(dir) {
  const out = [];
  for (const ent of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, ent.name);
    if (ent.isDirectory()) out.push(...(await listCwlFiles(p)));
    else if (ent.isFile() && ent.name.endsWith(".cwl")) out.push(p);
  }
  return out.sort();
}

async function resolveCwlTargets(target) {
  const abs = resolve(target);
  const st = await stat(abs);
  if (st.isDirectory()) return listCwlFiles(abs);
  if (st.isFile() && abs.endsWith(".cwl")) return [abs];
  throw new Error(`expected a .cwl file or directory, got: ${target}`);
}

function deepEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function checkRoundTrip(file, source) {
  const ast1 = parseCwlModule(source, file);
  const printed = printCwlModule(ast1, { header: null });
  const ast2 = parseCwlModule(printed, file);
  if (!deepEqual(canonicalizeCwlModule(ast1), canonicalizeCwlModule(ast2))) {
    return { ok: false, error: "ast-mismatch-after-print" };
  }
  if (printCwlModule(ast2, { header: null }) !== printed) {
    return { ok: false, error: "print-not-idempotent" };
  }
  return { ok: true, routes: ast1.routes?.length ?? 0, moduleName: ast1.moduleName ?? null };
}

async function checkOne(file) {
  const source = await readFile(file, "utf8");
  const rel = relative(ROOT, file).replace(/\\/g, "/") || file.replace(/\\/g, "/");
  const result = { ok: true, file: rel };
  try {
    const roundTrip = checkRoundTrip(file, source);
    result.roundTrip = roundTrip;
    if (!roundTrip.ok) {
      result.ok = false;
      result.error = roundTrip.error;
    }
  } catch (e) {
    result.ok = false;
    result.error = "parse-failed";
    result.roundTrip = { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
  const diag = diagnoseCwlSource(source, file);
  result.diagnose = {
    ok: diag.ok,
    warnCount: diag.warnCount ?? 0,
    infoCount: diag.infoCount ?? 0,
    diagnostics: diag.diagnostics ?? [],
  };
  if (!diag.ok) {
    result.ok = false;
    if (!result.error) result.error = "diagnose-errors";
  }
  return result;
}

function parseArgs(argv) {
  const flags = new Set();
  const positional = [];
  const opts = {};
  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === "-h" || a === "--help") flags.add("help");
    else if (a === "--name") opts.name = argv[++i] ?? "";
    else if (a.startsWith("--name=")) opts.name = a.slice("--name=".length);
    else if (a.startsWith("--")) flags.add(a.slice(2));
    else positional.push(a);
  }
  return { flags, positional, opts };
}

async function readStdin() {
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  return Buffer.concat(chunks).toString("utf8");
}

function printJson(obj) {
  process.stdout.write(`${JSON.stringify(obj, null, 2)}\n`);
}

async function runCommand(cmd, positional, flags, opts = {}) {
  switch (cmd) {
    case "parse": {
      const file = positional[0];
      if (!file) throw new Error("parse requires <file.cwl>");
      const abs = resolve(file);
      const source = await readFile(abs, "utf8");
      printJson({ kind: "chrysalis.cwl.parse", schemaVersion: 1, ok: true, path: abs, module: parseCwlModule(source, abs) });
      return 0;
    }
    case "print": {
      const file = positional[0];
      if (!file) throw new Error("print requires <file.cwl>");
      const abs = resolve(file);
      const formatted = formatCwlSource(await readFile(abs, "utf8"), abs);
      process.stdout.write(formatted.endsWith("\n") ? formatted : `${formatted}\n`);
      return 0;
    }
    case "fmt": {
      if (flags.has("stdin")) {
        const formatted = formatCwlSource(await readStdin(), opts.name || "stdin.cwl");
        process.stdout.write(formatted.endsWith("\n") ? formatted : `${formatted}\n`);
        return 0;
      }
      const file = positional[0];
      if (!file) throw new Error("fmt requires <file.cwl> or --stdin");
      const abs = resolve(file);
      if (flags.has("stdout")) {
        const formatted = formatCwlSource(await readFile(abs, "utf8"), abs);
        process.stdout.write(formatted.endsWith("\n") ? formatted : `${formatted}\n`);
        return 0;
      }
      if (flags.has("check")) {
        const source = await readFile(abs, "utf8");
        const formatted = formatCwlSource(source, abs);
        const changed = formatted !== source;
        printJson({ kind: "chrysalis.cwl.fmt", schemaVersion: 2, ok: !changed, path: abs, changed, mode: "parse-print" });
        return changed ? 1 : 0;
      }
      printJson(await formatCwlFile(abs, { write: true }));
      return 0;
    }
    case "diagnose": {
      if (flags.has("stdin")) {
        const name = opts.name || "stdin.cwl";
        const source = await readStdin();
        const report = flags.has("lsp") ? mapDiagnoseSource(source, name, `file://${name}`) : diagnoseCwlSource(source, name);
        printJson(report);
        return report.ok ? 0 : 1;
      }
      const file = positional[0];
      if (!file) throw new Error("diagnose requires <file.cwl> or --stdin");
      const abs = resolve(file);
      const source = await readFile(abs, "utf8");
      const report = flags.has("lsp")
        ? mapDiagnoseSource(source, abs, `file://${abs.replace(/\\/g, "/")}`)
        : diagnoseCwlSource(source, abs);
      printJson(report);
      return report.ok ? 0 : 1;
    }
    case "check": {
      const target = positional[0];
      if (!target) throw new Error("check requires <file.cwl|directory>");
      const files = await resolveCwlTargets(target);
      if (files.length === 0) {
        printJson({ kind: "chrysalis.cwl.check", schemaVersion: 1, ok: false, error: "no-cwl-files", target: resolve(target), checkedFiles: 0 });
        return 2;
      }
      const results = [];
      for (const file of files) results.push(await checkOne(file));
      const failures = results.filter((r) => !r.ok);
      printJson({
        kind: "chrysalis.cwl.check",
        schemaVersion: 1,
        ok: failures.length === 0,
        target: resolve(target),
        checkedFiles: results.length,
        passCount: results.length - failures.length,
        failCount: failures.length,
        warnTotal: results.reduce((n, r) => n + (r.diagnose?.warnCount ?? 0), 0),
        failures: failures.map((f) => ({ file: f.file, error: f.error })),
      });
      return failures.length === 0 ? 0 : 1;
    }
    default:
      throw new Error(`unknown command: ${cmd}`);
  }
}

async function main() {
  const { flags, positional, opts } = parseArgs(process.argv.slice(2));
  if (flags.has("help") || positional.length === 0) {
    process.stdout.write(USAGE);
    process.exit(positional.length === 0 && !flags.has("help") ? 2 : 0);
  }
  try {
    process.exit(await runCommand(positional[0], positional.slice(1), flags, opts));
  } catch (e) {
    console.error(e instanceof Error ? e.message : e);
    process.exit(1);
  }
}

main();
