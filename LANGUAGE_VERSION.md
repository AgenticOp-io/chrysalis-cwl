# CWL language version

| Field | Value |
| --- | --- |
| **Language** | Chrysalis Web Language (CWL) |
| **Version** | `1.0.0` |
| **Status** | Exit 1.0 — packable private GitHub Packages artifact (Rosetta / DNA of the web) |
| **Date** | 2026-08-09 |

## What this version means

`1.0.0` is the first **registry-ready** language release:

- Packable `@chrysalis/cwl` with staged `lib/` (parser/print/diagnose/lsp-map/fmt) + `bin/cwl`
- `publishConfig.registry` = GitHub Packages (`npm.pkg.github.com`), `access: restricted` — **not** public npm
- `"private": false` only so private-registry publish is allowed (repos stay private)
- Convert/Secure may keep `file:` pins until they migrate (Requested)
- WebIR physical flip still Convert-owned (not a language-package blocker)

See `CHANGELOG.md`, `docs/language/CWL-PUBLISH.md`, `docs/history/EXIT-1.0.md`.

## Compatibility rules

1. **Patch** (`1.0.x`) — bugfixes, fixture expansion, print/parser fidelity that does not change accepted programs; docs/ops completeness.
2. **Minor** (`1.x.0`) — new optional syntax / RFCs that old programs still parse.
3. **Major** (`x.0.0`) — breaking grammar or semantics; bump here and call out migration in the RFC.

Breaking changes must be versioned in this file **before** they land in parser/print.

## Out of scope for language package `1.0.0`

- WebIR physical package ownership flip (Convert)
- Helix / Secure DNA firewall implementation
- Public npm distribution
- Convert/Secure already switched to registry pins (Requested after publish)

## Gate

```bash
npm run sync:cwl-package-lib
npm run test:language
npm run test:cwl-pack          # npm pack dry-run
```
