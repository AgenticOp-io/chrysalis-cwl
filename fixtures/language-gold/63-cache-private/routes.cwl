# RFC-0020 deepen — cache.private (tip 1.0.55)
module cache_private;

@route GET "/account"
handler account {
  effects: cache.max-age 0, cache.private;
  return { ok: true, surface: "private" };
}

@route GET "/public"
handler public_asset {
  effects: cache.max-age 3600;
  return { ok: true, surface: "shared" };
}
