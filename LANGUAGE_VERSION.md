# CWL language version

| Field | Value |
| --- | --- |
| **Language** | Chrysalis Web Language (CWL) |
| **Goal** | DNA of web languages. A language in its own right. Able to replace any web page. Tip `1.0.72` composes a page into HTML on each request (golds `68`–`80`). WebSocket duplex, SQL engines, and unclassified client script stay holes. |
| **Version** | `1.0.72` |
| **Status** | Live document host |
| **Date** | 2026-10-03 |

## What this version means

- **Live document:** each request reads the CWL source and composes the page. Declared `param` and `query` names in that HTML are filled from the request. `year host` stays a token until the host passes a year. The device token is not evaluated
- **Gold `80`:** `/hello?name=Ada` and `/hello?name=%3Cb%3E` are different documents. An unknown path is the `/404.html` page with status 404
- Prior tip **1.0.71:** remaining head facts (gold `79`)

## Gate

```bash
npm run build:webir
CWL_REQUIRE_WEBIR=1 npm run test:language
```
