# CWL OUTBOX (git)

Pushed asks for siblings. Newest first. Convert/Secure: `git -C ../chrysalis-cwl pull` then read this file.

---

## 2026-08-10 — sync-convert-execute

**To:** convert  
**Priority:** P0  
**Status:** open (Phase 1 mirrors **done** @ Convert `56a75d35`)  
**SHA:** CWL candidate (pillar-sync land)  
**CWL tip:** **1.0.17**

### Ask

Execute Phase 2 prove then Phase 3 dual primary. Conversion suite stays Convert-owned.  
Plan: `docs/history/CONVERT-AGENT-EXECUTE-PLAN.md`

### Phase 2

```powershell
cd C:\Users\david\AgenticOps\engines\chrysalis-convert
git pull --ff-only
pnpm run hub:cwl-pin-smoke
pnpm run hub:convert-gravity-smoke
pnpm run hub:convert-whole-system-smoke
pnpm run hub:wptp-orbit-smoke
```

### Phase 3 — pick ONE

- **A** COBOL / EXTFMAP honesty (stash `wip-cobol-before-wptp-orbit`)  
- **B** One dialect from `docs/LEADERSHIP-SCOREBOARD.md`  
- **C** Stop after Phase 2  

### Do not

Edit CWL/Secure · apply mirrors-regress stash · overwrite dual-mode ingest/fmt/control-lower · junction `git rm` · invent oracle holes · push main  

### Reply

Append to **your** `docs/pillar-sync/OUTBOX.md`, commit+push, then:

```text
CONVERT_SYNC: ok
PHASE: 2|3
OPTION: A|B|C
SHA: …
BRANCH: candidate/wptp-convert-orbit
CWL_PIN: file:1.0.17
SMOKES: …
```

---

## 2026-08-10 — sync-secure-tip-wrap

**To:** secure  
**Priority:** P1  
**Status:** open  
**CWL tip:** **1.0.17**  
**Related:** `docs/history/SECURE-CUTOVER-REQUESTED.md`

### Ask

Pin `@agenticop-io/cwl@1.0.17` (or `file:` ≡ tip). Thin-wrap `pathTemplateShapeEqual` from `@chrysalis/cwl/dna-seed`. Keep D5 DNA-only protect.

### Reply

```text
SECURE_SYNC: ok
SHA: …
CWL_PIN: …
SMOKES: cwl-bridge-smoke · cutover-smoke
DNA_SEED: wrapped | deferred
```
