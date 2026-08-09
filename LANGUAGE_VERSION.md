# CWL language version

| Field | Value |
| --- | --- |
| **Language** | Chrysalis Web Language (CWL) |
| **Version** | `1.0.17` |
| **Status** | DNA seed Helix parity + control-lower convert sync |
| **Date** | 2026-08-09 |

## What this version means

Built from sibling consume surfaces (Convert sync gap + Secure DNA bridge depth):

- **`cwl-control-lower.mjs`** in convert helper sync list (fat ingest SoR)
- DNA seed: Helix-matching fingerprint depth ≤ 2, `pathTemplateShapeEqual`, request/query name FPs, `status N;` → `status_classes`
- Gold `24-dna-bridge` exercises nested JSON / status / body+query bindings
- RFC-0022 updated; Secure Requested tip → **1.0.17**

## Gate

```bash
npm run build:webir
CWL_REQUIRE_WEBIR=1 npm run test:language
npm run smoke:cwl-emit
npm run smoke:cwl-ingest-matrix
```
