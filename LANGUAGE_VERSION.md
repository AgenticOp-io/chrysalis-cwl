# CWL language version

| Field | Value |
| --- | --- |
| **Language** | Chrysalis Web Language (CWL) |
| **Version** | `1.0.10` |
| **Status** | Rosetta reverse: thin emit early-guards / else / foreach + authored CT only |
| **Date** | 2026-08-09 |

## What this version means

`1.0.10` closes the thin emit Rosetta gap after 1.0.8–1.0.9 forward lower:

- **Thin emit reverse** (`cwl-emit-control.mjs` / `hub-emit-cwl-webir.mjs`): projectable `if` / `else` / `else if` / `foreach` from ingest-tagged WebIR — never invents `g_*`
- **runtime-cwl:** drop body-sniff content-type invent; authored WebIR CT only (UI shell wrap may set HTML CT)
- Emit smoke defaults cover `01` + `19` + `23`

## Gate

```bash
npm run test:language
npm run smoke:cwl-emit
npm run smoke:cwl-runtime-matrix
npm run smoke:cwl-ingest-matrix
```
