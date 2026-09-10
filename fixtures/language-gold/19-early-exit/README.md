# `19-early-exit` — RFC-0021

**runtime-ok** — projectable early-exit / else-if lower to WebIR; top-level foreach IR attached (empty-iter).

## Checks

```text
POST /login {"username":"","password":""} → 400 Missing credentials
POST /login {"username":"a","password":"b"} → 200 {"ok":true}  (opaque g_verify_password skipped)
GET /gate?mode=off → 503 not ready
GET /gate?mode=maint → 503 maintenance
GET /gate → 200 {"ready":true}
GET /posts → 200 <ul></ul>  (foreach posts IR present; empty-iter)
GET /posts/x → 404 Post not found  (!post / unbound)
GET /post/x → 404 <p>missing</p>  (page early-exit HTML; unshadowed path)
```

Opaque `g_*` residuals are not invented. Foreach bodies stay documentation / empty-iter (no N-iteration HTML).
