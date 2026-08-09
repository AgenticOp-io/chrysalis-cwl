# `23-nested-control` — RFC-0021

**runtime-ok** — nested `if` stmt lists under early-exit lower + simulate.

## Checks

```text
POST /login empty password → 400 Password required
POST /login empty username only → 400 Missing credentials
POST /login both set → 404 User not found (!user)
GET /posts → <ul></ul>
GET /threads → <div></div>
```
