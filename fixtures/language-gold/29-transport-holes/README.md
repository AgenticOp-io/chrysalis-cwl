# Transport holes — SSE / WebSocket remain catalogued

Not runtime-ok — honest holes until streaming/duplex RFCs land without inventing EventSource/WS façades.

Multipart **field/file bindings** moved to gold `31-multipart-binding` (RFC-0026). Residual nested/streaming multipart beyond named parts may still use `hole unsupported:multipart;`.

| Route | Hole |
| --- | --- |
| `GET /events` | `unsupported:sse` |
| `GET /ws` | `unsupported:websocket` |
