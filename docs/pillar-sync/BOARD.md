# Chrysalis sync BOARD (git SoR in CWL)

**Updated:** 2026-08-11 · Reload fixture done · GCE smoke pack next · Polka L1 in flight  
**Protocol:** [`PROTOCOL.md`](./PROTOCOL.md) · [`COORDINATOR.md`](./COORDINATOR.md)

```text
FLEET_MODE: on
CWL_FLEET_IDLE: no
DISPATCH: task-agents
```

## Latest SHAs

| Pillar | Branch | SHA | Note |
| --- | --- | --- | --- |
| **CWL** | `candidate/cwl-ingest-matrix-comment-fix` | 97b027c | coordinator |
| **Convert** | `candidate/wptp-convert-orbit` | `56d0b585` | Polka L1 **dispatched** |
| **Secure** | `candidate/live-match-step4` | `28b8971` | reload fixture **done** |

## Who builds next

| Priority | Owner | Work | Ask |
| --- | --- | --- | --- |
| **P0** | **Convert** | L1 Polka honesty (in flight) | `convert-l1-polka-honesty` |
| **P1** | **Secure** | Wire soak/siem/reload into GCE/DNA smoke pack | `secure-gce-smoke-pack` **open** |

## Closed recently

| ID | Note |
| --- | --- |
| secure-reload-fixture | `28b8971` / `RELOAD_FIXTURE_OK` |
| convert-l1-restify-honesty | G10134 |
| secure-cutover-multihost | `ce853ff` |
