# Chrysalis sync BOARD (git SoR in CWL)

**Updated:** 2026-09-15 · tip **1.0.30** · layout ALWAYS + gold 39  
**Protocol:** [`PROTOCOL.md`](./PROTOCOL.md) · [`COORDINATOR.md`](./COORDINATOR.md)  
**Queue:** [`../history/DNA-BUILD-NEXT.md`](../history/DNA-BUILD-NEXT.md)

```text
FLEET_MODE: on
CWL_FLEET_IDLE: no
DISPATCH: tip 1.0.30 land · Packages tag · Convert pin+ALWAYS · Secure pin
CONVERT_NEXT: pin 1.0.30 · layout ALWAYS via sync (was manual copy)
SECURE_NEXT: pin 1.0.30 (was 1.0.28 ack)
```

## Tips / pins

| Surface | Value |
| --- | --- |
| **CWL tip** | **`1.0.30`** |
| Packages | tagging `cwl-v1.0.30` |
| Convert | file: → bump acknowledgment to **1.0.30** (was 1.0.27) |
| Secure | file: → bump acknowledgment to **1.0.30** (was 1.0.28) |

## Latest SHAs

| Pillar | Branch | SHA | Note |
| --- | --- | --- | --- |
| **CWL** | `main` | (landing) | tip **1.0.30** |
| **Convert** | `candidate/wptp-convert-orbit` | lag | tip ack **1.0.27** |
| **Secure** | `candidate/live-match-step4` | lag | tip ack **1.0.28** |

## Who builds next

| Priority | Owner | Work |
| --- | --- | --- |
| **P0** | Convert | Tip pin **1.0.30**; `sync:convert` picks up `cwl-layout.mjs` on ALWAYS |
| **P0** | Secure | Tip pin **1.0.30**; DNA seed vs tip / gold 39 |
| **P0** | Operator | Redeploy Cinderpath web with tip genome |
| **done** | CWL | tip **1.0.30** language land |

## Honesty

No UA regex / Nest façades / WebSocket invent. Native CWL binaries not on path.
