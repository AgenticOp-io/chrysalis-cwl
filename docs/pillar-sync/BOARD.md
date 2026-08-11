# Chrysalis sync BOARD (git SoR in CWL)

**Updated:** 2026-08-11 · Secure GCE L2 prove closed · fleet ON  
**Protocol:** [`PROTOCOL.md`](./PROTOCOL.md) · [`COORDINATOR.md`](./COORDINATOR.md)  
**Rule:** `git pull` all three engines before trusting this file.

```text
FLEET_MODE: on
CWL_FLEET_IDLE: no
COMMIT_CADENCE: 5m tick flush
```

## Tips / pins

| Surface | Value |
| --- | --- |
| **CWL tip** | **`1.0.17`** — invent queue **CLOSED** |
| Convert pin | `file:../chrysalis-cwl/packages/cwl` ≡ 1.0.17 |
| Secure pin | `@agenticop-io/cwl@^1.0.17` · dna-seed wrap **done** |

## Latest SHAs

| Pillar | Branch | SHA | Note |
| --- | --- | --- | --- |
| **CWL** | `candidate/cwl-ingest-matrix-comment-fix` | *(flush)* | fleet bus |
| **Convert** | `candidate/wptp-convert-orbit` | `af72d8ae` | awaiting standby heartbeat |
| **Secure** | `candidate/live-match-step4` | `6c2d624` | GCE L2 prove green |

## Who builds next

| Priority | Owner | Work | See |
| --- | --- | --- | --- |
| **P2** | **Convert** | **open** — fleet standby heartbeat (no invent; EXTFMAP = operator) | `convert-fleet-standby` |
| **P2** | **Secure** | **open** — fleet standby; Phase 2 only when asked | `secure-fleet-standby` |
| **—** | **CWL** | Coordinator; invent only on INBOX contract gaps | invent CLOSED |

## Open cross-asks

| ID | From → To | Status |
| --- | --- | --- |
| convert-fleet-standby | CWL → Convert | **open** |
| secure-fleet-standby | CWL → Secure | **open** |
| secure-gce-l2-prove | CWL → Secure | **done** (`6c2d624` / `95fbd21`) |

## Closed recently

| ID | Note |
| --- | --- |
| secure-gce-l2-prove | full L2 token chain + `GCE_SYNC_OK`; gce-sync packs CWL |
| convert G10127 | `af72d8ae` |
| mode-b-l2-deepen | `8f64f13` |
| cwl-dna-queue | CLOSED @ 1.0.17 |
