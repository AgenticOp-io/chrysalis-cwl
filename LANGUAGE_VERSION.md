# CWL language version

| Field | Value |
| --- | --- |
| **Language** | Chrysalis Web Language (CWL) |
| **Version** | `0.1.11` |
| **Status** | Private-first DNA authoring: stdio LSP + completion v0 |
| **Date** | 2026-08-09 |

## What this version means

`0.1.11` adds **completion v0** on the 0.1.10 stdio Language Server:

- `textDocument/completion` — keywords / surface starters (`module`, `@route`, `@page`, `@component`, `handler`, `effects`, `hole`, `return`, `load`) + common effect presets; prefix filter only (no import/path smarts)
- Gate asserts completion returns ≥1 item (`CWL_LSP_SERVER_OK`)
- VS Code thin client registers CompletionItemProvider (`@` / `.` triggers)
- Prior: diagnose/fmt/cheap hover (`0.1.10`)

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
