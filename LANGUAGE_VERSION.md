# CWL language version

| Field | Value |
| --- | --- |
| **Language** | Chrysalis Web Language (CWL) |
| **Version** | `1.0.29` |
| **Status** | Hole catalog — html-fragment + credential-store (Cinderpath) |
| **Date** | 2026-09-15 |

## What this version means

Phase **1.x** deepen continues (no Nest / LiveView / Flutter façades; no origin-PL dialects):

- **Catalog:** `hub-cwl:html-fragment` (load HTML fragments) + `hub-cwl:credential-store` (bcrypt/session)
- Cinderpath genome declares these holes in CWL; Go only executes
- Prior: page-island emit reverse (`1.0.28`), layout chrome (`1.0.27`)
- **WebSocket** — remains honest hole (`unsupported:websocket`)

Queue: [`DNA-BUILD-NEXT.md`](./docs/history/DNA-BUILD-NEXT.md) · [`CWL-GENOME-DEEPEN.md`](./docs/language/CWL-GENOME-DEEPEN.md)

## Gate

```bash
npm run build:webir
CWL_REQUIRE_WEBIR=1 npm run test:language
npm run smoke:cwl-ingest-matrix
npm run smoke:cwl-runtime-matrix
npm run smoke:cwl-emit
```
