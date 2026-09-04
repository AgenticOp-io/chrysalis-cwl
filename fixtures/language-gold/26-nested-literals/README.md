# `26-nested-literals` — structured nested object/array returns (RFC-0025)

**runtime-ok** — nested `__object_literal` / `__array_literal` must simulate to JSON (not `{unknown-literal}`).

| Route | Expected |
| --- | --- |
| `GET /api/nested` | `200` `{"ok":true,"meta":{"v":1,"tags":["a","b"]}}` |
| `GET /api/pair` | `200` `{"outer":{"inner":{"n":2}},"list":[1,2,3]}` |
