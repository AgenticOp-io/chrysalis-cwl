# CWL finish fleet — open these agents

Root: `C:\Users\david\AgenticOps\engines\chrysalis-cwl`  
Constitution: `docs/language/CWL-PILLAR-HOME.md`  
Roadmap: `docs/history/ROADMAP.md`

Orchestrator chat owns coordination. Each agent owns a **non-overlapping** slice. After landing: `npm run test:language` and `npm run sync:convert` if you touched mirrored scripts.

---

## Agent A — Close 0.1 golds + holes

```
You are CWL Agent A (language pillar). Root: C:\Users\david\AgenticOps\engines\chrysalis-cwl
Read AGENTS.md + docs/language/CWL-PILLAR-HOME.md + docs/history/ROADMAP.md.

OWN: fixtures/language-gold/20-* 21-* 22-*, fixtures README, cwl-fullstack-holes.mjs, 11-holes alignment.
TASK: Add language golds for RFC-0015, 0016, 0020 from docs/language RFCs (parse→print only; no Helix). Align 11-holes reasons with hole catalog so diagnose warns drop where catalogued. Do NOT edit cwl-parser/cwl-print except tiny hole-catalog imports if required.
DONE: npm run test:language green; update ROADMAP 0.1 checkboxes; CHANGELOG note under 0.1.x.
```

## Agent B — Nested if / foreach (RFC-0021 gap)

```
You are CWL Agent B (language pillar). Root: C:\Users\david\AgenticOps\engines\chrysalis-cwl
Read CWL-RFC-0021 + cwl-parser.mjs + cwl-print.mjs.

OWN: cwl-parser.mjs, cwl-print.mjs, fixtures/language-gold/23-nested-control/ (new).
TASK: Capture nested if / nested foreach stmt lists in AST + print round-trip without inventing loop evaluate (honest surface only). Keep Hono/WebIR as behavior authority. Sync convert via npm run sync:convert.
DONE: gold + gate green; ROADMAP checkbox; do not touch fixtures 20-22 or CLI.
```

## Agent C — Phase 0.2 junctions

```
You are CWL Agent C (language pillar + convert mirrors). Root: C:\Users\david\AgenticOps\engines\chrysalis-cwl
Read CWL-PILLAR-HOME §7 sync protocol + scripts/sync-to-convert.mjs.

OWN: scripts/sync-to-convert.mjs, new scripts/gate-cwl-mirrors.mjs, convert hub-ingest junctions for cwl-parser/print/ui-tree/module-graph/diagnose/fullstack-holes ONLY.
TASK: Prefer Windows directory/file junctions from convert → chrysalis-cwl for those files; sync:convert no-op when already junctioned; add gate that fails if hashes diverge and not reparse points. Do not break convert WebIR cwl-fmt/ingest. Do not implement Helix.
DONE: npm run sync:convert + new mirror gate; document in ROADMAP 0.2.
```

## Agent D — Phase 0.4 language CLI

```
You are CWL Agent D (language pillar). Root: C:\Users\david\AgenticOps\engines\chrysalis-cwl
Read CWL-PILLAR-HOME + package.json scripts.

OWN: scripts/cwl-cli.mjs (or packages/cwl bin), package.json bin/scripts, short docs/language/CWL-CLI.md.
TASK: CLI: parse | print | fmt | diagnose | check (check = round-trip AST + diagnose over path/glob). No WebIR required. Wire npm run cwl. Do not change parser semantics; call existing modules.
DONE: CLI works on fixtures/language-gold; ROADMAP 0.4 checkboxes; test:language still green.
```

## Agent E — Phase 0.5 DNA↔CWL bridge contract (docs+fixtures only)

```
You are CWL Agent E (language pillar). Root: C:\Users\david\AgenticOps\engines\chrysalis-cwl
Read THREE_PILLARS + Secure AGENTS (CWL is THE language; Helix owns DNA enforce).

OWN: docs/language/CWL-RFC-0022-dna-surface-bridge.md (or appendix), fixtures/language-gold/24-dna-bridge/ (minimal .cwl + expected DNA shape JSON). NO code under chrysalis-security firewall.
TASK: Document CWL route/page surface ↔ app-dna-v1 route identity mapping; fixture pair only. Helix consumes later.
DONE: RFC + fixture; ROADMAP 0.5; no Helix implementation.
```

## Agent F — Phase 0.3 WebIR extract (first honest slice)

```
You are CWL Agent F (language pillar). Root: C:\Users\david\AgenticOps\engines\chrysalis-cwl
Convert webir: C:\Users\david\AgenticOps\engines\chrysalis-convert\packages\webir

OWN: docs/history/WEBIR-EXTRACT-PLAN.md, optional packages/webir junction or package.json dependency experiment, scripts note for ingest.
TASK: Do NOT mass-move the whole webir tree blindly. Produce a concrete extract plan + the smallest slice that lets cwl-ingest resolve webir from this pillar (junction or workspace dep). If blocked, document blockers precisely. No Helix. Don't break convert.
DONE: plan doc + either working local ingest smoke or explicit blocker list; ROADMAP 0.3 status update.
```

---

## Parallel safety

| Agent | May edit |
| --- | --- |
| A | fixtures 20–22, holes catalog, 11-holes |
| B | parser, print, fixture 23 |
| C | sync/gate scripts, convert junctions only for listed files |
| D | CLI + package.json bin |
| E | RFC-0022 + fixture 24 |
| F | WEBIR plan + minimal package wiring |

Orchestrator merges ROADMAP/CHANGELOG/`LANGUAGE_VERSION` after agents report.
