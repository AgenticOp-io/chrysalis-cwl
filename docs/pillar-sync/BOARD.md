# Chrysalis sync BOARD (git SoR in CWL)

**Updated:** 2026-08-21 · tip **1.0.25** · tip pins **closed** · merge via PR (no agent push to main)  
**Protocol:** [`PROTOCOL.md`](./PROTOCOL.md) · [`COORDINATOR.md`](./COORDINATOR.md)  
**Queue:** [`../history/DNA-BUILD-NEXT.md`](../history/DNA-BUILD-NEXT.md)

```text
FLEET_MODE: on
CWL_FLEET_IDLE: yes
DISPATCH: standing sibling next (see OUTBOX) · ops soak residual · human merge PRs→main
CONVERT_NEXT: traffic-decides keep-green · honest redirect/error peels
SECURE_NEXT: bridge annotation honor · ops EXTFMAP/soak
```

## Tips / pins

| Surface | Value |
| --- | --- |
| **CWL tip** | **`1.0.25`** |
| Convert | file: ≡ **1.0.25** |
| Secure | file: ≡ **1.0.25** · soak = ops |

## Latest SHAs

| Pillar | Branch | SHA | Note |
| --- | --- | --- | --- |
| **CWL** | `candidate/cwl-ingest-matrix-comment-fix` | `83f4d7e` | tip 1.0.25 |
| **Convert** | `candidate/wptp-convert-orbit` | `cf5fbd1a` | `CONVERT_TIP_1_0_25_OK` |
| **Secure** | `candidate/live-match-step4` | `67fd171` | `SECURE_TIP_1_0_25_OK` |

## Who builds next

| Priority | Owner | Work |
| --- | --- | --- |
| **standing** | Convert | keep traffic-decides-bar; honest redirect/error peels |
| **standing** | Secure | honor `cwl_stream`/multipart in cutover; ops soak |
| **ops** | Operator | EXTFMAP · live customer soak → enforce |
| **human** | Merge | [CWL #1](https://github.com/AgenticOp-io/chrysalis-cwl/pull/1) · [Convert #67](https://github.com/AgenticOp-io/chrysalis/pull/67) · [Secure #12](https://github.com/AgenticOp-io/chrysalis-security/pull/12) |
| **done** | All | tip 1.0.25 pins |

## Honesty (do not force-fill)

Nest DI / LiveView / Flutter / onion / WebSocket duplex = catalogued residuals.  
No synthetic customer soak traffic.

## Closed

| ID | Note |
| --- | --- |
| convert-tip-1.0.25 | `cf5fbd1a` |
| secure-tip-1.0.25 | `67fd171` |
| 1.0.25 emit reverse | `83f4d7e` |
| convert-tip-1.0.24 | `74133d97` |
| secure-tip-1.0.24 | `6f6f3dd` |
| traffic-decides agent bar | Convert + Secure |
| WebSocket | kept hole |
