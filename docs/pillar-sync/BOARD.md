# Chrysalis sync BOARD (git SoR in CWL)

**Updated:** 2026-10-06 · tip **1.0.81** · **Goal:** DNA of web languages. CWL creates the language. Convert peels. Secure pins. Site deploys.  
**Protocol:** [`PROTOCOL.md`](./PROTOCOL.md) · [`COORDINATOR.md`](./COORDINATOR.md)  
**Queue:** [`../history/DNA-BUILD-NEXT.md`](../history/DNA-BUILD-NEXT.md)

```text
FLEET_MODE: on
CWL_FLEET_IDLE: no
DISPATCH: tip 1.0.81 landed. Convert pinned + peels 40–63 done. Secure pin + live-match open. Operator owns EXTFMAP/soak
CONVERT_NEXT: done · CONVERT_TIP_1_0_81_OK · main fbfd45e7 · peels 40–63
SECURE_NEXT: pin 1.0.81 · live-match vs tip seed · SECURE_TIP_1_0_81_OK
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
| **Secure** | `main` | 518f509 | tip pin **1.0.80** — pin **1.0.81** open |
| **Site** | `main` | ce6a72f | tip **1.0.80** live · idle for **1.0.81** |

## Who builds next

| Priority | Owner | Work |
| --- | --- | --- |
| **P0** | Secure | Pin **1.0.81**. Live-match vs tip seed. Reply `SECURE_TIP_1_0_81_OK` |
| **P0** | Operator | EXTFMAP hunt/attest · customer soak → enforce |
| **done** | Convert | Tip pin **1.0.81** + peels 40–63, main `fbfd45e7`, [PR #89](https://github.com/AgenticOp-io/chrysalis/pull/89) |
| **done** | CWL | tip **1.0.81** land `77e09bc`, merge `84aec5e`, tag `cwl-v1.0.81` |

## Honesty

Nest / LiveView / Flutter / onion / raw SQL are **named residuals**. Do not invent façades. EXTFMAP and soak need live systems.
