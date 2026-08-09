# CWL language version

| Field | Value |
| --- | --- |
| **Language** | Chrysalis Web Language (CWL) |
| **Version** | `0.1.10` |
| **Status** | Private-first DNA authoring: minimal stdio LSP (diagnose/fmt/hover) |
| **Date** | 2026-08-08 |

## What this version means

`0.1.10` adds a **minimal stdio Language Server** wrapping the 0.1.9 diagnose/fmt map:

- `scripts/cwl-lsp-server.mjs` — JSON-RPC over stdio (`initialize`, doc sync, diagnostics, formatting, cheap hover)
- VS Code extension: thin spawn client (no `vscode-languageclient` / zero extension npm deps)
- `npm run test:cwl-lsp-server` → `CWL_LSP_SERVER_OK` (wired into `test:language`)
- Pillars stay private — no Marketplace / public npm
- Prior: editor DiagnosticCollection + `cwl diagnose --stdin --lsp` + map gate (`0.1.9`)

See `CHANGELOG.md` for deltas. Spec: [`docs/language/CWL-LSP.md`](./docs/language/CWL-LSP.md)

## Compatibility rules

1. **Patch** (`0.1.x`) — bugfixes, fixture expansion, print/parser fidelity that does not change accepted programs; docs/ops completeness.
2. **Minor** (`0.x.0`) — new optional syntax / RFCs that old programs still parse.
3. **Major** (`x.0.0`) — breaking grammar or semantics; bump here and call out migration in the RFC.

Breaking changes must be versioned in this file **before** they land in parser/print.

## Out of scope for `0.1.x`

- WebIR physical package ownership flip (Convert-coordinated)
- Full IDE LSP (completion / rename / workspace symbols)
- Helix / Secure DNA firewall implementation
- Public npm / Marketplace — pillars stay private unless human reopens

## Gate

```bash
npm run test:language
npm run smoke:cwl-ingest-matrix   # needs link:webir
npm run test:language:full
```
