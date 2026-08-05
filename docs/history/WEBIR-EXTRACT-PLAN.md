# WebIR extract plan (Phase 0.3)

**Owner:** CWL Agent F (language pillar); Slice 2A by Agent H (+ G helpers)  
**Status:** resolve smoke ✅; thin CWL ingest smoke ✅ (`smoke:cwl-ingest`); convert `loadWebir` cwd hack ✅ (Slice 3.3); ownership flip deferred  
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
| Pillar link | `packages/webir` → convert via `npm run link:webir` (junction; gitignored) |

### B. Convert `shared.mjs` → `loadWebir()`

```js
// chrysalis-convert/scripts/hub-ingest/shared.mjs (Slice 3.3+)
const CONVERT_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
// try CONVERT_ROOT/packages/webir/dist → cwd/… → import("@chrysalis/webir")
```

**Was** the convert-only `process.cwd()` path hack; now file-relative with cwd + package fallbacks. Pillar ingest/export still uses `load-webir.mjs`.

### C. Pillar `cwl-ingest.mjs` import graph

Present in chrysalis-cwl (Slice 2A):

| Module | Role |
| --- | --- |
| `cwl-ingest.mjs` | CWL → WebIR lower — imports **local** helpers only |
| `hub-lift-cwl-webir.mjs` | **Thin** CWL-only: `HUB_T`, `hubOrigin`, `lowerHubLiteral`, `emitHubRoute`, page/load lowers, `hubHandlerBodyHole` |
| `hub-t.mjs` | Shared `HUB_T` type literals |
| `hub-cwl-middleware.mjs`, `hub-cwl-auth-presets.mjs`, `hub-cwl-effects.mjs` | CWL middleware / auth / effects (Agent G) |
| `hub-cwl-path-params.mjs` | `extractPathParamsFromCwlPath` + `cwlPathParamsForWebir` |
| `cwl-html-template.mjs`, `cwl-ui-tree.mjs`, `cwl-module-graph.mjs` | Helpers (WebIR via injected `ctx.webir`) |
| `load-webir.mjs` | Pillar WebIR loader (no cwd hack) |
| `export-cwl-webir.mjs` | CLI JSON export — uses `load-webir.mjs` |

**Still convert-only (intentionally):**

| Module | Notes |
| --- | --- |
| `hub-lift-webir-route.mjs` (~755 LOC) | Origin lifts + **COBOL** pattern lowers — convert keeps the fat file; pillar does **not** copy it |
| Convert `shared.mjs` | Convert hub scripts; pillar does not need it for CWL ingest |

Also missing for emit round-trip (later): `hub-webir-routes.mjs`, `hub-native-emit-shared.mjs`.

### D. Runtime bridge

`packages/runtime-cwl/src/load-cwl.ts` spawns `scripts/hub-ingest/export-cwl-webir.mjs` with `cwd: repoRoot`. With pillar `load-webir.mjs` + local ingest helpers, this works when repoRoot is chrysalis-cwl (and `packages/webir` is linked/built).

### E. Interaction with other agents (do not collide)

| Agent | Interaction |
| --- | --- |
| **C (junctions)** | Junctions convert **→** cwl for mirrored **scripts** (`cwl-parser`, print, …). This plan junctions cwl **→** convert for **`packages/webir`** until ownership flips. Do not ask C to mass-move webir. After extract, convert’s `packages/webir` becomes the reverse junction (convert → cwl). **Do not junction** fat `hub-lift-webir-route.mjs` over thin `hub-lift-cwl-webir.mjs`. |
| **D (CLI)** | CLI stays WebIR-free (`parse|print|fmt|diagnose|check`). Ingest/WebIR fmt is a later CLI subcommand after 0.3 exit. |
| **Helix / Secure** | Out of scope. No DNA firewall work here. |

---

## Recommended first slice (DONE)

**Do not mass-move the webir tree.** Link + prove resolve.

1. **Junction / link:** `packages/webir` → `../chrysalis-convert/packages/webir` via `npm run link:webir` (`scripts/link-webir.mjs`). Path is gitignored (local reparse point only).
2. **Pillar loader:** `scripts/hub-ingest/load-webir.mjs` resolves dist relative to pillar root (then sibling convert, then package import) — **no `process.cwd()` hack**.
3. **Smoke:** `npm run smoke:webir` → constructs `ModuleBuilder`, prints dialect presence.
4. **Document blockers** for full ingest (below).

**Not in this slice:** copying `hub-lift-webir-route.mjs`, changing convert `shared.mjs`, moving package ownership, wiring `test:language` to ingest.

---

## Concrete next steps (ordered)

### Slice 1 — Resolve ✅

- [x] Plan doc
- [x] `link:webir` + gitignore `packages/webir`
- [x] `load-webir.mjs` + `smoke:webir`
- [x] ROADMAP 0.3 partial

### Slice 2 — Ingest helpers without forking hub-lift ✅ (Option A)

| Option | Approach | Status |
| --- | --- | --- |
| **A (preferred)** | Thin pillar `hub-lift-cwl-webir.mjs` exporting only what CWL ingest needs. Leave COBOL/origin extras in convert `hub-lift-webir-route.mjs`. | **Done** (Agent H) |
| **B** | Temporary junction/copy of full `hub-lift-webir-route.mjs` | Rejected |
| **C** | Run ingest only with convert cwd | Rejected for 0.3 exit |

