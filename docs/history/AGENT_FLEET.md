# CWL finish fleet (updated)

Root: `C:\Users\david\AgenticOps\engines\chrysalis-cwl`  
Chat / workspace title: **chrysalis-cwl** (same as folder)

Agents A–H landed 0.1–0.5 + WebIR resolve + thin ingest. **Still open:** formal `test:ingest`, WebIR→CWL emit (Slice 4), convert `loadWebir` package import (no mass-move), 1.0 publish/pin.

## Open New Agent (left rail) — paste one block each

### Agent I — Formal ingest gate + land uncommitted 0.3 helpers

```
You are CWL Agent I. Workspace/root MUST be C:\Users\david\AgenticOps\engines\chrysalis-cwl (title the chat chrysalis-cwl).
Read AGENTS.md, docs/language/CWL-PILLAR-HOME.md, docs/history/ROADMAP.md Phase 0.3, docs/history/WEBIR-EXTRACT-PLAN.md.

OWN: scripts/smoke-cwl-ingest.mjs, package.json test:ingest wiring, fixtures/language-gold/01-literals webir snapshot if useful, hub-t / hub-cwl-* / hub-lift-cwl-webir already in tree — finish + document only.
TASK: Ensure npm run smoke:cwl-ingest and npm run test:ingest (or fold into test:language as optional second script) are green. Do NOT mass-move packages/webir. Do NOT edit Secure firewall. Bump CHANGELOG/LANGUAGE_VERSION if needed. Prefer committing related files when green.
DONE: report commands + status; update ROADMAP 0.3 checkboxes you closed.
```

### Agent J — Slice 4 WebIR → CWL emit round-trip

```
You are CWL Agent J. Root: C:\Users\david\AgenticOps\engines\chrysalis-cwl (chat title chrysalis-cwl).
Read WEBIR-EXTRACT-PLAN Slice 4 + emit-cwl-from-hub.mjs / export paths.

OWN: emit-cwl-from-hub path + new smoke/gate for WebIR→CWL (pillar-local), optional dual-mode note for cwl-fmt (do not overwrite convert fmt).
TASK: Prove at least one WebIR→CWL round-trip from this pillar alone (start from 01-literals ingest output). Honest holes OK. No Helix. Don't break convert fat hub-lift.
DONE: npm script green; ROADMAP Slice 4 / 0.3 checkbox update.
```

### Agent K — Convert loadWebir package import (no ownership flip)

```
You are CWL Agent K (touches convert carefully). CWL root: C:\Users\david\AgenticOps\engines\chrysalis-cwl. Convert: C:\Users\david\AgenticOps\engines\chrysalis-convert.
Read WEBIR-EXTRACT-PLAN Slice 3 items 3 only — NOT physical git mv of webir.

OWN: convert scripts/hub-ingest/shared.mjs loadWebir (or equivalent) to resolve @chrysalis/webir / file URL without process.cwd() hack; docs in WEBIR.md / plan.
TASK: Smallest safe change so convert AND pillar load WebIR via package/path resolve. Run hub:cwl-language-pillar-smoke after. Do NOT junction-flip packages/webir ownership yet.
DONE: smoke green; document remaining Slice 3 blockers.
```

### Agent L — Phase 1.0 pin path (no real npm publish unless asked)

```
You are CWL Agent L. Root: C:\Users\david\AgenticOps\engines\chrysalis-cwl.
Read docs/language/CWL-PUBLISH.md + ROADMAP Phase 1.0.

OWN: CWL-PUBLISH.md, packages/cwl version sync, short pin notes for convert/Secure AGENTS or docs pointers (file: or version field) — do not actually npm publish unless user said publish.
TASK: Align @chrysalis/cwl package.json version with LANGUAGE_VERSION.md; document how Convert/Secure will pin; leave publish as checklist.
DONE: docs + version align; ROADMAP 1.0 partial checkboxes honest.
```

## Parallel safety

| Agent | May edit |
| --- | --- |
| I | ingest smoke, package.json scripts, gold snapshot, 0.3 docs |
| J | emit-cwl*, new emit smoke, Slice 4 docs |
| K | convert shared.loadWebir + CWL plan docs |
| L | publish docs + packages/cwl version |

Orchestrator merges ROADMAP/CHANGELOG after agents report.
