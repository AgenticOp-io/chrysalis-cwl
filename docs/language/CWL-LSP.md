# CWL editor / LSP path

**Status:** stdio Language Server (0.1.13) — diagnose/fmt/hover/completion + column ranges v1 + definition v0 + rename v0 (same-file)  
**Server:** [`scripts/cwl-lsp-server.mjs`](../../scripts/cwl-lsp-server.mjs)  
**Extension:** [`editors/vscode/`](../../editors/vscode/) (thin spawn client, **zero npm deps**)  
**Language version:** `0.1.13`  
**Distribution:** private pillar — not VS Code Marketplace

## Have now

| Piece | Role |
| --- | --- |
| TextMate grammar | `.cwl` highlighting |
| Language config | comments / brackets |
| Stdio LSP | `initialize` / `initialized` / `shutdown` / `exit` |
| Diagnostics | `textDocument/didOpen|didChange|didClose` → `publishDiagnostics` via `mapDiagnoseSource` |
| Format | `textDocument/formatting` → `formatCwlSource` |
| Hover (cheap) | module name; `@route` / `@page` method+path+handler |
| Completion (v0) | keywords / surface starters + common effect presets; prefix filter only |
| Column ranges (v1) | `character`/`column` on hole / `@route`/`@page` / `module` sites → LSP `range.start.character` |
| Definition (v0) | `textDocument/definition` — handler name / path → `@route`/`@page` surface line |
| Document symbols (v0) | `textDocument/documentSymbol` — `METHOD path` outline |
| Rename (v0) | `textDocument/rename` (+ `prepareRename`) — same-file `handler`/`page` **name** declaration only |
| Map gate | `npm run test:cwl-lsp-map` → `CWL_LSP_MAP_OK` |
| Server smoke | `npm run test:cwl-lsp-server` → `CWL_LSP_SERVER_OK` |
| Command `CWL: Check active file` | still shells `cwl check` on saved path |

## Run the server (other editors)

```bash
node scripts/cwl-lsp-server.mjs
```

JSON-RPC 2.0 with LSP `Content-Length` framing on stdin/stdout. VS Code extension spawns this process; no `vscode-languageclient` dependency.

## Honest limits

- **Not** a full IDE language server — no cross-file rename/imports, workspace symbols index, or incremental parse
- **Rename v0** is **same-file only**: renames the AST-visible `handler`/`page` declaration name; does **not** rewrite path strings, comments, or references in other files
- **Completion v0** is catalog + prefix only — **no** smart import/path, symbol table, or AST-scoped suggestions
- Diagnostic **columns** are keyword-start only for cheap sites (`module`, `@route`/`@page`, `hole`); other diags may still be character `0`; end character remains line-end (`1<<20`), not token-precise
- **Definition v0** is same-file surface jump only (handler name or path string → route/`@page` line) — not a full symbol table
- Hover only on `module` / `@route` / `@page` lines (AST surface), not identifiers in handlers
- Extension needs the chrysalis-cwl checkout above `editors/vscode` (spawns pillar Node script)
- Not published to the Marketplace while pillars are private
- Package `@chrysalis/cwl` stays `"private": true`

## Next (still CWL-owned)

1. Token-precise end columns / more statement sites
2. Smarter completion (route paths, handler names, import/path — optional)
3. Cross-file rename / references (only when import graph is honest)
4. Private VSIX for internal installs (optional)

CWL CLI remains source of truth: `npm run check -- path/to/file.cwl`.
