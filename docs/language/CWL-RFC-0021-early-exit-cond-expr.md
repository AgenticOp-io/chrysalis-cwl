# CWL RFC-0021 — Early-exit condition expressions (minimal slice)

**Status:** accepted (unary `!param` + opaque `g_empty_<name>` slice)  
**Date:** 2026-07-24  
**Depends on:** CWL API surface (`@route` / `handler`), hub PHP→WebIR→CWL projection

## Problem

Migration CWL for tiny-blog projected early-exit PHP guards as opaque `if gN { … }`. Bodies (status + literal return) were origin-faithful, but the condition name carried no origin meaning. Full authored expression `if` / `foreach` remains larger than this slice.

## Minimal slice (shipped)

Project **simple** WebIR conditions into CWL surface text when lowering is honest:

| WebIR shape | CWL surface |
| --- | --- |
| `param === lit` / `==` | `name == <lit>` |
| `param !== lit` / `!=` | `name != <lit>` |
| `!param` / `not param` | `!name` |
| `a \|\| b` / `a && b` of the above | same combinators |

Examples (tiny-blog):

```cwl
if username == "" || password == "" {
  status 400;
  return "Missing credentials";
}
if title == "" || body == "" {
  status 400;
  return "Title and body required";
}
if post == null {
  status 404;
  return "Post not found";
}
```

Comments create (RFC-0021 unary/empty subjects):

```cwl
if g_empty_body {
  status 400;
  return "Comment body required";
}
if !post {
  status 404;
  return "Post not found";
}
```

## Opaque residual (call / member / empty — no invented verify)

Keep an **opaque residual** when the condition includes:

- calls (`verify_password`, …)
- members / indexed access
- session / effect reads
- `empty(param)` (named `g_empty_<name>` when param dominates)
- other unary ops beyond projectable `!param`
- any bool tree that mixes the above with projectable leaves (whole cond stays opaque — no partial CWL evaluate)

Surface naming (documentation aid only):

| Residual | When |
| --- | --- |
| `g_<callee>` | Primary call dominates (e.g. `g_verify_password`) |
| `g_empty_<name>` | No call dominates; `empty(param)` with IDENT param (e.g. `g_empty_body`) |
| `g_member_<path>` | No call/empty dominates; stable IDENT member `attrs.key` chain |
| `gN` | No stable callee / empty param / member path / other opaque |

Hono / WebIR retain full behavior (D6442). Opaque names are a projection aid — **do not invent verify runtime** that evaluates call/member/empty conds in CWL. Classifier: `cwlClassifyOpaqueCond` / `cwlOpaqueCondResidual` / `cwlMemberPathOf` in `hub-webir-routes.mjs`.

Example (tiny-blog login — call dominates over member):

```cwl
if g_verify_password {
  status 401;
  return "Invalid credentials";
}
```

(`user === null || !verify_password(...)` — call+member+unary; opaque residual, not a hole.)

Member-path residual (no call): `$row['password']` / `$user->role` style conds project as `g_member_password` / `g_member_role` when keys are IDENT-safe; dynamic keys stay `gN`.

## Authored CWL → WebIR evaluate (1.0.8+)

Pillar ingest (`cwl-control-lower.mjs` / `wrapWithEarlyGuards`) lowers **projectable** authored guards into WebIR for `simulateHandler`:

- `IDENT ==|!= lit`, `!IDENT`, `&&` / `||` of those → `data.ifElse` + `web.request.response` + `__return` halt
- Nested stmt-list `if` inside guards
- Opaque `g_*` residuals are **skipped** (no invented verify)
- Unbound idents (e.g. `!post`) bind as `data.param` → simulate `null`

### 1.0.9 deepen

- Projectable `else` / `else if` (incl. same-line `} else`) → WebIR `ifElse.else` chain; opaque else-if skips the whole construct
- Top-level `foreachBindings` → `data.foreach` after success chrome (`appendForeachBindings`); empty/non-array iterable skips under simulate
- Page early-exit HTML proved on unshadowed path (`/post/:id`)

### 1.0.10 thin emit reverse

Pillar `hub-emit-cwl-webir.mjs` + `cwl-emit-control.mjs` project ingest-tagged control back to CWL (`if` / `else` / `foreach`). Opaque `g_*` never re-invented (absent from IR after forward skip).

