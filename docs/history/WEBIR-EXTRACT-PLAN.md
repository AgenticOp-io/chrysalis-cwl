# WebIR extract plan (Phase 0.3)

**Owner:** CWL Agent F (language pillar)  
**Status:** first slice landed (resolve + smoke); full ingest deferred  
**Constitution:** [`docs/language/CWL-PILLAR-HOME.md`](../language/CWL-PILLAR-HOME.md) §5 / Phase 0.3  
**Convert package today:** `../chrysalis-convert/packages/webir` (`@chrysalis/webir@2.0.2`)

---

## Goal

Make parse → print → **ingest** (CWL → WebIR) runnable from `chrysalis-cwl` alone, without convert-only path hacks, without forking WebIR semantics, and without breaking convert product gates.

**Exit 0.3 (from ROADMAP):** Parse, print, ingest, and at least one WebIR round-trip path runnable from this pillar alone; convert depends on the shared package (not a private fork).

---

## Inventory (how things resolve today)

### A. `@chrysalis/webir` package

| Fact | Detail |
| --- | --- |
| Location | `chrysalis-convert/packages/webir` (also mirrored historically under `PHP_converter`) |
| Shape | Self-contained TypeScript → `dist/`; **no runtime npm deps** |
| Exports | `.`, `./dialects/web-request`, `./dialects/effect`, `./dialects/data` |
| Convert workspace | pnpm `packages/*` → `node_modules/@chrysalis/webir` |
| Pillar runtime packages | `packages/runtime-cwl*` / `emit-runtime-cwl` declare `"@chrysalis/webir": "workspace:*"` but **chrysalis-cwl has no pnpm-workspace**; existing links often point at **PHP_converter** leftovers |

### B. Convert `shared.mjs` → `loadWebir()`

```js
// chrysalis-convert/scripts/hub-ingest/shared.mjs
const webirPkg = join(process.cwd(), "packages/webir/dist/index.js");
return import(pathToFileURL(webirPkg).href);
```

**This is the convert-only path hack.** Scripts only work when `cwd` is the convert (or PHP_converter) monorepo root. Pillar `export-cwl-webir.mjs` imports `./shared.mjs`, which **does not exist** in chrysalis-cwl.

### C. Pillar `cwl-ingest.mjs` import graph

Present in chrysalis-cwl:

| Module | Role |
| --- | --- |
| `cwl-ingest.mjs` | CWL → WebIR lower |
| `cwl-html-template.mjs`, `cwl-ui-tree.mjs`, `cwl-module-graph.mjs` | Helpers (WebIR via injected `ctx.webir`) |
| `hub-cwl-path-params.mjs` | **Language-local** — only `extractPathParamsFromCwlPath` (no WebIR) |
| `export-cwl-webir.mjs` | CLI JSON export — imports missing `shared.mjs` |

**Missing in chrysalis-cwl (present in convert):**

| Module | Why ingest needs it | Notes |
| --- | --- | --- |
| `hub-lift-webir-route.mjs` (~755 LOC) | `HUB_T`, `emitHubRoute`, `lowerHubLiteral`, page/load helpers | Shared with many **non-CWL** origin lifts (PHP/Go/…); COBOL pattern lowers live here |
| `hub-cwl-middleware.mjs` | `liftCwlModuleMiddlewareToWebir` | Small; CWL-specific |
| `hub-cwl-auth-presets.mjs` | `liftCwlAuthPresetsToWebir` | Small; imports `HUB_T` from hub-lift |
| `hub-cwl-effects.mjs` | `cwlEffectsToWebir`, `wrapCwlExecutableEffects` | CWL-specific |
| `shared.mjs` | `loadWebir` | Convert-wide hub helpers; **do not copy whole file** |
| Convert `cwlPathParamsForWebir` | Used by ingest | Lives only on convert copy of `hub-cwl-path-params.mjs` (imports `HUB_T`) |

Also missing for emit round-trip (later): `hub-webir-routes.mjs`, `hub-native-emit-shared.mjs`.

### D. Runtime bridge

`packages/runtime-cwl/src/load-cwl.ts` spawns `scripts/hub-ingest/export-cwl-webir.mjs` with `cwd: repoRoot`. That only works if repoRoot has `packages/webir/dist` **and** the missing hub-lift / shared modules. Today it assumes a convert-shaped monorepo.

### E. Interaction with other agents (do not collide)

| Agent | Interaction |
| --- | --- |
| **C (junctions)** | Junctions convert **→** cwl for mirrored **scripts** (`cwl-parser`, print, …). This plan junctions cwl **→** convert for **`packages/webir`** until ownership flips. Do not ask C to mass-move webir. After extract, convert’s `packages/webir` becomes the reverse junction (convert → cwl). |
| **D (CLI)** | CLI stays WebIR-free (`parse|print|fmt|diagnose|check`). Ingest/WebIR fmt is a later CLI subcommand after 0.3 exit. |
| **Helix / Secure** | Out of scope. No DNA firewall work here. |

---

## Recommended first slice (DONE in this pass)

**Do not mass-move the webir tree.** Link + prove resolve.

