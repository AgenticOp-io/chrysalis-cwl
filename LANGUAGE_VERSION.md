# CWL language version

| Field | Value |
| --- | --- |
| **Language** | Chrysalis Web Language (CWL) |
| **Version** | `1.0.64` |
| **Status** | RFC-0029 deepen — shared nav list |
| **Date** | 2026-10-01 |

## What this version means

- **RFC-0029 deepen:** `link` rows fill every `<!-- cwl:links -->` slot, so desktop and mobile share one nav
- **Gold `72`:** a contact row may use its own class; a list with no slot is `cwl:missing-links-slot`
- Opening the drawer and setting `data-ao-device` stay `unsupported:opaque-script`
- Prior tip **1.0.63:** host calendar year (gold `71`)

## Gate

```bash
npm run build:webir
CWL_REQUIRE_WEBIR=1 npm run test:language
```
