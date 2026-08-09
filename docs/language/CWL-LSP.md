# CWL editor / LSP path

**Status:** minimal stdio Language Server (0.1.10) — diagnose/fmt/hover only  
**Server:** [`scripts/cwl-lsp-server.mjs`](../../scripts/cwl-lsp-server.mjs)  
**Extension:** [`editors/vscode/`](../../editors/vscode/) (thin spawn client, **zero npm deps**)  
**Language version:** `0.1.10`  
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
| Map gate | `npm run test:cwl-lsp-map` → `CWL_LSP_MAP_OK` |
| Server smoke | `npm run test:cwl-lsp-server` → `CWL_LSP_SERVER_OK` |
| Command `CWL: Check active file` | still shells `cwl check` on saved path |

## Run the server (other editors)

```bash
node scripts/cwl-lsp-server.mjs
```

JSON-RPC 2.0 with LSP `Content-Length` framing on stdin/stdout. VS Code extension spawns this process; no `vscode-languageclient` dependency.

## Honest limits

- **Not** a full IDE language server — no completion, rename, go-to-def, workspace symbols, or incremental parse
- Diagnostic ranges are still line-granular (map v1), not precise columns from the parser
- Hover only on `module` / `@route` / `@page` lines (AST surface), not identifiers in handlers
- Extension needs the chrysalis-cwl checkout above `editors/vscode` (spawns pillar Node script)
- Not published to the Marketplace while pillars are private
- Package `@chrysalis/cwl` stays `"private": true`

## Next (still CWL-owned)

1. Incremental parse / better ranges from parser locations
2. Completion for keywords / route surfaces (optional)
3. Private VSIX for internal installs (optional)

CWL CLI remains source of truth: `npm run check -- path/to/file.cwl`.
