# CWL language version

| Field | Value |
| --- | --- |
| **Language** | Chrysalis Web Language (CWL) |
| **Version** | `1.0.36` |
| **Status** | RFC-0033 deepen — path params in upstream targets |
| **Date** | 2026-09-16 |

## What this version means

Phase **1.x** deepen continues (no Nest / LiveView / Flutter façades; no origin-PL dialects):

- **RFC-0033 deepen:** `proxy upstream "…/device/:id/status";` — a forwarded route keeps its whole destination
- Target params lower to `data.requestField` path reads; emit recovers them as `param …;` bindings
- Unowned `:name` in a target → `cwl:unknown-proxy-param:<name>`, never a guessed source
- **Gold `45`:** two parameterized forwards plus the honest failure case
- Prior: host-byte reasons (`1.0.35`), declared upstream forwards (`1.0.34`), credential/session effects (`1.0.33`)
- Still host-owned by design: credential stores, proxy transfer (TLS / retries / tunnels), keypairs, binary encoders, WebSocket duplex

Queue: [`DNA-BUILD-NEXT.md`](./docs/history/DNA-BUILD-NEXT.md) · [`CWL-GENOME-DEEPEN.md`](./docs/language/CWL-GENOME-DEEPEN.md)

## Gate

```bash
npm run build:webir
CWL_REQUIRE_WEBIR=1 npm run test:language
npm run smoke:cwl-ingest-matrix
npm run smoke:cwl-runtime-matrix
npm run smoke:cwl-emit
```
