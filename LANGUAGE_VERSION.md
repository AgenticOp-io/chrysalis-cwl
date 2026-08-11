# CWL language version

| Field | Value |
| --- | --- |
| **Language** | Chrysalis Web Language (CWL) |
| **Version** | `1.0.19` |
| **Status** | Genome deepen — Data v2 loads + Set-Cookie headers + transport holes |
| **Date** | 2026-08-11 |

## What this version means

Phase **1.x** deepen continues (no Nest / LiveView / Flutter façades; no origin-PL dialects):

- **RFC-0013 v2 golds** — `27-data-v2`: `load` redirect / error / cookie → runtime 302 / 404 / page-load
- **Richer response headers** — hyphenated `response-header Set-Cookie` (`28-response-cookie`)
- **Transport holes** — `unsupported:sse` / `websocket` / `multipart` catalogued (`29-transport-holes`)
- Prior: RFC-0025 nested literals (`1.0.18`)

Queue: [`DNA-BUILD-NEXT.md`](./docs/history/DNA-BUILD-NEXT.md) · [`CWL-GENOME-DEEPEN.md`](./docs/language/CWL-GENOME-DEEPEN.md)

## Gate

```bash
npm run build:webir
CWL_REQUIRE_WEBIR=1 npm run test:language
npm run smoke:cwl-ingest-matrix
npm run smoke:cwl-runtime-matrix
```
