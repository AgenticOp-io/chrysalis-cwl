# Chrysalis Web Language (CWL) — language pillar

**CWL · Convert · Secure** — this repo is the **CWL** pillar. Mature the language here.

Convert (`../chrysalis-convert`) and Secure (`../chrysalis-security`) consume CWL; they do not own the language’s north star.

## What’s here

| Path | Role |
|------|------|
| `LANGUAGE_VERSION.md` | Language version + compatibility rules |
| `fixtures/language-gold/` | Golden `.cwl` fixtures (parse→print) |
| `packages/cwl` | Language package surface / README |
| `packages/runtime-cwl` | In-process CWL runtime |
| `packages/runtime-cwl-browser` | Browser runtime |
| `packages/runtime-cwl-worker` | Worker runtime |
| `packages/emit-runtime-cwl` | Emit deployable CWL/Node projects |
| `scripts/hub-ingest/cwl-*.mjs` | Parser, print, ingest, fmt, diagnose, emit helpers |
| `scripts/gate-cwl-roundtrip.mjs` | Language parse→print gate |
| `docs/language/` | `CWL.md`, RFCs, language programs |
| `docs/history/` | Prior Cursor sessions + pillar chat notes |

## Language gate

```bash
npm run test:cwl-roundtrip
```

Convert keeps **junctions** at the old paths so the Universal Translator monorepo still resolves packages/scripts.

## Laws (language)

- Honest **holes** — never silent invention  
- CWL ↔ WebIR without lossy “regex lift” as the authority path  
- Version breaking language changes  
- Judge work as a **language** (spec, fixtures, tooling), not a single customer POC  

Portfolio: `AgenticOps/docs/THREE_PILLARS.md`
