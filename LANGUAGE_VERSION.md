# CWL language version

| Field | Value |
| --- | --- |
| **Language** | Chrysalis Web Language (CWL) |
| **Version** | `1.0.44` |
| **Status** | RFC-0020 deepen — named CORS origin |
| **Date** | 2026-09-19 |

## What this version means

- **RFC-0020 deepen:** `cors.allow origin https://app.example.com` — genome names the origin; bare `cors.allow` still means `*`
- **Gold `52`:** named origin + wildcard; gold `22` unchanged
- Prior: cookie policy attrs (`1.0.43`), RFC-0031 composition closed (`1.0.42`)

## Gate

```bash
npm run build:webir
CWL_REQUIRE_WEBIR=1 npm run test:language
```
