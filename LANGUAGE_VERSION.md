# CWL language version

| Field | Value |
| --- | --- |
| **Language** | Chrysalis Web Language (CWL) |
| **Version** | `1.0.5` |
| **Status** | Execute honesty: body + content-type + response-header (matrix 9) |
| **Date** | 2026-08-09 |

## What this version means

`1.0.5` advances **language-owned execute** after sibling 1.0.4 consume:

- `RequestInput.post` from JSON / urlencoded bodies (`05-request-body` runtime-ok)
- Authored `content-type` from WebIR response attrs (`08-response-content-type` runtime-ok)
- Ingest + apply CWL `response-header` (`14-defaults-headers` runtime-ok); WebIR `ResponseAttrs.headers`
- Runtime matrix **9** fixtures → `CWL_RUNTIME_MATRIX_OK`

See `CHANGELOG.md`, `docs/history/DNA-STEP-EXECUTE.md`.

## Compatibility rules

1. **Patch** (`1.0.x`) — bugfixes, fixture expansion, print/parser fidelity that does not change accepted programs; docs/ops completeness.
2. **Minor** (`1.x.0`) — new optional syntax / RFCs that old programs still parse.
3. **Major** (`x.0.0`) — breaking grammar or semantics; bump here and call out migration in the RFC.

Breaking changes must be versioned in this file **before** they land in parser/print.

## Gate

```bash
npm run sync:cwl-package-lib
npm run test:language
npm run smoke:cwl-runtime-matrix
```
