# CWL near-term DNA authoring — complete

**Tip base:** `0b824de` (`0.1.13` — diagnose/lsp-map package exports + same-file rename)  
**Siblings:** end-columns + parser package export (target **0.1.14**)  
**Path:** [`ROSETTA-UT-PATH.md`](../language/ROSETTA-UT-PATH.md) · queue: [`DNA-BUILD-NEXT.md`](./DNA-BUILD-NEXT.md) · roadmap: [`ROADMAP.md`](./ROADMAP.md)

## Complete means

**Near-term CWL DNA authoring is complete when rename + token end-columns + package exports land** in this pillar. Authors can check/fmt/diagnose, get live LSP diagnostics with usable ranges, go-to-def, same-file rename, and import diagnose/lsp-map (and parser) via `@chrysalis/cwl` without deep-linking hub-ingest. Remaining work is **Convert / Secure / human only** — not more CWL genome slices for this path.

| Piece | Status | Notes |
| --- | --- | --- |
| **Rename** | Done (`0.1.13` / tip) | Same-file `textDocument/rename` + `prepareRename` ([`CWL-LSP.md`](../language/CWL-LSP.md)) |
| **Package exports** | Done diagnose/lsp-map (`0.1.13`); parser export with sibling **0.1.14** | `@chrysalis/cwl/diagnose`, `@chrysalis/cwl/lsp-map` (+ parser subpath when sibling lands) |
| **Token end columns** | Sibling **0.1.14** | Precise diagnostic end characters / more statement sites |
| **Phase 0.6 exit** | Met | Private-first authoring gravity — live diagnostics/fmt/LSP in-pillar without Convert |
| **Phase 1.0 exit** | Open | Private **registry** publish + consumer pins (human / publish path) |

## CWL-owned queue

Empty for near-term DNA authoring. Optional polish only (smarter completion, cross-file rename when import graph is honest, private VSIX) — not blockers for “authoring gravity complete.”

## Remaining — Requested / other owners

Do **not** re-open CWL grammar or invent Convert/Secure work here. Hand off via these docs:

| Owner | Ask | Doc |
| --- | --- | --- |
| **Convert** | Rewrite headers so `04-request-context` can earn `runtime-ok` | [`CONVERT-REWRITE-HEADERS-REQUESTED.md`](./CONVERT-REWRITE-HEADERS-REQUESTED.md) |
| **Convert** | Peel/emit gravity — honest CWL landings + cutover smoke | [`CONVERT-GRAVITY-REQUESTED.md`](./CONVERT-GRAVITY-REQUESTED.md) |
| **Convert** | WebIR physical flip into this pillar | [`WEBIR-FLIP-REQUESTED.md`](./WEBIR-FLIP-REQUESTED.md) · [`DNA-STEP-E-WEBIR.md`](./DNA-STEP-E-WEBIR.md) |
| **Convert** | Keep `webir` / `rewrite` / `emit-shared` dists buildable for runtime gold | [`DNA-STEP-EXECUTE.md`](./DNA-STEP-EXECUTE.md) |
| **Secure** | Cutover default = live DNA vs CWL surface; no grammar fork | [`SECURE-CUTOVER-REQUESTED.md`](./SECURE-CUTOVER-REQUESTED.md) |
| **Human** | Private registry publish + Convert/Secure pin that release (Phase 1.0) | [`CWL-PUBLISH.md`](../language/CWL-PUBLISH.md) · [`ROADMAP.md`](./ROADMAP.md) § Phase 1.0 |

## Honesty

- Same-file rename is not cross-file / workspace rename.
- End columns and parser export may still be landing on the sibling **0.1.14** line; treat near-complete as that trio closed, not as public npm or Marketplace.
- Gene bank (versioned private registry artifact) remains Phase 1.0 — separate from authoring gravity.
