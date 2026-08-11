# CWL language version

| Field | Value |
| --- | --- |
| **Language** | Chrysalis Web Language (CWL) |
| **Version** | `1.0.21` |
| **Status** | Genome deepen — multipart field/file bindings (RFC-0026) |
| **Date** | 2026-08-11 |

## What this version means

Phase **1.x** deepen continues (no Nest / LiveView / Flutter façades; no origin-PL dialects):

- **RFC-0026** — gold `31-multipart-binding`: `multipart field` / `multipart file` part bindings
- Prior: executable Effects (`1.0.20`); Data v2 / Set-Cookie / transport holes (`1.0.19`)

Queue: [`DNA-BUILD-NEXT.md`](./docs/history/DNA-BUILD-NEXT.md) · [`CWL-GENOME-DEEPEN.md`](./docs/language/CWL-GENOME-DEEPEN.md)

## Gate

```bash
npm run build:webir
CWL_REQUIRE_WEBIR=1 npm run test:language
npm run smoke:cwl-ingest-matrix
npm run smoke:cwl-runtime-matrix
```
