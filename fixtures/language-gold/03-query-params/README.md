# `03-query-params` — RFC-0003

**runtime-ok** — `query` binds into object returns under `simulateHandler`.

| Route | Expected |
| --- | --- |
| `GET /search?q=hello` | `200` `{"ok":true,"q":"hello"}` |
| `GET /page?page=2&limit=10` | `200` `{"page":"2","limit":"10"}` |
