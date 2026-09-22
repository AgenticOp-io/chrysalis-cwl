# RFC-0020 deepen — cache.max-age (tip 1.0.51)
module cache_max_age;

@route GET "/static/logo"
handler logo {
  effects: cache.max-age 86400;
  content-type "image/png";
  hole hub-cwl:binary-render;
}

@route GET "/api/fresh"
handler fresh {
  effects: cache.max-age 0;
  return { ok: true, surface: "fresh" };
}
