# Operator next — after CWL tip 1.0.23

**Status:** agent invent queues **idle** · human/ops owns the residual closes  
**CWL tip:** **1.0.23** · bus tip `d8b4ed7` · language `9ecc691`  
**Date:** 2026-08-11

Agents will **not** invent Nest DI / LiveView / Flutter / onion / WebSocket duplex / EXTFMAP books / fake customer soak.

## 1. Convert — EXTFMAP (sole COBOL P0)

Needs **live z/OS ZD&T** hunt on `B5C551` / SDFHCOB **or** operator ABSENT attest after hunt.

| Step | Action |
| --- | --- |
| Docs | `chrysalis-convert/docs/EXTFMAP-RESIDUAL.md` · `COBOL-NO-ZOS-CEILING.md` · `COBOL-IBM-SDFHCOB-DROP.md` |
| Honesty gate | Keep `hub:cobol-extfmap-residual-smoke` → `EXTFMAP_RESIDUAL_HONEST_OK` green while open |
| Close path A | Land licensed EXTFMAP (or equivalent) on disk → peel → reopen Convert ask |
| Close path B | After hunt: set `CHRYSALIS_EXTFMAP_ABSENT=1` + written attest — never invent |

## 2. Secure — customer soak → enforce

Preflight already green (`soak-preflight-smoke`). Real soak is **live customer/shadow traffic**, not fixtures.

| Step | Action |
| --- | --- |
| Runbook | `chrysalis-security/docs/SOAK.md` |
| Gate | `MODE=shadow` on the same placement that will enforce |
| Exit | `helix ready --target enforce --shadow-log <path> --max-shadow-holes 0` → exit 0 only |
| Then | `MODE=enforce` + `POST /__helix/reload` |
| Not soak | GCE L2 / lab divert (`gce-sync -WithL2`) |

## 3. CWL — further UI

Only when a **Convert peel** demands a new island/event gene. Hydration / React-Svelte silent lower remain non-goals. Tip stays **1.0.23** until then.

## Fleet

```text
CWL_FLEET_IDLE: yes
DISPATCH: none
```

Reopen fleet when operator lands EXTFMAP evidence, soak logs, or a named peel demand for a CWL gene.
