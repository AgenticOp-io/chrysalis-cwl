# CWL ↔ app-dna-v1 bridge gold (RFC-0022)
module dna_bridge;
use auth session;

@page GET "/"
page home {
  effects: none;
  return html "<!doctype html><html><body><h1>Home</h1></body></html>";
}

@route GET "/api/health"
handler health {
  effects: none;
  status 200;
  return { ok: true, surface: "api", meta: { v: 1 } };
}

@route GET "/items/:id"
handler item_show {
  effects: session.read;
  param id;
  query include;
  return { ok: true, id: id };
}

@route POST "/login"
handler login {
  effects: session.write;
  body username;
  body password;
  status 201;
  return { ok: true };
}
