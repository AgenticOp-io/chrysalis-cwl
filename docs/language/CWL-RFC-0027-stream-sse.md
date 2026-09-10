# CWL RFC-0027 — Server-Sent Events surface (single-shot)

**Status:** accepted (2026-08-11)  
**Tip:** **1.0.22**  
**Replaces:** catalogued `unsupported:sse` when a named SSE surface is enough

## Summary

Declare an SSE response surface without inventing EventSource clients, continuous duplex runtimes, or framework stream façades.

## Syntax

```cwl
@route GET "/events"
handler events {
  effects: none;
  stream sse;
  return { ok: true, tick: 1 };
}
```

| Construct | Lowering |
| --- | --- |
| `stream sse;` | Response `content-type: text/event-stream` + provenance `cwl:stream-sse` |

Sandbox prove returns the JSON value with that content-type (single shot). Continuous multi-event streams stay out of scope.

## Verify

- Gold `fixtures/language-gold/32-stream-sse`

## Non-goals

- Browser EventSource runtime invent
- LiveView / Phoenix channel façades
- WebSocket duplex (separate gene or honest hole)
