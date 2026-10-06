# CWL language version

| Field | Value |
| --- | --- |
| **Language** | Chrysalis Web Language (CWL) |
| **Goal** | DNA of web languages. Tip `1.0.78` defines a complete CWL marketing site: literal year, CSS menu, owned assets, emit freeze (golds `68`–`86`). |
| **Version** | `1.0.78` |
| **Status** | Site complete |
| **Date** | 2026-10-05 |

## What this version means

- **Complete site:** [`docs/language/CWL-SITE-COMPLETE.md`](./docs/language/CWL-SITE-COMPLETE.md). Public genome uses `year 2026;`, checkbox menu + owned CSS, no host drawer/device JS. Token `CWL_SITE_COMPLETE_OK`
- **`year N;`** fills `<!-- cwl:year -->` at compose. `year host;` remains for dynamic hosts
- Prior tip **1.0.77:** owned fonts under assets

## Gate

```bash
npm run build:webir
CWL_REQUIRE_WEBIR=1 npm run test:language
npm run smoke:agenticop-site
npm run smoke:cwl-site-complete
```
