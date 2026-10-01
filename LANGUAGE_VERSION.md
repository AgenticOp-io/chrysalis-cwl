# CWL language version

| Field | Value |
| --- | --- |
| **Language** | Chrysalis Web Language (CWL) |
| **Version** | `1.0.58` |
| **Status** | RFC-0020 deepen — cache.no-store |
| **Date** | 2026-09-30 |

## What this version means

- **RFC-0020 deepen:** `cache.no-store` — nothing may store the response; host sets the header
- **Gold `66`:** composes with `cache.private`; `cache.max-age` stays for public assets
- Prior tip **1.0.57:** same-site redirect (gold `65`)

## Gate

```bash
npm run build:webir
CWL_REQUIRE_WEBIR=1 npm run test:language
```
