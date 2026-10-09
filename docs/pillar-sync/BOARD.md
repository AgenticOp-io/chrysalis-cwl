# Chrysalis sync BOARD (git SoR in CWL)

**Updated:** 2026-10-09 · tip **1.0.86** · **Goal:** DNA of web languages. CWL creates the language. Convert peels. Secure pins. Site deploys.  
**Protocol:** [`PROTOCOL.md`](./PROTOCOL.md) · [`COORDINATOR.md`](./COORDINATOR.md)  
**Queue:** [`../history/DNA-BUILD-NEXT.md`](../history/DNA-BUILD-NEXT.md)

```text
FLEET_MODE: on
CWL_FLEET_IDLE: no
DISPATCH: tip 1.0.86 language land · DNA fingerprint strength sha384+
CONVERT_NEXT: open · pin tip 1.0.86 · consume gold 95 (lane: convert only)
SECURE_NEXT: open · pin tip 1.0.86 · refuse weak DNA digests in consume (lane: secure only)
CWL_NEXT: tip 1.0.86 candidate · wait Convert/Secure pins
SITE_NEXT: idle
```

## Tips / pins

| Surface | Value |
| --- | --- |
| **CWL tip** | **`1.0.86`** (candidate) |
| Packages | **`@agenticop-io/cwl@1.0.86`** (pin after merge/tag) |
| Tags | `cwl-v1.0.85` · next `cwl-v1.0.86` |

## Latest SHAs

| Pillar | Branch | SHA | Note |
| --- | --- | --- | --- |
| **CWL** | `main` / candidate | 14ed452 · *(1.0.86 land)* | tip **1.0.85** tagged · **1.0.86** candidate |
| **Convert** | candidate | 13f43a1d | tip **1.0.85** pin PR · **1.0.86 asked** |
| **Secure** | candidate | 38f0796 | tip **1.0.85** pin PR · **1.0.86 asked** |
| **Site** | `main` | ce6a72f | idle |

## Who builds next

| Priority | Owner | Work |
| --- | --- | --- |
| **P0** | Convert | **Lane only.** Pin to **1.0.86**. Consume gold `95`. No CWL/Secure edits |
| **P0** | Secure | **Lane only.** Pin to **1.0.86**. DNA fingerprint floor sha384+; PQ cert signing stays Secure. No CWL/Convert edits |
| **done** | CWL | tip **1.0.85** merge + tag `cwl-v1.0.85` · tip **1.0.86** language land |
| **open** | Operator | EXTFMAP / soak → enforce (human) |

## Honesty

`dna fingerprint` requires `sha384` / `sha512`. `sha256` is `cwl:dna-fingerprint-too-weak` for DNA binds only. Asset integrity may still use sha256. No PQ hash invent in CWL. No Nest/LiveView/Flutter façades.
