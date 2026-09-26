# CWL language version

| Field | Value |
| --- | --- |
| **Language** | Chrysalis Web Language (CWL) |
| **Version** | `1.0.56` |
| **Status** | RFC-0034 — cookie purpose |
| **Date** | 2026-09-26 |

## What this version means

- **RFC-0034:** cookie purpose — `session`, `csrf`, or enumerated `preference`; bare names and `samesite none` are `unsupported:tracking-cookie`
- **Gold `64`:** preference class, session name, tracking refusals
- Prior tip **1.0.55:** `cache.private` (gold `63`)

## Gate

```bash
npm run build:webir
CWL_REQUIRE_WEBIR=1 npm run test:language
```
