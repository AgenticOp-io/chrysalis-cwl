# `16-layout` — RFC-0011

**runtime-ok** — multi-file layout `import` + page HTML + API route.

## Checks

```text
GET /about       → 200 About HTML (from imported layout module)
GET /docs/x      → 200 Doc HTML with path binding
GET /api/docs/x  → 200 {"ok":true,"slug":"x"}
```
