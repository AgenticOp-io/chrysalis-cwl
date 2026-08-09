# Convert rewrite headers — Verified

**Status:** **Done** (Convert rewrite + CWL `runtime-cwl` pass-through) — 2026-08-09  
**From:** CWL pillar (`chrysalis-cwl`)  
**Convert repo:** private [`AgenticOp-io/chrysalis`](https://github.com/AgenticOp-io/chrysalis) (local: `engines/chrysalis-convert`)  
**Related:** [`DNA-STEP-EXECUTE.md`](./DNA-STEP-EXECUTE.md) · fixture [`04-request-context`](../../fixtures/language-gold/04-request-context/README.md) · RFC-0004

## Ask (met)

Extend `@chrysalis/rewrite` `RequestInput` with a `headers` bag and make `pickBag(..., "header")` read it so CWL `04-request-context` can become `runtime-ok`.

## Verified

| Check | Result |
| --- | --- |
| Convert `RequestInput.headers` + `pickBag` | **ok** (`packages/rewrite`) |
| Name-case | lower-case keys preferred; lookup case-insensitive |
| CWL `buildRequestInput` | passes HTTP `Headers` → bag |
| `04-request-context` | **`runtime-ok`**; matrix allowlist |
| `smoke:cwl-runtime-matrix` | **6** fixtures → `CWL_RUNTIME_MATRIX_OK` |

## Reply shape (Convert, already landed)

```text
CONVERT_REWRITE_HEADERS: ok
REWRITE: RequestInput.headers + pickBag header
READY_FOR_CWL: mark 04 runtime-ok · matrix 6
```
