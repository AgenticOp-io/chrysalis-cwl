# Pillar & platform GitHub visibility (2026-09-09)

Chrysalis-related GitHub repositories under **AgenticOp-io** are **public**:

## Pillars

| Pillar | GitHub | Visibility |
| --- | --- | --- |
| CWL | [`AgenticOp-io/chrysalis-cwl`](https://github.com/AgenticOp-io/chrysalis-cwl) | **public** |
| Convert | [`AgenticOp-io/chrysalis`](https://github.com/AgenticOp-io/chrysalis) | **public** |
| Secure | [`AgenticOp-io/chrysalis-security`](https://github.com/AgenticOp-io/chrysalis-security) | **public** |

## Platforms & siblings

| Surface | GitHub | Notes |
| --- | --- | --- |
| WPTP IR | [`wptp-ir`](https://github.com/AgenticOp-io/wptp-ir) | IR hub v0 |
| WPTP adapters | [`wptp-adapter-openapi`](https://github.com/AgenticOp-io/wptp-adapter-openapi), [`wptp-adapter-browser`](https://github.com/AgenticOp-io/wptp-adapter-browser) | OpenAPI / HAR |
| WPTP emitters | [`wptp-emit-nextjs`](https://github.com/AgenticOp-io/wptp-emit-nextjs), [`wptp-emit-hono`](https://github.com/AgenticOp-io/wptp-emit-hono), [`wptp-emit-fastify`](https://github.com/AgenticOp-io/wptp-emit-fastify) | Bronze/silver emit |
| WPTP matrix | [`wptp-matrix`](https://github.com/AgenticOp-io/wptp-matrix) | Compatibility grades |
| FDE | [`fragility-discovery-engine`](https://github.com/AgenticOp-io/fragility-discovery-engine) | Research workbench |
| Ghost Museum | [`ghost-museum`](https://github.com/AgenticOp-io/ghost-museum) | Still-answering hall — do not integrate |

## Intentionally not Chrysalis OSS

| Repo | Why |
| --- | --- |
| `agenticops-web` | Marketing site may stay **private**; engines are the public surface |
| `cinderpath` / `cinderpath-enterprise` | Separate product line |
| `netbox-kuwaiba-fusion` | Separate product line |
| Patent / counsel drafts under `docs/legal/` | Stay out of public trees until counsel clears |

**npm:** Prefer GitHub Packages `@agenticop-io/cwl` (restricted) or sibling `file:` pins. **Public npm is still not the default.**

**Website:** Static HTML on `agenticop.io` — Markdown marketing notes do not auto-deploy; update HTML + `llms.txt` + `whitepaper.html` then Firebase Hosting.

Historical private-first posture (Aug 2026) is superseded.
