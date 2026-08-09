# DNA build — next queue

**Path:** Rosetta → UT → DNA — [`ROSETTA-UT-PATH.md`](../language/ROSETTA-UT-PATH.md)  
**Evolution log:** [`DNA-EVOLUTION-0.1.9.md`](./DNA-EVOLUTION-0.1.9.md) · pick guide: [`ROADMAP.md`](./ROADMAP.md) § How to pick the next slice

Light queue only. No version bump implied by this doc.

## CWL-owned (do here)

| Priority | Slice | Notes |
| --- | --- | --- |
| 1 | **Runtime matrix** | Grow `smoke:cwl-runtime-gold` past `01-literals`; keep 501 + honest holes ([`DNA-STEP-EXECUTE.md`](./DNA-STEP-EXECUTE.md)) |
| 2 | **Ranges** | Parser-backed diagnostic columns (LSP map v1 → precise ranges) ([`CWL-LSP.md`](../language/CWL-LSP.md)) |
| 3 | **Completion** | Keyword / `@route` / `@page` surface completion on stdio LSP (optional; no rename yet) |

## Convert / Secure — Requested (not edited here)

| Sibling | Ask | Doc |
| --- | --- | --- |
| **Convert** | WebIR physical flip into this pillar | [`WEBIR-FLIP-REQUESTED.md`](./WEBIR-FLIP-REQUESTED.md) · [`DNA-STEP-E-WEBIR.md`](./DNA-STEP-E-WEBIR.md) |
| **Convert** | Peel/emit gravity — honest CWL landings + cutover smoke | [`CONVERT-GRAVITY-REQUESTED.md`](./CONVERT-GRAVITY-REQUESTED.md) |
| **Convert** | Keep `webir` / `rewrite` / `emit-shared` dists buildable for runtime gold | [`DNA-STEP-EXECUTE.md`](./DNA-STEP-EXECUTE.md) |
| **Secure** | Cutover default = live DNA vs CWL surface; no grammar fork | [`SECURE-CUTOVER-REQUESTED.md`](./SECURE-CUTOVER-REQUESTED.md) |
