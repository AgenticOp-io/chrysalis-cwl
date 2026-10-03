# CWL language version

| Field | Value |
| --- | --- |
| **Language** | Chrysalis Web Language (CWL) |
| **Goal** | DNA of web languages. A language in its own right. Able to replace any web page. Tip `1.0.68` names the viewport cut on the public site genome (golds `68`–`76`). WebSocket duplex, SQL engines, and unclassified client script stay holes. |
| **Version** | `1.0.68` |
| **Status** | RFC-0029 deepen — named viewport cut |
| **Date** | 2026-10-01 |

## What this version means

- **RFC-0029 deepen:** `device host <a> <b> below <px>` names the viewport cut. `<!-- cwl:device -->` stays
- **Gold `76`:** CWL does not call `matchMedia` or write either class. The public site genome uses `below 820`
- Prior tip **1.0.67:** script file, same-site form, off-site anchor (gold `75`)

## Gate

```bash
npm run build:webir
CWL_REQUIRE_WEBIR=1 npm run test:language
```
