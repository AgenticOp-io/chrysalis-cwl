# CWL language version

| Field | Value |
| --- | --- |
| **Language** | Chrysalis Web Language (CWL) |
| **Version** | `1.0.28` |
| **Status** | Genome deepen — page-island emit reverse + island events in WebIR |
| **Date** | 2026-09-14 |

## What this version means

Phase **1.x** deepen continues (no Nest / LiveView / Flutter façades; no origin-PL dialects):

- **Emit reverse RFC-0030** — peel `cwl:page-islands`; reprint sibling `client ui` + events (gold `38` hole-free)
- **Island events in WebIR** — `serialiseUiNode` keeps island `on … { action }` metadata
- **Cookie load emit** — `load { device: cookie name }` recovers `cookie` keyword (gold `37`)
- Prior: layout chrome / cookie HTML / page islands (`1.0.27`)
- **WebSocket** — remains honest hole (`unsupported:websocket`)
- **Layout decl emit** — composed HTML phenotype only (RFC-0029); no forged `layout` reconstruct

Queue: [`DNA-BUILD-NEXT.md`](./docs/history/DNA-BUILD-NEXT.md) · [`CWL-GENOME-DEEPEN.md`](./docs/language/CWL-GENOME-DEEPEN.md)

## Gate

```bash
npm run build:webir
CWL_REQUIRE_WEBIR=1 npm run test:language
npm run smoke:cwl-ingest-matrix
npm run smoke:cwl-runtime-matrix
npm run smoke:cwl-emit
```
