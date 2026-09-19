# CWL language version

| Field | Value |
| --- | --- |
| **Language** | Chrysalis Web Language (CWL) |
| **Version** | `1.0.45` |
| **Status** | RFC-0020 deepen — named rate.limit rpm |
| **Date** | 2026-09-19 |

## What this version means

- **RFC-0020 deepen:** `rate.limit rpm 60` — genome names the budget; bare `rate.limit` stays valid
- **Gold `53`:** metered + open; host enforces (no invented limiter runtime)
- Prior: CORS origin (`1.0.44`), cookie attrs (`1.0.43`)

## Gate

```bash
npm run build:webir
CWL_REQUIRE_WEBIR=1 npm run test:language
```
