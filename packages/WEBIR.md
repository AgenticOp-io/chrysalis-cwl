# `@chrysalis/webir` — home from the CWL pillar

**Canonical eventual home:** this language pillar (`chrysalis-cwl`).  
**Physical tree today:** still in Convert (`../chrysalis-convert/packages/webir`, GitHub `AgenticOp-io/chrysalis` — **private**).  
**Pillar path today:** `packages/webir` → Convert via Windows junction / Unix symlink (`npm run link:webir`).  
**Policy:** **link-until-pnpm** until Convert completes the ownership flip ([`WEBIR-FLIP-REQUESTED.md`](../docs/history/WEBIR-FLIP-REQUESTED.md)).

There is **one** WebIR. CWL does not ship a fork. Private pillars — no public registry assumption for `@chrysalis/webir`.

## Why a junction (current reality)

Phase 0.3 first slices: resolve and construct WebIR **from chrysalis-cwl alone** without Convert `cwd` hacks and without mass-moving the TypeScript package (which would break Convert’s pnpm workspace until the planned flip).

```bash
npm run link:webir   # packages/webir → ../chrysalis-convert/packages/webir
npm run smoke:webir  # ModuleBuilder + dialects via load-webir.mjs
npm run test:ingest  # CWL → WebIR; needs link (or post-flip in-tree package)
npm run test:language:full  # language gates + ingest round-trip + matrix
```

`packages/webir` is **gitignored** (local reparse point). After clone:

1. Clone private sibling Convert (`AgenticOp-io/chrysalis`) next to this repo.
2. Build WebIR there (`pnpm --filter @chrysalis/webir build`).
3. Run `npm run link:webir` once.

`test:language` does **not** require WebIR. Use `test:language:full` when ingest should be included.

`pnpm-workspace.yaml` lists `packages/cwl` today and notes future `packages/webir` **after** Convert-coordinated flip — do not pretend `workspace:*` works for WebIR until that member exists in-tree.

## Resolve order (`scripts/hub-ingest/load-webir.mjs`)

1. `packages/webir/dist/index.js` (junction today; physical tree after flip)
2. Sibling `../chrysalis-convert/packages/webir/dist/index.js` (pre-flip fallback)
3. `import("@chrysalis/webir")` when a `file:` / workspace dep is installed

No `process.cwd()`-relative Convert hack on the pillar path.

## Convert `loadWebir` (Slice 3.3 — done)

Convert `scripts/hub-ingest/shared.mjs` no longer requires `process.cwd()` to be Convert root:

1. `CONVERT_ROOT/packages/webir/dist/index.js` (from `import.meta.url`)
2. `cwd/packages/webir/dist/index.js` (legacy hub smokes)
3. `import("@chrysalis/webir")`

## Next step — ownership flip (Convert)

**Flip =** physical package lives **here**; Convert’s `packages/webir` becomes a junction / `file:` dep → chrysalis-cwl.

| # | Blocker | Owner |
| --- | --- | --- |
| 3.1 | Physical `git mv` packages/webir → chrysalis-cwl | Convert |
| 3.2 | Convert replace tree with junction / `file:` | Convert |
| 3.4 | Retarget CWL `runtime-cwl*` `workspace:*` / enable workspace member | Convert + CWL coord |
| 3.5 | Retire PHP_converter webir leftovers | Convert |

Unsafe without coordinating those: Convert pnpm `packages/*` + many `"@chrysalis/webir": "workspace:*"` consumers.

Actionable checklist + acceptance commands: [`docs/history/WEBIR-FLIP-REQUESTED.md`](../docs/history/WEBIR-FLIP-REQUESTED.md) · DNA Step E: [`docs/history/DNA-STEP-E-WEBIR.md`](../docs/history/DNA-STEP-E-WEBIR.md) · plan: [`WEBIR-EXTRACT-PLAN.md`](../docs/history/WEBIR-EXTRACT-PLAN.md).

## Related

| Item | Role |
| --- | --- |
| `npm run link:webir` | `scripts/link-webir.mjs` |
| `npm run smoke:webir` | `scripts/smoke-webir-resolve.mjs` |
| `npm run test:ingest` | `scripts/smoke-cwl-ingest.mjs` |
| Loader | `scripts/hub-ingest/load-webir.mjs` |
| Private repos | `docs/history/PRIVATE-PILLARS.md` |
