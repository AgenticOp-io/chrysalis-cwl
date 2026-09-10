# DNA bridge deepen — SSE / multipart / HEAD (RFC-0022 § deepen 1.0.24)
module dna_bridge_surfaces;

@route GET "/events"
handler events {
  effects: none;
  stream sse;
  return { ok: true, tick: 1 };
}

@route POST "/upload"
handler upload {
  effects: none;
  multipart field title;
  multipart file avatar;
  return { ok: true };
}

@route HEAD "/api/health"
handler health_head {
  effects: none;
  status 200;
  return { ok: true };
}
