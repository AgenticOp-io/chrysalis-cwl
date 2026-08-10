# Convert agent — execute plan (from CWL consume scan)

**Status:** Phase 1 **DONE** (`56a75d35`) — Convert executes Phase 2–3 via **pillar-sync**  
**Sync bus:** [`AgenticOps/docs/pillar-sync/convert/INBOX.md`](../../../../docs/pillar-sync/convert/INBOX.md) · [`BOARD.md`](../../../../docs/pillar-sync/BOARD.md)  
**Date:** 2026-08-10  
**From:** CWL pillar tip **`1.0.17`** · CWL commit **`5e60d41`**  
**Convert tip:** `candidate/wptp-convert-orbit` @ **`56a75d35`** (mirrors)  
**Related:** [`CONVERT-MIRRORS-REQUESTED.md`](./CONVERT-MIRRORS-REQUESTED.md) · [`CONVERT-WHOLE-SYSTEM-NOTIFIED.md`](./CONVERT-WHOLE-SYSTEM-NOTIFIED.md) · Convert [`STRATEGIC-PLAN.md`](../../../chrysalis-convert/docs/STRATEGIC-PLAN.md) §12 · [`CONVERT-WHOLE-SYSTEM.md`](../../../chrysalis-convert/docs/CONVERT-WHOLE-SYSTEM.md)

## One sentence

Prove whole-system cohesion (Phase 2), then resume **dual primary** (COBOL residual **or** one dialect deepen) — do not invent CWL DNA or fold WPTP into engines. Report via pillar-sync BOARD + CWL INBOX.

---

## Why this plan (what else helps)

| Finding | Why it matters | Owner |
| --- | --- | --- |
| Detached HEAD @ `95f3e13d` | Easy to lose work; commit on a branch | Convert |
| ALWAYS hub-ingest **unsynced in git** (disk already tip) | Hub still historically tracked stale parser/print/diagnose/holes | Convert |
| Staged noise (`.gradle` locks, workspace, WISP edits) | Must not ride the mirrors commit | Convert |
| `stash@{0}` `wip-cwl-mirrors-typechange` | **Regresses** mirrors (large deletions) — **drop**, do not apply | Convert |
| `stash@{1}` `wip-cobol-before-wptp-orbit` | Real COBOL WIP (best-fit smoke) — triage after hygiene | Convert |
| Whole-system / WPTP orbit already landed | Cohesion map + gates exist — prove still green after mirrors | Convert |
| CWL DNA queue **CLOSED** | No grammar invent; consume only | CWL |
| Oracle waits (`g_*`, foreach N-iter HTML, island execute) | Honest holes until oracle — not this sprint’s invent | Convert |
| EXTFMAP sole COBOL P0 | Dual-primary COBOL path still open | Convert |
| Registry pin `@agenticop-io/cwl@1.0.17` | Optional when Packages ready; `file:` OK | Convert |
| Dual-mode files | Never overwrite `cwl-fmt` / `cwl-ingest` / `cwl-control-lower` from pillar | Convert |

---

## Phase 0 — Boot (5 min)

```powershell
cd C:\Users\david\AgenticOps\engines\chrysalis-convert
git checkout candidate/wptp-convert-orbit   # leave detached HEAD
git status -sb
pnpm run link:cwl-packages-from-cwl        # if junctions missing
```

Confirm CWL sibling tip: `..\chrysalis-cwl\LANGUAGE_VERSION.md` = **1.0.17**.

---

## Phase 1 — Hygiene (must land first)

### 1A — Commit ALWAYS mirrors only

Working tree already has tip copies from CWL `sync:convert`. Commit **only**:

- `scripts/hub-ingest/cwl-parser.mjs`
- `scripts/hub-ingest/cwl-print.mjs`
- `scripts/hub-ingest/cwl-ui-tree.mjs`
- `scripts/hub-ingest/cwl-module-graph.mjs`
- `scripts/hub-ingest/cwl-diagnose.mjs`
- `scripts/hub-ingest/cwl-fullstack-holes.mjs`

```powershell
git restore --staged .
git add -- scripts/hub-ingest/cwl-parser.mjs scripts/hub-ingest/cwl-print.mjs `
  scripts/hub-ingest/cwl-ui-tree.mjs scripts/hub-ingest/cwl-module-graph.mjs `
  scripts/hub-ingest/cwl-diagnose.mjs scripts/hub-ingest/cwl-fullstack-holes.mjs
git status   # must show ONLY those six
git commit -m "Sync ALWAYS CWL hub-ingest mirrors to tip 1.0.17."
git push -u origin HEAD
```

**Do not stage:** `.gradle/**`, `chrysalis-cwl-convert.code-workspace`, WISP/census edits, package junctions.

### 1B — Drop bad stash; park COBOL stash

```powershell
git stash drop stash@{0}    # wip-cwl-mirrors-typechange — would undo tip mirrors
# keep stash@{1} wip-cobol-before-wptp-orbit until Phase 3 COBOL path
```

### 1C — Optional: file symlinks (preferred end-state)

