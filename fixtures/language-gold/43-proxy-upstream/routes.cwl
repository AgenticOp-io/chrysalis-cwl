# RFC-0033 — the upstream target is meaning; the forward itself stays host-owned
module proxy_upstream;

@route GET "/api/tower-status"
handler tower_status {
  effects: io;
  proxy upstream "https://backend-services.internal/tower-status";
}

@route POST "/api/provision"
handler provision {
  effects: io;
  proxy upstream "https://backend-services.internal/provision";
}
