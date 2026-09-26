# RFC-0020 deepen — session.read/write cookie name (tip 1.0.54)
module session_access_cookie;

@route GET "/me"
handler me {
  effects: session.read cookie sid;
  return { ok: true, surface: "read" };
}

@route POST "/touch"
handler touch {
  effects: session.write cookie sid;
  return { ok: true, surface: "write" };
}

@route GET "/anon"
handler anon {
  effects: session.read;
  return { ok: true, surface: "bare" };
}
