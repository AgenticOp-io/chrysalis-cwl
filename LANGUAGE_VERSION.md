# CWL language version

| Field | Value |
| --- | --- |
| **Language** | Chrysalis Web Language (CWL) |
| **Version** | `1.0.23` |
| **Status** | Genome deepen — named UI islands + form event contracts (RFC-0028) |
| **Date** | 2026-08-11 |

## What this version means

Phase **1.x** deepen continues (no Nest / LiveView / Flutter façades; no origin-PL dialects):

- **RFC-0028** — gold `33-ui-island-contracts`: named `client ui "…"`, `on change` / `on submit` metadata
- **WebSocket** — remains honest hole (`unsupported:websocket`); duplex not forged
- Prior: SSE (`1.0.22`), multipart (`1.0.21`), Effects (`1.0.20`)

Queue: [`DNA-BUILD-NEXT.md`](./docs/history/DNA-BUILD-NEXT.md) · [`CWL-GENOME-DEEPEN.md`](./docs/language/CWL-GENOME-DEEPEN.md)

## Gate

```bash
npm run build:webir
CWL_REQUIRE_WEBIR=1 npm run test:language
npm run smoke:cwl-ingest-matrix
npm run smoke:cwl-runtime-matrix
```
