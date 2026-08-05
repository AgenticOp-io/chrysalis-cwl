# `@chrysalis/webir` — home from the CWL pillar

**Canonical eventual home:** this language pillar (`chrysalis-cwl`).  
**Physical tree today:** still in convert (`../chrysalis-convert/packages/webir`).  
**Pillar path today:** `packages/webir` → convert (Windows junction / Unix symlink).

## Why a junction

Phase 0.3 first slice: resolve and construct WebIR **from chrysalis-cwl alone** without convert `cwd` hacks and without mass-moving the TypeScript package (which would break convert’s pnpm workspace until a planned flip).

```bash
npm run link:webir   # creates packages/webir → ../chrysalis-convert/packages/webir
npm run smoke:webir  # ModuleBuilder + dialects via load-webir.mjs
```

`packages/webir` is gitignored (local reparse point). After clone: run `link:webir` once (sibling convert + built `dist/` required).

## Resolve order (`scripts/hub-ingest/load-webir.mjs`)

1. `packages/webir/dist/index.js` (junction or future in-tree extract)
2. Sibling `../chrysalis-convert/packages/webir/dist/index.js`
3. `import("@chrysalis/webir")` when a file:/workspace dep is installed

No `process.cwd()`-relative convert hack on the pillar path.

## Convert `loadWebir` (Slice 3.3 — done)

Convert `scripts/hub-ingest/shared.mjs` no longer requires `process.cwd()` to be convert root:

1. `CONVERT_ROOT/packages/webir/dist/index.js` (from `import.meta.url`)
2. `cwd/packages/webir/dist/index.js` (legacy hub smokes)
3. `import("@chrysalis/webir")`

Verified: `npm run hub:cwl-language-pillar-smoke` from convert + nested-cwd `loadWebir` sanity.

## Next step — ownership flip (still deferred)

**Flip =** physical package lives here; convert’s `packages/webir` becomes a junction/`file:` dep **→** chrysalis-cwl.

**Remaining Slice 3 blockers:**

| # | Blocker |
| --- | --- |
| 3.1 | Physical `git mv` packages/webir → chrysalis-cwl |
| 3.2 | Convert replace tree with junction / `file:` / published dep |
| 3.4 | Retarget pillar `runtime-cwl*` `workspace:*` (need real workspace or `file:`) |
| 3.5 | Retire PHP_converter webir leftovers |

Unsafe without coordinating those: convert pnpm workspace (`packages/*`) + ~14 packages on `"@chrysalis/webir": "workspace:*"`; ~95 files under convert `packages/webir`.

See [`docs/history/WEBIR-EXTRACT-PLAN.md`](../docs/history/WEBIR-EXTRACT-PLAN.md) Slice 3.

## Related

| Item | Role |
| --- | --- |
| `npm run link:webir` | `scripts/link-webir.mjs` |
| `npm run smoke:webir` | `scripts/smoke-webir-resolve.mjs` |
| Loader | `scripts/hub-ingest/load-webir.mjs` |
| Plan | `docs/history/WEBIR-EXTRACT-PLAN.md` |
| Roadmap | Phase 0.3 in `docs/history/ROADMAP.md` |
