# Secure cutover default — Verified

**Status:** **Done** — tip pin **`@agenticop-io/cwl@^1.0.17`** · dna-seed wrap · Live match closed  
**From:** CWL pillar tip **`1.0.17`** (DNA seed depth / path-shape SoR)  
**Secure repo:** private [`AgenticOp-io/chrysalis-security`](https://github.com/AgenticOp-io/chrysalis-security)  
**Related:** [RFC-0022](../language/CWL-RFC-0022-dna-surface-bridge.md) · [RFC-0023](../language/CWL-RFC-0023-deploy-dna-profiles.md) · [EXIT-1.0.md](./EXIT-1.0.md)

## Ask (met)

Helix cutover’s **default** compares live `app-dna-v1` against the authored CWL surface per RFC-0022/0023 — consumes CWL fixtures/seed tools, pins `@agenticop-io/cwl`, never forks the grammar.

## Verified

| Check | Result |
| --- | --- |
| Registry pin | `@agenticop-io/cwl@^1.0.17` (resolved 1.0.17) |
| Grammar fork | **None** — parser/seed from package or pillar |
| `helix cutover` / `cutover-smoke` | CWL surface ⊆ DNA (not DNA-only) |
| `live-match-smoke` | Rosetta Step 4 closed |
| Protect / learn / enforce | DNA-only (D5) — intentional |
| dna-seed wrap | `pathTemplateShapeEqual` from `@agenticop-io/cwl/dna-seed` |

## Still open (optional Secure hygiene)

| Item | Owner |
| --- | --- |
| Apply non-`default` host from profile at cutover | **Secure** |
| Customer soak / Mode B Phase 2 (ops) | **Secure** — see Secure `SOAK.md` · `MODE-B-L2.md` |

Mode B L2 Phase 1 deepen (nft divert + fail-closed) landed separately: Secure `8f64f13`.

## Reply shape

```text
SECURE_CUTOVER: ok
SHA: <security commit>
CWL_PIN: @agenticop-io/cwl@1.0.17 | file
SMOKES: cwl-bridge-smoke · cutover-smoke · live-match-smoke
RFC: 0022 · 0023
```
