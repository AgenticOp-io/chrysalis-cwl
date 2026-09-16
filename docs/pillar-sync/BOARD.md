# Chrysalis sync BOARD (git SoR in CWL)

**Updated:** 2026-09-16 · tip **1.0.35** · precise host-byte hole reasons  
**Protocol:** [`PROTOCOL.md`](./PROTOCOL.md) · [`COORDINATOR.md`](./COORDINATOR.md)  
**Queue:** [`../history/DNA-BUILD-NEXT.md`](../history/DNA-BUILD-NEXT.md)

```text
FLEET_MODE: on
CWL_FLEET_IDLE: no
DISPATCH: tip 1.0.35 land + Packages · Convert pin+peels · Secure pin
CONVERT_NEXT: pin 1.0.35 · peel proxy upstream (43) + repeats (40-41) + auth/session tags (42) · emit narrow host-byte reasons (44)
SECURE_NEXT: pin 1.0.35 · forwarded routes name their upstream; host-byte routes keep their media type
```

## Tips / pins

| Surface | Value |
| --- | --- |
| **CWL tip** | **`1.0.35`** |
| Packages | **`@agenticop-io/cwl@1.0.35`** — publish at tag |
| Convert | file: → bump acknowledgment to **1.0.35** (was 1.0.27) |
| Secure | file: → bump acknowledgment to **1.0.35** (was 1.0.28) |

## Latest SHAs

| Pillar | Branch | SHA | Note |
| --- | --- | --- | --- |
| **CWL** | `main` | pending | tip **1.0.35** · tag `cwl-v1.0.35` |
| **Convert** | `candidate/wptp-convert-orbit` | lag | tip ack **1.0.27** |
| **Secure** | `candidate/live-match-step4` | lag | tip ack **1.0.28** |

## Who builds next

| Priority | Owner | Work |
| --- | --- | --- |
| **P0** | Convert | Tip pin **1.0.35**; peel `proxy upstream` + repeats + credential/session effect tags; emit the narrow host-byte reasons |
| **P0** | Secure | Tip pin **1.0.35**; DNA seed vs golds `40`–`44` |
| **P0** | Operator | Redeploy Cinderpath web once genome uses `repeat`, auth effects, `proxy upstream`, and the narrow byte reasons |
| **done** | CWL | repeats + item fields + credential/session effects + declared upstream forwards + precise host-byte reasons |

## Honesty

Host keeps hashing, session stores, keypairs, binary encoders, and the proxy transfer itself (TLS, hop headers, retries, tunnels); WebSocket duplex stays a hole. No UA regex / façades.
