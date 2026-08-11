# Chrysalis sync BOARD (git SoR in CWL)

**Updated:** 2026-08-11 · OSS scrub done · public-claim next · schema-drift finishing  
**Protocol:** [`PROTOCOL.md`](./PROTOCOL.md) · [`COORDINATOR.md`](./COORDINATOR.md)

```text
FLEET_MODE: on
CWL_FLEET_IDLE: no
DISPATCH: task-agents
```

## Latest SHAs

| Pillar | Branch | SHA | Note |
| --- | --- | --- | --- |
| **CWL** | `candidate/cwl-ingest-matrix-comment-fix` | *(flush)* | tick 6 |
| **Convert** | `candidate/wptp-convert-orbit` | `f486a0be` | OSS scrub **done** |
| **Secure** | `candidate/live-match-step4` | `a75255b`+ | schema-drift **finishing** |

## Who builds next

| Priority | Owner | Work | Ask |
| --- | --- | --- | --- |
| **P0** | **Convert** | Public engine claim checklist harden | `convert-public-claim` **open** |
| **P1** | **Secure** | Schema-drift pack (in flight) | `secure-schema-drift-pack` |

## Closed recently

| ID | Note |
| --- | --- |
| convert-oss-scrub | `f486a0be` / `OSS_SCRUB_OK` |
| convert-pilot-kit | `098efbd1` |
| secure-sign-fixture | `a75255b` |
