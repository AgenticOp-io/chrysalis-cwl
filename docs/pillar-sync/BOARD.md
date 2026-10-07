# Chrysalis sync BOARD (git SoR in CWL)

**Updated:** 2026-10-06 · tip **1.0.84** · **Goal:** DNA of web languages. CWL creates the language. Convert peels. Secure pins. Site deploys.  
**Protocol:** [`PROTOCOL.md`](./PROTOCOL.md) · [`COORDINATOR.md`](./COORDINATOR.md)  
**Queue:** [`../history/DNA-BUILD-NEXT.md`](../history/DNA-BUILD-NEXT.md)

```text
FLEET_MODE: on
CWL_FLEET_IDLE: no
DISPATCH: tip 1.0.84 language closed. Public site docs lag (pins 1.0.80 / golds 86). Parent asked site-docs-build-1.0.84
CONVERT_NEXT: idle · CONVERT_TIP_1_0_84_OK · main c39088c4
SECURE_NEXT: idle · SECURE_TIP_1_0_84_OK · main a8a3f58
CWL_NEXT: open · public site docs build tip 1.0.84 · INBOX-SITE-DOCS-BUILD.md
SITE_NEXT: blocked · wait CWL genome docs land · then emit + deploy
```

## Tips / pins

| Surface | Value |
| --- | --- |
| **CWL tip** | **`1.0.84`** |
| Packages | **`@agenticop-io/cwl@1.0.84`** (pin; Packages publish when tagged) |
| Tags | `cwl-v1.0.83` · `cwl-v1.0.84` |

## Latest SHAs

| Pillar | Branch | SHA | Note |
| --- | --- | --- | --- |
| **CWL** | `main` | 799a858 | tip **1.0.84** closed · **docs ask open** |
| **Convert** | `main` | c39088c4 | tip pin **1.0.84**, `CONVERT_TIP_1_0_84_OK` |
| **Secure** | `main` | a8a3f58 | tip pin **1.0.84**, `SECURE_TIP_1_0_84_OK` |
| **Site** | `main` | ce6a72f | blocked on docs genome |

## Who builds next

| Priority | Owner | Work |
| --- | --- | --- |
| **P0** | CWL | Public site docs build — tip pins **1.0.84**, tips **1.0.79–1.0.84**, RFCs **0035–0041**, golds **87–93**. [`INBOX-SITE-DOCS-BUILD.md`](./INBOX-SITE-DOCS-BUILD.md) |
| **blocked** | Site | Emit + deploy after CWL docs land |
| **done** | Convert | Tip pin **1.0.84**, main `c39088c4`, [PR #94](https://github.com/AgenticOp-io/chrysalis/pull/94) |
| **done** | Secure | Tip pin **1.0.84**, main `a8a3f58`, [PR #38](https://github.com/AgenticOp-io/chrysalis-security/pull/38) |
| **done** | CWL | tip **1.0.84** language land · tag `cwl-v1.0.84` |
| **open** | Operator | EXTFMAP / soak → enforce (from tip **1.0.81**; human) |

## Honesty

`enctype multipart` + `field … "file"` are language facts. Host owns transfer/storage. No upload middleware invent. No Nest/LiveView/Flutter façades.
