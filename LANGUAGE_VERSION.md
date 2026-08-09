# CWL language version

| Field | Value |
| --- | --- |
| **Language** | Chrysalis Web Language (CWL) |
| **Version** | `0.1.12` |
| **Status** | Private-first DNA authoring: column ranges v1 + definition v0 |
| **Date** | 2026-08-09 |

## What this version means

`0.1.12` adds **column-aware diagnostic ranges** and folds in **definition v0** on the stdio Language Server:

- Parser records 0-based keyword starts for `module`, `@route`/`@page`, and `hole` (cheap indent/site)
- Diagnose emits optional `character` / `column` (schema v4)
- LSP map sets `range.start.character` from `character`/`column` (default 0)
- Gate asserts ≥1 mapped diagnostic with `character > 0` (holes gold indent + synthetic)
- `textDocument/definition` + `documentSymbol` (same-file surface jump / outline)
- Prior: completion v0 (`0.1.11`), diagnose/fmt/cheap hover (`0.1.10`)

See `CHANGELOG.md` for deltas. Spec: [`docs/language/CWL-LSP.md`](./docs/language/CWL-LSP.md)

## Compatibility rules

1. **Patch** (`0.1.x`) — bugfixes, fixture expansion, print/parser fidelity that does not change accepted programs; docs/ops completeness.
2. **Minor** (`0.x.0`) — new optional syntax / RFCs that old programs still parse.
3. **Major** (`x.0.0`) — breaking grammar or semantics; bump here and call out migration in the RFC.

Breaking changes must be versioned in this file **before** they land in parser/print.

## Out of scope for `0.1.x`

- WebIR physical package ownership flip (Convert-coordinated)
- Full IDE LSP (rename / go-to-def / workspace symbols / smart import-path completion)
- Helix / Secure DNA firewall implementation
- Public npm / Marketplace — pillars stay private unless human reopens

## Gate

```bash
npm run test:language
npm run smoke:cwl-ingest-matrix   # needs link:webir
npm run test:language:full
```
