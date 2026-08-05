# CWL continue fleet — source-of-all gaps

Root: `C:\Users\david\AgenticOps\engines\chrysalis-cwl`  
Prior: `docs/history/AGENT_FLEET.md` (A–F done)  
Focus: make this pillar the **sole IR/language home** Convert/Secure pull from.

---

## Agent G — CWL-specific WebIR helpers in-pillar

```
OWN: scripts/hub-ingest/hub-cwl-middleware.mjs, hub-cwl-auth-presets.mjs, hub-cwl-effects.mjs,
     hub-cwl-path-params.mjs (add cwlPathParamsForWebir with local HUB_T or import from thin hub-t.mjs),
     optional scripts/hub-ingest/hub-t.mjs (string type only).
TASK: Port CWL-specific lift helpers from convert (do NOT copy COBOL/fat lift). Keep CWL as source of truth.
Wire so cwl-ingest can import them locally. npm run sync:convert if mirrors affected.
DONE: helpers present; unit/smoke import; ROADMAP 0.3 note.
```

## Agent H — Thin hub-lift for CWL ingest

```
OWN: scripts/hub-ingest/hub-lift-cwl-webir.mjs (NEW thin module) OR carefully extract only
     emitHubRoute / lowerHubLiteral / page-load helpers needed by cwl-ingest.mjs.
Do NOT mass-copy hub-lift-webir-route.mjs (755 LOC + COBOL). Prefer minimal CWL-only surface.
TASK: Make cwl-ingest.mjs resolve all imports inside chrysalis-cwl; add npm run smoke:cwl-ingest
      against fixtures/language-gold/01-literals (or 24-dna-bridge).
DONE: smoke green from pillar cwd; document remaining gaps in WEBIR-EXTRACT-PLAN.md.
```

## Agent I — WebIR home in CWL pillar

```
OWN: packages/webir (junction or extract), package.json / pnpm-workspace if needed,
     scripts/link-webir.mjs, load-webir.mjs, smoke:webir, WEBIR-EXTRACT-PLAN.md updates.
TASK: Make @chrysalis/webir resolvable as owned-by-CWL (junction OK short-term; document flip:
      convert packages/webir → cwl). Ensure smoke:webir + smoke:cwl-ingest (if H lands) work.
Do not break convert product. Coordinate with G/H on loadWebir.
DONE: ROADMAP 0.3 ownership checkbox progress; plan updated.
```

## Agent J — Durable mirror setup

```
OWN: scripts/setup-convert-mirrors.mjs (recreate Windows symlinks), docs in CWL-PILLAR-HOME §7,
     gate-cwl-mirrors / sync-to-convert polish, maybe npm run setup:mirrors.
TASK: Fresh-checkout story: one command restores convert→cwl script symlinks; document git/core.symlinks.
DONE: script + docs; test:cwl-mirrors still green after re-link smoke.
```

## Agent K — Language package version surface

```
OWN: packages/cwl/package.json version ≡ LANGUAGE_VERSION.md (0.1.5), README publish notes,
     optional root exports map; CHANGELOG; do NOT npm publish unless asked.
TASK: Align package metadata so Convert/Secure can pin a version later (Phase 1.0 prep).
DONE: versions aligned; short PUBLISH.md or section in CWL-PILLAR-HOME.
```

## Parallel safety

| Agent | Touch |
| --- | --- |
| G | small hub-cwl-* helpers + path-params |
| H | thin lift + cwl-ingest wiring + smoke |
| I | packages/webir + load-webir |
| J | mirror setup scripts/docs |
| K | packages/cwl versioning docs |

Orchestrator merges ROADMAP/CHANGELOG after reports.
