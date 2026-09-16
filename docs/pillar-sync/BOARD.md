# Chrysalis sync BOARD (git SoR in CWL)

**Updated:** 2026-09-16 · tip **1.0.34** · RFC-0033 declared upstream forwards  
**Protocol:** [`PROTOCOL.md`](./PROTOCOL.md) · [`COORDINATOR.md`](./COORDINATOR.md)  
**Queue:** [`../history/DNA-BUILD-NEXT.md`](../history/DNA-BUILD-NEXT.md)

```text
FLEET_MODE: on
CWL_FLEET_IDLE: no
DISPATCH: tip 1.0.34 land + Packages · Convert pin+peels · Secure pin
CONVERT_NEXT: pin 1.0.34 · peel proxy upstream (43) + repeats (40-41) + auth/session tags (42)
SECURE_NEXT: pin 1.0.34 · forwarded routes name their upstream in the genome
```

## Tips / pins

| Surface | Value |
| --- | --- |
| **CWL tip** | **`1.0.34`** |
| Packages | **`@agenticop-io/cwl@1.0.34`** — publish at tag |
| Convert | file: → bump acknowledgment to **1.0.34** (was 1.0.27) |
| Secure | file: → bump acknowledgment to **1.0.34** (was 1.0.28) |

## Latest SHAs

| Pillar | Branch | SHA | Note |
| --- | --- | --- | --- |
| **CWL** | `main` | pending | tip **1.0.34** · tag `cwl-v1.0.34` |
| **Convert** | `candidate/wptp-convert-orbit` | lag | tip ack **1.0.27** |
| **Secure** | `candidate/live-match-step4` | lag | tip ack **1.0.28** |

## Who builds next

| Priority | Owner | Work |
| --- | --- | --- |
| **P0** | Convert | Tip pin **1.0.34**; peel `proxy upstream` + repeats + credential/session effect tags |
| **P0** | Secure | Tip pin **1.0.34**; DNA seed vs golds `40`–`43` (upstream target is now declared) |
| **P0** | Operator | Redeploy Cinderpath web once genome uses `repeat`, auth effects, and `proxy upstream` |
| **done** | CWL | repeats + item fields + credential/session effects + declared upstream forwards |

## Honesty

Host keeps hashing, session stores, and the proxy transfer itself (TLS, hop headers, retries, tunnels); WebSocket duplex stays a hole. No UA regex / façades.
