# Chrysalis Web Language (CWL)

**Package:** `@chrysalis/cwl`  
**Version:** must equal [`LANGUAGE_VERSION.md`](../../LANGUAGE_VERSION.md) (currently `1.0.10`)  
**Status:** Exit 1.0 lineage — packable for **GitHub Packages** (`publishConfig` restricted). Repos stay private. Not public npm.

## Purpose

**CWL** is the **DNA of the web** (Rosetta meaning) for AgenticOps: a single surface for routes, pages, data, UI, effects, and honest holes, mapped 1:1 to **WebIR**. Convert is the Universal Translator through it.

## Public API

- **Pin package:** `import { VERSION, pillarRoot, languageVersion } from '@chrysalis/cwl'`
- **Diagnose:** `import { diagnoseCwlSource, … } from '@chrysalis/cwl/diagnose'`
- **LSP map:** `import { mapDiagnoseSource, … } from '@chrysalis/cwl/lsp-map'`
- **Parser:** `import { parseCwlModule } from '@chrysalis/cwl/parser'`
- **Print:** `import { printCwlModule, canonicalizeCwlModule } from '@chrysalis/cwl/print'`
- **DNA seed:** `import { seedDraftDnaFromCwlPath, … } from '@chrysalis/cwl/dna-seed'`
- **CLI:** `npx cwl check path/to/file.cwl` · `npx cwl dna-seed file.cwl [--profile …] [--holes-report]`
- Constitution: [`CWL-PILLAR-HOME.md`](../../docs/language/CWL-PILLAR-HOME.md)
- Publish: [`CWL-PUBLISH.md`](../../docs/language/CWL-PUBLISH.md) · [`EXIT-1.0.md`](../../docs/history/EXIT-1.0.md)

Canonical sources live in `scripts/hub-ingest/`; `npm run sync:cwl-package-lib` stages them into `lib/` for packing.

## Version rule

`packages/cwl/package.json` `"version"` **≡** `LANGUAGE_VERSION.md`. Bump both together.

## Registry consumers

GitHub Packages name at publish: `@agenticop-io/cwl` (tag `cwl-v*`). Local / `file:` pin stays `@chrysalis/cwl`.
