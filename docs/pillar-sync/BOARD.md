# Chrysalis sync BOARD (git SoR in CWL)

**Updated:** 2026-08-11 · runtimes built · Convert lockfile hygiene **done** · back to idle  
**Protocol:** [`PROTOCOL.md`](./PROTOCOL.md) · [`COORDINATOR.md`](./COORDINATOR.md)

```text
FLEET_MODE: off
CWL_FLEET_IDLE: yes
COMMIT_CADENCE: stopped
DISPATCH: stopped
CONVERT_AGENT_INVENT: exhausted
SECURE_AGENT_PACK: exhausted (customer soak = ops)
```

## Tips / pins

| Surface | Value |
| --- | --- |
| **CWL tip** | **`1.0.17`** — invent **CLOSED** |
| Convert | file: ≡ 1.0.17 · EXTFMAP = **operator** |
| Secure | ^1.0.17 · DNA packs green |

## Latest SHAs

| Pillar | Branch | SHA | Note |
| --- | --- | --- | --- |
| **CWL** | `candidate/cwl-ingest-matrix-comment-fix` | 5f09147 | typeRoots + bus; tip 1.0.17 |
| **Convert** | `candidate/wptp-convert-orbit` | `ca3c06de` | `CONVERT_RUNTIME_LOCKFILE_OK` |
| **Secure** | `candidate/live-match-step4` | `60b875c` | static-smoke **done** |

## Who builds next

| Priority | Owner | Work |
| --- | --- | --- |
| **ops** | **Operator** | EXTFMAP licensed drop / ZD&T ABSENT |
| **ops** | **Operator** | Real customer soak → enforce |
| **—** | **CWL / agents** | Idle — tip only on INBOX contract gaps |

## Closed this wave (sample)

| ID | Note |
| --- | --- |
| convert-runtime-lockfile | `ca3c06de` · recursive runtime build via pnpmfile |
| cwl-runtime-build | `b176e04` · runtime-cwl matrix + tsc |
| secure-static-smoke-pack | `60b875c` |
| convert-public-claim | `3c6a62e3` |

Re-arm: set `FLEET_MODE: on` / `CWL_FLEET_IDLE: no`, open OUTBOX asks, dispatch Task agents.
