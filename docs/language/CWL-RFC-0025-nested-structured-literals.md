# CWL RFC-0025 — Nested structured literals

**Status:** accepted (2026-08-11)  
**Tip:** **1.0.18**  
**Depends on:** RFC-0001 (returns), RFC-0013 (`load { }` object fields)

## Summary

Object and array literals in CWL keep **structured AST** for nested `{ … }` / `[ … ]` values. They must not collapse to opaque JSON blobs (`kind: "literal"` holding a plain object) — that forced runtime `"{unknown-literal}"` and broke Rosetta honesty for nested JSON.

## Syntax

```cwl
@route GET "/api/nested"
handler nested {
  effects: none;
  return { ok: true, meta: { v: 1, tags: ["a", "b"] } };
}
```

Nested fields parse as `kind: "object"` / `kind: "array"` with recursive `entries` / `elements`. Scalar leaves stay `kind: "literal"`.

`load { redirect: "/x" }`, `load { error: 404, message: "…" }`, and `load { id: cookie session_id }` continue to use the same object-field grammar (RFC-0013 v2).

## WebIR

- Nested objects → recursive `__object_literal` calls  
- Nested arrays → `__array_literal`  
- Thin emit reverse projects nested `obj` / `arr` values back to CWL

## Gold

- `fixtures/language-gold/26-nested-literals`  
- `24-dna-bridge` `/api/health` nested `meta: { v: 1 }` executes as JSON

## Non-goals

- Origin-language dialects (Nest DI, LiveView, Flutter) as CWL grammar  
- SQL / vendor SDK bodies as nested literals  
- Silent invention when a field cannot lower — use `hole reason;`
