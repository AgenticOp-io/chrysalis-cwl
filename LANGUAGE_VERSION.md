# CWL language version

| Field | Value |
| --- | --- |
| **Language** | Chrysalis Web Language (CWL) |
| **Version** | `1.0.60` |
| **Status** | RFC-0029 deepen — multi-line page HTML |
| **Date** | 2026-09-30 |

## What this version means

- **RFC-0029 deepen:** `return html """` and `chrome html """` keep newlines and quotes
- **Gold `68`:** `<!-- cwl:body -->` is the document slot; prefix chrome (gold 36) stays
- CSS, browser script, images, and hosting stay outside the language
- Prior tip **1.0.59:** `cache.no-cache` (gold `67`)

## Gate

```bash
npm run build:webir
CWL_REQUIRE_WEBIR=1 npm run test:language
```