Also in Slice 2:

- [x] `cwlPathParamsForWebir` via `hub-t.mjs` (Agent G)
- [x] `export-cwl-webir.mjs` → `load-webir.mjs`
- [x] Gate: `npm run smoke:cwl-ingest` on `fixtures/language-gold/01-literals` → WebIR module + golden snapshot
- [ ] Optional: golden WebIR snapshot file under language-gold (not required for smoke green)
- [ ] Convert optionally re-exports / imports pillar thin core (deferred — convert still uses fat hub-lift; **do not break convert**)

### Slice 3 — Ownership flip

1. Physically move `packages/webir` into chrysalis-cwl (git history: `git mv` from convert when ready). **Not started** — do not flip until (2)+(4) coordinated.
2. Convert: replace tree with junction / `file:` / published dep to pillar. **Not started** (tree still physical under convert).
3. Fix convert `shared.loadWebir` to use package import or path relative to convert root (drop cwd-only hack). **Done (Agent K)** — resolve order: `CONVERT_ROOT` via `import.meta.url` → `process.cwd()` (legacy) → `import("@chrysalis/webir")`. No physical move / no convert→cwl junction yet.
4. Retarget runtime-cwl `workspace:*` via real pillar workspace **or** `file:../webir`. **Open** — pillar still has no pnpm workspace; links often point at convert/PHP_converter leftovers.
5. Retire PHP_converter webir junction leftovers. **Open**.

**Related (not item 3):** convert `shared.loadEmitter` still uses `join(process.cwd(), "packages/emit-…")` — same class of hack; out of scope for WebIR extract item 3.

### Slice 4 — Round-trip + fmt

- Pillar WebIR → CWL (`emit-cwl-from-hub` deps) green under optional `test:ingest`.
- Dual-mode `cwl-fmt` (parse→print default; WebIR mode optional) — explicit decision with convert; do not overwrite convert fmt blindly (constitution §7).

---

## Risks

| Risk | Mitigation |
| --- | --- |
| Mass-move breaks convert CI / hundreds of hub smokes | Link first; flip ownership only after package import works on both sides |
| Fat `hub-lift-webir-route` contaminates language tree | Split CWL core vs origin lifts (Slice 2A) ✅ |
| Agent C junctions overwrite dual-mode path-params / fmt | Keep WebIR helpers out of the always-sync mirror list until dual-mode is agreed |
| Junction not portable / not in git | `link:webir` script; CI must either run link with convert sibling or install file/registry package |
| Two webir trees (convert vs PHP_converter) drift | Single source after Slice 3; smoke hash or version assert |
| `.gitignore` `**/dist/` hides built artifacts | Consumers need built dist or a build step; smoke checks `dist/index.js` |
| Declaring `workspace:*` without pnpm workspace | Prefer `file:./packages/webir` after link, or add a minimal workspace later — do not fake workspace protocol |

---

## Blockers remaining (post Slice 2A + Slice 3.3)

| Item | Status |
| --- | --- |
| Thin hub-lift + G helpers + `load-webir` | **Cleared** — `smoke:cwl-ingest` green from chrysalis-cwl cwd |
| Convert `shared.loadWebir` cwd-only hack | **Cleared (Slice 3.3)** — file-relative convert root + cwd fallback + package import; `hub:cwl-language-pillar-smoke` green |
| `@chrysalis/webir` physical home in pillar | **Open (Slice 3.1)** — do not `git mv` until convert consumers are ready |
| Convert `packages/webir` → pillar junction / `file:` | **Open (Slice 3.2)** — still physical tree under convert |
| Pillar `runtime-cwl*` / `emit-runtime-cwl` `workspace:*` retarget | **Open (Slice 3.4)** — no real pillar pnpm workspace yet |
| PHP_converter webir junction leftovers | **Open (Slice 3.5)** |
| WebIR → CWL emit round-trip under pillar | Open (Slice 4) |
| Convert consuming thin core | Optional; convert fat file unchanged so product gates stay green |
| `shared.loadEmitter` still cwd-based | Open (convert hygiene; not WebIR ownership) |

**Not a blocker for resolve or CWL ingest smoke:** `@chrysalis/webir` dist loads from convert via junction (verified by `smoke:webir` + `smoke:cwl-ingest`).

---

## Commands

```bash
# from chrysalis-cwl
npm run link:webir       # once per clone (needs sibling convert + built dist)
npm run smoke:webir      # ModuleBuilder resolve smoke
npm run smoke:cwl-ingest # parse gold .cwl → lift WebIR (default: 01-literals)
npm run test:language    # unchanged — parse/print/diagnose only
```

---

## Decision log

| Date | Decision |
| --- | --- |
| 2026-08-04 | First slice = link + pillar `loadWebir` + resolve smoke; defer hub-lift split and package move |
| 2026-08-04 | Prefer eventual home of `@chrysalis/webir` in **chrysalis-cwl** (language substrate); convert consumes |
| 2026-08-04 | Do not copy entire convert `shared.mjs` into the pillar |
| 2026-08-04 | Slice 2A: thin `hub-lift-cwl-webir.mjs` (~CWL surface only); no COBOL / fat hub-lift copy; `smoke:cwl-ingest` green |
| 2026-08-04 | Slice 3.3 only: convert `shared.loadWebir` resolves via `import.meta.url` convert root (cwd + package import fallbacks). No physical move / no convert→cwl junction. |
