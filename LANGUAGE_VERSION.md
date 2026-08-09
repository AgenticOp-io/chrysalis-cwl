# CWL language version

| Field | Value |
| --- | --- |
| **Language** | Chrysalis Web Language (CWL) |
| **Version** | `0.1.14` |
| **Status** | Private-first DNA authoring: token end columns + parser/print package exports |
| **Date** | 2026-08-09 |

## What this version means

`0.1.14` ships **token end columns** for cheap diagnostic sites (`module`, `@route`/`@page`, `hole`) and expands package subpaths:

- Parser records exclusive keyword end characters alongside starts
- Diagnose schema **v5** emits `endCharacter`/`endColumn` when cheap
- LSP map schema **v2** uses end character when present (else line-end `1<<20`)
- Gate: `test:cwl-lsp-map` asserts hole gold end characters are finite and `> start`
- Package exports: `@chrysalis/cwl/parser` + `@chrysalis/cwl/print` (with diagnose/lsp-map from `0.1.13`)
- Prior: package diagnose/lsp-map exports (`0.1.13`), column starts + definition/rename v0 (`0.1.12`)

See `CHANGELOG.md` for deltas. Spec: [`docs/language/CWL-LSP.md`](./docs/language/CWL-LSP.md) · Publish: [`docs/language/CWL-PUBLISH.md`](./docs/language/CWL-PUBLISH.md)

## Compatibility rules

1. **Patch** (`0.1.x`) — bugfixes, fixture expansion, print/parser fidelity that does not change accepted programs; docs/ops completeness.
2. **Minor** (`0.x.0`) — new optional syntax / RFCs that old programs still parse.
3. **Major** (`x.0.0`) — breaking grammar or semantics; bump here and call out migration in the RFC.

Breaking changes must be versioned in this file **before** they land in parser/print.

## Out of scope for `0.1.x`

- WebIR physical package ownership flip (Convert-coordinated)
- Full IDE LSP (cross-file rename / workspace symbols / smart import-path completion)
- Helix / Secure DNA firewall implementation
- Public npm / Marketplace — pillars stay private unless human reopens

## Gate

```bash
npm run test:language
npm run smoke:cwl-ingest-matrix   # needs link:webir
npm run test:language:full
```
