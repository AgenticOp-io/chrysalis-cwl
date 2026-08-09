# CWL language version

| Field | Value |
| --- | --- |
| **Language** | Chrysalis Web Language (CWL) |
| **Version** | `1.0.12` |
| **Status** | Full thin-emit Rosetta + dual-mode fmt + runtime-cwl language-gold |
| **Date** | 2026-08-09 |

## What this version means

`1.0.12` finishes optional CWL-owned polish:

- **UI / islands / HTML templates** on thin emit reverse (SSR surface; no browser event invent)
- **Attachment-hole** pages reverse (`hole` + HTML)
- **Emit matrix** over all language-gold (honest holes remain on `11` / `21`)
- **`test:runtime-cwl`** → language-gold gate (`CWL_RUNTIME_CWL_OK`)
- **Dual-mode `cwl-fmt`:** default parse→print; `--webir` ingest→emit (`CWL_FMT_OK`)

## Gate

```bash
npm run test:language
npm run smoke:cwl-emit
npm run test:runtime-cwl
npm run smoke:cwl-runtime-matrix
npm run smoke:cwl-ingest-matrix
```
