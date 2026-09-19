# Chrysalis sync BOARD (git SoR in CWL)

**Updated:** 2026-09-19 · tip **1.0.37** · runtime-cwl upstream passthrough landed  
**Protocol:** [`PROTOCOL.md`](./PROTOCOL.md) · [`COORDINATOR.md`](./COORDINATOR.md)  
**Queue:** [`../history/DNA-BUILD-NEXT.md`](../history/DNA-BUILD-NEXT.md)

```text
FLEET_MODE: on
CWL_FLEET_IDLE: yes
DISPATCH: wait — tip 1.0.37 consume complete; runtime StubUpstream + ALWAYS html-template/emit-ui done
CONVERT_NEXT: optional — pick up ALWAYS tip-sync for html-template/emit-ui (already identical); use createCwlRuntime({ upstream })
SECURE_NEXT: waiting (no language ask)
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
| **CWL** | `main` | `9f8b520` | tip **1.0.37** + runtime upstream passthrough |
| **Convert** | `candidate/wptp-convert-orbit` | `89b1d2a8` | tip ack **1.0.37** · peels + rewrite upstream exec |
| **Secure** | `candidate/live-match-step4` | `f9c6f95` | tip ack **1.0.37** · cutover / helix upstreams |

## Who builds next

| Priority | Owner | Work |
| --- | --- | --- |
| **done** | **CWL** | `CwlRuntimeConfig.upstream` → `simulateHandler(..., upstream)`; gate `upstream-passthrough`; ALWAYS `cwl-html-template.mjs` + `cwl-emit-ui.mjs` |
| **done** | Convert | Tip pin **1.0.37**; peels golds 40–45; rewrite executes `__cwl_effect_upstream_proxy` |
| **done** | Secure | Tip pin **1.0.37**; DNA seed/cutover vs golds 39–45 |
| **idle** | Fleet | No open language tip; peels can demand conditional-in-repeat if needed |

## Honesty

Host keeps hashing, session stores, keypairs, binary encoders, and real network. Runtime may inject `StubUpstream`; default still declares forwards without performing them (501 inconclusive). WebSocket duplex stays a hole. No UA regex / façades.
