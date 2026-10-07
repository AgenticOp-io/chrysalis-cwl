# CWL RFC-0035 — WebSocket duplex surface

**Status:** accepted (2026-10-06)  
**Tip:** **1.0.79**  
**Replaces:** catalogued `unsupported:websocket` when a named duplex surface is enough

## Summary

Declare a WebSocket upgrade surface without inventing channel runtimes, LiveView façades, or browser WS clients.

## Syntax

```cwl
@route GET "/ws"
handler chat {
  effects: none;
  stream websocket;
  return { ok: true };
}
```

| Construct | Lowering |
| --- | --- |
| `stream websocket;` | Provenance `cwl:stream-websocket` / DNA `cwl_stream: websocket`. Host owns the upgrade bytes and frames. |

Sandbox prove may return the JSON value. Continuous frame pump and client reconnect stay host-side.

## Verify

- Gold `fixtures/language-gold/87-stream-websocket`

## Non-goals

- Phoenix / LiveView / Jetstream façades
- Browser `WebSocket` client invent inside CWL
- Forging duplex when the peel cannot name it — keep `unsupported:websocket`
