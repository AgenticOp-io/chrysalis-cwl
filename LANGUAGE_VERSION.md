# CWL language version

| Field | Value |
| --- | --- |
| **Language** | Chrysalis Web Language (CWL) |
| **Version** | `1.0.59` |
| **Status** | RFC-0020 deepen — cache.no-cache |
| **Date** | 2026-09-30 |

## What this version means

- **RFC-0020 deepen:** `cache.no-cache` — a cache may store the response but must revalidate before reuse
- **Gold `67`:** composes with `cache.private`; `cache.no-store` stays the stronger refusal
- Prior tip **1.0.58:** `cache.no-store` (gold `66`)

## Gate

```bash
npm run build:webir
CWL_REQUIRE_WEBIR=1 npm run test:language
```
