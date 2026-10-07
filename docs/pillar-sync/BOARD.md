# Chrysalis sync BOARD (git SoR in CWL)

**Updated:** 2026-10-06 · tip **1.0.79** · **Goal:** DNA of web languages. CWL creates the language. Convert peels. Secure pins. Site deploys.  
**Protocol:** [`PROTOCOL.md`](./PROTOCOL.md) · [`COORDINATOR.md`](./COORDINATOR.md)  
**Queue:** [`../history/DNA-BUILD-NEXT.md`](../history/DNA-BUILD-NEXT.md)

```text
FLEET_MODE: on
CWL_FLEET_IDLE: no
DISPATCH: tip 1.0.79 landed. Secure pinned. Convert pin open. CWL does not deploy
CONVERT_NEXT: pin 1.0.79 · CONVERT_TIP_1_0_79_OK · golds 87–89
SECURE_NEXT: done · SECURE_TIP_1_0_79_OK · main 5ec8c50
CWL_NEXT: done · tip 1.0.79 land f67abb5 · merge b75082f · tag cwl-v1.0.79
SITE_NEXT: idle · no site emit change required
```

## Tips / pins

| Surface | Value |
| --- | --- |
| **CWL tip** | **`1.0.79`** |
| Packages | **`@agenticop-io/cwl@1.0.79`** (pin; Packages publish when tagged) |
| Tags | `cwl-v1.0.78` · `cwl-v1.0.79` |

## Latest SHAs

| Pillar | Branch | SHA | Note |
| --- | --- | --- | --- |
| **CWL** | `main` | f67abb5 | tip **1.0.79** · merge `b75082f` · tag `cwl-v1.0.79` |
| **Convert** | `main` | 767ecbaa | tip pin **1.0.78** — pin **1.0.79** open |
| **Secure** | `main` | 5ec8c50 | tip pin **1.0.79**, `SECURE_TIP_1_0_79_OK` |
| **Site** | `main` | 5d17e69 | idle · no emit change for **1.0.79** |

## Who builds next

| Priority | Owner | Work |
| --- | --- | --- |
| **P0** | Convert | Pin **1.0.79**. Consume golds `87`–`89`. Reply `CONVERT_TIP_1_0_79_OK` |
| **done** | Secure | Tip pin **1.0.79**, main `5ec8c50`, [PR #32](https://github.com/AgenticOp-io/chrysalis-security/pull/32) |
| **done** | CWL | tip **1.0.79** land `f67abb5`, merge `b75082f`, tag `cwl-v1.0.79` |

## Honesty

RFC-0035/0036/0037. Host owns WS frames and job queues. No hydration invent. Residual `unsupported:websocket` remains for undeclared peels.
