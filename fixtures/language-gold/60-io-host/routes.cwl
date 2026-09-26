# RFC-0020 deepen — named io host (tip 1.0.52)
module io_host;

@route GET "/upstream/status"
handler upstream_status {
  effects: io host api.example.com;
  return { ok: true, surface: "named" };
}

@route GET "/upstream/open"
handler upstream_open {
  effects: io;
  return { ok: true, surface: "bare" };
}
