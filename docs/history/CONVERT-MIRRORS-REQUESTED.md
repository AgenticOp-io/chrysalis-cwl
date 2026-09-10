# Convert ALWAYS mirrors — Requested → local sync done

**Status:** **Local sync applied** (2026-08-10) via CWL `npm run sync:convert` — Convert must **commit on Convert branch** (not committed from CWL chat)  
**From:** CWL pillar tip **`1.0.17`** (DNA queue CLOSED)  
**Convert:** private [`AgenticOp-io/chrysalis`](https://github.com/AgenticOp-io/chrysalis) · consume via `file:` / junctions  
**Related:** [`CWL-PILLAR-HOME.md`](../language/CWL-PILLAR-HOME.md) §7 · Convert [`scripts/hub-ingest/CWL-SCRIPTS-CANONICAL.md`](../../../chrysalis-convert/scripts/hub-ingest/CWL-SCRIPTS-CANONICAL.md) · [`CONVERT-WHOLE-SYSTEM-NOTIFIED.md`](./CONVERT-WHOLE-SYSTEM-NOTIFIED.md)

## Ask (one sentence)

Re-sync Convert `scripts/hub-ingest/` **ALWAYS** language mirrors to chrysalis-cwl tip (prefer `setup:mirrors` file symlinks; else byte-identical copies) so Hub smokes that `import "./cwl-parser.mjs"` (etc.) do not run a stale grammar fork.

## Why

CWL scanned Convert after whole-system / WPTP orbit land (`95f3e13d`). Package pin + `packages/cwl` junction were at tip **1.0.17**, but the six ALWAYS plain-file mirrors were **behind** the pillar (parser missing `else if` / keyword columns; diagnose schema older; hole catalog missing `unsupported:*` / `cwl:emit:*` / `cwl:empty-handler`). Hub language smokes import those hub-ingest files — not only the package junction.

## Done locally (working tree)

From `engines/chrysalis-cwl`: `npm run sync:convert` updated Convert ALWAYS six; `npm run test:cwl-mirrors` → **ok**.  
**Did not** overwrite `cwl-fmt.mjs`, `cwl-ingest.mjs`, or `cwl-control-lower.mjs` (dual-mode).

## Convert still must

1. Checkout a real branch (leave detached HEAD if still at `95f3e13d`)
2. Commit **only** the six ALWAYS hub-ingest files (do not stage COBOL/gradle noise or package junctions)
3. Prefer follow-up `setup:mirrors` so paths become file symlinks instead of copies
4. Reply with shape below

## Do not

- Overwrite Convert **`cwl-fmt.mjs`**, **`cwl-ingest.mjs`**, or **`cwl-control-lower.mjs`** from pillar sync
- `git add` / `git rm` through `packages/cwl` (or other CWL package) **junctions** on Windows
- Invent grammar in Convert to “catch up”

## Acceptance

- [x] `npm run test:cwl-mirrors` green from chrysalis-cwl (working tree)
- [ ] Convert commit + push on `candidate/*` with ALWAYS six only
- [ ] Optional: `setup:mirrors` → reparse points

## Reply shape

```text
CONVERT_MIRRORS: ok
SHA: <convert commit>
METHOD: sync:convert (working tree from CWL) + Convert commit
ALWAYS: parser·print·ui-tree·module-graph·diagnose·fullstack-holes
SKIPPED: cwl-fmt · cwl-ingest · cwl-control-lower (dual-mode)
CWL_PIN: file:1.0.17
```
