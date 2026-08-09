# `23-nested-control` — RFC-0021

**runtime-ok** — nested `if` / `else` stmt lists under early-exit lower + simulate; foreach IR empty-iter.

## Checks

```text
POST /login empty password → 400 Password required
POST /login empty username only → 400 Missing credentials  (nested else)
POST /login both set → 404 User not found (!user)
GET /posts → <ul></ul>  (foreach IR present; empty-iter)
GET /threads → <div></div>  (nested foreach IR; empty-iter)
```
