# Chrysalis sync BOARD (git SoR in CWL)

**Updated:** 2026-08-11 · Schema-drift done · static-smoke pack next · public-claim in flight  
**Protocol:** [`PROTOCOL.md`](./PROTOCOL.md) · [`COORDINATOR.md`](./COORDINATOR.md)

```text
FLEET_MODE: on
CWL_FLEET_IDLE: no
DISPATCH: task-agents
```

## Latest SHAs

| Pillar | Branch | SHA | Note |
| --- | --- | --- | --- |
| **CWL** | `candidate/cwl-ingest-matrix-comment-fix` | *(flush)* | coordinator |
| **Convert** | `candidate/wptp-convert-orbit` | `f486a0be` | public-claim **dispatched** |
| **Secure** | `candidate/live-match-step4` | `a6fca96` | schema-drift **done** |

## Who builds next

| Priority | Owner | Work | Ask |
| --- | --- | --- | --- |
| **P0** | **Convert** | Public claim (in flight) | `convert-public-claim` |
| **P1** | **Secure** | Static DNA smoke pack harden | `secure-static-smoke-pack` **open** |

## Closed recently

| ID | Note |
| --- | --- |
| secure-schema-drift-pack | `a6fca96` / `SCHEMA_DRIFT_SMOKE_OK` |
| convert-oss-scrub | `f486a0be` |
| secure-sign-fixture | `a75255b` |
