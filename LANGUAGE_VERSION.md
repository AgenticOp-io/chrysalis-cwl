# CWL language version

| Field | Value |
| --- | --- |
| **Language** | Chrysalis Web Language (CWL) |
| **Version** | `1.0.32` |
| **Status** | RFC-0031 deepen — item fields in repeated markup |
| **Date** | 2026-09-16 |

## What this version means

Phase **1.x** deepen continues (no Nest / LiveView / Flutter façades; no origin-PL dialects):

- **RFC-0031 deepen:** dotted item fields inside repeats — `s.user`, `s.site.city`
- Fields lower to `data.member` chains on the item `param`; emit reverses the dotted text exactly
- Hyphenated words and `.`-prefixed text stay literal markup (no accidental bindings)
- **Gold `41`:** session-table shape; gold `40` bare item unchanged
- Prior: repeat gene (`1.0.31`), layout export (`1.0.30`), hole catalog (`1.0.29`)
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
