# CWL editor / LSP path

**Status:** editor diagnostics v0 (0.1.9) — **not** a full Language Server Protocol process  
**Extension:** [`editors/vscode/`](../../editors/vscode/)  
**Language version:** `0.1.9`  
**Distribution:** private pillar — not VS Code Marketplace

## Have now

| Piece | Role |
| --- | --- |
| TextMate grammar | `.cwl` highlighting |
| Language config | comments / brackets |
| Push diagnostics | On open/change: `cwl diagnose --stdin --lsp` → `DiagnosticCollection` |
| Format document | `cwl fmt --stdin` via DocumentFormattingEditProvider |
| Command `CWL: Check active file` | `cwl check` on saved path |
| Map gate | `npm run test:cwl-lsp-map` → `CWL_LSP_MAP_OK` |

## Honest limits

- No stdio Language Server — no completion, hover, rename, or workspace symbols
- Extension shells out to pillar Node CLI (needs chrysalis-cwl checkout above `editors/vscode`)
- Not published to the Marketplace while pillars are private

## Next (still CWL-owned)

1. Real LSP server process (jsonrpc) wrapping the same map
2. Incremental parse / better ranges from parser locations
3. Private VSIX for internal installs (optional)

CWL CLI remains source of truth: `npm run check -- path/to/file.cwl`.
