# `17-ui-v0` — RFC-0017 / RFC-0018

**runtime-ok** — server-rendered `return ui` trees + `@component` reuse.

## Checks

```text
GET /ui-v0      → 200 <main class="demo">…
GET /ui-v0/card → 200 Card component HTML
GET /ui-v0/Ada  → 200 Card with path prop binding
```