1. **Junction / link:** `packages/webir` → `../chrysalis-convert/packages/webir` via `npm run link:webir` (`scripts/link-webir.mjs`). Path is gitignored (local reparse point only).
2. **Pillar loader:** `scripts/hub-ingest/load-webir.mjs` resolves dist relative to pillar root (then sibling convert, then package import) — **no `process.cwd()` hack**.
3. **Smoke:** `npm run smoke:webir` → constructs `ModuleBuilder`, prints dialect presence.
4. **Document blockers** for full ingest (below).

**Not in this slice:** copying `hub-lift-webir-route.mjs`, changing convert `shared.mjs`, moving package ownership, wiring `test:language` to ingest.

---

## Concrete next steps (ordered)

### Slice 1 — Resolve (this pass) ✅

- [x] Plan doc
- [x] `link:webir` + gitignore `packages/webir`
- [x] `load-webir.mjs` + `smoke:webir`
- [x] ROADMAP 0.3 partial

### Slice 2 — Ingest helpers without forking hub-lift (next)

Choose **one** (prefer A):

| Option | Approach | Risk |
| --- | --- | --- |
| **A (preferred)** | Thin pillar `hub-cwl-webir-core.mjs` exporting only what CWL ingest needs (`HUB_T`, `hubOrigin`, `lowerHubLiteral`, `emitHubRoute`, page/load lowers used by CWL). Leave COBOL/origin extras in convert `hub-lift-webir-route.mjs`; convert re-exports or imports pillar core. | Requires careful split + convert sync; Agent C must not junction the fat convert file over a divergent copy |
| **B** | Temporary junction/copy of full `hub-lift-webir-route.mjs` + middleware/auth/effects into pillar | Pulls convert-origin surface into language tree; harder to judge as language |
| **C** | Run ingest only with `NODE_PATH` / spawn into convert cwd | Fails Phase 0.3 exit (“from chrysalis-cwl alone”) |

Also in Slice 2:

- Add `cwlPathParamsForWebir` behind optional WebIR/`HUB_T` import **or** keep extract pure and put WebIR helper next to ingest.
- Point `export-cwl-webir.mjs` at `load-webir.mjs` (not convert `shared.mjs`).
- Gate: `npm run test:ingest` on one language-gold file → golden WebIR snapshot (start with `01-hello` or similar).

### Slice 3 — Ownership flip

1. Physically move `packages/webir` into chrysalis-cwl (git history: `git mv` from convert when ready).
2. Convert: replace tree with junction / `file:` / published dep to pillar.
3. Fix convert `shared.loadWebir` to use package import or `createRequire` from `@chrysalis/webir` (drop cwd hack).
4. Retarget runtime-cwl `workspace:*` via real pillar workspace **or** `file:../webir`.
5. Retire PHP_converter webir junction leftovers.

### Slice 4 — Round-trip + fmt

- Pillar WebIR → CWL (`emit-cwl-from-hub` deps) green under optional `test:ingest`.
- Dual-mode `cwl-fmt` (parse→print default; WebIR mode optional) — explicit decision with convert; do not overwrite convert fmt blindly (constitution §7).

---

## Risks

| Risk | Mitigation |
| --- | --- |
| Mass-move breaks convert CI / hundreds of hub smokes | Link first; flip ownership only after package import works on both sides |
| Fat `hub-lift-webir-route` contaminates language tree | Split CWL core vs origin lifts (Slice 2A) |
| Agent C junctions overwrite dual-mode path-params / fmt | Keep WebIR helpers out of the always-sync mirror list until dual-mode is agreed |
| Junction not portable / not in git | `link:webir` script; CI must either run link with convert sibling or install file/registry package |
| Two webir trees (convert vs PHP_converter) drift | Single source after Slice 3; smoke hash or version assert |
| `.gitignore` `**/dist/` hides built artifacts | Consumers need built dist or a build step; smoke checks `dist/index.js` |
| Declaring `workspace:*` without pnpm workspace | Prefer `file:./packages/webir` after link, or add a minimal workspace later — do not fake workspace protocol |

---

## Blockers for full ingest smoke (current)

Exact missing modules under `chrysalis-cwl/scripts/hub-ingest/`:

1. `hub-lift-webir-route.mjs`
2. `hub-cwl-middleware.mjs`
3. `hub-cwl-auth-presets.mjs`
4. `hub-cwl-effects.mjs`
5. `cwlPathParamsForWebir` on pillar `hub-cwl-path-params.mjs` (intentionally omitted today)
6. `shared.mjs` / export path still expects convert loader (partially addressed by `load-webir.mjs`, not yet wired into `export-cwl-webir.mjs`)

**Not a blocker for resolve:** `@chrysalis/webir` dist loads from convert via junction (verified by `smoke:webir`).

---

## Commands

```bash
# from chrysalis-cwl
npm run link:webir      # once per clone (needs sibling convert + built dist)
npm run smoke:webir     # ModuleBuilder resolve smoke
npm run test:language   # unchanged — parse/print/diagnose only
```

---

## Decision log

| Date | Decision |
| --- | --- |
| 2026-08-04 | First slice = link + pillar `loadWebir` + resolve smoke; defer hub-lift split and package move |
| 2026-08-04 | Prefer eventual home of `@chrysalis/webir` in **chrysalis-cwl** (language substrate); convert consumes |
| 2026-08-04 | Do not copy entire convert `shared.mjs` into the pillar |
