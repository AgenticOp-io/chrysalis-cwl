# Chrysalis sync BOARD (git SoR in CWL)

**Updated:** 2026-08-21 · tip **1.0.25** · tip-pin asks **open** · PRs to main requested  
**Protocol:** [`PROTOCOL.md`](./PROTOCOL.md) · [`COORDINATOR.md`](./COORDINATOR.md)  
**Queue:** [`../history/DNA-BUILD-NEXT.md`](../history/DNA-BUILD-NEXT.md)

```text
FLEET_MODE: on
CWL_FLEET_IDLE: no
DISPATCH: convert-tip-1.0.25 · secure-tip-1.0.25
CONVERT_NEXT: pin 1.0.25 + keep traffic-decides-bar; honest redirect/error peels
SECURE_NEXT: pin 1.0.25 + keep traffic-decides-bar; ops soak residual
```

## Tips / pins

| Surface | Value |
| --- | --- |
| **CWL tip** | **`1.0.25`** — emit reverse load redirect/error |
| Convert | tip pin **open** (was ≡ 1.0.24) |
| Secure | tip pin **open** (was ≡ 1.0.24) · soak = ops |

## Latest SHAs

| Pillar | Branch | SHA | Note |
| --- | --- | --- | --- |
| **CWL** | `candidate/cwl-ingest-matrix-comment-fix` | *(this tip)* | 1.0.25 |
| **Convert** | `candidate/wptp-convert-orbit` | `74133d97` | awaiting 1.0.25 pin |
| **Secure** | `candidate/live-match-step4` | `6f6f3dd` | awaiting 1.0.25 pin |

## Who builds next

| Priority | Owner | Work |
| --- | --- | --- |
| **P0** | **Convert** | tip **1.0.25** → `CONVERT_TIP_1_0_25_OK` + next steps in OUTBOX |
| **P0** | **Secure** | tip **1.0.25** → `SECURE_TIP_1_0_25_OK` + next steps in OUTBOX |
| **ops** | Operator | EXTFMAP · live customer soak → enforce |
| **human** | Merge | PR candidate → **main** (agents do not push main) |
| **done** | CWL | 1.0.24 DNA bridge · 1.0.25 emit reverse |

## Honesty (do not force-fill)

Nest DI / LiveView / Flutter / onion / WebSocket duplex = catalogued residuals.  
No synthetic customer soak traffic.

## Closed

| ID | Note |
| --- | --- |
| convert-tip-1.0.24 | `74133d97` |
| secure-tip-1.0.24 | `6f6f3dd` |
| 1.0.24 DNA bridge surfaces | gold `34` |
| convert-traffic-decides-bar | `5d9c39b4` |
| secure-traffic-decides-bar | `7db986f` |
| WebSocket | kept hole |
