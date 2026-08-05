# CWL pillar handoff (from Helix / three-pillar chat)

Date: 2026-08-04

## Decision

AgenticOps runs **three interactive pillars**:

1. **CWL** — this directory — language matures independently (**primary holder of all CWL logic**)  
2. **Convert** — `engines/chrysalis-convert` — Universal Translator (consumes CWL; junctions/mirrors)  
3. **Secure** — `engines/chrysalis-security` — Helix DNA firewall  

**Agent rule:** Always check this tree first for CWL language behavior. Convert/Secure must not fork semantics.

Secure does **not** require CWL out of the box (traffic `app-dna-v1`). CWL↔DNA bridge is later. Convert produces/consumes CWL.

## Extraction performed

Moved into this repo (convert paths are junctions back here):

- `packages/cwl`, `runtime-cwl`, `runtime-cwl-browser`, `runtime-cwl-worker`, `emit-runtime-cwl`
- Core scripts: `cwl-parser`, `cwl-ingest`, `cwl-fmt`, `cwl-diagnose`, `cwl-html-template`, `cwl-ui-tree`, `cwl-module-graph`, `cwl-fullstack-holes`, `emit-cwl-from-hub`, `emit-runtime-cwl-from-hub`, `export-cwl-webir`
- Copied language docs into `docs/language/`
- Copied prior `PHP_converter` Cursor session dumps into `docs/history/cursor-sessions/`

## Prior work context (Helix chat summary)

- Helix beginning: HTTP DNA proxy, Mode A host intercept, GCE smokes OK  
- Product locks D1–D4: no NGFW TLS dependency; DNA block/alert only; no UEBA  
- Explicitly chose **not** to make CWL the firewall core  
- Explicitly chose **yes** to CWL as first-class language pillar beside Convert and Secure  

## Your job on this agent

Mature CWL as a language: specs/RFCs, parser/runtime stability, versioning, fixtures. Coordinate with convert via junctions; do not absorb Helix.

## Subagent inventory note (2026-08-04)

- 5 packages + 11 core scripts + RFCs 0001–0021 present; convert junctions intact  
- Gaps: `webir` still in convert; scripts still import convert-only hub helpers for ingest/fmt  

## Slice landed (2026-08-04) — language bootstrap

- Added `LANGUAGE_VERSION.md` (`0.1.0` → `0.1.1`)
- Added `fixtures/language-gold/` (RFC-0001–0011/0013–0014/0017–0019 + holes + multi-file)
- Added local `cwl-print.mjs` + `hub-cwl-path-params.mjs` (no WebIR) and `scripts/gate-cwl-roundtrip.mjs`
- Wired `npm run test:cwl-roundtrip` / `test:language`
- Added `docs/history/ROADMAP.md` + `CHANGELOG.md`
- Parser retains path/query defaults; UI `on` events attach to enclosing element; element attrs captured correctly
- `cwl-fmt` is local parse→print (convert WebIR fmt remains convert’s concern if still copied)

**Next slice:** vendor/extract webir for ingest; prefer junctions over divergent `cwl-*.mjs` copies; sync convert parser capture; no Helix; don’t break junctions

## Slice 0.1.4 (2026-08-05) — constitution fleshed out

- Full `CWL-PILLAR-HOME.md` (why Convert/Secure need CWL, surfaces, sync, completeness, SOP)
- Phased roadmap 0.1 → 1.0 with exit criteria
- `npm run sync:convert`; gold README + planned RFC-0015/16/20 suites


## Convert bridge (G10123 / D6548) — 2026-08-04

Convert must **always check CWL as core** before deepen:

- Resolve `engines/chrysalis-cwl` (`LANGUAGE_VERSION` + `fixtures/language-gold`)
- Run pillar local gate (`npm run test:cwl-roundtrip`)
- Bridge smoke: `pnpm run hub:cwl-language-pillar-smoke` (also required by `hub:cwl-above-code-smoke`)

Do not invent a second golden tree; Convert consumes this pillar’s `language-gold`.
