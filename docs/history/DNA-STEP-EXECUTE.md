# DNA step — Execute (runtime from language gold)

**Slice:** language-owned execute smoke + matrix  
**Date:** 2026-08-09  
**Version:** additive under Unreleased / execute (no `LANGUAGE_VERSION` bump)

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
| `06-response-status` | explicit `status` |
| `12-multi-file` | `import` + literal returns |

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
| `npm run test:runtime-cwl` | Package vitest — **currently unwired** in pillar (no `test` script; hub-gold fixtures not in this tree) |

## Gaps (honest)

1. **Dep wiring:** `packages/webir` is local; rewrite/emit-shared still need Convert sibling dists or hooks for full execute smokes.
2. **`test:runtime-cwl`:** root script runs `npm test --prefix packages/runtime-cwl`, but package has no `test` script and tests reference convert `fixtures/hub-gold-cwl*` (absent here).
3. **Coverage:** API literal/object/status/path/query/multi-file only. Not yet marked:
   - `04-request-context` — **blocked on Convert `rewrite`**, not pillar smoke. Proven 2026-08-09: cookies bind (`sid`), query binds (`lang`), headers stay `null` (`auth` / `accept`). Root cause: sibling `@chrysalis/rewrite` `RequestInput` has no `headers` field and `pickBag(..., "header")` returns `{}`. Pillar `runtime-cwl` already sees HTTP `Headers` but cannot feed them honestly. Fixture README: [`fixtures/language-gold/04-request-context/README.md`](../../fixtures/language-gold/04-request-context/README.md). Requested: [`CONVERT-REWRITE-HEADERS-REQUESTED.md`](./CONVERT-REWRITE-HEADERS-REQUESTED.md). Do not allowlist until rewrite binds headers.
   - `08-response-content-type` / `14-defaults-headers` — bodies/status often work; **response-header** / CWL `content-type` not honestly applied on `Response` (runtime invents CT from body shape)
   - `05` body / `07` auth / pages / UI / holes — holes correctly **501**; pages/UI not claimed
4. **Browser / worker / emit-runtime-cwl:** out of this slice.
5. **No Convert emit required** for this execute path — Requested below is wiring/flip / simulate honesty, not “must emit to run.”

## Requested (Convert)

- Keep `rewrite` + `emit-shared` + `webir` dists buildable for sibling consume.
- When flipping WebIR / workspace: retarget pillar `runtime-cwl*` deps so `smoke:cwl-runtime-gold` can drop resolve hooks (or keep hooks as fallback).
- Do not treat convert hub-gold runtime tests as language SoR — language gold is `fixtures/language-gold/`.
- **`04-request-context` / RFC-0004 headers:** extend `@chrysalis/rewrite` `RequestInput` with a `headers` bag and make `pickBag` `case "header"` read it (name-case policy documented). After that lands, CWL pillar can pass `Headers` → bag in `buildRequestInput`, mark `runtime-ok`, and allowlist — no Convert emit invent required for that gate. Full ask: [`CONVERT-REWRITE-HEADERS-REQUESTED.md`](./CONVERT-REWRITE-HEADERS-REQUESTED.md).
