# `08-response-content-type` — RFC-0008

**runtime-ok** — authored `content-type` on the WebIR `web.request.response` node is applied on the HTTP response (not invented from body shape).

## Checks

```text
GET /json   → 200  Content-Type: application/json  {"ok":true}
GET /plain  → 200  Content-Type: text/plain; charset=utf-8  (empty body)
POST /items → 201  Content-Type: application/json  {"id":1}
```
