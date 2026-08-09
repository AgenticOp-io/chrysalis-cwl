# Secure cutover default — Verified

**Status:** **Done for cutover path** (verified 2026-08-09 against Secure checkout) — protect stays DNA-only by design (D5)  
**From:** CWL pillar (`chrysalis-cwl` @ **`1.0.1`**)  
**Secure repo:** private [`AgenticOp-io/chrysalis-security`](https://github.com/AgenticOp-io/chrysalis-security)  
**Related:** [RFC-0022](../language/CWL-RFC-0022-dna-surface-bridge.md) · [RFC-0023](../language/CWL-RFC-0023-deploy-dna-profiles.md) · [EXIT-1.0.md](./EXIT-1.0.md)

## Ask (met)

Helix cutover’s **default** compares live `app-dna-v1` against the authored CWL surface per RFC-0022/0023 — consumes CWL fixtures/seed tools, pins `@agenticop-io/cwl`, never forks the grammar.

## Verified

| Check | Result |
| --- | --- |
| Registry pin | `@agenticop-io/cwl@1.0.0` (+ optional `file:` sibling) |
| Grammar fork | **None** — parser/seed from package or pillar |
| `helix cutover` / `cutover-smoke` | CWL surface ⊆ DNA (not DNA-only) |
| Protect / learn / enforce | DNA-only (D5) — intentional |

## Still open (CWL improvements Secure would benefit from)

| Item | Owner |
| --- | --- |
| ~~Multi-host deploy-profile gold~~ | **Done (CWL 1.0.2)** — `deploy-profile-api.json` |
| ~~Optional RFC-0022 hole bridge report~~ | **Done (CWL 1.0.2)** — `cwlHolesBridgeReport` (`dna_gaps` filled by Secure) |
| Secure mapping fallback vs pillar seed — keep single SoR | **Secure** |
| Bump registry pin to `@agenticop-io/cwl@1.0.16` (tip) | **Secure** |
| Apply non-`default` host from profile at cutover using new gold | **Secure** |

## Reply shape (when Secure closes hygiene)

```text
SECURE_CUTOVER: ok
SHA: <security commit>
CWL_PIN: @agenticop-io/cwl@1.0.0 | file
SMOKES: cwl-bridge-smoke · cutover-smoke
RFC: 0022 · 0023
```
