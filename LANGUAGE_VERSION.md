# CWL language version

| Field | Value |
| --- | --- |
| **Language** | Chrysalis Web Language (CWL) |
| **Goal** | DNA of web languages. A language in its own right. Able to replace any web page. Tip `1.0.69` names document identity (golds `68`–`77`). WebSocket duplex, SQL engines, and unclassified client script stay holes. |
| **Version** | `1.0.69` |
| **Status** | RFC-0029 deepen — document identity |
| **Date** | 2026-10-01 |

## What this version means

- **RFC-0029 deepen:** `charset utf-8`, `viewport device`, `title`, `description`, and `canonical` are document facts. Open Graph stays in `head html`
- **Gold `77`:** `viewport device` writes the HTML viewport meta and does not evaluate it. `javascript:` is `cwl:canonical-not-url`
- Prior tip **1.0.68:** named viewport cut (gold `76`)

## Gate

```bash
npm run build:webir
CWL_REQUIRE_WEBIR=1 npm run test:language
```
