# CWL language version

| Field | Value |
| --- | --- |
| **Language** | Chrysalis Web Language (CWL) |
| **Version** | `0.1.9` |
| **Status** | Private-first DNA authoring: editor push-diagnostics + fmt, LSP map gate |
| **Date** | 2026-08-08 |

## What this version means

`0.1.9` advances **authoring gravity** under a private pillar posture:

- GitHub pillars private (`chrysalis-cwl`, `chrysalis`, `chrysalis-security`) — see [`docs/history/PRIVATE-PILLARS.md`](./docs/history/PRIVATE-PILLARS.md)
- Editor diagnostics v0: diagnose → LSP map → VS Code `DiagnosticCollection`
- `cwl diagnose|fmt --stdin` for unsaved buffers; `diagnose --lsp` map shape
- `npm run test:cwl-lsp-map` → `CWL_LSP_MAP_OK` (wired into `test:language`)
- Format DocumentProvider in `editors/vscode` (still not Marketplace)
- Plan: [`docs/history/DNA-EVOLUTION-0.1.9.md`](./docs/history/DNA-EVOLUTION-0.1.9.md)

See `CHANGELOG.md` for deltas.

## Compatibility rules

1. **Patch** (`0.1.x`) — bugfixes, fixture expansion, print/parser fidelity that does not change accepted programs; docs/ops completeness.
2. **Minor** (`0.x.0`) — new optional syntax / RFCs that old programs still parse.
3. **Major** (`x.0.0`) — breaking grammar or semantics; bump here and call out migration in the RFC.

Breaking changes must be versioned in this file **before** they land in parser/print.

## Out of scope for `0.1.x`

- WebIR physical package ownership flip (Convert-coordinated)
- Full stdio Language Server (completion / hover / rename)
- Helix / Secure DNA firewall implementation
- Public npm / Marketplace — pillars stay private unless human reopens

## Gate

```bash
npm run test:language
npm run smoke:cwl-ingest-matrix   # needs link:webir
npm run test:language:full
```
