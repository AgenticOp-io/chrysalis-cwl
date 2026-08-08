# WebIR ownership flip — CWL readiness (Requested: Convert)

**Status:** CWL side prepared; **physical flip waits on Convert agent**  
**Lock:** link-until-pnpm (2026-08-05) until Convert confirms pnpm consumers.  
**Refreshed:** 2026-08-08 (CWL `0.1.9`; pillars private — `AgenticOp-io/chrysalis` is private)

## CWL has done

- Thin ingest/emit + matrix across **all** `language-gold/*/routes.cwl`
- Junction home story (`packages/WEBIR.md`, `link:webir`)
- Publish prep for `@chrysalis/cwl` (language pin ≠ webir flip; package stays private)
- Pillar `pnpm-workspace.yaml` lists future `packages/webir` when flipped
- Attachment-hole lowering for RFC-0024 island kinds (CWL AST + thin ingest)

## Convert must do (handoff)

1. Coordinate `git mv packages/webir` → `chrysalis-cwl/packages/webir` (or copy + retire)
2. Replace convert tree with junction / `file:../chrysalis-cwl/packages/webir`
3. Retarget workspace deps; prove hub ST sample + `hub:cwl-language-pillar-smoke`
4. Pull CWL junctions / mirrors after `0.1.8` (parser `attachmentHoles` + catalog)
5. Reply with SHA; CWL agent runs `smoke:webir` / `test:ingest` without convert cwd

**Do not invent a second WebIR in Convert.**
