# CWL language version

| Field | Value |
| --- | --- |
| **Language** | Chrysalis Web Language (CWL) |
| **Goal** | DNA of web languages. A language in its own right. Able to replace any web page. Tip `1.0.71` names the remaining head facts (golds `68`–`79`). WebSocket duplex, SQL engines, and unclassified client script stay holes. |
| **Version** | `1.0.71` |
| **Status** | RFC-0029 deepen — remaining head facts |
| **Date** | 2026-10-03 |

## What this version means

- **RFC-0029 deepen:** `meta keywords`, `icon`, `alternate`, `preconnect`, page `style`, and `jsonld` fill their markers. Schema.org is not interpreted
- **Gold `79`:** an unknown icon is `cwl:unknown-icon`. A non-URL alternate or preconnect is not written. JSON that is not JSON, or that closes the script tag, is not written
- Prior tip **1.0.70:** social card (gold `78`)

## Gate

```bash
npm run build:webir
CWL_REQUIRE_WEBIR=1 npm run test:language
```
