# `04-request-context` — RFC-0004

**runtime-ok** — `header` + `cookie` + `query` bind under `simulateHandler` via rewrite `RequestInput.headers` (Convert) + pillar `buildRequestInput` pass-through.

## Checks

```text
GET /auth  Cookie: session_id=abc  Authorization: Bearer tok
→ 200 {"auth":"Bearer tok","sid":"abc"}

GET /locale?lang=en  Accept-Language: en-US
→ 200 {"accept":"en-US","lang":"en"}
```

| Binding | Execute |
| --- | --- |
| `cookie session_id` | binds (`sid`) |
| `query lang` | binds |
| `header Authorization` / `Accept-Language` | binds (lower-case bag keys) |

Missing header names bind `null` — no invented echo.

See [`docs/history/DNA-STEP-EXECUTE.md`](../../../docs/history/DNA-STEP-EXECUTE.md).
