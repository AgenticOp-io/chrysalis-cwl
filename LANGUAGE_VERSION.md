# CWL language version

| Field | Value |
| --- | --- |
| **Language** | Chrysalis Web Language (CWL) |
| **Version** | `1.0.11` |
| **Status** | Thin emit Rosetta: response chrome + effects + page-load |
| **Date** | 2026-08-09 |

## What this version means

`1.0.11` widens thin emit reverse beyond control:

- **Response chrome:** `status` / `content-type` / `response-header` from ingest-tagged `web.request.response`
- **Effects peel:** `session.*` / `auth.require` / `cors.allow` / `csrf.verify` from executable-effects blocks
- **Page-load:** `load { … }` + HTML return
- **Defaults / headers:** param/query `=` defaults + hyphenated header idents
- Emit smoke matrix: **15** golds hole-free (`CWL_EMIT_SMOKE_OK`)

## Gate

```bash
npm run test:language
npm run smoke:cwl-emit
npm run smoke:cwl-runtime-matrix
npm run smoke:cwl-ingest-matrix
```
