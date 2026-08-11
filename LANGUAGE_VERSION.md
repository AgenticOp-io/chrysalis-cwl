# CWL language version

| Field | Value |
| --- | --- |
| **Language** | Chrysalis Web Language (CWL) |
| **Version** | `1.0.18` |
| **Status** | Genome deepen — nested structured literals (RFC-0025) |
| **Date** | 2026-08-11 |

## What this version means

Bootstrap Exit **1.0.17** is not the full web-app genome. Phase **1.x** reopens honest deepen:

- **RFC-0025** — nested `{ }` / `[ ]` keep structured AST (no collapsed JSON blobs → `{unknown-literal}`)
- Language gold `26-nested-literals`; `24-dna-bridge` nested `meta` executes as JSON
- Queue: [`DNA-BUILD-NEXT.md`](./docs/history/DNA-BUILD-NEXT.md) · [`CWL-GENOME-DEEPEN.md`](./docs/language/CWL-GENOME-DEEPEN.md)

Still forbidden: Nest / LiveView / Flutter / onion façades; origin PLs as CWL dialects.

## Gate

```bash
npm run build:webir
CWL_REQUIRE_WEBIR=1 npm run test:language
npm run smoke:cwl-ingest-matrix
npm run smoke:cwl-runtime-matrix
```
