# CWL pillar roadmap

**North star:** [`docs/language/CWL-PILLAR-HOME.md`](../language/CWL-PILLAR-HOME.md) · [`ROSETTA-UT-PATH.md`](../language/ROSETTA-UT-PATH.md)  
CWL is the **DNA of the web** (Rosetta meaning). Convert is the Universal Translator; Secure checks live DNA. They pull; they do not own the grammar.

---

## Phase 0.1.x — Bootstrap (current)

### Done

- [x] `LANGUAGE_VERSION.md` + `CHANGELOG.md`
- [x] Golden fixtures `fixtures/language-gold/` (`01`–`19`)
- [x] Parse → print + diagnose gates (`npm run test:language`)
- [x] UI print (trees, components, islands, events)
- [x] RFC-0021 `if` / `foreach` AST capture
- [x] Local `cwl-fmt` (parse→print, no WebIR)
- [x] Sync convert mirrors: parser, print, ui-tree
- [x] Constitution: `CWL-PILLAR-HOME.md`, THREE_PILLARS, cursor rule, convert pointer
- [x] `npm run sync:convert` helper

### Still in 0.1.x

- [x] Gold fixtures for RFC-0015 / 0016 / 0020 (probes + effects middleware depth)
- [x] Nested `if` / nested `foreach` stmt-list capture (RFC-0021 remaining gap)
- [x] Document hole-catalog alignment for `11-holes` (reduce diagnose warns where catalogued)

**Exit 0.1:** Constitution + gates green + Convert synced on core parse/print/ui; known gaps listed above only.

---

## Phase 0.2 — Single inode (junctions)

- [x] Junction or package-link convert `scripts/hub-ingest/cwl-{parser,print,ui-tree,module-graph,diagnose,fullstack-holes}.mjs` → this tree
  - Local Windows cutover: file **symlinks** (reparse points) from convert `scripts/hub-ingest/` → matching files in this pillar. (`mklink` file links; Windows directory junctions cannot target files.)
  - Convert `cwl-fmt.mjs` / `cwl-ingest.mjs` intentionally left as convert-owned copies (not junctioned).
- [x] CI check: mirrored files identical **or** are reparse points — `npm run test:cwl-mirrors` (`scripts/gate-cwl-mirrors.mjs`)
- [x] `sync:convert` becomes no-op when junctions present; still copies on platforms without junctions (`junction-noop` in report)
- [x] Confirm convert product gates still green after junction cutover (`hub:cwl-language-pillar-smoke` G10123 OK on 0.1.6)
- [x] Durable setup: `npm run setup:mirrors` (`scripts/setup-convert-mirrors.mjs`) recreates the six convert→cwl file symlinks after fresh checkout; document `core.symlinks` / CI copy fallback in `CWL-PILLAR-HOME` §7

**Exit 0.2:** No divergent parser/print/ui-tree copies between pillars.

---

## Phase 0.3 — WebIR with the language

**Plan:** [`WEBIR-EXTRACT-PLAN.md`](./WEBIR-EXTRACT-PLAN.md) · home story: [`packages/WEBIR.md`](../../packages/WEBIR.md)

