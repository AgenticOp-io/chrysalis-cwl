# RFC-0007 / RFC-0020 deepen — auth.require cookie name (tip 1.0.47)
module auth_require_cookie;

@route GET "/me"
handler me {
  effects: auth.require cookie sid;
  return { ok: true, surface: "me" };
}

@route GET "/admin"
handler admin {
  effects: auth.require;
  return { ok: true, surface: "admin" };
}
