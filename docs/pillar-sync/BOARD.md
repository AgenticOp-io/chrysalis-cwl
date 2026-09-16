# Chrysalis sync BOARD (git SoR in CWL)

**Updated:** 2026-09-16 · tip **1.0.31** · RFC-0031 repeated markup  
**Protocol:** [`PROTOCOL.md`](./PROTOCOL.md) · [`COORDINATOR.md`](./COORDINATOR.md)  
**Queue:** [`../history/DNA-BUILD-NEXT.md`](../history/DNA-BUILD-NEXT.md)

```text
FLEET_MODE: on
CWL_FLEET_IDLE: no
DISPATCH: tip 1.0.31 land + Packages · Convert pin+repeat peel · Secure pin
CONVERT_NEXT: pin 1.0.31 · peel __cwl_html_repeat (list surfaces now CWL)
SECURE_NEXT: pin 1.0.31 (was 1.0.28 ack)
```

## Tips / pins

| Surface | Value |
| --- | --- |
| **CWL tip** | **`1.0.31`** |
| Packages | **`@agenticop-io/cwl@1.0.31`** **live** |
| Convert | file: → bump acknowledgment to **1.0.31** (was 1.0.27) |
| Secure | file: → bump acknowledgment to **1.0.31** (was 1.0.28) |

## Latest SHAs

| Pillar | Branch | SHA | Note |
| --- | --- | --- | --- |
| **CWL** | `main` | `c23c37a` | tip **1.0.31** · tag `cwl-v1.0.31` |
| **Convert** | `candidate/wptp-convert-orbit` | lag | tip ack **1.0.27** |
| **Secure** | `candidate/live-match-step4` | lag | tip ack **1.0.28** |

## Who builds next

| Priority | Owner | Work |
| --- | --- | --- |
| **P0** | Convert | Tip pin **1.0.31**; peel `__cwl_html_repeat` list markup |
| **P0** | Secure | Tip pin **1.0.31**; DNA seed vs gold `40` |
| **P0** | Operator | Redeploy Cinderpath web once genome uses `repeat` |
| **done** | CWL | RFC-0031 gene + gold + emit reverse |

## Honesty

Host keeps credential crypto and upstream bytes; WebSocket duplex stays a hole. No UA regex / Nest façades.
