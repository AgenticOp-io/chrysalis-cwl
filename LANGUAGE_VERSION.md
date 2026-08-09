# CWL language version

| Field | Value |
| --- | --- |
| **Language** | Chrysalis Web Language (CWL) |
| **Version** | `1.0.9` |
| **Status** | Deep execute: foreach IR + projectable else/else-if + page early-exit HTML |
| **Date** | 2026-08-09 |

## What this version means

`1.0.9` goes deeper on RFC-0021 evaluate honesty:

- **foreachBindings** → WebIR `data.foreach` after page/API success chrome (empty-iter only; no N-iteration HTML)
- **else / else if** → WebIR `ifElse.else` (opaque else-if skips whole construct)
- **Page early-exit HTML** on unshadowed `/post/:id` (`19-early-exit`)
- Matrix deeper checks for gate else-if + page 404 HTML

## Gate

```bash
npm run test:language
npm run smoke:cwl-runtime-matrix
npm run smoke:cwl-ingest-matrix
```
