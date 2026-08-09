# `12-multi-file` — RFC-0009

**runtime-ok** — `import` of sibling CWL modules; same literal returns as `01-literals` after graph load.

| Route | Expected |
| --- | --- |
| `GET /health` | `200` `true` (from `health.cwl`) |
| `GET /ping` | `200` `42` |
| `GET /meta` | `200` `{"ok":true,"version":1}` (from `meta.cwl`) |
