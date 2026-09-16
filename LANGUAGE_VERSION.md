# CWL language version

| Field | Value |
| --- | --- |
| **Language** | Chrysalis Web Language (CWL) |
| **Version** | `1.0.35` |
| **Status** | Precise host-byte hole reasons (RFC-0012 catalog) |
| **Date** | 2026-09-16 |

## What this version means

Phase **1.x** deepen continues (no Nest / LiveView / Flutter façades; no origin-PL dialects):

- **Catalog:** `hub-cwl:keypair-gen` + `hub-cwl:binary-render` — keypair and byte-render residuals get their own names
- A hole body keeps the rest of the route: declared `content-type` survives ingest and thin emit
- **Gold `44`:** QR / config / keypair routes hole out honestly with their media types intact
- Prior: declared upstream forwards (`1.0.34`), credential/session effects (`1.0.33`), repeat item fields (`1.0.32`)
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
