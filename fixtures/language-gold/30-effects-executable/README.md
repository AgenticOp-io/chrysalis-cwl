# `30-effects-executable` — RFC-0020 deepen

**runtime-ok** — declared effects beyond session presets lower to executable WebIR before the handler body; literal returns stay conclusive under simulate.

| Effect | Lowering |
| --- | --- |
| `time.now` | `effect.time.now` |
| `random` | `effect.random` (sandbox range 0..1) |
| `mail.send` / `db.read` / `db.write` / `io` | `data.call` stubs (no invented mail/DB/runtime) |
| `rate.limit` | `data.call` `__cwl_middleware_rate_limit` (verify no-op) |

Does not claim real mail delivery, SQL, rate enforcement, or Nest/LiveView/Flutter façades.
