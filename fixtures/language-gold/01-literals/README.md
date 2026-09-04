# `01-literals` — API literal / object returns

**runtime-ok** — execute via `@chrysalis/runtime-cwl` + `simulateHandler` (`smoke:cwl-runtime-gold` / matrix).

| Route | Expected |
| --- | --- |
| `GET /health` | `200` `true` |
| `GET /ping` | `200` `42` |
| `GET /meta` | `200` `{"ok":true,"version":1}` |
