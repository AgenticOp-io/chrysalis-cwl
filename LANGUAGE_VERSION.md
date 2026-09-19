# CWL language version

| Field | Value |
| --- | --- |
| **Language** | Chrysalis Web Language (CWL) |
| **Version** | `1.0.46` |
| **Status** | RFC-0020 deepen — csrf.verify cookie name |
| **Date** | 2026-09-19 |

## What this version means

- **RFC-0020 deepen:** `csrf.verify cookie csrf` — genome names the CSRF cookie, never the token
- **Gold `54`:** named + bare; gold `22` unchanged
- Prior: rate.limit rpm (`1.0.45`), CORS origin (`1.0.44`)

## Gate

```bash
npm run build:webir
CWL_REQUIRE_WEBIR=1 npm run test:language
```
