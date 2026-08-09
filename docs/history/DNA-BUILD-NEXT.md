# DNA build — next queue

**Path:** Rosetta → UT → DNA — [`ROSETTA-UT-PATH.md`](../language/ROSETTA-UT-PATH.md)  
**Evolution log:** [`DNA-EVOLUTION-0.1.9.md`](./DNA-EVOLUTION-0.1.9.md) · pick guide: [`ROADMAP.md`](./ROADMAP.md) § How to pick the next slice  
**Tip:** working tree **0.1.13** — package diagnose/lsp-map exports (base tip `a688dab` was 0.1.12).

Light queue only. No version bump implied by this doc.

## Shipped in 0.1.13 (CWL)

| Slice | Landing | Notes |
| --- | --- | --- |
| **Package exports** | Done | `@chrysalis/cwl/diagnose` + `@chrysalis/cwl/lsp-map`; `CWL_PACKAGE_EXPORTS_OK` |

## Shipped in 0.1.12 (CWL)

| Slice | Landing | Notes |
| --- | --- | --- |
| **Column ranges** | Done | Keyword-start `character`/`column` → LSP `range.start.character` ([`CWL-LSP.md`](../language/CWL-LSP.md)) |
| **Go-to-def / definition v0** | Done | Same-file `textDocument/definition` + `documentSymbol` |
| **Headers doc** | Done | Honesty notes + Convert ask: fixture README, [`DNA-STEP-EXECUTE.md`](./DNA-STEP-EXECUTE.md), [`CONVERT-REWRITE-HEADERS-REQUESTED.md`](./CONVERT-REWRITE-HEADERS-REQUESTED.md) — **not** runtime-ok yet |

## Shipped in 0.1.11 (CWL)

| Slice | Landing | Notes |
| --- | --- | --- |
| **Runtime matrix** | Done | `smoke:cwl-runtime-matrix` → `CWL_RUNTIME_MATRIX_OK` over `runtime-ok` golds ([`DNA-STEP-EXECUTE.md`](./DNA-STEP-EXECUTE.md)) |
| **Completion v0** | Done | Keyword / surface completion on stdio LSP ([`CWL-LSP.md`](../language/CWL-LSP.md)) |
| **Line ranges** | Done | Parser-backed 1-based diagnose lines → LSP map |

## CWL-owned (do here)

| Priority | Slice | Notes |
| --- | --- | --- |
| 1 | **Rename** | `textDocument/rename` (and prepare/rename range) after definition v0 — still not cross-file ([`CWL-LSP.md`](../language/CWL-LSP.md)) |
| 2 | **Token end columns** | Precise diagnostic end characters / more statement sites |
| — | *(later)* Smarter completion / more package exports (parser) | Optional polish |

## Convert / Secure — Requested (not edited here)

| Sibling | Ask | Doc |
| --- | --- | --- |
| **Convert** | **Rewrite headers** — `RequestInput.headers` + `pickBag(..., "header")` so `04-request-context` can earn `runtime-ok` | [`CONVERT-REWRITE-HEADERS-REQUESTED.md`](./CONVERT-REWRITE-HEADERS-REQUESTED.md) |
| **Convert** | **WebIR physical flip** into this pillar (still Convert-owned) | [`WEBIR-FLIP-REQUESTED.md`](./WEBIR-FLIP-REQUESTED.md) · [`DNA-STEP-E-WEBIR.md`](./DNA-STEP-E-WEBIR.md) |
| **Convert** | Peel/emit gravity — honest CWL landings + cutover smoke | [`CONVERT-GRAVITY-REQUESTED.md`](./CONVERT-GRAVITY-REQUESTED.md) |
| **Convert** | Keep `webir` / `rewrite` / `emit-shared` dists buildable for runtime gold | [`DNA-STEP-EXECUTE.md`](./DNA-STEP-EXECUTE.md) |
| **Secure** | Cutover default = live DNA vs CWL surface; no grammar fork | [`SECURE-CUTOVER-REQUESTED.md`](./SECURE-CUTOVER-REQUESTED.md) |
