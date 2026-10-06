# CWL language version

| Field | Value |
| --- | --- |
| **Language** | Chrysalis Web Language (CWL) |
| **Goal** | DNA of web languages. Tip `1.0.76` defines 100% CWL for agenticop.io: genome pages, owned asset bytes, certified host effects, named outsides (golds `68`–`84`). |
| **Version** | `1.0.76` |
| **Status** | Site 100% contract |
| **Date** | 2026-10-05 |

## What this version means

- **Site 100% contract:** [`docs/language/CWL-SITE-100.md`](./docs/language/CWL-SITE-100.md). Official public host is certified `emit:site` freeze. Asset bytes for this site live under `fixtures/sites/agenticop-io/assets/`. Year, device, and drawer are genome-declared host effects. Off-site fonts and live Firebase CLI stay outside language bytes
- **Gold `84`:** contract module emits with owned assets and host effects. Token `CWL_SITE_100_OK`
- **Convert sync:** `cwl-db.mjs` is in `sync-to-convert` ALWAYS
- Prior tip **1.0.75:** host site emit / demo deploy without a Cloud Function

## Gate

```bash
npm run build:webir
CWL_REQUIRE_WEBIR=1 npm run test:language
npm run smoke:cwl-site-100
```
