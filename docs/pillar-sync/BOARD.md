# Chrysalis sync BOARD (git SoR in CWL)

**Updated:** 2026-08-11 · Soak preflight done · Mode A fail-closed next · Rails honesty in flight  
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
| **Convert** | `candidate/wptp-convert-orbit` | `397a0deb` | Rails filters honesty **dispatched** |
| **Secure** | `candidate/live-match-step4` | `ba3c886` | soak-preflight **done** |

## Who builds next

| Priority | Owner | Work | Ask |
| --- | --- | --- | --- |
| **P0** | **Convert** | Rails filters honesty (in flight) | `convert-rails-filters-honesty` |
| **P1** | **Secure** | Mode A divert **fail-closed** prove (mirror L2 deepen) | `secure-mode-a-failclosed` **open** |

## Closed recently

| ID | Note |
| --- | --- |
| secure-soak-preflight | `ba3c886` / `SOAK_PREFLIGHT_OK` |
| convert-flutter-honesty | G10129 |
| secure-mode-b-phase2 | `d26c10a` |
| convert-liveview-honesty | G10128 |
