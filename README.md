# Chrysalis Web Language (CWL) — DNA of the web

**Rosetta Stone** of web-app meaning · tongue for the **Universal Translator** (Convert) · heritable **DNA** for emit and Secure bridges.

This repo **owns the genome**. Convert translates into/out of it. Secure may bridge to it. Neither redefines it.

## Chrysalis (open source)

| Pillar | Repository | Role |
|--------|------------|------|
| **CWL** | [**chrysalis-cwl**](https://github.com/AgenticOp-io/chrysalis-cwl) | Chrysalis Web Language — DNA of the web |
| **Convert** | [**chrysalis**](https://github.com/AgenticOp-io/chrysalis) | Universal Translator — origin → WebIR/CWL → emit |
| **Secure** | [**chrysalis-security**](https://github.com/AgenticOp-io/chrysalis-security) | Helix DNA firewall — allow only what certified traffic proves |

**Tip:** see [`LANGUAGE_VERSION.md`](./LANGUAGE_VERSION.md) (currently **1.0.51**). Phase 1.x deepen continues — RFCs **0001–0033**, language golds `01`–`59`.

**Start here:** [`docs/language/CWL-HOWTO.md`](./docs/language/CWL-HOWTO.md) · [`docs/language/CWL-PILLAR-HOME.md`](./docs/language/CWL-PILLAR-HOME.md) · [`docs/language/ROSETTA-UT-PATH.md`](./docs/language/ROSETTA-UT-PATH.md) · [`docs/language/CWL-LANGUAGE-SCOPE.md`](./docs/language/CWL-LANGUAGE-SCOPE.md)

## Direction

| Metaphor | Means | Owner |
| --- | --- | --- |
| **Rosetta** | One app meaning ↔ CWL / WebIR | **This repo** |
| **Universal Translator** | Hear origin stacks → speak emit targets | **Convert** (`AgenticOp-io/chrysalis`) |
| **DNA of the web** | What the web app *is* (routes, pages, data, UI, effects, holes) | **CWL genome** |

CWL is **not** a universal programming language and **not** “PHP migration syntax.” Convert peels may hear PHP, Express, Go, Java, COBOL layouts, etc. — they **map into** this genome or leave catalogued holes. Secure’s out-of-box path is **traffic DNA**; any CWL bridge must match this tip.

## What’s here

| Path | Role |
|------|------|
| `LANGUAGE_VERSION.md` | Language semver (tip) |
| `CHANGELOG.md` | Language deltas |
| `docs/language/CWL-HOWTO.md` | Install & use |
| `docs/language/CWL-PILLAR-HOME.md` | Constitution |
| `docs/language/CWL-PUBLISH.md` | GitHub Packages `@agenticop-io/cwl` + sibling pins |
| `docs/language/CWL-CLI.md` | Authoring CLI |
| `docs/language/CWL.md` | Language reference |
| `docs/language/CWL-RFC.md` | RFC index (**0001–0033**) |
| `docs/language/CWL-SURFACE-TAXONOMY.md` | Named surfaces |
| `docs/history/DNA-BUILD-NEXT.md` | Phase 1.x deepen queue |
| `docs/history/ROADMAP.md` | Pillar roadmap |
| `docs/pillar-sync/` | Sibling BOARD / OUTBOX (Convert · Secure) |
| `fixtures/language-gold/` | Golden `.cwl` fixtures (`01`–`56`) |
| `packages/cwl` | Language package surface |
| `packages/runtime-cwl*` | Runtimes |
| `packages/emit-runtime-cwl` | Emit deployable projects |
| `packages/webir` | WebIR (homeable here; Convert reverse-pins) |
| `scripts/hub-ingest/cwl-*.mjs` | Parser, print, diagnose, ingest, emit helpers |
| `scripts/gate-cwl-*.mjs` | Language gates |

## CLI

[`docs/language/CWL-CLI.md`](./docs/language/CWL-CLI.md). Packable bin has no WebIR; pillar `emit-check` / `fmt --webir` need `npm run build:webir`.

```bash
npm run cwl -- parse fixtures/language-gold/01-literals/routes.cwl
npm run cwl -- check fixtures/language-gold
npm run cwl -- emit-check fixtures/language-gold/56-db-table-name/routes.cwl
npm run check -- path/to/file-or-dir.cwl
```

## Gates and Convert mirrors

Sibling checkout: `../chrysalis-convert` (GitHub: `AgenticOp-io/chrysalis`). Sync: [`CWL-PILLAR-HOME` §7](./docs/language/CWL-PILLAR-HOME.md#7-sync-protocol-convert-mirrors).

```bash
npm run build:webir
CWL_REQUIRE_WEBIR=1 npm run test:language
npm run smoke:cwl-emit
npm run setup:mirrors
npm run sync:convert
npm run test:cwl-mirrors
```

## Laws

- Honest **holes** — never silent invention  
- CWL ↔ WebIR without lossy “regex lift” as authority  
- Version breaking language changes  
- Judge as a **language / genome** (RFCs, fixtures, tooling), not one customer POC  

Portfolio: [`AgenticOps/docs/THREE_PILLARS.md`](../../docs/THREE_PILLARS.md) · Org profile: [AgenticOp-io](https://github.com/AgenticOp-io)
