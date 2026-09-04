# `10-page-load` — RFC-0013

**runtime-ok** — `load { … }` + HTML; simulate appends `#cwl-page-load` JSON script.

## Checks

```text
GET /blog/hello → 200 <h1>Blog</h1> + cwl-page-load {"slug":"hello","source":"page-server"}
```
