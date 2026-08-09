# CWL language version

| Field | Value |
| --- | --- |
| **Language** | Chrysalis Web Language (CWL) |
| **Version** | `1.0.2` |
| **Status** | Exit 1.0 + DNA multi-host profile gold (RFC-0023) + holes bridge report |
| **Date** | 2026-08-09 |

## What this version means

`1.0.2` is a **patch** on the published private-registry language release:

- Packable `@chrysalis/cwl` (published lineage `@agenticop-io/cwl@1.0.0+`)
- DNA bridge: multi-host deploy profile seed (`deploy-profile-api.json`) + `cwlHolesBridgeReport`
- Physical `@chrysalis/webir` home; LSP polish from 1.0.1

See `CHANGELOG.md`, `docs/language/CWL-PUBLISH.md`, `docs/history/EXIT-1.0.md`.

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
