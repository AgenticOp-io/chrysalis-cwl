# CWL editor / LSP path

**Status:** scaffold (TextMate + check) — **not** a Language Server yet  
**Extension:** [`editors/vscode/`](../../editors/vscode/)  
**Language version:** aligns with `LANGUAGE_VERSION.md` (`0.1.8` package field on the extension)

## Have now

| Piece | Role |
| --- | --- |
| TextMate grammar | `.cwl` highlighting (keywords, `@route`/`@page`/`@component`, holes) |
| Language config | comments / brackets |
| Command `CWL: Check active file` | Spawns pillar `scripts/cwl-cli.mjs check` |

## Honest limits (do not claim more)

- No Language Server Protocol process — no push diagnostics, completion, hover, or rename
- No format-on-save wiring (use `npm run fmt:cwl` / `cwl fmt` from the pillar)
- Check command shells out to Node CLI; requires a chrysalis-cwl checkout two levels above `editors/vscode`
- Not published to the VS Code Marketplace

## Next (language tooling — still CWL-owned)

1. LSP server: stream `cwl-diagnose.mjs` on change
2. Format-on-save via `cwl fmt`
3. Marketplace publish after `@chrysalis/cwl` Exit 1.0 (human)

## Install (dev)

```bash
# Extension Development Host: open editors/vscode as the extension folder
# Or package a VSIX later — do not claim Marketplace availability yet
```

CWL CLI remains source of truth: `npm run check -- path/to/file.cwl`.
