# DNA build — next queue

**Path:** Rosetta → UT → DNA — [`ROSETTA-UT-PATH.md`](../language/ROSETTA-UT-PATH.md)  
**Evolution log:** [`DNA-EVOLUTION-0.1.9.md`](./DNA-EVOLUTION-0.1.9.md) · pick guide: [`ROADMAP.md`](./ROADMAP.md) § How to pick the next slice  
**Tip:** working tree **0.1.14** — token end columns (base tip `0b824de` was 0.1.13).

Light queue only. No version bump implied by this doc.

## Shipped in 0.1.14 (CWL)

| Slice | Landing | Notes |
| --- | --- | --- |
| **Token end columns** | Done | Keyword-exclusive `endCharacter` on hole / `@route`/`@page` / `module` → LSP `range.end.character` ([`CWL-LSP.md`](../language/CWL-LSP.md)) |
| **Parser / print exports** | Done | `@chrysalis/cwl/parser` + `@chrysalis/cwl/print`; gate extended |

## Shipped in 0.1.13 (CWL)

| Slice | Landing | Notes |
| --- | --- | --- |
| **Package exports** | Done | `@chrysalis/cwl/diagnose` + `@chrysalis/cwl/lsp-map`; `CWL_PACKAGE_EXPORTS_OK` |
| **Rename** | Done | `textDocument/rename` + `prepareRename` — same-file `handler`/`page` name only ([`CWL-LSP.md`](../language/CWL-LSP.md)) |

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
| — | *(later)* Smarter completion / more package exports (parser) / more statement end sites | Optional polish |
| — | Cross-file rename / references | Only when import graph is honest |

## Convert / Secure — Requested (not edited here)

| Sibling | Ask | Doc |
| --- | --- | --- |
| **Convert** | **Rewrite headers** — `RequestInput.headers` + `pickBag(..., "header")` so `04-request-context` can earn `runtime-ok` | [`CONVERT-REWRITE-HEADERS-REQUESTED.md`](./CONVERT-REWRITE-HEADERS-REQUESTED.md) |
| **Convert** | **WebIR physical flip** into this pillar (still Convert-owned) | [`WEBIR-FLIP-REQUESTED.md`](./WEBIR-FLIP-REQUESTED.md) · [`DNA-STEP-E-WEBIR.md`](./DNA-STEP-E-WEBIR.md) |
| **Convert** | Peel/emit gravity — honest CWL landings + cutover smoke | [`CONVERT-GRAVITY-REQUESTED.md`](./CONVERT-GRAVITY-REQUESTED.md) |
| **Convert** | Keep `webir` / `rewrite` / `emit-shared` dists buildable for runtime gold | [`DNA-STEP-EXECUTE.md`](./DNA-STEP-EXECUTE.md) |
| **Secure** | Cutover default = live DNA vs CWL surface; no grammar fork | [`SECURE-CUTOVER-REQUESTED.md`](./SECURE-CUTOVER-REQUESTED.md) |
