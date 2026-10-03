# CWL language version

| Field | Value |
| --- | --- |
| **Language** | Chrysalis Web Language (CWL) |
| **Goal** | DNA of web languages. A language in its own right. Able to replace any web page. Tip `1.0.70` names the social card (golds `68`–`78`). WebSocket duplex, SQL engines, and unclassified client script stay holes. |
| **Version** | `1.0.70` |
| **Status** | RFC-0029 deepen — social card |
| **Date** | 2026-10-01 |

## What this version means

- **RFC-0029 deepen:** `meta robots`, `meta author`, `meta theme`, `meta og`, and `meta twitter` fill `<!-- cwl:meta -->`. JSON-LD stays in `head html`
- **Gold `78`:** a non-URL image is `cwl:meta-not-url`. A theme that is not `#rrggbb` is `cwl:meta-theme`
- Prior tip **1.0.69:** charset, viewport meta, title, description, canonical (gold `77`)

## Gate

```bash
npm run build:webir
CWL_REQUIRE_WEBIR=1 npm run test:language
```
