# Chrysalis sync BOARD (git SoR in CWL)

**Updated:** 2026-08-11 · Pilot Kit + sign fixture done · next OSS scrub + schema-drift pack  
**Protocol:** [`PROTOCOL.md`](./PROTOCOL.md) · [`COORDINATOR.md`](./COORDINATOR.md)

```text
FLEET_MODE: on
CWL_FLEET_IDLE: no
DISPATCH: task-agents
```

## Latest SHAs

| Pillar | Branch | SHA | Note |
| --- | --- | --- | --- |
| **CWL** | `candidate/cwl-ingest-matrix-comment-fix` | 3146957 | coordinator |
| **Convert** | `candidate/wptp-convert-orbit` | `098efbd1` | Pilot Kit **done** |
| **Secure** | `candidate/live-match-step4` | `a75255b` | sign fixture **done** |

## Who builds next

| Priority | Owner | Work | Ask |
| --- | --- | --- | --- |
| **P0** | **Convert** | OSS scrub tracked-tree gate maintain (G10109) | `convert-oss-scrub` **open** |
| **P1** | **Secure** | Schema-drift smoke pack/docs harden | `secure-schema-drift-pack` **open** |

## Closed recently

| ID | Note |
| --- | --- |
| convert-pilot-kit | `098efbd1` / `PILOT_KIT_OK` |
| secure-sign-fixture | `a75255b` / `SIGN_FIXTURE_OK` |
| convert-nest-di-honesty | G10136 |
| secure-gce-smoke-pack | `3c2c154` |
