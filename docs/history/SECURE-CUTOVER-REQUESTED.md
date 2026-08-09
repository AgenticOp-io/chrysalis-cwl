# Secure cutover default — Verified

**Status:** **Done for cutover path** — tip pin **`@agenticop-io/cwl@1.0.16`+** (Secure checkout); protect stays DNA-only (D5)  
**From:** CWL pillar tip **`1.0.17`** (DNA seed depth / path-shape SoR)  
**Secure repo:** private [`AgenticOp-io/chrysalis-security`](https://github.com/AgenticOp-io/chrysalis-security)  
**Related:** [RFC-0022](../language/CWL-RFC-0022-dna-surface-bridge.md) · [RFC-0023](../language/CWL-RFC-0023-deploy-dna-profiles.md) · [EXIT-1.0.md](./EXIT-1.0.md)

## Ask (met)

Helix cutover’s **default** compares live `app-dna-v1` against the authored CWL surface per RFC-0022/0023 — consumes CWL fixtures/seed tools, pins `@agenticop-io/cwl`, never forks the grammar.

## Verified

| Check | Result |
| --- | --- |
| Registry pin | `@agenticop-io/cwl@^1.0.16` (+ optional `file:` sibling) |
| Grammar fork | **None** — parser/seed from package or pillar |
| `helix cutover` / `cutover-smoke` | CWL surface ⊆ DNA (not DNA-only) |
| Protect / learn / enforce | DNA-only (D5) — intentional |

## Still open (optional Secure hygiene)

| Item | Owner |
| --- | --- |
| Thin-wrap `pathTemplateShapeEqual` from `@chrysalis/cwl/dna-seed` (stop local copy) | **Secure** |
| Apply non-`default` host from profile at cutover | **Secure** |
| Tip pin → **`1.0.17`** when published | **Secure** |

## Reply shape

```text
SECURE_CUTOVER: ok
SHA: <security commit>
CWL_PIN: @agenticop-io/cwl@1.0.17 | file
SMOKES: cwl-bridge-smoke · cutover-smoke
RFC: 0022 · 0023
```
