# `09-fullstack-page` — RFC-0010

**runtime-ok** — `@page` HTML + `@route` API on one module.

## Checks

```text
GET /           → 200 text/html  <!doctype html>…Home…
GET /api/health → 200 {"ok":true,"surface":"api"}
```
