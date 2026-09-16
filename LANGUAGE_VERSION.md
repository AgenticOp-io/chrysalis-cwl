# CWL language version

| Field | Value |
| --- | --- |
| **Language** | Chrysalis Web Language (CWL) |
| **Version** | `1.0.37` |
| **Status** | Parameterized hole reasons resolve in diagnostics |
| **Date** | 2026-09-16 |

## What this version means

Phase **1.x** deepen continues (no Nest / LiveView / Flutter façades; no origin-PL dialects):

- Reasons carrying an argument (`cwl:unknown-proxy-param:region`) now resolve to their catalog entry
- Authors see the explanation in `diagnose` / LSP instead of a misleading "uncatalogued hole" warning
- Only entries marked `param` resolve by prefix — the catalog stays strict for everything else
- Prior: path params in upstream targets (`1.0.36`), host-byte reasons (`1.0.35`), declared upstream forwards (`1.0.34`)
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
