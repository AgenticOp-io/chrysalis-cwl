# Chrysalis sync BOARD (git SoR in CWL)

**Updated:** 2026-08-11 · Fleet **RE-ARMED** — build loop (not idle standby)  
**Protocol:** [`PROTOCOL.md`](./PROTOCOL.md) · [`COORDINATOR.md`](./COORDINATOR.md)

```text
FLEET_MODE: on
CWL_FLEET_IDLE: no
COMMIT_CADENCE: 5m tick flush
BUILD_LOOP: on — coordinator posts next ask when siblings finish; do not idle on heartbeat alone
```

## Tips / pins

| Surface | Value |
| --- | --- |
| **CWL tip** | **`1.0.17`** — invent queue **CLOSED** (hygiene/coordinator only) |
| Convert pin | `file:../chrysalis-cwl/packages/cwl` ≡ 1.0.17 |
| Secure pin | `@agenticop-io/cwl@^1.0.17` |

## Latest SHAs

| Pillar | Branch | SHA | Note |
| --- | --- | --- | --- |
| **CWL** | `candidate/cwl-ingest-matrix-comment-fix` | 1ca6010 | re-armed |
| **Convert** | `candidate/wptp-convert-orbit` | `8355f992` | was standby — new ask open |
| **Secure** | `candidate/live-match-step4` | `191cd19` | was idle-stop — new ask open |

## Who builds next

| Priority | Owner | Work | Ask ID |
| --- | --- | --- | --- |
| **P0** | **Convert** | Charter: Phoenix LiveView **honesty** (catalog + gold skips; **no** LiveView runtime invent) | `convert-liveview-honesty` |
| **P1** | **Secure** | Mode B **Phase 2** sketch (docs + tiny dual-NIC/lab prove; Phase 1 already boring on GCE) | `secure-mode-b-phase2` |
| **—** | **CWL** | Coordinator ticks; tip only on INBOX contract gaps | — |

## Open cross-asks

| ID | From → To | Status |
| --- | --- | --- |
| convert-liveview-honesty | CWL → Convert | **open** |
| secure-mode-b-phase2 | CWL → Secure | **open** |

## Closed recently

| ID | Note |
| --- | --- |
| convert/secure fleet-standby | closed — wrong stop; re-armed with build asks |
| secure-gce-l2-prove | `6c2d624` |
| convert G10127 | `af72d8ae` |
| cwl-dna-queue | CLOSED @ 1.0.17 |
