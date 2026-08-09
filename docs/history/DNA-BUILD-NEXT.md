# DNA build — next queue

**Path:** Rosetta → UT → DNA — [`ROSETTA-UT-PATH.md`](../language/ROSETTA-UT-PATH.md)  
**Evolution log:** [`DNA-EVOLUTION-0.1.9.md`](./DNA-EVOLUTION-0.1.9.md) · pick guide: [`ROADMAP.md`](./ROADMAP.md) § How to pick the next slice  
**Tip:** working tree **0.1.12** — column ranges v1 + definition v0 (base tip `99c7d06` was 0.1.11).

Light queue only. No version bump implied by this doc.

## Shipped in 0.1.12 (CWL)

| Slice | Landing | Notes |
| --- | --- | --- |
| **Column ranges** | Done | Keyword-start `character`/`column` → LSP `range.start.character` ([`CWL-LSP.md`](../language/CWL-LSP.md)) |
| **Definition v0** | Done | Same-file `textDocument/definition` + `documentSymbol` |

## Shipped in 0.1.11 (CWL)

| Slice | Landing | Notes |
| --- | --- | --- |
| **Runtime matrix** | Done | `smoke:cwl-runtime-matrix` → `CWL_RUNTIME_MATRIX_OK` over `runtime-ok` golds ([`DNA-STEP-EXECUTE.md`](./DNA-STEP-EXECUTE.md)) |
| **Completion v0** | Done | Keyword / surface completion on stdio LSP ([`CWL-LSP.md`](../language/CWL-LSP.md)) |
| **Line ranges** | Done | Parser-backed 1-based diagnose lines → LSP map |

## CWL-owned (do here)

| Priority | Slice | Notes |
| --- | --- | --- |
| 1 | **Token end columns** | Precise diagnostic end characters / more statement sites |
| 2 | **Smarter completion** | Route paths / handler names / import path (optional) |
| 3 | **Headers runtime** | Request-header simulate input so `04-request-context` can earn `runtime-ok` ([`DNA-STEP-EXECUTE.md`](./DNA-STEP-EXECUTE.md)) |

## Convert / Secure — Requested (not edited here)

| Sibling | Ask | Doc |
| --- | --- | --- |
| **Convert** | WebIR physical flip into this pillar | [`WEBIR-FLIP-REQUESTED.md`](./WEBIR-FLIP-REQUESTED.md) · [`DNA-STEP-E-WEBIR.md`](./DNA-STEP-E-WEBIR.md) |
| **Convert** | Peel/emit gravity — honest CWL landings + cutover smoke | [`CONVERT-GRAVITY-REQUESTED.md`](./CONVERT-GRAVITY-REQUESTED.md) |
| **Convert** | Keep `webir` / `rewrite` / `emit-shared` dists buildable for runtime gold | [`DNA-STEP-EXECUTE.md`](./DNA-STEP-EXECUTE.md) |
| **Secure** | Cutover default = live DNA vs CWL surface; no grammar fork | [`SECURE-CUTOVER-REQUESTED.md`](./SECURE-CUTOVER-REQUESTED.md) |
