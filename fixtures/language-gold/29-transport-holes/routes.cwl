module transport_holes;

@route GET "/ws"
handler ws {
  effects: none;
  hole unsupported:websocket;
}
