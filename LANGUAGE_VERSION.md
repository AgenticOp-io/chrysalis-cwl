# CWL language version

| Field | Value |
| --- | --- |
| **Language** | Chrysalis Web Language (CWL) |
| **Version** | `1.0.63` |
| **Status** | RFC-0029 deepen — host calendar year |
| **Date** | 2026-10-01 |

## What this version means

- **RFC-0029 deepen:** `year host;` keeps `<!-- cwl:year -->` for the host. CWL does not read the clock
- **Gold `71`:** the footer token stays; a declaration with no token is `cwl:missing-year-slot`
- The menu toggle and the mobile/desktop switch stay `unsupported:opaque-script`
- Prior tip **1.0.62:** shared nav id (gold `70`)

## Gate

```bash
npm run build:webir
CWL_REQUIRE_WEBIR=1 npm run test:language
```
