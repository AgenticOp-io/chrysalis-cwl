# CWL language version

| Field | Value |
| --- | --- |
| **Language** | Chrysalis Web Language (CWL) |
| **Version** | `1.0.66` |
| **Status** | RFC-0029 deepen — stylesheet, image, Firebase public root |
| **Date** | 2026-10-01 |

## What this version means

- **RFC-0029 deepen:** `style`, `image`, and `host firebase` name the stylesheet, the image, and the public root
- **Gold `74`:** CWL does not parse CSS, read image bytes, or deploy
- Prior tip **1.0.65:** drawer, device token, named lists (gold `73`)

## Gate

```bash
npm run build:webir
CWL_REQUIRE_WEBIR=1 npm run test:language
```
