# Secure cutover default — Verified

**Status:** **Done** — Rosetta Step 4 Live match closed (tip **`@agenticop-io/cwl@1.0.17`**; protect stays DNA-only / D5)  
**From:** CWL pillar tip **`1.0.17`** (DNA seed depth / path-shape SoR)  
**Secure repo:** private [`AgenticOp-io/chrysalis-security`](https://github.com/AgenticOp-io/chrysalis-security)  
**Related:** [RFC-0022](../language/CWL-RFC-0022-dna-surface-bridge.md) · [RFC-0023](../language/CWL-RFC-0023-deploy-dna-profiles.md) · [EXIT-1.0.md](./EXIT-1.0.md)

## Ask (met)

Helix cutover's **default** compares live `app-dna-v1` against the authored CWL surface per RFC-0022/0023 — consumes CWL fixtures/seed tools, pins `@agenticop-io/cwl`, never forks the grammar.

## Verified

| Check | Result |
| --- | --- |
| Registry pin | `@agenticop-io/cwl@^1.0.17` (+ optional `file:` sibling) |
| Grammar fork | **None** — parser/seed from package or pillar |
| `helix cutover` / `cutover-smoke` | CWL surface ⊆ DNA (not DNA-only) |
| Protect / learn / enforce | DNA-only (D5) — intentional |
| Path-shape SoR | Thin-wrap `pathTemplateShapeEqual` from `@agenticop-io/cwl/dna-seed` |
| Multi-host profile | `cutover-smoke` host=`api` + `dna_gaps` fill |

## Hygiene (closed with tip 1.0.17)

| Item | Result |
| --- | --- |
| Thin-wrap `pathTemplateShapeEqual` from dna-seed | **Done** — `packages/cwl-bridge` |
| Non-`default` host from deploy profile | **Done** — `cutover-smoke` host=`api` |
| Tip pin **1.0.17** | **Done** |

Secure closeout: [`chrysalis-security/docs/LIVE-MATCH.md`](../../../chrysalis-security/docs/LIVE-MATCH.md) · `npm run live-match-smoke`.

## Reply shape

```text
SECURE_CUTOVER: ok
LIVE_MATCH: ok
SHA: <security commit>
CWL_PIN: @agenticop-io/cwl@1.0.17
SMOKES: live-match-smoke
RFC: 0022 · 0023
PATH_STEP_4: Live match closed
```
