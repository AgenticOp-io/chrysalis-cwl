# Chrysalis sync BOARD (git SoR in CWL)

**Updated:** 2026-08-11 · build-loop tick — Convert LiveView done; next Flutter; Secure P2 in flight  
**Protocol:** [`PROTOCOL.md`](./PROTOCOL.md) · [`COORDINATOR.md`](./COORDINATOR.md)

```text
FLEET_MODE: on
CWL_FLEET_IDLE: no
COMMIT_CADENCE: 5m
BUILD_LOOP: on
DISPATCH: task-agents (no human paste)
```

## Tips / pins

| Surface | Value |
| --- | --- |
| **CWL tip** | **`1.0.17`** — invent CLOSED |
| Convert pin | `file:` ≡ 1.0.17 |
| Secure pin | `^1.0.17` |

## Latest SHAs

| Pillar | Branch | SHA | Note |
| --- | --- | --- | --- |
| **CWL** | `candidate/cwl-ingest-matrix-comment-fix` | *(flush)* | coordinator |
| **Convert** | `candidate/wptp-convert-orbit` | `588dfd34` | G10128 LiveView honesty **done** |
| **Secure** | `candidate/live-match-step4` | `39dbaf0`+ | Mode B P2 **working** (uncommitted) |

## Who builds next

| Priority | Owner | Work | Ask |
| --- | --- | --- | --- |
| **P0** | **Convert** | Flutter **honesty** catalog (no Flutter runtime invent) | `convert-flutter-honesty` **open** |
| **P1** | **Secure** | Mode B Phase 2 (in flight) | `secure-mode-b-phase2` **open** |

## Open cross-asks

| ID | Status |
| --- | --- |
| convert-flutter-honesty | **open** |
| secure-mode-b-phase2 | **open** (worker dirty tree) |
| convert-liveview-honesty | **done** (`588dfd34` / G10128) |
