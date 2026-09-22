# CWL language version

| Field | Value |
| --- | --- |
| **Language** | Chrysalis Web Language (CWL) |
| **Version** | `1.0.48` |
| **Status** | RFC-0020 deepen — db.read/write table name |
| **Date** | 2026-09-22 |

## What this version means

- **RFC-0020 deepen:** `db.read table users` / `db.write table users` — logical table name only (no SQL)
- **Gold `56`:** named + bare; gold `30` unchanged
- Tagged `cwl-v1.0.47`; prior: auth.require cookie (`1.0.47`)

## Gate

```bash
npm run build:webir
CWL_REQUIRE_WEBIR=1 npm run test:language
```
