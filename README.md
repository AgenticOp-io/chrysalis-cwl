# Chrysalis Web Language (CWL) — THE language of the web

**CWL · Convert · Secure** — this repo **owns** CWL. Convert translates into/out of it. Secure bridges to it. Neither redefines it.

**Start here:** [`docs/language/CWL-PILLAR-HOME.md`](./docs/language/CWL-PILLAR-HOME.md)

## What’s here

| Path | Role |
|------|------|
| `LANGUAGE_VERSION.md` | Language semver + compatibility |
| `CHANGELOG.md` | Language deltas |
| `docs/language/CWL-PILLAR-HOME.md` | Constitution — ownership, sync, completeness |
| `docs/language/CWL-PUBLISH.md` | Publish later + Convert/Secure pin (`file:` vs registry) — Phase 1.0 prep |
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
| `scripts/sync-to-convert.mjs` | Copy mirrors into convert when not already linked |
| `scripts/setup-convert-mirrors.mjs` | Recreate convert→cwl file symlinks (six always-sync) |
| `scripts/gate-cwl-mirrors.mjs` | Fail if convert mirrors diverge and are not reparse points |

## CLI

Authoring commands (no WebIR): [`docs/language/CWL-CLI.md`](./docs/language/CWL-CLI.md)

```bash
npm run cwl -- parse fixtures/language-gold/01-literals/routes.cwl
npm run cwl -- check fixtures/language-gold
npm run check -- path/to/file-or-dir.cwl
```

## Gates and convert mirrors

Sibling checkout: `../chrysalis-convert`. Full sync story: [`CWL-PILLAR-HOME` §7](./docs/language/CWL-PILLAR-HOME.md#7-sync-protocol-convert-mirrors).

```bash
npm run test:language     # round-trip + diagnose (+ DNA bridge)
npm run setup:mirrors     # one-shot: recreate convert→cwl file symlinks (not fmt/ingest)
npm run sync:convert      # copy when dest is a plain file; no-op if already a reparse point
npm run test:cwl-mirrors  # hashes match OR convert path is a reparse point
```

Fresh clone: run `setup:mirrors` (Windows Developer Mode / file-symlink rights). CI without symlink privilege: `sync:convert` then `test:cwl-mirrors`. See `core.symlinks` notes in the pillar home.


## Laws (language)

- Honest **holes** — never silent invention  
- CWL ↔ WebIR without lossy “regex lift” as the authority path  
- Version breaking language changes  
- Judge work as a **language** (spec, fixtures, tooling), not a single customer POC  

Portfolio: `AgenticOps/docs/THREE_PILLARS.md`
