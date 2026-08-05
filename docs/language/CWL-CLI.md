# CWL CLI

Pillar-owned authoring CLI for Chrysalis Web Language. No WebIR or convert monorepo required.

**Entry:** `scripts/cwl-cli.mjs`  
**Invoke:** `npm run cwl -- <command> …` or `node scripts/cwl-cli.mjs …`  
**Bin (after link):** `cwl <command> …`

## Commands

| Command | Purpose |
| --- | --- |
| `parse <file.cwl>` | Parse → AST JSON |
| `print <file.cwl>` | Parse → normalized source on stdout |
| `fmt <file.cwl>` | Parse → print format (default writes file) |
| `diagnose <file.cwl>` | Authoring diagnostics JSON |
| `check <file\|dir>` | Round-trip AST equality + diagnose (recurses `*.cwl`) |

### `fmt` flags

| Flag | Behavior |
| --- | --- |
| *(default)* / `--write` | Write formatted source if changed |
| `--stdout` | Print formatted source; do not write |
| `--check` | Exit `1` if file would change (CI-style) |

### `check` flags

| Flag | Behavior |
| --- | --- |
| `--verbose` | Include per-file `results` in the JSON report |

`check` fails (exit `1`) when any file has a round-trip failure or a diagnose **error**. Warns are reported (`warnTotal`) but do not fail the run — same policy as `npm run test:cwl-diagnose`.

## Examples

```bash
# Single-file parse / print / diagnose
npm run cwl -- parse fixtures/language-gold/01-literals/routes.cwl
npm run cwl -- print fixtures/language-gold/01-literals/routes.cwl
npm run cwl -- diagnose fixtures/language-gold/11-holes/routes.cwl

# Format (write) or dry-run to stdout
npm run cwl -- fmt path/to/app.cwl
npm run cwl -- fmt path/to/app.cwl --stdout
npm run cwl -- fmt path/to/app.cwl --check

# Round-trip + diagnose (file or directory)
npm run cwl -- check fixtures/language-gold/01-literals/routes.cwl
npm run cwl -- check fixtures/language-gold
```

Shortcut: `npm run check -- fixtures/language-gold` (same as `cwl check`).

## Diagnose codes (editor-facing)

Emitted by `cwl diagnose` / `cwl check` via `scripts/hub-ingest/cwl-diagnose.mjs`.

| Code | Severity | Meaning |
| --- | --- | --- |
| `parse` | error | Parser threw; file is not valid CWL |
| `module-name` | warn | Missing `module name;` declaration |
| `duplicate-route` | warn | Same method+path declared more than once |
| `uncatalogued-hole` | warn | `hole …` reason not in RFC-0012 catalog |
| `catalogued-hole` | info | Hole reason is catalogued (honest budget) |
| `surface-mismatch` | warn | `@page` vs `@route` body kind mismatch |
| `param-unused` | warn | Declared path/query param unused in HTML body |
| `layout-import-unused` | warn | Layout import present but no `@page` routes |
| `layout-import` | info | Layout module(s) imported for page surfaces |

Gates: `npm run test:language` still owns CI proof over `fixtures/language-gold`. This CLI is the authoring surface for the same parse/print/diagnose modules.
