# CWL language version

| Field | Value |
| --- | --- |
| **Language** | Chrysalis Web Language (CWL) |
| **Goal** | DNA of web languages. Tip `1.0.77` owns agenticop.io font faces under genome assets (golds `68`–`85`). Live Firebase CLI stays ops. |
| **Version** | `1.0.77` |
| **Status** | Site owned fonts |
| **Date** | 2026-10-05 |

## What this version means

- **Owned fonts:** layout loads `/fonts.css`; latin DM Sans / JetBrains Mono woff2 live under `fixtures/sites/agenticop-io/assets/fonts/`. No Google Fonts CDN. Gold `85`. Token still `CWL_SITE_100_OK`
- **Emit:** `emit:site` copies CSS `url(/…)` face files after stylesheets
- Prior tip **1.0.76:** site 100% contract (pages, assets, host effects, named outsides)

## Gate

```bash
npm run build:webir
CWL_REQUIRE_WEBIR=1 npm run test:language
npm run smoke:cwl-site-100
```
