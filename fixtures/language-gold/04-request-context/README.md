# `04-request-context` — RFC-0004

Ingest / parse gold for `header` + `cookie` bindings. **Not `runtime-ok`.**

## Reproduce (headers → null)

```text
GET /auth  Cookie: session_id=abc  Authorization: Bearer tok
→ 200 {"auth":null,"sid":"abc"}

GET /locale?lang=en  Accept-Language: en-US
→ 200 {"accept":null,"lang":"en"}
```

| Binding | Execute today |
| --- | --- |
| `cookie session_id` | binds (`sid`) |
| `query lang` | binds |
| `header Authorization` / `Accept-Language` | always `null` |

## Why not runtime-ok

Honesty: fixture claims request **headers**, and `@chrysalis/rewrite` `simulateHandler` does not read them.

| Layer | Fact |
| --- | --- |
| Pillar `runtime-cwl` | Has HTTP `Headers`; passes **cookies** into `RequestInput`; no `headers` bag on that contract |
| Convert `@chrysalis/rewrite` | `RequestInput` has no `headers` field; `pickBag(..., "header")` returns `{}` |

Do **not** mark `runtime-ok` or allowlist this fixture until Convert feeds headers through simulate (then a thin pillar pass-through in `buildRequestInput`). No invented header echo in the smoke harness.

See [`docs/history/DNA-STEP-EXECUTE.md`](../../../docs/history/DNA-STEP-EXECUTE.md) § Gaps / Requested.
