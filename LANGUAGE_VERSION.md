# CWL language version

| Field | Value |
| --- | --- |
| **Language** | Chrysalis Web Language (CWL) |
| **Version** | `0.1.2` |
| **Status** | Fixtures + parse→print + UI + RFC-0021 + diagnose gate |
| **Date** | 2026-08-04 |

## What this version means

`0.1.2` extends the language-pillar baseline:

- Grammar / surface docs: `docs/language/CWL.md` + RFCs 0001–0021
- Local golden fixtures: `fixtures/language-gold/` (incl. UI, layout, early-exit/foreach)
- Stability gates: `npm run test:language` (round-trip + diagnose)
- Local fmt: `scripts/hub-ingest/cwl-fmt.mjs` (parse→print, no WebIR)
- Packages: `packages/cwl`, `runtime-cwl*`, `emit-runtime-cwl` (runtime still exercises convert golds where wired)

See `CHANGELOG.md` for deltas.

## Compatibility rules

1. **Patch** (`0.1.x`) — bugfixes, fixture expansion, print/parser fidelity that does not change accepted programs.
2. **Minor** (`0.x.0`) — new optional syntax / RFCs that old programs still parse.
3. **Major** (`x.0.0`) — breaking grammar or semantics; bump here and call out migration in the RFC.

Breaking changes must be versioned in this file **before** they land in parser/print.

## Out of scope for `0.1.x`

- WebIR package ownership (still under convert)
- Helix / Secure DNA firewall
- Convert product hub smokes as the language authority path
- Nested `if` / nested `foreach` body stmt lists (RFC-0021 remaining gap)

## Gate

```bash
npm run test:language
```
