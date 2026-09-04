# `05-request-body` — RFC-0005

**runtime-ok** — `body` fields bind from JSON (or urlencoded) request bodies via `RequestInput.post`.

## Checks

```text
POST /items  Content-Type: application/json  {"title":"Widget","qty":3}
→ 200 {"ok":true,"title":"Widget","qty":"3"}

POST /echo  Content-Type: application/json  {"message":"hi"}
→ 200 {"message":"hi"}
```

Missing body fields bind `null`. No invented echo.
