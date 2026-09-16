# CWL language version

| Field | Value |
| --- | --- |
| **Language** | Chrysalis Web Language (CWL) |
| **Version** | `1.0.34` |
| **Status** | RFC-0033 declared upstream forwards |
| **Date** | 2026-09-16 |

## What this version means

Phase **1.x** deepen continues (no Nest / LiveView / Flutter façades; no origin-PL dialects):

- **RFC-0033:** `proxy upstream "<url>";` as a handler body — the destination is heritable
- Lowering: `__cwl_effect_upstream_proxy(<literal>)`; emit reverse returns the target verbatim or holes
- **Gold `43`:** two forwarded API routes, hole-free; `hub-cwl:upstream-proxy` narrowed to transfer mechanics
- Prior: credential/session effects (`1.0.33`), repeat item fields (`1.0.32`), repeat gene (`1.0.31`)
- Still host-owned by design: credential stores, proxy bytes (TLS / retries / tunnels), WebSocket duplex

Queue: [`DNA-BUILD-NEXT.md`](./docs/history/DNA-BUILD-NEXT.md) · [`CWL-GENOME-DEEPEN.md`](./docs/language/CWL-GENOME-DEEPEN.md)

## Gate

```bash
npm run build:webir
CWL_REQUIRE_WEBIR=1 npm run test:language
npm run smoke:cwl-ingest-matrix
npm run smoke:cwl-runtime-matrix
npm run smoke:cwl-emit
```
