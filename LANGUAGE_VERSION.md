# CWL language version

| Field | Value |
| --- | --- |
| **Language** | Chrysalis Web Language (CWL) |
| **Version** | `1.0.4` |
| **Status** | Pillar complete + tooling polish (CLI dna-seed, import-path LSP, hole-catalog gate, Node 22 CI) |
| **Date** | 2026-08-09 |

## What this version means

`1.0.4` is optional **CWL-owned polish** after Exit/DNA complete (`1.0.3`):

- CLI `dna-seed` / `--holes-report` (pillar + packable `bin/cwl`)
- LSP `import "…"` path completion from sibling `.cwl` files
- Gate `test:cwl-hole-catalog` → `CWL_HOLE_CATALOG_OK` (wired into `test:language`)
- CI Node **22**; docs: package README + `DNA-STEP-EXECUTE` WebIR home truth

Convert peel gravity and Secure pin bumps remain sibling-owned.

See `CHANGELOG.md`, `docs/history/DNA-CWL-COMPLETE.md`.

## Compatibility rules

1. **Patch** (`1.0.x`) — bugfixes, fixture expansion, print/parser fidelity that does not change accepted programs; docs/ops completeness.
2. **Minor** (`1.x.0`) — new optional syntax / RFCs that old programs still parse.
3. **Major** (`x.0.0`) — breaking grammar or semantics; bump here and call out migration in the RFC.

Breaking changes must be versioned in this file **before** they land in parser/print.

## Out of scope for language package `1.0.0+`

- Helix / Secure DNA firewall implementation / cutover default (Secure Requested)
- Public npm / Marketplace distribution
- Convert peel/emit gravity (Convert Requested)

## Gate

```bash
npm run sync:cwl-package-lib
npm run test:language
```
