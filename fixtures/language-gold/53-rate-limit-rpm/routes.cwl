# RFC-0020 deepen — named rate-limit budget (tip 1.0.45)
module rate_limit_rpm;

@route GET "/api/metered"
handler metered {
  effects: rate.limit rpm 60;
  return { ok: true };
}

@route GET "/api/open"
handler open_api {
  effects: rate.limit;
  return { ok: true };
}
