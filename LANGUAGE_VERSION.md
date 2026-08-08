# CWL language version

| Field | Value |
| --- | --- |
| **Language** | Chrysalis Web Language (CWL) |
| **Version** | `0.1.8` |
| **Status** | Boundary-break slice: full ingest matrix, publish prep, RFC-0023/0024, attachment holes, editor scaffold |
| **Date** | 2026-08-07 |

## What this version means

`0.1.8` advances the language toward substrate + authoring + identity vocabulary:

- Ingest matrix over **all** `fixtures/language-gold/*/routes.cwl` (+ `expected-webir.json`)
- RFC-0023 deploy/DNA profiles + gold `deploy-profile.json`
- RFC-0024 island kinds + gold `25-island-kinds` + hole catalog entries
- Attachment holes: `hole` + later `return` kept on AST (`attachmentHoles`) through print/diagnose/ingest
- `npm run test:cwl-publish-prep` (no publish) wired into `test:language`
- VS Code TextMate + check command scaffold (`editors/vscode`)
- CI workflow `.github/workflows/cwl-language.yml`
- WebIR physical flip still **Requested** for Convert — [`WEBIR-FLIP-REQUESTED.md`](./docs/history/WEBIR-FLIP-REQUESTED.md)

See `CHANGELOG.md` for deltas.

## Compatibility rules

1. **Patch** (`0.1.x`) — bugfixes, fixture expansion, print/parser fidelity that does not change accepted programs; docs/ops completeness.
2. **Minor** (`0.x.0`) — new optional syntax / RFCs that old programs still parse.
3. **Major** (`x.0.0`) — breaking grammar or semantics; bump here and call out migration in the RFC.

Breaking changes must be versioned in this file **before** they land in parser/print.

## Out of scope for `0.1.x`

- WebIR physical package ownership flip (Convert-coordinated) — Phase 0.3 Slice 3
- Dual-mode `cwl-fmt` — Phase 0.3 remainder
- Helix / Secure DNA firewall implementation
- Actual `npm publish` — Phase 1.0 Exit (human)

## Gate

```bash
npm run test:language
npm run smoke:cwl-ingest-matrix   # needs link:webir
npm run test:language:full
```
