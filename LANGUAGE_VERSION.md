# CWL language version

| Field | Value |
| --- | --- |
| **Language** | Chrysalis Web Language (CWL) |
| **Version** | `1.0.8` |
| **Status** | Deep execute: RFC-0021 early-exit lowering + RFC-0024 attachment soft-path |
| **Date** | 2026-08-09 |

## What this version means

`1.0.8` goes deeper on evaluate honesty:

- **RFC-0021:** projectable `if` guards → WebIR `data.if` + response/`__return` halt (`cwl-control-lower.mjs`); nested stmt lists; opaque `g_*` skipped (no invent)
- **RFC-0024:** attachment-hole pages return authored HTML when hole IR is present (`runtime-cwl` soft-path); pure holes still 501
- Matrix **25** with deeper `19` / `23` / `25` checks

## Gate

```bash
npm run test:language
npm run smoke:cwl-runtime-matrix
npm run smoke:cwl-ingest-matrix
```
