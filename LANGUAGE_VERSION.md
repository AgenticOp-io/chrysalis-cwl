# CWL language version

| Field | Value |
| --- | --- |
| **Language** | Chrysalis Web Language (CWL) |
| **Version** | `1.0.27` |
| **Status** | Genome deepen — layout chrome + cookie HTML + page islands |
| **Date** | 2026-09-14 |

## What this version means

Phase **1.x** deepen continues (no Nest / LiveView / Flutter façades; no origin-PL dialects):

- **Layout chrome wrap** — `layout name { chrome html "…"; }` + `layout name;` on `@page` (RFC-0029, gold `36`)
- **HTML cookie / load interpolate** — classified device tokens, not UA regex (RFC-0014 deepen, gold `37`)
- **HTML + page island** — sibling `client ui` with `return html` (RFC-0030, gold `38`)
- Prior: urlencoded form + redirect shell (`1.0.26`), emit reverse (`1.0.25`), DNA bridge (`1.0.24`)
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
