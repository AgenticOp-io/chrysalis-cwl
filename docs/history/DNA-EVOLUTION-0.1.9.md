# DNA evolution — 0.1.9 (private-first authoring)

**North star:** CWL as the genetic identity of web programs (see pillar constitution).  
**Constraint:** Chrysalis pillars stay **private** ([PRIVATE-PILLARS.md](./PRIVATE-PILLARS.md)). No public Marketplace / public npm until human reopens.

## Sequence

| Stage | Work | Owner | 0.1.9 |
| --- | --- | --- | --- |
| P0 | Repos private: `chrysalis-cwl`, `chrysalis` (Convert), `chrysalis-security` | Orchestrator | Done |
| A | Editor push-diagnostics from `cwl-diagnose` + format DocumentProvider | CWL | This slice |
| B | Diagnose/fmt `--stdin` for unsaved buffers | CWL | This slice |
| C | LSP map gate (`test:cwl-lsp-map`) | CWL | This slice |
| D | Private-first publish docs | CWL | This slice |
| E | WebIR physical flip | Convert | Requested — [`DNA-STEP-E-WEBIR.md`](./DNA-STEP-E-WEBIR.md) |
| F | Minimal stdio Language Server (diagnose/fmt/cheap hover) | CWL | Done in **0.1.10** (`cwl-lsp-server.mjs`); completion/rename still later |
| G | Convert gravity / Secure cutover default | Convert / Secure | Requested |

## Step G handoffs (Requested)

| Sibling | Doc | One-line ask |
| --- | --- | --- |
| **Convert** | [CONVERT-GRAVITY-REQUESTED.md](./CONVERT-GRAVITY-REQUESTED.md) | Every peel/emit lands honest CWL; consume junctions + `hub:cwl-helix-cutover-smoke` after `0.1.9+` |
| **Secure** | [SECURE-CUTOVER-REQUESTED.md](./SECURE-CUTOVER-REQUESTED.md) | Cutover default = live DNA vs CWL surface (RFC-0022/0023); no grammar fork |

## Honesty

- 0.1.9 is **editor diagnostics v0**, not a full LSP protocol server.
- Package stays `"private": true`. Exit 1.0 = private registry pin path by default.
