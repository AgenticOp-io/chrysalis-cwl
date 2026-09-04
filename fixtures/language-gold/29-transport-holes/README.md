# Transport holes — WebSocket remains catalogued

Not runtime-ok — duplex WebSocket stays an honest hole until an RFC can lower it without inventing WS framework façades.

SSE single-shot moved to gold `32-stream-sse` (RFC-0027). Multipart named parts are gold `31` (RFC-0026).

| Route | Hole |
| --- | --- |
| `GET /ws` | `unsupported:websocket` |
