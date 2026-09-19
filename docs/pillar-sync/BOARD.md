# Chrysalis sync BOARD (git SoR in CWL)

**Updated:** 2026-09-19 · tip **1.0.39** · RFC-0031 deepen — repeat `if` filter  
**Protocol:** [`PROTOCOL.md`](./PROTOCOL.md) · [`COORDINATOR.md`](./COORDINATOR.md)  
**Queue:** [`../history/DNA-BUILD-NEXT.md`](../history/DNA-BUILD-NEXT.md)

```text
FLEET_MODE: on
CWL_FLEET_IDLE: no
DISPATCH: tip 1.0.39 land + Packages · Convert pin+peel · Secure tip pin
CONVERT_NEXT: pin 1.0.39 · peel `repeat … if item.field html` (gold 47)
SECURE_NEXT: pin 1.0.39 · no new Secure surface (filter is page DNA only)
```

## Tips / pins

| Surface | Value |
| --- | --- |
| **CWL tip** | **`1.0.39`** |
| Packages | **`@agenticop-io/cwl@1.0.39`** (land → publish) |
| Convert | file: → bump acknowledgment to **1.0.39** (was 1.0.37/38) |
| Secure | file: → bump acknowledgment to **1.0.39** (was 1.0.37/38) |

## Latest SHAs

| Pillar | Branch | SHA | Note |
| --- | --- | --- | --- |
| **CWL** | `main` | *(pending push)* | tip **1.0.39** · tag `cwl-v1.0.39` |
| **Convert** | `candidate/wptp-convert-orbit` | `89b1d2a8` | tip ack **1.0.37** |
| **Secure** | `candidate/live-match-step4` | `f9c6f95` | tip ack **1.0.37** |

## Who builds next

| Priority | Owner | Work |
| --- | --- | --- |
| **P0** | Convert | Tip pin **1.0.39**; peel/recover `repeat … if item.field html`; ALWAYS already has html-template/emit-ui |
| **P0** | Secure | Tip pin **1.0.39**; no cutover change required (page filter DNA) |
| **done** | CWL | RFC-0031 deepen · gold `47` |

## Honesty

`if` is a field chain on the item — not a general expression, sorter, or pagination gene. Cookie **values** never enter CWL. WebSocket duplex stays a hole. No UA regex / façades.
