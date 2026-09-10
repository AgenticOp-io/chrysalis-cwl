# `14-defaults-headers` — param/query defaults + response-header

**runtime-ok** — path/query defaults (`??`) and CWL `response-header` → WebIR response `headers` bag → HTTP response headers.

## Checks

```text
GET /items/x            → 200 {"id":"x","view":"full"}  header cache: hit
GET /items/x?view=short → 200 {"id":"x","view":"short"} header cache: hit
POST /redirect          → 302 {"ok":true}               header location: /items/1
```
