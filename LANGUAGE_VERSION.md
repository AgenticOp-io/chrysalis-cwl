# CWL language version

| Field | Value |
| --- | --- |
| **Language** | Chrysalis Web Language (CWL) |
| **Version** | `1.0.65` |
| **Status** | RFC-0029 deepen — drawer, device token, named link lists |
| **Date** | 2026-10-01 |

## What this version means

- **RFC-0029 deepen:** `drawer` writes the menu toggle. `device host` keeps `<!-- cwl:device -->`. `links <name>` is a separate list
- **Gold `73`:** footer columns are their own list. CWL does not read the viewport or the user agent
- Prior tip **1.0.64:** one shared nav list (gold `72`)

## Gate

```bash
npm run build:webir
CWL_REQUIRE_WEBIR=1 npm run test:language
```
