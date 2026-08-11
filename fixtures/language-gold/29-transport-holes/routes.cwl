module transport_holes;

@route GET "/events"
handler events {
  effects: none;
  hole unsupported:sse;
}

@route GET "/ws"
handler ws {
  effects: none;
  hole unsupported:websocket;
}