- [x] **Ownership (homeable → physical):** `@chrysalis/webir` lives in `packages/webir` (`npm run build:webir` / `smoke:webir`); story in `packages/WEBIR.md`
- [x] **Partial (Agent G):** CWL WebIR helpers in-pillar — `hub-t.mjs`, `hub-cwl-{middleware,auth-presets,effects}.mjs`, `cwlPathParamsForWebir` (no hub-lift); synced via `CWL_WEBIR_HELPERS`
- [x] **Partial (Agent H):** thin `hub-lift-cwl-webir.mjs` (CWL-only; no COBOL/fat lift); `cwl-ingest` + `export-cwl-webir` use local helpers/`load-webir`; `npm run smoke:cwl-ingest` green on `01-literals`
- [x] **Partial (Agent I):** `test:ingest` (= `smoke:cwl-ingest`) + `01-literals/expected-webir.json`; `test:language` stays WebIR-free; optional `test:language:full`
- [x] **Partial (Agent J / Slice 4):** thin `hub-emit-cwl-webir.mjs` WebIR→CWL; `npm run smoke:cwl-emit` + `test:ingest-roundtrip` on `01-literals`; pillar `cwl-fmt` stays parse→print (dual-mode deferred)
- [x] **Ingest matrix:** all `language-gold/*/routes.cwl` + `expected-webir.json` (`npm run smoke:cwl-ingest-matrix`)
- [x] **UT evidence pack:** `npm run smoke:ut-evidence` → `reports/ut-spine/EVIDENCE.md`
- [x] **Convert reverse-home:** Convert `packages/webir` → junction/`file:` at CWL — verified ([`WEBIR-FLIP-REQUESTED.md`](./WEBIR-FLIP-REQUESTED.md))
- [x] Dual-mode `cwl-fmt` (default parse→print; `--webir` thin emit reverse; convert WebIR fmt untouched)
- [x] Convert depends on shared webir via reverse pin (junction + `file:`)

**Exit 0.3:** Parse, print, ingest, and at least one WebIR round-trip path runnable from `chrysalis-cwl` alone.  
**Round-trip path (met):** `smoke:cwl-emit` / `test:ingest-roundtrip` from this pillar with linked `@chrysalis/webir`.

---

## Phase 0.4 — Language CLI

- [x] `cwl parse|print|fmt|diagnose|check` (or `chrysalis cwl …`) owned by this pillar
- [x] Editor-facing diagnose codes documented
- [x] Check mode = round-trip + diagnose over a path/glob

**Exit 0.4:** Authors can fmt/check `.cwl` without opening the convert monorepo.  
**Landed:** `scripts/cwl-cli.mjs`, `npm run cwl` / `npm run check`, docs in [`docs/language/CWL-CLI.md`](../language/CWL-CLI.md).

---

## Phase 0.5 — Secure bridge (contract only here)

Language pillar delivers **semantics + fixtures** for surface compare; Helix implements DNA side.

- [x] RFC or appendix: CWL route/page surface ↔ `app-dna-v1` route identity mapping ([RFC-0022](../language/CWL-RFC-0022-dna-surface-bridge.md))
- [x] Fixture pair: minimal `.cwl` + expected DNA shape (no firewall code here) (`fixtures/language-gold/24-dna-bridge/`)
- [x] Secure consumes mapping; does not fork grammar (`cwl-dna-seed` in CWL; Helix CLI seeds via sibling import)
- [x] UT spine + evidence pack (`smoke:ut-spine` / `smoke:ut-evidence`) — Convert consumes via `hub:cwl-helix-cutover-smoke` only
- [x] RFC-0023 deploy/DNA profiles + gold profile on `24-dna-bridge`
- [x] RFC-0024 island kinds vocabulary + `25-island-kinds`
- [x] **Secure cutover default** = live DNA vs CWL surface — verified ([SECURE-CUTOVER-REQUESTED.md](./SECURE-CUTOVER-REQUESTED.md)); protect stays DNA-only

**Exit 0.5:** Documented, fixture-backed bridge contract; Helix owns enforcement.

---

## Phase 0.6 — Private-first authoring (DNA gravity)

