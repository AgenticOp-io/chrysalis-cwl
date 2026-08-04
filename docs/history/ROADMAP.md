# CWL pillar roadmap

Language matures here. Convert and Secure pull; they do not own the north star.

## Now (`0.1.x`)

- [x] `LANGUAGE_VERSION.md` + `CHANGELOG.md`
- [x] Golden `.cwl` fixtures (`fixtures/language-gold/`)
- [x] Parse → print round-trip gate (`npm run test:cwl-roundtrip`)
- [x] Print coverage for native UI trees / components / islands / events
- [x] Local `cwl-fmt` without WebIR
- [x] Expand golds: middleware, defaults/headers, HTML interp, layout, UI v0/v1
- [x] RFC-0021 `if` / `foreach` AST capture + gold
- [x] Diagnose gate over language-gold (`npm run test:cwl-diagnose`)
- [x] Sync convert `cwl-ui-tree` attr + `on` event fixes
- [ ] Keep convert junctions valid when touching shared `cwl-*.mjs` scripts
- [ ] Sync convert `cwl-parser` defaults / RFC-0021 capture (still a separate copy)

## Next

- [ ] Extract or vendor `@chrysalis/webir` so ingest can run without convert-only helpers
- [ ] Editor/CLI surface owned by this pillar
- [ ] Prefer junctions over divergent copies for `cwl-*.mjs` between pillars

## Later

- [ ] CWL ↔ Secure DNA bridge (optional; not required for Helix out-of-box)
- [ ] Publish language package version aligned with `LANGUAGE_VERSION.md`

## Non-goals

- Helix firewall features
- Customer migration POCs as language definition
- Demo façades that hide holes
