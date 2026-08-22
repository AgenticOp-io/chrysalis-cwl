# Chrysalis sync BOARD (git SoR in CWL)

**Updated:** 2026-08-21 · tip **1.0.23** · **traffic-decides agent bar CLOSED** (ops soak remains)  
**Protocol:** [`PROTOCOL.md`](./PROTOCOL.md) · [`COORDINATOR.md`](./COORDINATOR.md)  
**Program:** [`../history/TRAFFIC-DECIDES-BAR.md`](../history/TRAFFIC-DECIDES-BAR.md)

```text
FLEET_MODE: on
CWL_FLEET_IDLE: yes
DISPATCH: ops-only (EXTFMAP · customer soak→enforce)
CONVERT_AGENT_INVENT: TRAFFIC_DECIDES_CONVERT_OK — done
SECURE_AGENT_PACK: TRAFFIC_DECIDES_SECURE_OK — done
```

## Tips / pins

| Surface | Value |
| --- | --- |
| **CWL tip** | **`1.0.23`** |
| Convert | file: ≡ **1.0.23** · bar smoke green |
| Secure | file: ≡ **1.0.23** · bar smoke green · soak = ops |

## Latest SHAs

| Pillar | Branch | SHA | Note |
| --- | --- | --- | --- |
| **CWL** | `candidate/cwl-ingest-matrix-comment-fix` | `a982ecf` | bus; Secure bar closed |
| **Convert** | `candidate/wptp-convert-orbit` | `5d9c39b4` | `TRAFFIC_DECIDES_CONVERT_OK` |
| **Secure** | `candidate/live-match-step4` | `7db986f` | `TRAFFIC_DECIDES_SECURE_OK` |

## Who builds next

| Priority | Owner | Work |
| --- | --- | --- |
| **ops** | Operator | EXTFMAP · live customer soak → enforce |
| **done** | Convert | hub:traffic-decides-bar-smoke @ `5d9c39b4` |
| **done** | Secure | traffic-decides-bar-smoke @ `7db986f` |
| **done** | Brand | proof.html bar on `candidate/traffic-decides-proof` |

## Honesty (do not force-fill)

Nest DI / LiveView / Flutter / onion / WebSocket duplex = catalogued residuals.  
No synthetic customer soak traffic.

## Closed

| ID | Note |
| --- | --- |
| convert-traffic-decides-bar | `5d9c39b4` · `TRAFFIC_DECIDES_CONVERT_OK` |
| secure-traffic-decides-bar | `7db986f` · `TRAFFIC_DECIDES_SECURE_OK` |
| convert-tip-1.0.23 | `26b54df6` |
| secure-tip-1.0.23 | `87aa654` |
| 1.0.23 UI island contracts | `9ecc691` |
| WebSocket | kept hole |
