# CWL language version

| Field | Value |
| --- | --- |
| **Language** | Chrysalis Web Language (CWL) |
| **Version** | `0.1.13` |
| **Status** | Private-first DNA authoring: package diagnose/lsp-map exports |
| **Date** | 2026-08-09 |

## What this version means

`0.1.13` exposes **diagnose** and **lsp-map** helpers as `@chrysalis/cwl` package subpaths (no deep-link into `scripts/hub-ingest/`):

- `import { diagnoseCwlSource, … } from '@chrysalis/cwl/diagnose'`
- `import { mapDiagnoseSource, … } from '@chrysalis/cwl/lsp-map'`
- Thin re-exports over canonical `scripts/hub-ingest/cwl-diagnose.mjs` / `cwl-lsp-map.mjs`
- Gate: `test:cwl-package-exports` → `CWL_PACKAGE_EXPORTS_OK` (wired into `test:language`)
- Prior: column ranges + definition v0 (`0.1.12`), completion v0 (`0.1.11`)

See `CHANGELOG.md` for deltas. Spec: [`docs/language/CWL-LSP.md`](./docs/language/CWL-LSP.md) · Publish: [`docs/language/CWL-PUBLISH.md`](./docs/language/CWL-PUBLISH.md)

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
