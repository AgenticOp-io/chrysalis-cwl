# Chrysalis sync BOARD (git SoR in CWL)

**Updated:** 2026-08-21 · tip **1.0.23** · **traffic-decides bar OPEN**  
**Protocol:** [`PROTOCOL.md`](./PROTOCOL.md) · [`COORDINATOR.md`](./COORDINATOR.md)  
**Program:** [`../history/TRAFFIC-DECIDES-BAR.md`](../history/TRAFFIC-DECIDES-BAR.md)

```text
FLEET_MODE: on
CWL_FLEET_IDLE: no
DISPATCH: convert-traffic-decides-bar · secure-traffic-decides-bar
CONVERT_AGENT_INVENT: TRAFFIC_DECIDES_CONVERT_OK (dispose + oracle)
SECURE_AGENT_PACK: TRAFFIC_DECIDES_SECURE_OK (soak-preflight + live-match)
```

## Tips / pins

| Surface | Value |
| --- | --- |
| **CWL tip** | **`1.0.23`** |
| Convert | file: ≡ **1.0.23** |
| Secure | file: ≡ **1.0.23** · soak = ops (customer enforce still ops) |

## Latest SHAs

| Pillar | Branch | SHA | Note |
| --- | --- | --- | --- |
| **CWL** | `candidate/cwl-ingest-matrix-comment-fix` | *(this tip)* | TRAFFIC-DECIDES-BAR program |
| **Convert** | `candidate/wptp-convert-orbit` | `26b54df6` | awaiting bar smoke |
| **Secure** | `candidate/live-match-step4` | `87aa654` | awaiting bar smoke |

## Who builds next

| Priority | Owner | Work |
| --- | --- | --- |
| **P0** | **Convert** | `hub:traffic-decides-bar-smoke` → `TRAFFIC_DECIDES_CONVERT_OK` |
| **P0** | **Secure** | `traffic-decides-bar-smoke` → `TRAFFIC_DECIDES_SECURE_OK` |
| **ops** | Operator | EXTFMAP · live customer soak → enforce |
| **brand** | Site | proof.html bar copy (recorded traffic) |

## Honesty (do not force-fill)

Nest DI / LiveView / Flutter / onion / WebSocket duplex = catalogued residuals.  
No synthetic customer soak traffic.

## Closed

| ID | Note |
| --- | --- |
| convert-tip-1.0.23 | `26b54df6` |
| secure-tip-1.0.23 | `87aa654` |
| 1.0.23 UI island contracts | `9ecc691` |
| WebSocket | kept hole |
