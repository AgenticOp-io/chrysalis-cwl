# CWL language version

| Field | Value |
| --- | --- |
| **Language** | Chrysalis Web Language (CWL) |
| **Version** | `1.0.15` |
| **Status** | Tip hygiene + nested-control gates + opaque-residual diagnose |
| **Date** | 2026-08-09 |

## What this version means

`1.0.15` closes tip fidelity after sibling sync of 1.0.14:

- **UT evidence** reads `LANGUAGE_VERSION.md` table (`languageVersion` no longer `unknown`)
- **Gates** cover nested foreach on `emit-check` / `fmt --webir` (`23`)
- **Diagnose** `opaque-residual` info for authored `g_*` (ingest skip honesty)
- **Packable CLI** honestly rejects `emit-check` / `fmt --webir` (pillar-only WebIR)
- Constitution docs: gene bank + WebIR home + RFC-0021 nested control landed

## Gate

```bash
npm run build:webir
CWL_REQUIRE_WEBIR=1 npm run test:language
npm run smoke:cwl-emit
npm run smoke:ut-evidence
```
