# Chrysalis sync BOARD (git SoR in CWL)

**Updated:** 2026-10-06 · tip **1.0.79** · **Goal:** DNA of web languages. CWL creates the language. Convert peels. Secure pins. Site deploys.  
**Protocol:** [`PROTOCOL.md`](./PROTOCOL.md) · [`COORDINATOR.md`](./COORDINATOR.md)  
**Queue:** [`../history/DNA-BUILD-NEXT.md`](../history/DNA-BUILD-NEXT.md)

```text
FLEET_MODE: on
CWL_FLEET_IDLE: no
DISPATCH: tip 1.0.79 landed. Convert + Secure pin. CWL does not deploy
CONVERT_NEXT: pin 1.0.79 · CONVERT_TIP_1_0_79_OK · golds 87–89
SECURE_NEXT: pin 1.0.79 · stream websocket + job.enqueue are document facts · SECURE_TIP_1_0_79_OK
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
| **Secure** | `main` | 77cc8a0 | tip pin **1.0.78** — pin **1.0.79** open |
| **Site** | `main` | 5d17e69 | idle · no emit change for **1.0.79** |

## Who builds next

| Priority | Owner | Work |
| --- | --- | --- |
| **P0** | Convert | Pin **1.0.79**. Consume golds `87`–`89`. Reply `CONVERT_TIP_1_0_79_OK` |
| **P0** | Secure | Pin **1.0.79**. `stream websocket` + `job.enqueue` are document facts. Reply `SECURE_TIP_1_0_79_OK` |
| **done** | CWL | tip **1.0.79** land `f67abb5`, merge `b75082f`, tag `cwl-v1.0.79` |

## Honesty

RFC-0035/0036/0037. Host owns WS frames and job queues. No hydration invent. Residual `unsupported:websocket` remains for undeclared peels.
