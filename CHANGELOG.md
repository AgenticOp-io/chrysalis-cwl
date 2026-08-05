# CWL language changelog

## 0.1.6 — 2026-08-05

- RFC-0022 DNA surface bridge: `cwl-dna-seed.mjs` + `npm run test:cwl-dna-bridge` (seed ≡ `24-dna-bridge/expected-dna.json`)
- `test:language` now includes DNA bridge contract gate
- Phase 0.2–0.5 tooling landed in tree: convert script junctions + `test:cwl-mirrors`, pillar CLI (`cwl` / `check`), WebIR resolve link + smoke, RFC-0022 docs/fixture
- Phase 1.0 prep: `@chrysalis/cwl` package version aligned to `LANGUAGE_VERSION.md` (`0.1.6`); publish/pin path in `docs/language/CWL-PUBLISH.md` (still `private`, not published)

## 0.1.5 — 2026-08-05

- Language golds `20-probes` (RFC-0015), `21-form-action` (RFC-0016), `22-effects-middleware` (RFC-0020) — parse→print only; honest gaps documented in fixture READMEs
- Catalogued `unsupported:php-session` + `cwl:empty-handler` so `11-holes` diagnose warns drop to info
- Suite map updated in `fixtures/language-gold/README.md`
- Nested `if` / nested `foreach` stmt-list AST capture + print round-trip (RFC-0021 remaining gap; surface only — no loop evaluate); fixture `23-nested-control`

## 0.1.4 — 2026-08-05

- Fleshed out `CWL-PILLAR-HOME.md` as full constitution (Convert/Secure needs, surfaces, sync, completeness, agent SOP)
- Full phased `ROADMAP.md` (0.1 → 1.0) with exit criteria
- Expanded `fixtures/language-gold/README.md` + planned golds (0015/0016/0020)
- Added `npm run sync:convert` (`scripts/sync-to-convert.mjs`)
- Convert pointer doc expanded to match

## 0.1.3 — 2026-08-04

- Synced language parser + print into convert (`cwl-parser.mjs`, `cwl-print.mjs`)
- Documented CWL as **THE** language of the web (initial home, AGENTS, THREE_PILLARS, cursor rule)
- Convert keeps WebIR `cwl-fmt`; pillar fmt remains parse→print

## 0.1.2 — 2026-08-04

- Parser captures RFC-0021 `if` guards and `foreach` bindings
- Fixture `19-early-exit`; diagnose gate; convert `cwl-ui-tree` attr/`on` fixes

## 0.1.1 — 2026-08-04

- UI print; element attr + `on` event parser fixes; local fmt; golds through UI v1

## 0.1.0 — 2026-08-04

- Pillar bootstrap: version, golds, parse→print gate
