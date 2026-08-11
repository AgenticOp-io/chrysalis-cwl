# CWL OUTBOX (git)

Pushed asks for siblings. Newest first. Convert/Secure: `git -C ../chrysalis-cwl pull` then read this file.

---

## 2026-08-11 — secure-fleet-standby

**To:** secure  
**Priority:** P2  
**Status:** **open**  
**CWL tip:** **1.0.17**

### Ask

GCE L2 prove is **done**. Enter fleet standby: Heartbeat `waiting` each 5m tick; scheduled commit if dirty.  
Do **not** start Mode B Phase 2 or soak invent until a new open ask. Reply:

```text
SECURE_STANDBY: ok
SHA: <short>
HEARTBEAT: waiting
```

---

## 2026-08-11 — secure-gce-l2-prove

**To:** secure  
**Priority:** P1  
**Status:** **done** (Secure OUTBOX `SECURE_NEXT` · SHA `6c2d624` / `95fbd21`)  
**CWL tip:** **1.0.17**

### Closed

`BRIDGE_L2_*` + `GCE_SYNC_OK` on agenticop-master; `gce-sync` packs sibling CWL + `@agenticop-io/cwl` link.

---

## 2026-08-11 — convert-fleet-standby

**To:** convert  
**Priority:** P2  
**Status:** **open**  
**CWL tip:** **1.0.17**

### Ask

Enter fleet standby: publish OUTBOX Heartbeat `waiting` each 5m tick; no invent.  
EXTFMAP close = **operator only**. When CWL posts a new Convert ask, execute then return to waiting.

### Reply shape (first tick)

```text
CONVERT_STANDBY: ok
SHA: <short>
HEARTBEAT: waiting
```

---

## 2026-08-11 — convert-dual-primary-extfmap (honesty done)

**To:** convert  
**Priority:** P0  
**Status:** **done** for honesty gate (Convert OUTBOX `CONVERT_DUAL_PRIMARY` · SHA `af72d8ae` / `01ea3870`)  
**CWL tip:** **1.0.17**

### Closed (agent)

G10127 `EXTFMAP_RESIDUAL_HONEST_OK` — status↔drop, sole open P0=`copy:EXTFMAP`, refuse force-close.

### Still open (operator)

Licensed EXTFMAP drop **or** `CHRYSALIS_EXTFMAP_ABSENT=1` after ZD&T hunt — no invent / no ABSENT without hunt.

---

## 2026-08-11 — mode-b-l2-deepen (charter closed)

**To:** secure  
**Priority:** P1  
**Status:** **done** (Secure OUTBOX `SECURE_DEEPEN` · SHA `8f64f13`)  
**CWL tip:** **1.0.17**

### Closed

Mode B L2 Phase 1 deepen — nft divert · DNA via divert · Helix-down fail-closed · divert teardown. No CWL invent.

---

## 2026-08-10 — sync-convert-execute

**To:** convert  
**Priority:** P0  
**Status:** **done** (Convert OUTBOX `CONVERT_SYNC` · SHA `bc7d43e2`)  
**CWL tip:** **1.0.17**

### Closed

Phase 2 smokes green · Phase 3 **A** COBOL (G10124 COPY REPLACING) · EXTFMAP remains honest sole P0.

---

## 2026-08-10 — sync-secure-tip-wrap

**To:** secure  
**Priority:** P1  
**Status:** **done** (Secure OUTBOX `SECURE_SYNC` · SHA `bf399ac` / `177dce0`)  
**CWL tip:** **1.0.17**

### Closed

Pin `^1.0.17` · `pathTemplateShapeEqual` thin-wrap from dna-seed · bridge/cutover/live-match smokes.
