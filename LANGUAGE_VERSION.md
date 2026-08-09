# CWL language version

| Field | Value |
| --- | --- |
| **Language** | Chrysalis Web Language (CWL) |
| **Version** | `1.0.14` |
| **Status** | Nested foreach Rosetta + TextMate/LSP sync + emit-check gate |
| **Date** | 2026-08-09 |

## What this version means

`1.0.14` closes authoring/Rosetta tip gaps after sibling pin of 1.0.13:

- **Nested foreach** after `return` lowers as documentation IR (empty-iter honesty) and reverse-emits
- **TextMate** + language-config aligned with LSP control/UI catalog (`else` / `client` / …)
- **Gates:** `test:cwl-grammar`, `test:cwl-emit-check` (WebIR-aware)
- **Emit smoke** deep-asserts `23-nested-control` else + nested foreach

## Gate

```bash
npm run build:webir
CWL_REQUIRE_WEBIR=1 npm run test:language
npm run smoke:cwl-emit
npm run smoke:cwl-ingest-matrix
npm run test:runtime-cwl
```
