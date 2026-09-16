# CWL language version

| Field | Value |
| --- | --- |
| **Language** | Chrysalis Web Language (CWL) |
| **Version** | `1.0.31` |
| **Status** | RFC-0031 repeated markup — list fragments leave the host |
| **Date** | 2026-09-16 |

## What this version means

Phase **1.x** deepen continues (no Nest / LiveView / Flutter façades; no origin-PL dialects):

- **RFC-0031:** `repeat <collection> as <item> html "…";` renders one fragment per item
- Collection identifier interpolates in `return html` as rendered markup (beats scalar `load`)
- WebIR: `__cwl_html_repeat(iterable, itemTemplate)`; emit reverses the statement exactly
- **Gold `40`:** parse/print + ingest + emit reverse; `cwl:emit:html-repeat` stays honest
- Prior: layout export + hole gold (`1.0.30`), hole catalog (`1.0.29`)
- Still host-owned by design: credential crypto (`hub-cwl:credential-store`), upstream bytes (`hub-cwl:upstream-proxy`), WebSocket duplex

Queue: [`DNA-BUILD-NEXT.md`](./docs/history/DNA-BUILD-NEXT.md) · [`CWL-GENOME-DEEPEN.md`](./docs/language/CWL-GENOME-DEEPEN.md)

## Gate

```bash
npm run build:webir
CWL_REQUIRE_WEBIR=1 npm run test:language
npm run smoke:cwl-ingest-matrix
npm run smoke:cwl-runtime-matrix
npm run smoke:cwl-emit
```
