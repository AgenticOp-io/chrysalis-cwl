# CWL language version

| Field | Value |
| --- | --- |
| **Language** | Chrysalis Web Language (CWL) |
| **Version** | `1.0.13` |
| **Status** | CI WebIR + emit catalog/CLI + LSP control/UI snippets |
| **Date** | 2026-08-09 |

## What this version means

`1.0.13` polishes the Rosetta tip for Convert/Secure pin:

- **CI** builds WebIR and runs `CWL_REQUIRE_WEBIR=1` language gate + `smoke:cwl-emit`
- **Hole catalog** lists thin-emit residuals (`cwl:emit:*`)
- **CLI** `emit-check` — CWL → WebIR → thin emit reverse report
- **LSP** completions/snippets for `if` / `else` / `foreach` / UI islands

## Gate

```bash
npm run build:webir
CWL_REQUIRE_WEBIR=1 npm run test:language
npm run smoke:cwl-emit
npm run test:runtime-cwl
npm run smoke:cwl-runtime-matrix
npm run smoke:cwl-ingest-matrix
```
