# Chrysalis sync BOARD (git SoR in CWL)

**Updated:** 2026-08-11 · Secure P2 done · Flutter honesty in flight · next Secure soak-preflight  
**Protocol:** [`PROTOCOL.md`](./PROTOCOL.md) · [`COORDINATOR.md`](./COORDINATOR.md)

```text
FLEET_MODE: on
CWL_FLEET_IDLE: no
DISPATCH: task-agents
```

## Latest SHAs

| Pillar | Branch | SHA | Note |
| --- | --- | --- | --- |
| **CWL** | `candidate/cwl-ingest-matrix-comment-fix` | ad605d7 | coordinator |
| **Convert** | `candidate/wptp-convert-orbit` | `588dfd34` | LiveView done; Flutter **dispatched** |
| **Secure** | `candidate/live-match-step4` | `d26c10a` | Mode B P2 **done** |

## Who builds next

| Priority | Owner | Work | Ask |
| --- | --- | --- | --- |
| **P0** | **Convert** | Flutter honesty (in flight) | `convert-flutter-honesty` |
| **P1** | **Secure** | Soak **preflight** automation (no fake traffic) | `secure-soak-preflight` **open** |

## Open / closed

| ID | Status |
| --- | --- |
| convert-flutter-honesty | **open** (dispatched) |
| secure-soak-preflight | **open** |
| secure-mode-b-phase2 | **done** `d26c10a` |
| convert-liveview-honesty | **done** `588dfd34` / G10128 |
