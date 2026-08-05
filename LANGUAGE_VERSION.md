# CWL language version

| Field | Value |
| --- | --- |
| **Language** | Chrysalis Web Language (CWL) |
| **Version** | `0.1.7` |
| **Status** | 0.1.x + pillar CWL↔WebIR ingest/emit smokes (`test:ingest` / `test:ingest-roundtrip`) |
| **Date** | 2026-08-05 |

## What this version means

`0.1.7` gates CWL ↔ WebIR from the language pillar (no convert `cwd` hack) when `@chrysalis/webir` is linked:

- `npm run test:ingest` / `smoke:cwl-ingest` on `fixtures/language-gold/01-literals` (+ `expected-webir.json`)
- `npm run smoke:cwl-emit` / `test:ingest-roundtrip` — CWL → WebIR → CWL thin emit (literals / flat objects; honest holes)
- Thin pillar lift + emit helpers (`hub-lift-cwl-webir.mjs`, `hub-emit-cwl-webir.mjs` + Agent G WebIR helpers)
- `test:language` stays parse/print/diagnose/dna-bridge only (WebIR optional)
- Optional `test:language:full` = `test:language` + `test:ingest-roundtrip`

See `CHANGELOG.md` for deltas.

## Compatibility rules

1. **Patch** (`0.1.x`) — bugfixes, fixture expansion, print/parser fidelity that does not change accepted programs; docs/ops completeness.
2. **Minor** (`0.x.0`) — new optional syntax / RFCs that old programs still parse.
3. **Major** (`x.0.0`) — breaking grammar or semantics; bump here and call out migration in the RFC.

Breaking changes must be versioned in this file **before** they land in parser/print.

## Out of scope for `0.1.x`

- WebIR physical package ownership flip (homeable via junction today; tree still under convert) — Phase 0.3 Slice 3
- Dual-mode `cwl-fmt` (pillar stays parse→print; convert keeps WebIR fmt) — Phase 0.3 Slice 4 remainder
- Helix / Secure DNA firewall implementation
- Convert product hub smokes as the language authority path
- Nested `if` / nested `foreach` body stmt lists (RFC-0021 remaining gap) — **done in 0.1.5** (surface AST; no loop evaluate)
- Published npm language release — Phase 1.0

## Gate

```bash
npm run test:language
npm run test:ingest              # needs npm run link:webir + sibling convert webir dist
npm run test:ingest-roundtrip    # ingest + thin WebIR→CWL emit
npm run sync:convert             # after language script changes
```
