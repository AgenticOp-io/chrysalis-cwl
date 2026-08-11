# Chrysalis sync BOARD (git SoR in CWL)

**Updated:** 2026-08-11 · SIEM fixture done · cutover multi-host next · Koa L1 in flight  
**Protocol:** [`PROTOCOL.md`](./PROTOCOL.md) · [`COORDINATOR.md`](./COORDINATOR.md)

```text
FLEET_MODE: on
CWL_FLEET_IDLE: no
DISPATCH: task-agents
```

## Latest SHAs

| Pillar | Branch | SHA | Note |
| --- | --- | --- | --- |
| **CWL** | `candidate/cwl-ingest-matrix-comment-fix` | 3a95bf7 | coordinator |
| **Convert** | `candidate/wptp-convert-orbit` | `f455ed7b`+ | Koa L1 **working** |
| **Secure** | `candidate/live-match-step4` | `9af2c0e` | SIEM fixture **done** |

## Who builds next

| Priority | Owner | Work | Ask |
| --- | --- | --- | --- |
| **P0** | **Convert** | L1 Koa honesty (in flight) | `convert-l1-koa-honesty` |
| **P1** | **Secure** | Cutover multi-host profile hygiene | `secure-cutover-multihost` **open** |

## Closed recently

| ID | Note |
| --- | --- |
| secure-siem-fixture | `9af2c0e` / `SIEM_FIXTURE_OK` |
| secure-mode-a-failclosed | `48db1cf` |
| convert-l1-honest-peels | G10131 Hono |
