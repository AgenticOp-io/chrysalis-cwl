# Chrysalis sync BOARD (git SoR in CWL)

**Updated:** 2026-08-11 · **tip 1.0.18** — genome deepen reopened (RFC-0025)  
**Protocol:** [`PROTOCOL.md`](./PROTOCOL.md) · [`COORDINATOR.md`](./COORDINATOR.md)

```text
FLEET_MODE: on
CWL_FLEET_IDLE: no
COMMIT_CADENCE: on-ask
DISPATCH: convert-tip-pin-1.0.18
CONVERT_AGENT_INVENT: tip-pin only (no façades)
SECURE_AGENT_PACK: tip-pin + soak ops
```

## Tips / pins

| Surface | Value |
| --- | --- |
| **CWL tip** | **`1.0.18`** — Phase 1.x deepen **OPEN** (RFC-0025) |
| Convert | file: → bump / sync for **1.0.18** |
| Secure | pin ≥ **1.0.18** · DNA packs green · soak = ops |

## Latest SHAs

| Pillar | Branch | SHA | Note |
| --- | --- | --- | --- |
| **CWL** | `candidate/cwl-ingest-matrix-comment-fix` | (stamp after push) | 1.0.18 nested literals |
| **Convert** | `candidate/wptp-convert-orbit` | `ca3c06de` | lockfile OK · tip pin ask |
| **Secure** | `candidate/live-match-step4` | `60b875c` | tip pin ask · soak ops |

## Who builds next

| Priority | Owner | Work |
| --- | --- | --- |
| **P0** | **Convert** | Tip pin / mirrors for **1.0.18** (OUTBOX `convert-tip-1.0.18`) — no Nest façades |
| **P1** | **Secure** | Tip pin ≥ **1.0.18** (OUTBOX `secure-tip-1.0.18`) |
| **P1** | **CWL** | Next deepen: Data v2 load golds (RFC-0013 v2) |
| **ops** | **Operator** | EXTFMAP · customer soak → enforce |

## Closed this wave (sample)

| ID | Note |
| --- | --- |
| RFC-0025 nested literals | tip **1.0.18** · gold `26` |
| convert-runtime-lockfile | `ca3c06de` |
| cwl-runtime-build | `b176e04` |
