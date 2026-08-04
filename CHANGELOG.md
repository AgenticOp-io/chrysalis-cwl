# CWL language changelog

## 0.1.2 — 2026-08-04

- Parser captures RFC-0021 `if` guards and `foreach` bindings (cond/status/return + collection/item/body)
- Print/canonicalize round-trip for early-exit + foreach
- Fixture `19-early-exit`
- Diagnose gate: `npm run test:cwl-diagnose` (wired into `test:language`)
- Synced convert `cwl-ui-tree.mjs` with element-attr + enclosing-element `on` event fixes

## 0.1.1 — 2026-08-04

- Print covers native UI trees, component use, islands, and events (RFC-0017–0019)
- Parser fix: multiline `on <event>` attaches to the enclosing element (not last child)
- Parser fix: `element "tag" attr "val"` attributes were dropped; now captured from the post-tag tail
- `cwl-fmt` is parse→print local (no WebIR / convert)
- Expanded `fixtures/language-gold/` (middleware, defaults/headers, HTML interp, layout, UI v0/v1)

## 0.1.0 — 2026-08-04

- Pillar bootstrap: `LANGUAGE_VERSION.md`, golden fixtures, parse→print gate
