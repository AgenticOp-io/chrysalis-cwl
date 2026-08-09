# DNA step — Execute (runtime from language gold)

**Slice:** language-owned execute smoke + matrix  
**Date:** 2026-08-09  
**Version:** tip `1.0.13` — CI WebIR + emit catalog/CLI + LSP snippets; execute matrix unchanged

## What “execute” means today

| Layer | Meaning |
| --- | --- |
| **In this pillar** | CWL → WebIR (ingest / `export-cwl-webir`) → `@chrysalis/runtime-cwl` → `simulateHandler` (`@chrysalis/rewrite`) → HTTP-shaped `fetch` |
| **Not this slice** | Convert emit to Hono/Fastify/Next; Chimera; production SQL/session oracle verify |
| **Honest holes** | Unsupported IR ops → **501** + `cwl-runtime:simulation-inconclusive` (never invented bodies) |

`runtime-cwl` is an in-process **preview / language simulator**, not a full app runtime. Emit + HTTP replay verify remain authoritative for migration claims.

## Smallest green path

```bash
npm run link:webir          # packages/webir → convert (once)
# sibling convert must have built: webir, rewrite, emit-shared
npm run smoke:cwl-runtime-gold
# → CWL_RUNTIME_GOLD_OK
```

Default gold: [`fixtures/language-gold/01-literals/routes.cwl`](../../fixtures/language-gold/01-literals/routes.cwl)

| Route | Expected |
| --- | --- |
| `GET /health` | `200` body `true` |
| `GET /ping` | `200` body `42` |
| `GET /meta` | `200` body `{"ok":true,"version":1}` |

Script: [`scripts/smoke-cwl-runtime-gold.mjs`](../../scripts/smoke-cwl-runtime-gold.mjs)

## Matrix (runtime-ok fixtures)

```bash
npm run smoke:cwl-runtime-matrix
# → CWL_RUNTIME_MATRIX_OK
```

Discovery requires **both**:

1. `runtime-ok` marker in `fixtures/language-gold/<name>/README.md`
2. Allowlisted checks in [`scripts/cwl-runtime-smoke-lib.mjs`](../../scripts/cwl-runtime-smoke-lib.mjs) (`RUNTIME_GOLD_CHECKS`)

Marker without checks (or checks without marker) fails — no silent invented handlers.

| Fixture | Surface |
| --- | --- |
| `01-literals` | literal / object returns |
| `02-path-params` | path `:param` → object |
| `03-query-params` | `query` → object |
| `04-request-context` | `header` + `cookie` + `query` |
| `05-request-body` | JSON / urlencoded `body` |
| `06-response-status` | explicit `status` |
| `07-auth-effects` | session effect wrappers + literals |
| `08-response-content-type` | authored `content-type` |
| `09-fullstack-page` | `@page` HTML + API |
| `10-page-load` | `load` + HTML + `#cwl-page-load` |
| `12-multi-file` | `import` + literal returns |
| `14-defaults-headers` | defaults + `response-header` |
| `15-html-interpolation` | HTML path/load bindings |
| `16-layout` | layout import + page + API |
| `17-ui-v0` | `return ui` + `@component` |
| `18-ui-v1` | islands / events (SSR markers) |

Wired into optional `npm run test:language:full` (stable / fast; needs WebIR + rewrite dists).

## Why Convert packages still appear

**WebIR** physical home is here (`packages/webir`); Convert reverse-homed (junction + `file:` — see [`packages/WEBIR.md`](../../packages/WEBIR.md)). **`@chrysalis/rewrite`** / **`@chrysalis/emit-shared`** remain Convert-owned. Pillar `runtime-cwl` may still need resolve hooks / sibling dists for simulate until Convert gravity cleans workspace pins.

The smoke **does not** invent a second runtime. It:

1. Loads CWL via pillar `loadModuleFromCwlFile` → `export-cwl-webir.mjs`
2. Registers ESM resolve hooks to `packages/webir` (and Convert rewrite/emit-shared when needed)
3. Calls pillar `createCwlRuntime` and asserts allowlisted routes

Language owns the gold + smoke contract; Convert owns rewrite/simulate honesty (e.g. headers).

## Related gates

| Command | Role |
| --- | --- |
| `npm run smoke:cwl-ingest` | CWL → WebIR snapshot (no execute) |
| `npm run smoke:cwl-emit` | WebIR → CWL round-trip (no execute) |
| `npm run smoke:cwl-runtime-gold` | **Execute** default literals gold |
| `npm run smoke:cwl-runtime-matrix` | **Execute** all `runtime-ok` fixtures |
| `npm run test:runtime-cwl` | Package gate → language-gold (`CWL_RUNTIME_CWL_OK`) |

## Gaps (honest)

1. **Dep wiring:** `packages/webir` is local; rewrite/emit-shared still need Convert sibling dists or hooks for full execute smokes.
2. **Coverage:** all language-gold (**25**) including projectable early-exit / else-if, foreach empty-iter IR, and attachment-hole HTML soft-path. Honest limits:
   - Opaque `g_*` / call verify not invented
   - Foreach N-iteration not claimed (empty-iter IR only)
   - Browser island events not claimed
   - Pure `hole` handlers (no return) still **501**
   - Invented CT fallback when CWL omits `content-type`
4. **Browser / worker / emit-runtime-cwl:** out of this slice.
5. **No Convert emit required** for this execute path — keep rewrite/emit-shared dists buildable for sibling consume.

## Requested (Convert)

- Keep `rewrite` + `emit-shared` dists buildable for sibling consume.
- When flipping workspace pins: retarget pillar `runtime-cwl*` deps so smokes can drop resolve hooks (or keep hooks as fallback).
- Do not treat convert hub-gold runtime tests as language SoR — language gold is `fixtures/language-gold/`.
- ~~**`04-request-context` / RFC-0004 headers**~~ — **Done** ([`CONVERT-REWRITE-HEADERS-REQUESTED.md`](./CONVERT-REWRITE-HEADERS-REQUESTED.md)).
