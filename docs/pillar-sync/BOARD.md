# Chrysalis sync BOARD (git SoR in CWL)

**Updated:** 2026-09-15 · tip **1.0.29** · adoption path (publish + sibling pins)  
**Protocol:** [`PROTOCOL.md`](./PROTOCOL.md) · [`COORDINATOR.md`](./COORDINATOR.md)  
**Queue:** [`../history/DNA-BUILD-NEXT.md`](../history/DNA-BUILD-NEXT.md)

```text
FLEET_MODE: on
CWL_FLEET_IDLE: no
DISPATCH: Packages 1.0.29 · Convert pin+peels · Secure pin · Cinderpath redeploy
CONVERT_NEXT: pin 1.0.29 · layout/page-island peels (still at 1.0.27 ack)
SECURE_NEXT: pin 1.0.29 (at 1.0.28 ack)
```

## Tips / pins

| Surface | Value |
| --- | --- |
| **CWL tip** | **`1.0.29`** |
| Packages | **`@agenticop-io/cwl@1.0.29`** (tagging) |
| Convert | file: → bump acknowledgment to **1.0.29** (was 1.0.27) |
| Secure | file: → bump acknowledgment to **1.0.29** (was 1.0.28) |

## Latest SHAs

| Pillar | Branch | SHA | Note |
| --- | --- | --- | --- |
| **CWL** | `main` | `731b5c8` | tip **1.0.29** |
| **Convert** | `candidate/wptp-convert-orbit` | lag | tip ack **1.0.27** |
| **Secure** | `candidate/live-match-step4` | lag | tip ack **1.0.28** |

## Who builds next

| Priority | Owner | Work |
| --- | --- | --- |
| **P0** | Convert | Tip pin **1.0.29**; peels layout chrome + page islands |
| **P0** | Secure | Tip pin **1.0.29**; DNA seed vs tip |
| **P0** | Operator | Redeploy `cinderpath-web` with genome tip **1.0.29** |
| **done** | CWL | tip + catalog + Packages ship |

## Honesty

No UA regex / Nest façades / WebSocket invent. Native CWL binaries not on path.
