# CWL near-term DNA authoring — complete

**Tip:** `1.0.0` published (`@agenticop-io/cwl`) · physical WebIR home in-pillar  
**Path:** [`ROSETTA-UT-PATH.md`](../language/ROSETTA-UT-PATH.md) · queue: [`DNA-BUILD-NEXT.md`](./DNA-BUILD-NEXT.md) · roadmap: [`ROADMAP.md`](./ROADMAP.md)

## Complete means

Near-term CWL DNA authoring is complete: rename + token end-columns + package exports + **Exit 1.0 publish** + **physical WebIR home**. Authors can check/fmt/diagnose, get live LSP diagnostics (completion + same-file rename), and install the private registry gene without Convert.

| Piece | Status | Notes |
| --- | --- | --- |
| **Rename** | Done | Same-file `textDocument/rename` + `prepareRename` ([`CWL-LSP.md`](../language/CWL-LSP.md)) |
| **Completion** | Done (v0) | Keyword / surface completion on stdio LSP |
| **Package exports** | Done | diagnose / lsp-map / parser / print |
| **Token end columns** | Done | Precise diagnostic end characters |
| **Phase 0.6 exit** | Met | Private-first authoring gravity |
| **Phase 1.0 exit (CWL)** | Met | `@agenticop-io/cwl@1.0.0` on GitHub Packages |
| **WebIR physical home** | Met (CWL) | `packages/webir` — Convert reverse-home still Requested |
| **Ecology bootstrap** | Met (private) | [`CWL-ECOLOGY.md`](../language/CWL-ECOLOGY.md) + `npm run pack:cwl-vsix` |

## Remaining — Requested / other owners

| Owner | Ask | Doc |
| --- | --- | --- |
| **Convert** | Peel/emit gravity + registry pin + WebIR reverse-home | [`CONVERT-GRAVITY-REQUESTED.md`](./CONVERT-GRAVITY-REQUESTED.md) · [`WEBIR-FLIP-REQUESTED.md`](./WEBIR-FLIP-REQUESTED.md) |
| **Convert** | Rewrite headers so `04-request-context` can earn `runtime-ok` | [`CONVERT-REWRITE-HEADERS-REQUESTED.md`](./CONVERT-REWRITE-HEADERS-REQUESTED.md) |
| **Secure** | Cutover default = live DNA vs CWL surface + registry pin | [`SECURE-CUTOVER-REQUESTED.md`](./SECURE-CUTOVER-REQUESTED.md) |

## Honesty

- Same-file rename is not cross-file / workspace rename.
- Ecology is private (GH Packages + VSIX) — not public npm / Marketplace.
- Convert gravity / Secure cutover remain sibling-owned.
