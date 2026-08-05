# CWL language version

| Field | Value |
| --- | --- |
| **Language** | Chrysalis Web Language (CWL) |
| **Version** | `0.1.6` |
| **Status** | 0.1.x + DNA bridge seed gate; CLI / junctions / WebIR resolve |
| **Date** | 2026-08-05 |

## What this version means

`0.1.6` gates the RFC-0022 CWL→draft-DNA seed against the gold fixture and records Phase 0.2–0.5 tooling already in tree:

- `npm run test:cwl-dna-bridge` / included in `test:language`
- Seeder: `scripts/hub-ingest/cwl-dna-seed.mjs` (Helix consumes; no firewall here)
- Prior: nested control golds, CLI, mirrors gate, WebIR resolve smoke

See `CHANGELOG.md` for deltas.

## Compatibility rules

1. **Patch** (`0.1.x`) — bugfixes, fixture expansion, print/parser fidelity that does not change accepted programs; docs/ops completeness.
2. **Minor** (`0.x.0`) — new optional syntax / RFCs that old programs still parse.
3. **Major** (`x.0.0`) — breaking grammar or semantics; bump here and call out migration in the RFC.

Breaking changes must be versioned in this file **before** they land in parser/print.

## Out of scope for `0.1.x`

- WebIR package ownership (still under convert) — Phase 0.3
- Helix / Secure DNA firewall implementation
- Convert product hub smokes as the language authority path
- Nested `if` / nested `foreach` body stmt lists (RFC-0021 remaining gap) — **done in 0.1.5** (surface AST; no loop evaluate)
- Published npm language release — Phase 1.0

## Gate

```bash
npm run test:language
npm run sync:convert   # after language script changes
```
