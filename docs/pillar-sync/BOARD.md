# Chrysalis sync BOARD (git SoR in CWL)

**Updated:** 2026-09-16 · tip **1.0.37** · parameterized hole reasons resolve in diagnostics  
**Protocol:** [`PROTOCOL.md`](./PROTOCOL.md) · [`COORDINATOR.md`](./COORDINATOR.md)  
**Queue:** [`../history/DNA-BUILD-NEXT.md`](../history/DNA-BUILD-NEXT.md)

```text
FLEET_MODE: on
CWL_FLEET_IDLE: no
DISPATCH: tip 1.0.37 land + Packages · Convert pin+peels+forward exec · Secure pin
CONVERT_NEXT: pin 1.0.37 · peel proxy upstream incl. :params (43,45) + repeats (40-41) + auth/session tags (42) · emit narrow host-byte reasons (44) · execute __cwl_effect_upstream_proxy in @chrysalis/rewrite
SECURE_NEXT: pin 1.0.37 · forwarded routes name their full upstream target; host-byte routes keep their media type
```

## Tips / pins

| Surface | Value |
| --- | --- |
| **CWL tip** | **`1.0.37`** |
| Packages | **`@agenticop-io/cwl@1.0.37`** — publish at tag |
| Convert | file: → bump acknowledgment to **1.0.37** (was 1.0.27) |
| Secure | file: → bump acknowledgment to **1.0.37** (was 1.0.28) |

## Latest SHAs

| Pillar | Branch | SHA | Note |
| --- | --- | --- | --- |
| **CWL** | `main` | pending | tip **1.0.37** · tag `cwl-v1.0.37` |
| **Convert** | `candidate/wptp-convert-orbit` | lag | tip ack **1.0.27** |
| **Secure** | `candidate/live-match-step4` | lag | tip ack **1.0.28** |

## Who builds next

| Priority | Owner | Work |
| --- | --- | --- |
| **P0** | Convert | Tip pin **1.0.37**; peel `proxy upstream` incl. `:param` targets + repeats + credential/session effect tags; emit the narrow host-byte reasons |
| **P0** | Convert | **Execute** `__cwl_effect_upstream_proxy` in `@chrysalis/rewrite` `simulateHandler` — CWL runtime can only declare the forward |
| **P0** | Secure | Tip pin **1.0.37**; DNA seed vs golds `40`–`45` |
| **P0** | Operator | Redeploy Cinderpath web once genome uses `repeat`, auth effects, `proxy upstream`, and the narrow byte reasons |
| **done** | CWL | repeats + credential/session effects + upstream forwards (incl. path params) + precise host-byte reasons |

## Honesty

Host keeps hashing, session stores, keypairs, binary encoders, and the proxy transfer itself (TLS, hop headers, retries, tunnels); WebSocket duplex stays a hole. No UA regex / façades.
