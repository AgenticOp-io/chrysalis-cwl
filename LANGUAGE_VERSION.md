# CWL language version

| Field | Value |
| --- | --- |
| **Language** | Chrysalis Web Language (CWL) |
| **Version** | `1.0.53` |
| **Status** | RFC-0020 deepen — cors.allow credentials |
| **Date** | 2026-09-26 |

## What this version means

- **RFC-0020 deepen:** `cors.allow … credentials` — host sets the header
- **Gold `61`:** origin+credentials, methods+credentials, bare `cors.allow` unchanged
- Prior tip **1.0.52:** `io host <name>` (gold `60`) — logical host only

## Gate

```bash
npm run build:webir
CWL_REQUIRE_WEBIR=1 npm run test:language
```
