# Chrysalis sync BOARD (git SoR in CWL)

**Updated:** 2026-10-09 · tip **1.0.86** · **Goal:** DNA of web languages. CWL creates the language. Convert peels. Secure pins. Site deploys.  
**Protocol:** [`PROTOCOL.md`](./PROTOCOL.md) · [`COORDINATOR.md`](./COORDINATOR.md)  
**Queue:** [`../history/DNA-BUILD-NEXT.md`](../history/DNA-BUILD-NEXT.md)

```text
FLEET_MODE: on
CWL_FLEET_IDLE: yes
DISPATCH: tip 1.0.86 closed · Convert + Secure pins done
CONVERT_NEXT: idle · CONVERT_TIP_1_0_86_OK · PR #98 · c12a505c
SECURE_NEXT: idle · SECURE_TIP_1_0_86_OK · PR #47 · 270fc1a
CWL_NEXT: idle
SITE_NEXT: idle
```

## Tips / pins

| Surface | Value |
| --- | --- |
| **CWL tip** | **`1.0.86`** |
| Packages | **`@agenticop-io/cwl@1.0.86`** |
| Tags | `cwl-v1.0.85` · `cwl-v1.0.86` |

## Latest SHAs

| Pillar | Branch | SHA | Note |
| --- | --- | --- | --- |
| **CWL** | `main` | ee0b81a | tip **1.0.86** · tag `cwl-v1.0.86` |
| **Convert** | `candidate/convert-tip-1.0.86` | c12a505c | **CONVERT_TIP_1_0_86_OK** · [PR #98](https://github.com/AgenticOp-io/chrysalis/pull/98) |
| **Secure** | `candidate/secure-tip-1.0.86` | 270fc1a | **SECURE_TIP_1_0_86_OK** · [PR #47](https://github.com/AgenticOp-io/chrysalis-security/pull/47) |
| **Site** | `main` | ce6a72f | idle |

## Who builds next

| Priority | Owner | Work |
| --- | --- | --- |
| **done** | CWL | tip **1.0.86** merge `ee0b81a` · tag `cwl-v1.0.86` |
| **done** | Convert | Tip pin **1.0.86**, [PR #98](https://github.com/AgenticOp-io/chrysalis/pull/98) |
| **done** | Secure | Tip pin **1.0.86**, [PR #47](https://github.com/AgenticOp-io/chrysalis-security/pull/47) |
| **open** | Operator | EXTFMAP / soak → enforce (human) |

## Honesty

`dna fingerprint` requires `sha384` / `sha512`. `sha256` is `cwl:dna-fingerprint-too-weak` for DNA binds only. Asset integrity may still use sha256. No PQ hash invent in CWL. No Nest/LiveView/Flutter façades.
