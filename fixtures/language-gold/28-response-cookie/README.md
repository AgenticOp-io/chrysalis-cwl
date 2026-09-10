# `28-response-cookie` — response-header with hyphenated Set-Cookie

**runtime-ok** — richer response headers (cookie) without inventing session semantics.

| Route | Expected |
| --- | --- |
| `POST /login` | `200` `{"ok":true}` · `Set-Cookie: session_id=xyz; Path=/; HttpOnly` |
