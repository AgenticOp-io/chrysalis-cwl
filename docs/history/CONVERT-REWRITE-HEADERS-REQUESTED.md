# Convert rewrite headers — Requested

**Status:** Requested — Convert agent owns `@chrysalis/rewrite`  
**From:** CWL pillar (`chrysalis-cwl` @ tip `a688dab`, language **0.1.12**)  
**Convert repo:** private [`AgenticOp-io/chrysalis`](https://github.com/AgenticOp-io/chrysalis) (local: `engines/chrysalis-convert`)  
**Related:** [`DNA-STEP-EXECUTE.md`](./DNA-STEP-EXECUTE.md) · [`DNA-BUILD-NEXT.md`](./DNA-BUILD-NEXT.md) · fixture [`04-request-context`](../../fixtures/language-gold/04-request-context/README.md) · RFC-0004

## Ask (one sentence)

Extend `@chrysalis/rewrite` `RequestInput` with a `headers` bag and make `pickBag(..., "header")` read it so CWL `04-request-context` can become `runtime-ok`.

## Why

Language gold `04-request-context` already parses/ingests `header` bindings. Execute today binds cookies and query; **headers stay `null`**. Proven gap (2026-08-09): `RequestInput` has no `headers` field and `pickBag` `case "header"` returns `{}`. Pillar `runtime-cwl` already sees HTTP `Headers` but cannot feed them honestly until rewrite accepts a bag.

## CWL has done (do not re-implement)

- Fixture + honesty notes: `fixtures/language-gold/04-request-context/`
- Runtime matrix allowlist discipline (`runtime-ok` + `RUNTIME_GOLD_CHECKS`) — no silent invent
- Gap documented in [`DNA-STEP-EXECUTE.md`](./DNA-STEP-EXECUTE.md) § Gaps / Requested

## Convert must do

1. **`RequestInput.headers`** — Add a headers bag on simulate input (name-case policy documented: lower-case keys recommended).
2. **`pickBag(..., "header")`** — Read from that bag instead of returning `{}`.
3. **No façades** — Missing header → bind `null` / absent honestly; do not invent echo bodies for smokes.
4. **Reply** — Convert SHA + note that rewrite dist builds for sibling consume.

## CWL will do after Convert lands (not Convert)

1. Pass HTTP `Headers` → bag in pillar `buildRequestInput`.
2. Mark `04-request-context` **`runtime-ok`** and allowlist checks.
3. Matrix count **5 → 6** (`smoke:cwl-runtime-matrix` → `CWL_RUNTIME_MATRIX_OK`).

## Do not

- Edit `chrysalis-cwl` from Convert to mark `runtime-ok` early
- Invent header values in Convert hub smokes to “look green”
- Fork CWL grammar / RFC-0004 semantics in rewrite

## Acceptance checklist

- [ ] `RequestInput` includes `headers` bag; `pickBag` `case "header"` reads it
- [ ] Name-case policy documented in Convert rewrite notes / types
- [ ] Sibling `@chrysalis/rewrite` dist still builds for CWL runtime gold
- [ ] Reply with Convert SHA to orchestrator / CWL agent
- [ ] **After CWL follow-up:** `04-request-context` is `runtime-ok`; matrix has **6** fixtures

## Reply shape

```text
CONVERT_REWRITE_HEADERS: ok
SHA: <convert commit>
REWRITE: RequestInput.headers + pickBag header
READY_FOR_CWL: mark 04 runtime-ok · matrix 6
```
