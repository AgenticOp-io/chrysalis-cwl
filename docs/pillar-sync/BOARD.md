# Chrysalis sync BOARD (git SoR in CWL)

**Updated:** 2026-09-19 · tip **1.0.43** · RFC-0032 deepen — session cookie policy attrs  
**Protocol:** [`PROTOCOL.md`](./PROTOCOL.md) · [`COORDINATOR.md`](./COORDINATOR.md)  
**Queue:** [`../history/DNA-BUILD-NEXT.md`](../history/DNA-BUILD-NEXT.md)

```text
FLEET_MODE: on
CWL_FLEET_IDLE: no
DISPATCH: tip 1.0.43 land + Packages · Convert pin+peel · Secure tip pin
CONVERT_NEXT: pin 1.0.43 · peel gold 51 cookie attrs
SECURE_NEXT: pin 1.0.43 · honor cookie policy attrs vs Set-Cookie when ready
```

## Tips / pins

| Surface | Value |
| --- | --- |
| **CWL tip** | **`1.0.43`** |
| Packages | **`@agenticop-io/cwl@1.0.43`** (land → publish) |
| Convert | bump acknowledgment to **1.0.43** |
| Secure | bump acknowledgment to **1.0.43** (attrs are DNA intent) |

## Latest SHAs

| Pillar | Branch | SHA | Note |
| --- | --- | --- | --- |
| **CWL** | `candidate/cwl-1.0.43` | (landing) | tip **1.0.43** |
| **Convert** | lag | tip ack **1.0.39** |
| **Secure** | lag | tip ack **1.0.39** |

## Who builds next

| Priority | Owner | Work |
| --- | --- | --- |
| **P0** | Convert | Tip pin **1.0.43**; peel cookie attrs |
| **P0** | Secure | Tip pin **1.0.43**; optional honor attrs vs live Set-Cookie |
| **done** | CWL | RFC-0032 deepen · gold `51` |

## Honesty

Cookie **values** never enter CWL. Attrs are policy only. WebSocket duplex stays a hole. No UA regex / façades.
