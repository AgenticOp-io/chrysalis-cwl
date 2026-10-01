# CWL language version

| Field | Value |
| --- | --- |
| **Language** | Chrysalis Web Language (CWL) |
| **Version** | `1.0.57` |
| **Status** | RFC-0006 deepen — same-site redirect |
| **Date** | 2026-09-30 |

## What this version means

- **RFC-0006 deepen:** `redirect "/path"` — same-site only; off-site targets are `unsupported:open-redirect`
- **Gold `65`:** default 302, `status 301`, off-site refusal
- Prior tip **1.0.56:** cookie purpose (gold `64`)

## Gate

```bash
npm run build:webir
CWL_REQUIRE_WEBIR=1 npm run test:language
```