- [x] Pillar GitHub repos private ([`PRIVATE-PILLARS.md`](./PRIVATE-PILLARS.md))
- [x] Diagnose → LSP map + `test:cwl-lsp-map` ([`DNA-EVOLUTION-0.1.9.md`](./DNA-EVOLUTION-0.1.9.md))
- [x] Editor push-diagnostics + format DocumentProvider (`editors/vscode`)
- [x] CLI `--stdin` for unsaved buffers
- [x] Minimal stdio Language Server (`cwl-lsp-server.mjs` + `test:cwl-lsp-server`) — diagnose/fmt/cheap hover + completion v0 + column ranges v1 + token end columns v1 + definition v0 + rename v0 ([`CWL-LSP.md`](../language/CWL-LSP.md), 0.1.14)
- [x] Runtime matrix + line/column diagnose ranges (0.1.12); token end columns (**0.1.14**) ([`DNA-BUILD-NEXT.md`](./DNA-BUILD-NEXT.md))
- [x] Package diagnose/lsp-map exports (`0.1.13`); parser + print exports (**0.1.14**) + `test:cwl-package-exports`
- [x] Same-file LSP rename (`textDocument/rename` + `prepareRename`) — tip `0b824de` / `0.1.13`

**Exit 0.6:** Authors get live diagnostics/fmt inside the private pillar without Convert.  
**Exit met** — LSP rename + package exports close near-term authoring gravity. Historical: [`DNA-CWL-NEAR-COMPLETE.md`](./DNA-CWL-NEAR-COMPLETE.md). Queue: [`DNA-BUILD-NEXT.md`](./DNA-BUILD-NEXT.md) (**CLOSED**).

---

## Phase 1.0 — Published language (private registry)

- [x] `@chrysalis/cwl` `"version"` ≡ `LANGUAGE_VERSION.md` (tip **`1.0.17`**)
- [x] Packable artifact: staged `lib/` + `bin/cwl` + GitHub Packages `publishConfig` ([`EXIT-1.0.md`](./EXIT-1.0.md))
- [x] Pre-publish pin path documented: sibling / `file:` / env ([`CWL-PUBLISH.md`](../language/CWL-PUBLISH.md))
- [x] Convert + Secure **`file:` / registry** pins proven (`npm run test:cwl-pin`) during transition
- [x] Publish **prep + pack dry-run** → `CWL_EXIT_1_0_PACK_OK`
- [x] Editor + stdio LSP ([`CWL-LSP.md`](../language/CWL-LSP.md)) including import-graph refs/rename
- [x] Private-first registry decision (GitHub Packages; no public npm)
- [x] **CI publish:** `@agenticop-io/cwl@1.0.0`… tip tags `cwl-v*` through **`cwl-v1.0.17`**
- [x] Package `dna-seed` export + multi-host DNA gold + holes report
- [x] Ecology bootstrap — [`CWL-ECOLOGY.md`](../language/CWL-ECOLOGY.md)
- [x] **CWL-owned Exit/DNA complete** — [`DNA-CWL-COMPLETE.md`](./DNA-CWL-COMPLETE.md)
- [ ] Convert pins tip `@agenticop-io/cwl` from registry (sibling)
- [ ] Secure pins tip `@agenticop-io/cwl` from registry (sibling)
- [ ] **Requested (Convert):** peel/emit gravity — [CONVERT-GRAVITY-REQUESTED.md](./CONVERT-GRAVITY-REQUESTED.md)
- [ ] Breaking changes require major bump + RFC migration notes

**Exit 1.0 (CWL-side):** **CLOSED.** Consumer registry tip pins + Convert gravity = sibling agents.

---

## Non-goals (forever in this repo)

- Helix DNA firewall / NGFW features
- Customer migration POCs as language definition
- Demo façades that hide holes
- Replacing databases, queues, or vendor client SDKs

---

## How to pick the next slice

Follow **Rosetta → Universal Translator → DNA** ([`ROSETTA-UT-PATH.md`](../language/ROSETTA-UT-PATH.md)). Queue: [`DNA-BUILD-NEXT.md`](./DNA-BUILD-NEXT.md) (**CLOSED**). Complete: [`DNA-CWL-COMPLETE.md`](./DNA-CWL-COMPLETE.md).

1. Does it improve **spec, fixtures, or tooling** for the language? → do it here (rare — genome closed).  
2. Is it convert product smoke / ST prove? → convert agent.  
3. Is it DNA learn/enforce? → secure agent.  
4. Does convert need a parser fix? → fix here, sync, then re-run convert gates.
