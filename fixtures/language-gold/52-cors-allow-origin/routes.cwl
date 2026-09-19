# RFC-0020 deepen — named CORS origin (tip 1.0.44)
module cors_allow_origin;

@route GET "/api/public"
handler public_api {
  effects: cors.allow origin https://app.example.com;
  return { ok: true };
}

@route GET "/api/open"
handler open_api {
  effects: cors.allow;
  return { ok: true };
}
