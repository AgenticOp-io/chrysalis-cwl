# Convert whole system — Notified (CWL)

**Status:** **Notified** (Convert landed 2026-08-09/10) — no CWL grammar / DNA invent required  
**From:** Convert (`engines/chrysalis-convert`, private [`AgenticOp-io/chrysalis`](https://github.com/AgenticOp-io/chrysalis))  
**Branch / SHA:** `candidate/wptp-convert-orbit` · tip **`95f3e13d`** (harnesses platforms-first + CWL notify link) · whole-system gate **`600b3f39`** · map **`4e997b6c`**  
**CWL tip still consumed:** **`1.0.17`** (`file:` junctions + pin smoke)  
**Related:** [CONVERT-GRAVITY-REQUESTED.md](./CONVERT-GRAVITY-REQUESTED.md) (**Done**) · [CONVERT-MIRRORS-REQUESTED.md](./CONVERT-MIRRORS-REQUESTED.md) · [DNA-BUILD-NEXT.md](./DNA-BUILD-NEXT.md) · Convert [`docs/CONVERT-WHOLE-SYSTEM.md`](../../../chrysalis-convert/docs/CONVERT-WHOLE-SYSTEM.md) · [`docs/WPTP-CONVERT-ORBIT.md`](../../../chrysalis-convert/docs/WPTP-CONVERT-ORBIT.md)

## One sentence

Convert coalesced peels / Hub / COBOL / **`platforms/wptp-*`** / Helix consume into one operator map and gate — **CWL remains DNA SoR**; WPTP stays Convert orbit (not a second Rosetta).

## What Convert landed (so the work is not wasted)

| Piece | Meaning for CWL |
| --- | --- |
| `docs/CONVERT-WHOLE-SYSTEM.md` | Picture: origins → Convert peels → **CWL↔WebIR** → optional WPTP → Secure phenotype |
| `pnpm run hub:convert-whole-system-smoke` | Token **`CONVERT_WHOLE_SYSTEM_OK`** (gravity + orbit + Helix + substrate + gold path) |
| `hub:wptp-orbit-smoke` | Prefers AgenticOps **`platforms/wptp-*`**; does **not** fold WPTP into this pillar |
| Gold/compose/Hub WPTP paths | Resolve `platforms/` first via Convert `scripts/lib/wptp-siblings.mjs` |
| Silver / d3 / d4 harnesses | Point at `platforms/` (SHA `95f3e13d`) |
| `link:cwl-packages-from-cwl` + pretest | Junctions only — **never `git rm` through junctions** (Windows hazard into this tree) |
| CWL pin / gravity / helix cutover | Still green on tip **1.0.17**; Convert wraps `smoke:ut-evidence`, does not fork spine |

## Explicit non-events (do not misread)

- **No** merge/delete of `platforms/wptp-*` or `engines/wptp-*` repos
- **No** CWL package or RFC change in this notify
- **No** WebIR grammar move beyond existing reverse-home junctions
- **No** Secure Helix core work inside Convert

## CWL follow-up from Convert scan (2026-08-10)

| Item | Owner | Doc |
| --- | --- | --- |
| ALWAYS hub-ingest mirrors stale vs tip (Hub imports `./cwl-parser.mjs` etc.) | **Convert** (local sync done; commit pending) | [CONVERT-MIRRORS-REQUESTED.md](./CONVERT-MIRRORS-REQUESTED.md) |
| Dual-mode: do not sync-overwrite `cwl-control-lower` / ingest / fmt | Both (documented) | CWL-PILLAR-HOME §7 · Convert `CWL-SCRIPTS-CANONICAL.md` |

## CWL action (optional)

None required for DNA invent. Hygiene:

1. Skim Convert whole-system map when answering “where does WPTP sit?”
2. Keep DNA queue **CLOSED** — tip bumps only on real sibling contract gaps
3. Track Convert mirrors Requested until `test:cwl-mirrors` green
4. If Secure still pins `<1.0.17`, that remains Secure’s tip hygiene ([SECURE-CUTOVER-REQUESTED.md](./SECURE-CUTOVER-REQUESTED.md))

## Convert reply shape (already met for whole-system)

```text
CONVERT_WHOLE_SYSTEM: ok
SHA: 95f3e13d
BRANCH: candidate/wptp-convert-orbit
CWL_PIN: file:1.0.17
ORBIT: platforms/ (WPTP_CONVERT_ORBIT_OK)
SMOKES: hub:convert-whole-system-smoke · hub:convert-gravity-smoke · hub:cwl-helix-cutover-smoke
DNA: unchanged — Convert consumes only
```

## Continue build (Convert owns)

1. Close [CONVERT-MIRRORS-REQUESTED.md](./CONVERT-MIRRORS-REQUESTED.md)  
2. Dual primary (COBOL residual **or** one dialect deepen), Hub peels feeding CWL, registry pin when ready — not new CWL genes unless a contract hole appears.
