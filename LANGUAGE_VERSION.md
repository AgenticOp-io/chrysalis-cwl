# CWL language version

| Field | Value |
| --- | --- |
| **Language** | Chrysalis Web Language (CWL) |
| **Version** | `1.0.62` |
| **Status** | RFC-0029 deepen — shared nav id |
| **Date** | 2026-10-01 |

## What this version means

- **RFC-0029 deepen:** `nav <id>;` is the shared nav id for `<!-- cwl:page -->` and `<!-- cwl:active -->`. The page decl name stays its own
- **Gold `70`:** `paper_cwl` marks Docs in the header and the footer; a page with no `nav` still uses its name
- The menu script, CSS, images, and hosting stay outside the language
- Prior tip **1.0.61:** per-page head (gold `69`)

## Gate

```bash
npm run build:webir
CWL_REQUIRE_WEBIR=1 npm run test:language
```
