# CWL language changelog

## 0.1.8 — 2026-08-07

- Boundary-break execution: ingest matrix covers all `language-gold/*/routes.cwl` with `expected-webir.json`
- RFC-0023 deploy/DNA profiles + `24-dna-bridge/deploy-profile.json`
- RFC-0024 island kinds + `25-island-kinds` + catalogued `unsupported:wasm-module|vendor-sdk|opaque-script`
- **Attachment holes:** `hole` + later `return` kept on `attachmentHoles` (parse/print/diagnose/ingest); RFC-0024 gold no longer silently drops island holes
- `test:cwl-publish-prep` → `CWL_PUBLISH_PREP_OK` (still no npm publish); wired into `test:language`; validates deploy-profile schema
- UT spine reads RFC-0023 `deploy-profile.json` when present
- VS Code scaffold (`editors/vscode`) + `docs/language/CWL-LSP.md` (honest TextMate+check limits)
- GitHub Actions `cwl-language.yml`
- WebIR flip handoff: `docs/history/WEBIR-FLIP-REQUESTED.md` (Convert agent)
- `pnpm-workspace.yaml` prepared for future `packages/webir`

## 0.1.7 — 2026-08-05

- Convert + Secure pin `@chrysalis/cwl` via `file:../chrysalis-cwl/packages/cwl`; package exports `VERSION` / `pillarRoot()`; `npm run test:cwl-pin` (wired into `test:language`)
- Phase 0.3 ingest: thin `hub-lift-cwl-webir.mjs` + WebIR helpers; `cwl-ingest` / `export-cwl-webir` use `load-webir.mjs`
- `npm run smoke:cwl-ingest` / `test:ingest` green on `01-literals` with `expected-webir.json` golden
- `test:language` unchanged (no WebIR required); optional `test:language:full` = language + ingest-roundtrip
- Phase 0.3 Slice 4: thin WebIR→CWL emit (`hub-emit-cwl-webir.mjs`) + `npm run smoke:cwl-emit` / `test:ingest-roundtrip` on `01-literals`; pillar `cwl-fmt` remains parse→print (no dual-mode)
- Phase 1.0 pin path (docs only, no npm publish): `CWL-PUBLISH.md` fleshed for Convert/Secure (`file:` / sibling / `CHRYSALIS_CWL_ROOT`); ROADMAP 1.0 honest (publish still open)
- **WebIR Slice 3:** ownership flip deferred — **link-until-pnpm** decision locked in `WEBIR-EXTRACT-PLAN.md` (2026-08-05); UT↔Helix spine is **CWL-owned** (`npm run smoke:ut-spine`), not Convert
- Ingest matrix + UT evidence pack: `smoke:cwl-ingest-matrix` (01/02/24-dna-bridge) · `smoke:ut-evidence` → `UT_EVIDENCE_OK`

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
