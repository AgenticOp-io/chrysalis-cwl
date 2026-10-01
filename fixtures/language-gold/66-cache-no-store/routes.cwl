# RFC-0020 deepen — cache.no-store (tip 1.0.58)
module cache_no_store;

@route GET "/account"
handler account {
  effects: cache.no-store, cache.private;
  return { ok: true, surface: "account" };
}

@route GET "/login"
handler login {
  effects: cache.no-store;
  return { ok: true, surface: "login" };
}

@route GET "/asset"
handler asset {
  effects: cache.max-age 86400;
  return { ok: true, surface: "asset" };
}
