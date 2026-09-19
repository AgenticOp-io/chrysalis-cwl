# Chrysalis sync BOARD (git SoR in CWL)

**Updated:** 2026-09-19 · tip **1.0.37** · siblings caught up; CWL builds runtime upstream passthrough  
**Protocol:** [`PROTOCOL.md`](./PROTOCOL.md) · [`COORDINATOR.md`](./COORDINATOR.md)  
**Queue:** [`../history/DNA-BUILD-NEXT.md`](../history/DNA-BUILD-NEXT.md)

```text
FLEET_MODE: on
CWL_FLEET_IDLE: no
DISPATCH: CWL P0 runtime-cwl StubUpstream passthrough · ALWAYS sync html-template+emit-ui
CONVERT_NEXT: waiting (tip 1.0.37 peels done; open only after CWL lands transport line)
SECURE_NEXT: waiting (tip 1.0.37 consume done; no language ask)
```

## Tips / pins

| Surface | Value |
| --- | --- |
| **CWL tip** | **`1.0.37`** |
| Packages | **`@agenticop-io/cwl@1.0.37`** **live** |
| Convert | **`1.0.37`** ack (`CONVERT_TIP_1_0_37_OK`) |
| Secure | **`1.0.37`** ack (`SECURE_TIP_1_0_37_OK`) |

## Latest SHAs

| Pillar | Branch | SHA | Note |
| --- | --- | --- | --- |
| **CWL** | `main` | `b12a538` | tip **1.0.37** · tag `cwl-v1.0.37` · Packages live |
| **Convert** | `candidate/wptp-convert-orbit` | `89b1d2a8` | tip ack **1.0.37** · peels + rewrite upstream exec |
| **Secure** | `candidate/live-match-step4` | `f9c6f95` | tip ack **1.0.37** · cutover / helix upstreams |

## Who builds next

| Priority | Owner | Work |
| --- | --- | --- |
| **P0** | **CWL** | Thread `StubUpstream` through `CwlRuntimeConfig` → `simulateHandler(..., upstream)` — Convert rewrite already executes forwards; runtime-cwl does not pass transport |
| **P1** | **CWL** | Add `cwl-html-template.mjs` + `cwl-emit-ui.mjs` to `ALWAYS` in `sync-to-convert.mjs` (Convert adopted by copy; tip-sync drift risk) |
| **done** | Convert | Tip pin **1.0.37**; peels golds 40–45; `__cwl_effect_upstream_proxy` executes in `@chrysalis/rewrite` |
| **done** | Secure | Tip pin **1.0.37**; DNA seed/cutover vs golds 39–45; hole-param lookup on `helix upstreams` |
| **note** | Secure | Soft: if CWL ever names the session cookie for `session.mint`, cutover can honor it — **not asking** |
| **flag** | Convert | Gold `36` hole-counter mismatch under fat emit (text matches; counters differ) — align if CWL cares |

## Honesty

Host keeps hashing, session stores, keypairs, binary encoders, and the proxy transfer itself (TLS, hop headers, retries, tunnels); WebSocket duplex stays a hole. No UA regex / façades. Rewrite may simulate a forward via injected `StubUpstream`; real network stays host/ops.
