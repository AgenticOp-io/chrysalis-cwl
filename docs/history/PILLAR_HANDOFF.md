# CWL pillar handoff (from Helix / three-pillar chat)

Date: 2026-08-04

## Decision

AgenticOps runs **three interactive pillars**:

1. **CWL** — this directory — language matures independently  
2. **Convert** — `engines/chrysalis-convert` — Universal Translator  
3. **Secure** — `engines/chrysalis-security` — Helix DNA firewall  

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
