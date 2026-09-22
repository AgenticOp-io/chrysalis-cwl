# CWL language version

| Field | Value |
| --- | --- |
| **Language** | Chrysalis Web Language (CWL) |
| **Version** | `1.0.51` |
| **Status** | RFC-0020 deepen — cache.max-age |
| **Date** | 2026-09-22 |

## What this version means

- **RFC-0020 deepen:** `cache.max-age <seconds>` — Cache-Control intent only
- **Gold `59`:** long-lived + `0` (no-store-ish intent); host sets headers
- Prior: **1.0.50** CORS methods · **1.0.49** mail template

## Gate

```bash
npm run build:webir
CWL_REQUIRE_WEBIR=1 npm run test:language
```
