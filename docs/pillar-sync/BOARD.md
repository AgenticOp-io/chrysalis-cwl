# Chrysalis sync BOARD (git SoR in CWL)

**Updated:** 2026-10-06 · tip **1.0.84** · **Goal:** DNA of web languages. CWL creates the language. Convert peels. Secure pins. Site deploys.  
**Protocol:** [`PROTOCOL.md`](./PROTOCOL.md) · [`COORDINATOR.md`](./COORDINATOR.md)  
**Queue:** [`../history/DNA-BUILD-NEXT.md`](../history/DNA-BUILD-NEXT.md)

```text
FLEET_MODE: on
CWL_FLEET_IDLE: yes
DISPATCH: tip 1.0.84 public docs live. Fleet idle
CONVERT_NEXT: idle · CONVERT_TIP_1_0_84_OK · main c39088c4
SECURE_NEXT: idle · SECURE_TIP_1_0_84_OK · main a8a3f58
CWL_NEXT: done · site-docs-build-1.0.84 · eb0ee90 · PR #124
SITE_NEXT: done · SITE_DEPLOY_OK · 7406591 · PR #5 · hosting live tip 1.0.84
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
| **CWL** | `candidate/cwl-site-docs-1.0.84` | eb0ee90 | public docs genome tip **1.0.84** · PR #124 |
| **Convert** | `main` | c39088c4 | tip pin **1.0.84**, `CONVERT_TIP_1_0_84_OK` |
| **Secure** | `main` | a8a3f58 | tip pin **1.0.84**, `SECURE_TIP_1_0_84_OK` |
| **Site** | `candidate/site-docs-1.0.84` | 7406591 | `SITE_DEPLOY_OK` · PR #5 · live tip **1.0.84** |

## Who builds next

| Priority | Owner | Work |
| --- | --- | --- |
| **done** | CWL | Public site docs build — [`INBOX-SITE-DOCS-BUILD.md`](./INBOX-SITE-DOCS-BUILD.md) |
| **done** | Site | Emit + deploy tip **1.0.84** docs · PR #5 · live |
| **done** | Convert | Tip pin **1.0.84**, main `c39088c4`, [PR #94](https://github.com/AgenticOp-io/chrysalis/pull/94) |
| **done** | Secure | Tip pin **1.0.84**, main `a8a3f58`, [PR #38](https://github.com/AgenticOp-io/chrysalis-security/pull/38) |
| **open** | Operator | EXTFMAP / soak → enforce (from tip **1.0.81**; human) |

## Honesty

`enctype multipart` + `field … "file"` are language facts. Host owns transfer/storage. No upload middleware invent. No Nest/LiveView/Flutter façades. Marketing routes need not use multipart/websocket/jobs.
