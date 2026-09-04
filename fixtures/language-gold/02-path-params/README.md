# `02-path-params` — RFC-0002

**runtime-ok** — path `:param` binds into object returns under `simulateHandler`.

| Route | Expected |
| --- | --- |
| `GET /items/42` | `200` `{"ok":true,"id":"42"}` |
| `GET /users/u1/items/i9` | `200` `{"userId":"u1","itemId":"i9"}` |
