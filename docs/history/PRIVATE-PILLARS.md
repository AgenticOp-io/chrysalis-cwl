# Pillar & platform GitHub visibility (2026-09-22)

Chrysalis-related GitHub repositories under **AgenticOp-io** are **public**.

## Chrysalis (open source)

| Pillar | Repository | Role |
|--------|------------|------|
| **CWL** | [**chrysalis-cwl**](https://github.com/AgenticOp-io/chrysalis-cwl) | Chrysalis Web Language — DNA of the web |
| **Convert** | [**chrysalis**](https://github.com/AgenticOp-io/chrysalis) | Universal Translator — origin → WebIR/CWL → emit |
| **Secure** | [**chrysalis-security**](https://github.com/AgenticOp-io/chrysalis-security) | Helix DNA firewall — allow only what certified traffic proves |

Local sibling checkouts: `engines/chrysalis-cwl`, `engines/chrysalis-convert` (junction `PHP_converter`), `engines/chrysalis-security`.

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

**Direction:** CWL owns the genome; Convert is the Universal Translator (not “PHP-only”); Secure is Helix traffic DNA. Org profile: [github.com/AgenticOp-io](https://github.com/AgenticOp-io).

Historical private-first posture (Aug 2026) is superseded.
