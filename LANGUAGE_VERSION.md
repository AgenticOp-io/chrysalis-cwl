# CWL language version

| Field | Value |
| --- | --- |
| **Language** | Chrysalis Web Language (CWL) |
| **Version** | `1.0.6` |
| **Status** | Execute optional: auth effects, pages, HTML interp, layout, UI v0/v1 (matrix 16) |
| **Date** | 2026-08-09 |

## What this version means

`1.0.6` lands the optional execute surfaces:

- Fix HTML double-`web.request.response` wrap on ingest (honest single body)
- `07-auth-effects`, `09-fullstack-page`, `10-page-load`, `15-html-interpolation`, `16-layout`, `17-ui-v0`, `18-ui-v1` → **runtime-ok**
- Runtime matrix **16** → `CWL_RUNTIME_MATRIX_OK`

See `CHANGELOG.md`, `docs/history/DNA-STEP-EXECUTE.md`.

## Gate

```bash
npm run sync:cwl-package-lib
npm run test:language
npm run smoke:cwl-runtime-matrix
npm run smoke:cwl-ingest-matrix
```
