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
  return { ok: true, surface: "api" };
}

@route GET "/items/:id"
handler item_show {
  effects: session.read;
  param id;
  return { ok: true, id: id };
}

@route POST "/login"
handler login {
  effects: session.write;
  return { ok: true };
}
