# Chrysalis sync BOARD (git SoR in CWL)

**Updated:** 2026-08-10 · CWL `docs/pillar-sync/`  
**Protocol:** [`PROTOCOL.md`](./PROTOCOL.md)  
**Rule:** `git pull` all three engines before trusting this file; CWL refreshes SHAs after sibling pushes.

## Tips / pins

| Surface | Value |
| --- | --- |
| **CWL tip** | **`1.0.17`** — invent queue **CLOSED** |
| Convert pin | `file:../chrysalis-cwl/packages/cwl` ≡ 1.0.17 |
| Secure pin | Requested ≥ 1.0.17 + dna-seed wrap |

## Latest SHAs

| Pillar | Branch | SHA | Note |
| --- | --- | --- | --- |
| **CWL** | `candidate/cwl-ingest-matrix-comment-fix` | `181bcd2` | pillar-sync bus |
| **Convert** | `candidate/wptp-convert-orbit` | `b88c811a` | mirrors + OUTBOX ack |
| **Secure** | `candidate/live-match-step4` | `1e26c2f` | OUTBOX ack; tip wrap open |

## Who builds next

| Priority | Owner | Work | See |
| --- | --- | --- | --- |
| **P0** | **Convert** | Phase 2 prove → Phase 3 dual primary | CWL OUTBOX + Convert OUTBOX |
| **P1** | **Secure** | Tip 1.0.17 + `pathTemplateShapeEqual` wrap | CWL OUTBOX |
| **—** | **CWL** | Idle invent; maintain BOARD | — |

## Conversion suite

Owned by **Convert** (dialects, Hub, WPTP orbit, COBOL). Not CWL DNA invent.

## Open cross-asks

| ID | From → To | Status |
| --- | --- | --- |
| sync-convert-execute | CWL → Convert | **open** (Phase 1 mirrors **done**) |
| sync-secure-tip-wrap | CWL → Secure | **open** |
