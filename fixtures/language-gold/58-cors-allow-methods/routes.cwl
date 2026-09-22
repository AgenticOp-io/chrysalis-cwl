# RFC-0020 deepen — named CORS methods (tip 1.0.50)
module cors_allow_methods;

@route GET "/api/public"
handler public_api {
  effects: cors.allow methods GET POST;
  return { ok: true, surface: "methods" };
}

@route GET "/api/app"
handler app_api {
  effects: cors.allow origin https://app.example.com methods GET POST PUT;
  return { ok: true, surface: "origin_methods" };
}

@route GET "/api/open"
handler open_api {
  effects: cors.allow;
  return { ok: true, surface: "bare" };
}