```powershell
cd ..\chrysalis-cwl
npm run setup:mirrors
npm run test:cwl-mirrors
```

If Windows symlink fails → copies from 1A are enough; document honest skip.

### 1D — Clear crash staging leftovers

Unstage/discard accidental `.gitignore` / gradle / workspace adds unless intentionally owned. Prefer:

```powershell
git restore --staged packages/oracle-kotlin/probe/.gradle 2>$null
# do not git add packages/cwl or runtimes (gitignored junctions)
```

**Reply after Phase 1:**

```text
CONVERT_MIRRORS: ok
SHA: <commit>
BRANCH: candidate/wptp-convert-orbit
ALWAYS: parser·print·ui-tree·module-graph·diagnose·fullstack-holes
SKIPPED: cwl-fmt · cwl-ingest · cwl-control-lower
CWL_PIN: file:1.0.17
```

---

## Phase 2 — Prove cohesion (after mirrors)

```powershell
cd C:\Users\david\AgenticOps\engines\chrysalis-convert
pnpm run hub:cwl-pin-smoke
pnpm run hub:convert-gravity-smoke
pnpm run hub:convert-whole-system-smoke
# optional gold path:
# $env:CHRYSALIS_WHOLE_SYSTEM_GOLD="1"; pnpm run hub:convert-whole-system-smoke
pnpm run hub:wptp-orbit-smoke
```

Expect tokens: pin tip ≥ **1.0.17** · `CONVERT_GRAVITY_OK` · `CONVERT_WHOLE_SYSTEM_OK` · `WPTP_CONVERT_ORBIT_OK` (or honest WPTP skip).

**Reply:**

```text
CONVERT_WHOLE_SYSTEM: ok
SHA: <HEAD>
CWL_PIN: file:1.0.17
SMOKES: hub:cwl-pin-smoke · hub:convert-gravity-smoke · hub:convert-whole-system-smoke · hub:wptp-orbit-smoke
```

---

## Phase 3 — Default build (pick **one**)

Per **D6540** / STRATEGY §12 / `CONVERT-WHOLE-SYSTEM` mode A. Do **not** bingo both in one commit wave.

### Option A — COBOL primary (preferred if stash@{1} is valuable)

1. Inspect `stash@{1}` (`wip-cobol-before-wptp-orbit`) — apply only if still valid vs `95f3e13d`+mirrors tip  
2. Focus **EXTFMAP** residual honesty / chartered path (`COBOL-NO-ZOS-CEILING.md`) — **no invent**  
3. Gates: `hub:cobol-best-fit-smoke` / residual ledger as applicable  
4. Do **not** claim LCB or close EXTFMAP without authority

### Option B — Language deepen (one dialect)

1. Open [`LEADERSHIP-SCOREBOARD.md`](../../../chrysalis-convert/docs/LEADERSHIP-SCOREBOARD.md)  
2. Pick **one** previously skipped / peelable route-surface (not Nest DI / LiveView façades)  
3. Land gold 20/20 + honest holes only (**D6442** / **D6447**)  
4. Update scoreboard when closed

### Option C — Operator asks “cohesion / WPTP only”

Stop after Phase 2. No dual-primary deepen required.

---

## Phase 4 — Optional later (not blocking)

| Item | When |
| --- | --- |
| Registry pin `@agenticop-io/cwl@1.0.17` | Packages auth ready; keep `file:` until then |
| `setup:mirrors` committed as mode-120000 / CI symlink story | After local symlink works |
| Thin docs: retire “WebIR under convert” wording | Hygiene pass |
| Oracle closes: opaque `g_*`, foreach N-iter HTML, island **execution** | Only with oracle authority — keep holes |
| WebIR link-until-pnpm / substrate flip leftovers | Deferred per D6551 — not DNA invent |

---

## Hard refuses

- Edit `engines/chrysalis-cwl` grammar / RFCs / golds from Convert  
- `git rm` / `git add` through `packages/cwl` · `webir` · `runtime-cwl*` junctions  
- Apply `stash@{0}` mirror typechange  
- Fold `platforms/wptp-*` into Convert packages or CWL  
- Invent EXTFMAP / island execute / DB evaluate to “go green”  
- Push to `main` — `candidate/*` only

---

## Success criteria (orchestrator)

1. [ ] On branch (not detached) · mirrors commit pushed  
2. [ ] `test:cwl-mirrors` green from chrysalis-cwl  
3. [ ] Whole-system + pin + gravity green on tip **1.0.17**  
4. [ ] One dual-primary increment **or** explicit stop after Phase 2  
5. [ ] Reply shapes above posted back to CWL / orchestrator  

## Paste to Convert agent

```text
Execute CWL plan: chrysalis-cwl/docs/history/CONVERT-AGENT-EXECUTE-PLAN.md
Order: Phase 0 → 1 (mirrors commit) → 2 (whole-system prove) → 3 (pick A COBOL or B one dialect).
CWL tip 1.0.17. Do not invent DNA. Drop stash@{0}. Leave dual-mode ingest/fmt/control-lower alone.
```
