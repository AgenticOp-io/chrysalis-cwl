# RFC-0020 deepen — cors.allow credentials (tip 1.0.53)
module cors_allow_credentials;

@route GET "/api/creds"
handler creds {
  effects: cors.allow origin https://app.example.com credentials;
  return { ok: true, surface: "origin_credentials" };
}

@route GET "/api/methods-creds"
handler methods_creds {
  effects: cors.allow methods GET POST credentials;
  return { ok: true, surface: "methods_credentials" };
}

@route GET "/api/open"
handler open_api {
  effects: cors.allow;
  return { ok: true, surface: "bare" };
}
