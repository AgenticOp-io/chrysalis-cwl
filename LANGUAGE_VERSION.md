# CWL language version

| Field | Value |
| --- | --- |
| **Language** | Chrysalis Web Language (CWL) |
| **Version** | `1.0.39` |
| **Status** | RFC-0031 deepen — conditional markup in repeats (`if` on item field) |
| **Date** | 2026-09-19 |

## What this version means

Phase **1.x** deepen continues (no Nest / LiveView / Flutter façades; no origin-PL dialects):

- **RFC-0031 deepen:** `repeat coll as item if item.field html "…"` — truthy item-field filter
- **Gold `47`:** filtered session rows; bare/field repeats (golds `40`/`41`) unchanged
- `when` lowers as third `__cwl_html_repeat` arg; emit reverses `if` exactly
- Prior: session cookie names (`1.0.38`), hole-param resolve (`1.0.37`), proxy path params (`1.0.36`)

Queue: [`DNA-BUILD-NEXT.md`](./docs/history/DNA-BUILD-NEXT.md) · [`CWL-GENOME-DEEPEN.md`](./docs/language/CWL-GENOME-DEEPEN.md)

## Gate

```bash
npm run build:webir
CWL_REQUIRE_WEBIR=1 npm run test:language
npm run smoke:cwl-ingest-matrix
npm run smoke:cwl-runtime-matrix
npm run smoke:cwl-emit
```
