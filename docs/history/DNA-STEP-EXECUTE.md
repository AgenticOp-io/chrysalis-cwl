# DNA step — Execute (runtime from language gold)

**Slice:** language-owned execute smoke  
**Date:** 2026-08-08  
**Version:** additive under Unreleased / execute (no `LANGUAGE_VERSION` bump — LSP owns `0.1.10`)

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

## Why Convert packages still appear

Physical `@chrysalis/webir` / `@chrysalis/rewrite` / `@chrysalis/emit-shared` trees still live under `chrysalis-convert` until the WebIR ownership flip ([`WEBIR-FLIP-REQUESTED.md`](./WEBIR-FLIP-REQUESTED.md), Slice 3.4). Pillar `runtime-cwl` declares `workspace:*` but this repo has no full pnpm workspace for those packages, so bare imports fail without wiring.

The smoke **does not** invent a second runtime. It:

1. Loads CWL via pillar `loadModuleFromCwlFile` → `export-cwl-webir.mjs`
2. Registers ESM resolve hooks to sibling (or `packages/webir`) dist entries
3. Calls pillar `createCwlRuntime` and asserts literal routes

Same honesty pattern as `link:webir` — convert holds physical IR/sim packages; language owns the gold + smoke contract.

## Related gates

| Command | Role |
| --- | --- |
| `npm run smoke:cwl-ingest` | CWL → WebIR snapshot (no execute) |
| `npm run smoke:cwl-emit` | WebIR → CWL round-trip (no execute) |
| `npm run smoke:cwl-runtime-gold` | **Execute** literals via runtime-cwl |
| `npm run test:runtime-cwl` | Package vitest — **currently unwired** in pillar (no `test` script; hub-gold fixtures not in this tree) |

## Gaps (honest)

1. **Dep wiring:** pillar cannot `import("@chrysalis/runtime-cwl")` without hooks / convert workspace — Slice 3.4 open.
2. **`test:runtime-cwl`:** root script runs `npm test --prefix packages/runtime-cwl`, but package has no `test` script and tests reference convert `fixtures/hub-gold-cwl*` (absent here).
3. **Coverage:** only `01-literals` asserted end-to-end; other language-golds may 501 on sim holes — expand later without façades.
4. **Browser / worker / emit-runtime-cwl:** out of this slice.
5. **No Convert emit required** for this execute path — Requested below is wiring/flip, not “must emit to run.”

## Requested (Convert)

- Keep `rewrite` + `emit-shared` + `webir` dists buildable for sibling consume.
- When flipping WebIR / workspace: retarget pillar `runtime-cwl*` deps so `smoke:cwl-runtime-gold` can drop resolve hooks (or keep hooks as fallback).
- Do not treat convert hub-gold runtime tests as language SoR — language gold is `fixtures/language-gold/`.
