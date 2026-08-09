# CWL language version

| Field | Value |
| --- | --- |
| **Language** | Chrysalis Web Language (CWL) |
| **Version** | `1.0.3` |
| **Status** | CWL pillar complete for Exit 1.0 lineage — dna-seed export + import-graph LSP |
| **Date** | 2026-08-09 |

## What this version means

`1.0.3` closes remaining **CWL-owned** Exit/DNA queue items:

- `@chrysalis/cwl/dna-seed` package export (RFC-0022/0023 seed for Secure)
- LSP definition / references / rename walk RFC-0009 import graphs
- Multi-host DNA gold + holes bridge report (1.0.2); LSP polish (1.0.1); registry publish (1.0.0)

Convert peel gravity and Secure pin bumps remain sibling-owned — not language genome work.

See `CHANGELOG.md`, `docs/history/DNA-CWL-COMPLETE.md`.

## Compatibility rules

1. **Patch** (`1.0.x`) — bugfixes, fixture expansion, print/parser fidelity that does not change accepted programs; docs/ops completeness.
2. **Minor** (`1.x.0`) — new optional syntax / RFCs that old programs still parse.
3. **Major** (`x.0.0`) — breaking grammar or semantics; bump here and call out migration in the RFC.

Breaking changes must be versioned in this file **before** they land in parser/print.

## Out of scope for language package `1.0.0`

- Convert reverse-home of WebIR (Convert still has a physical leftover until cutover)
- Helix / Secure DNA firewall implementation / cutover default (Secure Requested)
- Public npm / Marketplace distribution
- Convert peel/emit gravity (Convert Requested)

## Gate

```bash
npm run sync:cwl-package-lib
npm run test:language
npm run test:cwl-pack          # npm pack dry-run
npm run build:webir && npm run smoke:webir
```
