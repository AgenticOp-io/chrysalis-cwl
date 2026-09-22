# CWL language version

| Field | Value |
| --- | --- |
| **Language** | Chrysalis Web Language (CWL) |
| **Version** | `1.0.47` |
| **Status** | RFC-0007 deepen — auth.require cookie name |
| **Date** | 2026-09-22 |

## What this version means

- **RFC-0007 / RFC-0020 deepen:** `auth.require cookie sid` — genome names the session cookie, never the token
- **Gold `55`:** named + bare; golds `22`/`30` unchanged
- Tagged `cwl-v1.0.46` for Convert CI; siblings caught up to 1.0.46
- Prior: csrf cookie (`1.0.46`), rate rpm (`1.0.45`)

## Gate

```bash
npm run build:webir
CWL_REQUIRE_WEBIR=1 npm run test:language
```
