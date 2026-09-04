# CWL language version

| Field | Value |
| --- | --- |
| **Language** | Chrysalis Web Language (CWL) |
| **Version** | `1.0.26` |
| **Status** | Genome deepen — redirect/error HTML shell + urlencoded form POST |
| **Date** | 2026-08-21 |

## What this version means

Phase **1.x** deepen continues (no Nest / LiveView / Flutter façades; no origin-PL dialects):

- **HTML shell preserve** — ingest keeps authored `return html` beside `load { redirect|error }` for emit reverse (gold `27` exact shell)
- **Urlencoded form POST** — gold `35-form-urlencoded` (`use urlencoded;` + `body` bindings)
- Prior: emit reverse (`1.0.25`), DNA bridge (`1.0.24`), UI islands (`1.0.23`)
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
