# Effects middleware chains (RFC-0020)
# Parser accepts dotted effect names; lowering/verify is convert/runtime authority.
module effects_middleware;

@route GET "/admin"
handler admin_index {
  effects: auth.require, cors.allow, csrf.verify;
  return { ok: true };
}

@route GET "/admin/me"
handler admin_me {
  effects: auth.require;
  return { ok: true, surface: "admin" };
}

@route POST "/admin/session"
handler admin_session {
  effects: auth.require, csrf.verify, session.write;
  return { ok: true };
}
