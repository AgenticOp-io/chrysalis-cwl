# CWL language version

| Field | Value |
| --- | --- |
| **Language** | Chrysalis Web Language (CWL) |
| **Version** | `1.0.61` |
| **Status** | RFC-0029 deepen — per-page head in a shared shell |
| **Date** | 2026-10-01 |

## What this version means

- **RFC-0029 deepen:** `head html` fills `<!-- cwl:head -->`; `<!-- cwl:page -->` is the page name; `<!-- cwl:active <page> <class> -->` marks the current page
- **Gold `69`:** a shared shell with two pages; a head with no slot is `cwl:missing-head-slot`
- The menu script, CSS, images, and hosting stay outside the language
- Prior tip **1.0.60:** multi-line page HTML (gold `68`)

## Gate

```bash
npm run build:webir
CWL_REQUIRE_WEBIR=1 npm run test:language
```
