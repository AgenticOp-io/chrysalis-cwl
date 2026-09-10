# SSE single-shot surface (RFC-0027)
module stream_sse;

@route GET "/events"
handler events {
  effects: none;
  stream sse;
  return { ok: true, tick: 1 };
}
