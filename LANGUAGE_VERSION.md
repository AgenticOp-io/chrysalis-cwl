# CWL language version

| Field | Value |
| --- | --- |
| **Language** | Chrysalis Web Language (CWL) |
| **Goal** | DNA of web languages. A language in its own right. Able to replace any web page. Tip `1.0.66` replaces a document shell (golds `68`–`74`). It does not yet replace every web page. |
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
