# Chrysalis Web Language (CWL) — THE language of the web

**CWL · Convert · Secure** — this repo **owns** CWL. Convert translates into/out of it. Secure bridges to it. Neither redefines it.

**Start here:** [`docs/language/CWL-PILLAR-HOME.md`](./docs/language/CWL-PILLAR-HOME.md)

## What’s here

| Path | Role |
|------|------|
| `LANGUAGE_VERSION.md` | Language semver + compatibility |
| `CHANGELOG.md` | Language deltas |
| `docs/language/CWL-PILLAR-HOME.md` | Constitution — ownership, sync, completeness |
| `docs/language/CWL-CLI.md` | Authoring CLI (`parse` / `print` / `fmt` / `diagnose` / `check`) |
| `docs/language/CWL.md` | Language reference |
| `docs/language/CWL-RFC.md` | RFC index (0001–0021) |
| `docs/language/CWL-SURFACE-TAXONOMY.md` | Named surfaces |
| `docs/history/ROADMAP.md` | Phased plan to 1.0 |
| `fixtures/language-gold/` | Golden `.cwl` fixtures |
| `packages/cwl` | Language package surface |
| `packages/runtime-cwl*` | Runtimes |
| `packages/emit-runtime-cwl` | Emit deployable projects |
| `scripts/hub-ingest/cwl-*.mjs` | Parser, print, fmt, diagnose, ingest helpers |
| `scripts/gate-cwl-*.mjs` | Language gates |
| `scripts/sync-to-convert.mjs` | Mirror sync into convert |

## CLI

Authoring commands (no WebIR): [`docs/language/CWL-CLI.md`](./docs/language/CWL-CLI.md)

```bash
npm run cwl -- parse fixtures/language-gold/01-literals/routes.cwl
npm run cwl -- check fixtures/language-gold
npm run check -- path/to/file-or-dir.cwl
```

## Gates

```bash
npm run test:language    # round-trip + diagnose
npm run sync:convert     # push parser/print/ui mirrors to ../chrysalis-convert
```


## Laws (language)

- Honest **holes** — never silent invention  
- CWL ↔ WebIR without lossy “regex lift” as the authority path  
- Version breaking language changes  
- Judge work as a **language** (spec, fixtures, tooling), not a single customer POC  

Portfolio: `AgenticOps/docs/THREE_PILLARS.md`
