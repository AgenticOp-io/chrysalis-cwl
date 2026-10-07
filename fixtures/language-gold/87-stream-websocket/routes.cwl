# WebSocket duplex surface (RFC-0035)
module stream_websocket;

@route GET "/ws"
handler chat {
  effects: none;
  stream websocket;
  return { ok: true, channel: "chat" };
}

@route GET "/residual"
handler residual {
  effects: none;
  hole unsupported:websocket;
}
