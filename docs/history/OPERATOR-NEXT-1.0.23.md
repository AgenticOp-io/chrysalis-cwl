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

| Attempt (2026-08-11) | Result |
| --- | --- |
| `npm run soak-preflight-smoke` | **green** → `SOAK_PREFLIGHT_OK` (tooling path) |
| Live customer soak → enforce | **blocked** — no customer/shadow traffic available to agents; SOAK.md forbids synthetic traffic |

| Step (ops) | Action |
| --- | --- |
| Runbook | `chrysalis-security/docs/SOAK.md` |
| Need from you | App host already behind Helix + durable `SHADOW_LOG` path + soak window |
| Exit | `helix ready --target enforce --shadow-log <path> --max-shadow-holes 0` → exit 0 only |
| Then | `MODE=enforce` + `POST /__helix/reload` |
| Not soak | GCE L2 / lab divert (`gce-sync -WithL2`) · fixture preflight |

## 3. CWL — further UI

| Attempt (2026-08-11) | Result |
| --- | --- |
| Convert peel demand for new island/event gene | **none** — tip **1.0.23** already consumed (gold 33 / D6568); no peel asks for props/slots/hydration |
| Tip bump / invent | **refused** — hydration / silent React-Svelte lower remain non-goals |

Reopen when Convert names a missing contract (e.g. peel emits anonymous island but needs named id / event metadata).

## Fleet

```text
CWL_FLEET_IDLE: yes
DISPATCH: none
```

Reopen fleet when operator lands EXTFMAP evidence, soak logs, or a named peel demand for a CWL gene.
