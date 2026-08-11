# Chrysalis sync BOARD (git SoR in CWL)

**Updated:** 2026-08-11 · Public claim done · Convert agent invent exhausted · Secure static in flight  
**Protocol:** [`PROTOCOL.md`](./PROTOCOL.md) · [`COORDINATOR.md`](./COORDINATOR.md)

```text
FLEET_MODE: on
CWL_FLEET_IDLE: no
DISPATCH: task-agents
CONVERT_AGENT_INVENT: exhausted (EXTFMAP = operator only)
```

## Latest SHAs

| Pillar | Branch | SHA | Note |
| --- | --- | --- | --- |
| **CWL** | `candidate/cwl-ingest-matrix-comment-fix` | ab56b35 | coordinator |
| **Convert** | `candidate/wptp-convert-orbit` | `3c6a62e3` | public-claim **done** · waiting operator EXTFMAP |
| **Secure** | `candidate/live-match-step4` | `a6fca96`+ | static-smoke **working** |

## Who builds next

| Priority | Owner | Work | Ask |
| --- | --- | --- | --- |
| **ops** | **Operator / Convert** | EXTFMAP licensed drop or ZD&T ABSENT | EXTFMAP-RESIDUAL.md |
| **P1** | **Secure** | Static smoke pack (in flight) | `secure-static-smoke-pack` |
| **—** | **Convert agent** | **No invent dispatch** until operator EXTFMAP or new charter | — |

## Closed recently

| ID | Note |
| --- | --- |
| convert-public-claim | `3c6a62e3` / `PUBLIC_CLAIM_OK` |
| convert-oss-scrub | `f486a0be` |
| secure-schema-drift-pack | `a6fca96` |
