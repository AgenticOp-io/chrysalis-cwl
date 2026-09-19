# CWL language version

| Field | Value |
| --- | --- |
| **Language** | Chrysalis Web Language (CWL) |
| **Version** | `1.0.38` |
| **Status** | RFC-0032 deepen — session cookie names; emit holeCount fix |
| **Date** | 2026-09-19 |

## What this version means

Phase **1.x** deepen continues (no Nest / LiveView / Flutter façades; no origin-PL dialects):

- **RFC-0032 deepen:** `session.mint cookie sid` / `session.revoke cookie sid` — name only
- **Gold `46`:** login/logout with named cookies; bare mint (gold `42`) unchanged
- Emit `holeCount` counts attachment holes (gold `36` / Convert counter alignment)
- Prior: hole-param resolve (`1.0.37`), proxy path params (`1.0.36`), host-byte reasons (`1.0.35`)

Queue: [`DNA-BUILD-NEXT.md`](./docs/history/DNA-BUILD-NEXT.md) · [`CWL-GENOME-DEEPEN.md`](./docs/language/CWL-GENOME-DEEPEN.md)

## Gate

```bash
npm run build:webir
CWL_REQUIRE_WEBIR=1 npm run test:language
npm run smoke:cwl-ingest-matrix
npm run smoke:cwl-runtime-matrix
npm run smoke:cwl-emit
```
