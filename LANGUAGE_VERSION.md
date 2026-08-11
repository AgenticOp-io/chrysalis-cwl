# CWL language version

| Field | Value |
| --- | --- |
| **Language** | Chrysalis Web Language (CWL) |
| **Version** | `1.0.20` |
| **Status** | Genome deepen — executable Effects beyond session presets |
| **Date** | 2026-08-11 |

## What this version means

Phase **1.x** deepen continues (no Nest / LiveView / Flutter façades; no origin-PL dialects):

- **RFC-0020 deepen** — gold `30-effects-executable`: `time.now` / `random` / `mail.send` / `db.*` / `io` / `rate.limit` lower to executable WebIR (stubs where engines would be forged)
- Prior: Data v2 / Set-Cookie / transport holes (`1.0.19`); nested literals (`1.0.18`)

Queue: [`DNA-BUILD-NEXT.md`](./docs/history/DNA-BUILD-NEXT.md) · [`CWL-GENOME-DEEPEN.md`](./docs/language/CWL-GENOME-DEEPEN.md)

## Gate

```bash
npm run build:webir
CWL_REQUIRE_WEBIR=1 npm run test:language
npm run smoke:cwl-ingest-matrix
npm run smoke:cwl-runtime-matrix
```
