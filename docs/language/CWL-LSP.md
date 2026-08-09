# CWL editor / LSP path

**Status:** stdio Language Server (**1.0.1**) — diagnose/fmt/hover/completion v1 + references v0 (same-file) + column ranges + definition + rename v0  
**Server:** [`scripts/cwl-lsp-server.mjs`](../../scripts/cwl-lsp-server.mjs)  
**Extension:** [`editors/vscode/`](../../editors/vscode/) (thin spawn client, **zero npm deps**)  
**Language version:** `1.0.1`  
**Distribution:** private pillar — not VS Code Marketplace · pack with `npm run pack:cwl-vsix`

## Have now

| Piece | Role |
| --- | --- |
| TextMate grammar | `.cwl` highlighting |
| Language config | comments / brackets |
| Stdio LSP | `initialize` / `initialized` / `shutdown` / `exit` |
| Diagnostics | `textDocument/didOpen|didChange|didClose` → `publishDiagnostics` via `mapDiagnoseSource` |
| Format | `textDocument/formatting` → `formatCwlSource` |
| Hover | module / `@route`/`@page` surface / handler name ident |
| Completion (v1) | Keywords + HTTP methods; **effects:** presets; same-file handler names + paths from AST |
| References (v0) | `textDocument/references` — same-file handler name + path surfaces only |
| Column ranges (v1) | Keyword-start + end characters on hole / `@route`/`@page` / `module` |
| Definition (v0) | Same-file `textDocument/definition` + `documentSymbol` |
| Rename (v0) | Same-file `textDocument/rename` (+ `prepareRename`) — handler/`page` name decl |
| Map gate | `npm run test:cwl-lsp-map` → `CWL_LSP_MAP_OK` |
| Server smoke | `npm run test:cwl-lsp-server` → `CWL_LSP_SERVER_OK` |
| Private VSIX | `npm run pack:cwl-vsix` → `dist-editors/cwl-lsp-*.vsix` |

## Run the server (other editors)

```bash
node scripts/cwl-lsp-server.mjs
```

JSON-RPC 2.0 with LSP `Content-Length` framing on stdin/stdout. VS Code extension spawns this process; no `vscode-languageclient` dependency.

## Honest limits

- **Not** a full IDE language server — no cross-file rename/imports, workspace symbols index, or incremental parse
- **References / rename v0** are **same-file only**
- **Completion v1** uses same-file AST hints — not a project-wide symbol index
- Extension needs the chrysalis-cwl checkout above `editors/vscode`
- Not published to the Marketplace while pillars are private

## Next (optional)

1. Cross-file rename / references when import graph is honest
2. Marketplace / public npm (forbidden while private)

CWL CLI remains source of truth: `npm run check -- path/to/file.cwl`.
