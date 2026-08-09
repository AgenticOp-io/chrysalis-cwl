# CWL language changelog

## Unreleased — thesis

- Constitution reframed: **Rosetta Stone → Universal Translator → DNA of the web** (`CWL-PILLAR-HOME.md`, `ROSETTA-UT-PATH.md`); AGENTS / cursor rule / README aligned

## Unreleased / execute

- DNA Execute slice: `smoke:cwl-runtime-gold` → `CWL_RUNTIME_GOLD_OK` on `fixtures/language-gold/01-literals` via `@chrysalis/runtime-cwl` + WebIR `simulateHandler` (not Convert emit)
- Runtime matrix: `smoke:cwl-runtime-matrix` → `CWL_RUNTIME_MATRIX_OK` over `runtime-ok` fixtures (`01-literals`, `02-path-params`, `03-query-params`, `06-response-status`, `12-multi-file`); allowlist in `scripts/cwl-runtime-smoke-lib.mjs` (no invented handlers)
- Wired into optional `test:language:full` (stable/fast)
- Plan/honesty: `docs/history/DNA-STEP-EXECUTE.md`

### Requested (Convert) — execute

- Keep sibling `webir` / `rewrite` / `emit-shared` dists buildable; Slice 3.4 dep retarget so pillar runtime imports need fewer resolve hooks
- Optional: pass request headers into simulate input so `04-request-context` can earn `runtime-ok`

## 0.1.12 — 2026-08-09

- Diagnostic column ranges v1: parser records 0-based keyword starts for `module`, `@route`/`@page`, `hole`; diagnose schema v4 emits `character`/`column` when cheap
- LSP map: `range.start.character` from `character`/`column` (default 0); end still line-granular (`1<<20`)
- Gate: `test:cwl-lsp-map` asserts ≥1 mapped diagnostic with `character > 0` (holes gold indent + synthetic)
- Line sites folded in: holes / duplicates / layout / module → accurate LSP lines
- Definition v0 + document symbols: `textDocument/definition` / `documentSymbol` (same-file surface); VS Code providers; server gate asserts ≥1 each
- Package / editor / LSP server version `0.1.12`; pillars stay private

### Requested (Convert)

- Pull `0.1.12` junctions after land; WebIR flip still open

### Requested (Secure)

- Keep `file:` pin; no grammar forks

## 0.1.11 — 2026-08-09

- LSP completion v0: `textDocument/completion` on `cwl-lsp-server.mjs` — keywords / surface starters (`module`, `@route`, `@page`, `@component`, `handler`, `effects`, `hole`, `return`, `load`) + common effect presets; prefix filter only (no import/path smarts)
- Gate: `test:cwl-lsp-server` asserts completion returns ≥1 item; advertise `completionProvider`
- VS Code thin client: CompletionItemProvider (`@` / `.` triggers)
- Docs: `CWL-LSP.md` honesty (completion v0 limits)
- Package / editor version `0.1.11`; pillars stay private

### Requested (Convert)

- Pull `0.1.11` junctions after land; WebIR flip still open

### Requested (Secure)

- Keep `file:` pin; no grammar forks

## 0.1.10 — 2026-08-08

- Minimal stdio Language Server: `scripts/cwl-lsp-server.mjs` (JSON-RPC `Content-Length`) — initialize/shutdown, doc sync → `publishDiagnostics` via `mapDiagnoseSource`, `textDocument/formatting` via `formatCwlSource`, cheap hover (module / route surface)
- VS Code extension: thin spawn client (zero npm deps; no `vscode-languageclient`)
- `npm run test:cwl-lsp-server` → `CWL_LSP_SERVER_OK` (wired into `test:language`)
- Docs: `CWL-LSP.md` honesty update; ROADMAP Phase 0.6 stdio LSP checkbox
- Package / editor version `0.1.10`; pillars stay private (no Marketplace)

### Requested (Convert)

- Pull `0.1.10` junctions after land; WebIR flip still open

### Requested (Secure)

- Keep `file:` pin; no grammar forks

## 0.1.9 — 2026-08-08

- **Private pillars:** GitHub `chrysalis-cwl`, `chrysalis` (Convert), `chrysalis-security` set private; docs in `PRIVATE-PILLARS.md`
- DNA authoring slice: diagnose → LSP map (`cwl-lsp-map.mjs`) + `test:cwl-lsp-map` → `CWL_LSP_MAP_OK`
- CLI: `diagnose --stdin [--lsp]`, `fmt --stdin` for editor buffers
- VS Code extension: push diagnostics + document formatting (still not Marketplace / not full LSP server)
- Private-first publish posture: Exit 1.0 defaults to private registry, not public npm
- Plan: `docs/history/DNA-EVOLUTION-0.1.9.md`

### Requested (Convert)

- WebIR physical flip still open (`WEBIR-FLIP-REQUESTED.md`); pull `0.1.9` junctions after land; repo is now **private**
- **DNA Step E:** actionable flip checklist + acceptance/prove commands in `WEBIR-FLIP-REQUESTED.md` / `DNA-STEP-E-WEBIR.md` — Convert can execute without guessing; CWL will re-run `smoke:webir` + `test:ingest` + `test:language:full` after SHA reply
- **Step G gravity:** every peel/emit lands honest CWL (no façades); consume junctions + `hub:cwl-helix-cutover-smoke` — [`CONVERT-GRAVITY-REQUESTED.md`](./docs/history/CONVERT-GRAVITY-REQUESTED.md)

### Requested (Secure)

- Keep `file:` pin; repo is now **private**; no grammar forks
- **Step G cutover default:** live DNA vs CWL surface (RFC-0022/0023); `cwl-bridge-smoke` / `cutover-smoke` — [`SECURE-CUTOVER-REQUESTED.md`](./docs/history/SECURE-CUTOVER-REQUESTED.md)

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
