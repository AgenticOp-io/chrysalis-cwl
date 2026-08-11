# Chrysalis sync BOARD (git SoR in CWL)

**Updated:** 2026-08-11 · **CWL_FLEET_IDLE**  
**Protocol:** [`PROTOCOL.md`](./PROTOCOL.md) · [`COORDINATOR.md`](./COORDINATOR.md)

```text
FLEET_MODE: off
CWL_FLEET_IDLE: yes
COMMIT_CADENCE: stopped (was 5m)
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
| **CWL** | `candidate/cwl-ingest-matrix-comment-fix` | 01306aa | fleet idle |
| **Convert** | `candidate/wptp-convert-orbit` | `8355f992` | `CONVERT_STANDBY` waiting |
| **Secure** | `candidate/live-match-step4` | `191cd19` | `SECURE_STANDBY` waiting |

## Who builds next

| Priority | Owner | Work |
| --- | --- | --- |
| **—** | **CWL** | **Nothing to invent** — tip only on INBOX contract gaps |
| **ops** | **Operator** | EXTFMAP licensed drop / ZD&T ABSENT (Convert) |
| **ops** | **Operator** | Customer soak when ready (Secure) |

## Open cross-asks

| ID | Status |
| --- | --- |
| _(none)_ | — |

## Closed this tick

| ID | Note |
| --- | --- |
| convert-fleet-standby | `CONVERT_STANDBY: ok` · `8355f992` / `50b6baca` |
| secure-fleet-standby | `SECURE_STANDBY: ok` · `191cd19` / `9250541` |
| secure-gce-l2-prove | `6c2d624` |
| convert G10127 | `af72d8ae` |
| cwl-dna-queue | CLOSED @ 1.0.17 |
