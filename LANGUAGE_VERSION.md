# CWL language version

| Field | Value |
| --- | --- |
| **Language** | Chrysalis Web Language (CWL) |
| **Version** | `1.0.25` |
| **Status** | Genome deepen — emit reverse for load redirect / http.error |
| **Date** | 2026-08-21 |

## What this version means

Phase **1.x** deepen continues (no Nest / LiveView / Flutter façades; no origin-PL dialects):

- **Emit reverse** — `effect.redirect` / `effect.http.error` → `load { redirect|error }` (gold `27` hole-free emit)
- Prior: DNA bridge surfaces (`1.0.24`), UI islands (`1.0.23`), SSE (`1.0.22`), multipart (`1.0.21`)
- **WebSocket** — remains honest hole (`unsupported:websocket`); duplex not forged
- Note: redirect/error ingest still drops HTML shell; emit recovers load + empty `return html ""`

Queue: [`DNA-BUILD-NEXT.md`](./docs/history/DNA-BUILD-NEXT.md) · [`CWL-GENOME-DEEPEN.md`](./docs/language/CWL-GENOME-DEEPEN.md)

## Gate

```bash
npm run build:webir
CWL_REQUIRE_WEBIR=1 npm run test:language
npm run smoke:cwl-ingest-matrix
npm run smoke:cwl-runtime-matrix
npm run smoke:cwl-emit
```