Does not claim foreach N-iteration HTML or opaque call evaluate.

## Stmt-level `foreach` + collection binding

When WebIR `data.foreach` iterable is a simple **param** and the item name is a valid IDENT, emit:

```cwl
foreach posts as p {
  return html "<li>…origin literal chrome…</li>";
}
```

(Parser skips the block like `if` guards.) Outer page `return html` no longer unrolls the loop body once into the page chrome — binding documents the collection. Emit places `foreach` **after** the page return so ST/chrome extractors keep the outer HTML return as authority.

### Landed (pillar language-gold — tip 1.0.14+)

| Surface | Proof |
| --- | --- |
| Nested `if` / `else` inside guards + foreach | `fixtures/language-gold/23-nested-control` ingest + emit |
| Nested `foreach` after `return` (docs IR) | Same gold — empty-iter honesty; no N-iteration HTML claim |
| Opaque `g_*` | Skipped on lower; diagnose `opaque-residual` (info) |

### Remaining gap (Convert / origin — not language invent)

1. **Dynamic foreach leaves** — still omitted (D6442).
2. **Body chrome** — **one** origin sample, not N iterations — no CWL/verify loop evaluate.
3. **Non-param iterable** — falls back to prior “inline body once into outer HTML”.
4. **Opaque call evaluate** (`g_verify_*`) — Convert / oracle; language keeps holes/skip.
5. **Foreach N-iteration HTML** — Convert; language docs IR only.

### Related slice (laravel-min ST, 2026-07-24)

Not RFC-0021 grammar, but same projection file (`hub-webir-routes.mjs`):

| WebIR | CWL surface |
| --- | --- |
| `session_start` / session boot calls | Elided (middleware); `effects: session.read` / `session.write` from effect nodes (RFC-0007) |
| `echo __ternary(cond, thenLit, elseLit)` | `if <cond\|opaque> { return then; }` + fallthrough `else` lit |

Dynamic session/csrf leaves mid-HTML still omitted (D6442). Gate: `pnpm run hub:complete-conversion-prove:laravel-min`.

## Grammar delta

```text
if_guard   ::= "if" cond_expr "{" (status | return)* "}"
cond_expr  ::= or_expr | opaque_ident
or_expr    ::= and_expr ("||" and_expr)*
and_expr   ::= unary_expr ("&&" unary_expr)*
unary_expr ::= "!" IDENT | cmp_expr
cmp_expr   ::= IDENT ("==" | "!=") literal
opaque_ident ::= IDENT   (* g_<callee> | g_empty_<name> | g_member_<path> | gN fallback *)
foreach_bind ::= "foreach" IDENT "as" [IDENT "=>"] IDENT "{" (return)* "}"
```

Parser accepts any `if … {` / `foreach … {` header and skips the body (projection / documentation surface). Round-trip Hono verify remains authority for behavior.

## Gates

- `pnpm run hub:complete-conversion-prove:tiny-blog` — ST green with `!param` + `g_empty_<name>` + richer cond text + foreach bindings
- `pnpm run hub:complete-conversion-prove:express` — non-PHP cwl-api ST (no RFC-0021 cond subjects; hole-free routes)
- `pnpm run hub:complete-conversion-prove:symfony` — Symfony attribute `#[Route]` cwl-api ST (final-class `__invoke` body lift)
- `pnpm run hub:complete-conversion-prove:laravel-min` — laravel-min cwl-api ST (session boot elide + ternary lit-branch guards; 20/20 hole-free)
- `pnpm run hub:complete-conversion-prove:python` — first Python Flask cwl-api ST (status tuples + path/query; 20/20 hole-free; no RFC-0021 cond subjects)
- `pnpm run hub:complete-conversion-prove:go` — first Go Gin cwl-api ST (brace-bounded gin.H + string/status/scalar; 20/20 hole-free; no RFC-0021 cond subjects)
- `pnpm run hub:complete-conversion-prove:wisp` — WISP `wisp-ui` ST (UI success template; not an RFC-0021 cond subject)
- Emit: `emit-cwl-from-hub.mjs` via `cwlCondOf` / `cwlOpaqueCondResidual` / foreach bindings in `hub-webir-routes.mjs`
