# Chrysalis sync BOARD (git SoR in CWL)

**Updated:** 2026-10-09 · tip **1.0.86** · **Goal:** DNA of web languages. CWL creates the language. Convert peels. Secure pins. Site deploys.  
**Protocol:** [`PROTOCOL.md`](./PROTOCOL.md) · [`COORDINATOR.md`](./COORDINATOR.md)  
**Queue:** [`../history/DNA-BUILD-NEXT.md`](../history/DNA-BUILD-NEXT.md)

```text
FLEET_MODE: on
CWL_FLEET_IDLE: no
DISPATCH: tip 1.0.86 · Convert pin done · Secure pin still open
CONVERT_NEXT: idle · CONVERT_TIP_1_0_86_OK · PR #98 · c12a505c
SECURE_NEXT: open · pin tip 1.0.86 · refuse weak DNA digests (lane: secure only)
CWL_NEXT: merge/tag tip 1.0.86 · wait Secure pin
SITE_NEXT: idle
```

## Tips / pins

| Surface | Value |
| --- | --- |
| **CWL tip** | **`1.0.86`** (landing) |
| Packages | **`@agenticop-io/cwl@1.0.86`** |
| Tags | `cwl-v1.0.85` · next `cwl-v1.0.86` |

## Latest SHAs

| Pillar | Branch | SHA | Note |
| --- | --- | --- | --- |
| **CWL** | candidate | 61f4ba3 | tip **1.0.86** · RFC-0043 · gold `95` |
| **Convert** | `candidate/convert-tip-1.0.86` | c12a505c | **CONVERT_TIP_1_0_86_OK** · [PR #98](https://github.com/AgenticOp-io/chrysalis/pull/98) |
| **Secure** | candidate | 65c4995 | tip **1.0.86** pin in progress · no PR yet |
| **Site** | `main` | ce6a72f | idle |

## Who builds next

| Priority | Owner | Work |
| --- | --- | --- |
| **P0** | Secure | **Lane only.** Pin to **1.0.86**. DNA fingerprint floor sha384+; open PR. No CWL/Convert edits |
| **done** | Convert | Tip pin **1.0.86**, [PR #98](https://github.com/AgenticOp-io/chrysalis/pull/98), `CONVERT_TIP_1_0_86_OK` |
| **done** | CWL | tip **1.0.86** language land · golds 94–95 |
| **open** | Operator | EXTFMAP / soak → enforce (human) |

## Honesty

`dna fingerprint` requires `sha384` / `sha512`. `sha256` is `cwl:dna-fingerprint-too-weak` for DNA binds only. Asset integrity may still use sha256. No PQ hash invent in CWL. No Nest/LiveView/Flutter façades.
