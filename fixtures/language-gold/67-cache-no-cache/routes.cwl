# RFC-0020 deepen — cache.no-cache (tip 1.0.59)
module cache_no_cache;

@route GET "/feed"
handler feed {
  effects: cache.no-cache;
  return { ok: true, surface: "feed" };
}

@route GET "/dashboard"
handler dashboard {
  effects: cache.no-cache, cache.private;
  return { ok: true, surface: "dashboard" };
}

@route GET "/account"
handler account {
  effects: cache.no-store;
  return { ok: true, surface: "account" };
}
