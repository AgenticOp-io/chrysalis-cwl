# CWL editor / LSP path

**Status:** stdio Language Server (**1.0.15**) — diagnose/fmt/hover/completion + definition/references/rename (RFC-0009 import graph) + column ranges  
**Server:** [`scripts/cwl-lsp-server.mjs`](../../scripts/cwl-lsp-server.mjs)  
**Extension:** [`editors/vscode/`](../../editors/vscode/) (thin spawn client, **zero npm deps**)  
**Language version:** `1.0.15`  
**Distribution:** private pillar — not VS Code Marketplace · pack with `npm run pack:cwl-vsix`

## Have now

| Piece | Role |
| --- | --- |
| TextMate grammar | `.cwl` highlighting |
| Stdio LSP | Full initialize / sync / shutdown |
| Diagnostics / Format / Hover | Via diagnose map + fmt + AST |
| Completion | Keywords, HTTP methods, effects presets, RFC-0021 control / UI snippets, same-file handlers/paths, sibling `import "…"` paths |
| TextMate | Keyword catalog gated vs LSP (`test:cwl-grammar`) — `else` / `client` / `content-type` / … |
| Definition / References / Rename | Same-file **and** RFC-0009 **import graph** |
| Document symbols | `@route` / `@page` outline |
| Private VSIX | `npm run pack:cwl-vsix` |

## Honest limits

- Not a full IDE (no Marketplace, no index beyond the import graph)
- Rename does not rewrite path strings or comments
- Cross-file work requires imported files on disk
- Island `on click` completions are surface only — no browser event invent

## Next

*None for Exit path.* Optional smarter completion only.

CWL CLI remains source of truth: `npm run check -- path/to/file.cwl` · `npm run cwl -- emit-check path/to/file.cwl` (WebIR).
