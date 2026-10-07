# Chrysalis sync BOARD (git SoR in CWL)

**Updated:** 2026-10-06 · tip **1.0.81** · **Goal:** DNA of web languages. CWL creates the language. Convert peels. Secure pins. Site deploys.  
**Protocol:** [`PROTOCOL.md`](./PROTOCOL.md) · [`COORDINATOR.md`](./COORDINATOR.md)  
**Queue:** [`../history/DNA-BUILD-NEXT.md`](../history/DNA-BUILD-NEXT.md)

```text
FLEET_MODE: on
CWL_FLEET_IDLE: yes
DISPATCH: tip 1.0.81 closed. Convert pinned + peels 40–63. Secure pinned + live-match. Operator owns EXTFMAP/soak. No façades
CONVERT_NEXT: done · CONVERT_TIP_1_0_81_OK · main fbfd45e7 · peels 40–63
SECURE_NEXT: done · SECURE_TIP_1_0_81_OK · main 975f734
CWL_NEXT: done · tip 1.0.81 land 77e09bc · merge 84aec5e · tag cwl-v1.0.81
SITE_NEXT: idle · no site emit change required
OPERATOR_NEXT: EXTFMAP hunt/attest · customer soak → enforce
```

## Tips / pins

| Surface | Value |
| --- | --- |
| **CWL tip** | **`1.0.81`** |
| Packages | **`@agenticop-io/cwl@1.0.81`** (pin; Packages publish when tagged) |
| Tags | `cwl-v1.0.80` · `cwl-v1.0.81` |

## Latest SHAs

| Pillar | Branch | SHA | Note |
| --- | --- | --- | --- |
| **CWL** | `main` | 77e09bc | tip **1.0.81** · merge `84aec5e` · tag `cwl-v1.0.81` |
| **Convert** | `main` | fbfd45e7 | tip pin **1.0.81**, peels 40–63, `CONVERT_TIP_1_0_81_OK` |
| **Secure** | `main` | 975f734 | tip pin **1.0.81**, `SECURE_TIP_1_0_81_OK` |
| **Site** | `main` | ce6a72f | tip **1.0.80** live · idle for **1.0.81** |

## Who builds next

| Priority | Owner | Work |
| --- | --- | --- |
| **P0** | Operator | EXTFMAP hunt/attest · customer soak → enforce ([OPERATOR-NEXT](../history/OPERATOR-NEXT-1.0.23.md)) |
| **done** | Convert | Tip pin **1.0.81** + peels 40–63, main `fbfd45e7`, [PR #89](https://github.com/AgenticOp-io/chrysalis/pull/89) |
| **done** | Secure | Tip pin **1.0.81**, main `975f734`, [PR #34](https://github.com/AgenticOp-io/chrysalis-security/pull/34) |
| **done** | CWL | tip **1.0.81** land `77e09bc`, merge `84aec5e`, tag `cwl-v1.0.81` |

## Honesty

Nest / LiveView / Flutter / onion / raw SQL are **named residuals**. Do not invent façades. EXTFMAP and soak need live systems — agents will not fake them.
