# Chrysalis sync BOARD (git SoR in CWL)

**Updated:** 2026-09-19 · tip **1.0.38** · session.mint cookie names + emit holeCount fix  
**Protocol:** [`PROTOCOL.md`](./PROTOCOL.md) · [`COORDINATOR.md`](./COORDINATOR.md)  
**Queue:** [`../history/DNA-BUILD-NEXT.md`](../history/DNA-BUILD-NEXT.md)

```text
FLEET_MODE: on
CWL_FLEET_IDLE: no
DISPATCH: tip 1.0.38 land + Packages · Convert pin+peel · Secure honor cookie names
CONVERT_NEXT: pin 1.0.38 · peel session.mint cookie <name> (gold 46) · holeCount attachments (36)
SECURE_NEXT: pin 1.0.38 · seed/cutover may honor genome cookie names against set_cookie_names
```

## Tips / pins

| Surface | Value |
| --- | --- |
| **CWL tip** | **`1.0.38`** |
| Packages | **`@agenticop-io/cwl@1.0.38`** — publish at tag |
| Convert | file: → bump acknowledgment to **1.0.38** (was 1.0.37) |
| Secure | file: → bump acknowledgment to **1.0.38** (was 1.0.37) |

## Latest SHAs

| Pillar | Branch | SHA | Note |
| --- | --- | --- | --- |
| **CWL** | `main` | pending | tip **1.0.38** · tag `cwl-v1.0.38` |
| **Convert** | `candidate/wptp-convert-orbit` | `89b1d2a8` | tip ack **1.0.37** |
| **Secure** | `candidate/live-match-step4` | `f9c6f95` | tip ack **1.0.37** |

## Who builds next

| Priority | Owner | Work |
| --- | --- | --- |
| **P0** | Convert | Tip pin **1.0.38**; peel `session.mint cookie <name>`; attachment holeCount now matches fat emit |
| **P0** | Secure | Tip pin **1.0.38**; parse cookie name from `session.mint cookie sid` for cutover / seed notes |
| **done** | CWL | RFC-0032 deepen + holeCount fix · gold `46` |

## Honesty

Cookie **names** are genome data; cookie **values** never enter CWL. Host keeps hashing, stores, and real network. WebSocket duplex stays a hole. No UA regex / façades.
