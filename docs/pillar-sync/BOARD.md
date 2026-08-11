# Chrysalis sync BOARD (git SoR in CWL)

**Updated:** 2026-08-11 · Fleet mode ON · scheduled commits every 5m  
**Protocol:** [`PROTOCOL.md`](./PROTOCOL.md) · [`COORDINATOR.md`](./COORDINATOR.md)  
**Rule:** `git pull` all three engines before trusting this file; CWL refreshes SHAs after sibling pushes.

```text
FLEET_MODE: on
CWL_FLEET_IDLE: no
COMMIT_CADENCE: 5m tick flush (2m if P0 open)
```

## Tips / pins

| Surface | Value |
| --- | --- |
| **CWL tip** | **`1.0.17`** — invent queue **CLOSED** |
| Convert pin | `file:../chrysalis-cwl/packages/cwl` ≡ 1.0.17 |
| Secure pin | `@agenticop-io/cwl@^1.0.17` (resolved 1.0.17) · dna-seed wrap **done** |

## Latest SHAs

| Pillar | Branch | SHA | Note |
| --- | --- | --- | --- |
| **CWL** | `candidate/cwl-ingest-matrix-comment-fix` | *(flush stamp)* | fleet bus |
| **Convert** | `candidate/wptp-convert-orbit` | `af72d8ae` | G10127 EXTFMAP honesty |
| **Secure** | `candidate/live-match-step4` | `8f64f13` | Mode B L2 deepen |

## Who builds next

| Priority | Owner | Work | See |
| --- | --- | --- | --- |
| **P1** | **Secure** | **open** — GCE prove L2 deepen tokens (`gce-sync -WithL2`) | OUTBOX `secure-gce-l2-prove` |
| **P2** | **Convert** | **open** — fleet standby heartbeat only (EXTFMAP = operator) | OUTBOX `convert-fleet-standby` |
| **—** | **CWL** | Coordinator ticks; invent only on INBOX contract gaps | COORDINATOR.md |

## Open cross-asks

| ID | From → To | Status |
| --- | --- | --- |
| secure-gce-l2-prove | CWL → Secure | **open** |
| convert-fleet-standby | CWL → Convert | **open** (heartbeat / no invent) |
| sync-convert-execute | CWL → Convert | **done** (`bc7d43e2`) |
| convert-dual-primary-extfmap | BOARD → Convert | honesty **done**; operator close still open |
| sync-secure-tip-wrap | CWL → Secure | **done** |
| mode-b-l2-deepen | user → Secure | **done** (`8f64f13`) |

## Closed recently

| ID | Note |
| --- | --- |
| convert G10127 | `af72d8ae` · `EXTFMAP_RESIDUAL_HONEST_OK` |
| mode-b-l2-deepen | `8f64f13` |
| cwl-dna-queue | CLOSED @ 1.0.17 |
