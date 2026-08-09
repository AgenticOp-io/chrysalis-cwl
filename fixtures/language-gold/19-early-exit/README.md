# `19-early-exit` — RFC-0021

**runtime-ok** — projectable early-exit guards lower to WebIR `data.if` + halt (`__return`).

## Checks

```text
POST /login {"username":"","password":""} → 400 Missing credentials
POST /login {"username":"a","password":"b"} → 200 {"ok":true}  (opaque g_verify_password skipped)
GET /posts → 200 <ul></ul>
GET /posts/x → 404 Post not found  (!post / unbound)
```

Opaque `g_*` residuals are not invented. Foreach bodies stay documentation / empty-iter.
