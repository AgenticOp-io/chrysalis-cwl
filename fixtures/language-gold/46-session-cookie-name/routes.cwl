# RFC-0032 deepen — session.mint / revoke may name the cookie (never a value)
module auth_session_cookie;
use urlencoded;

@route POST "/login"
handler login {
  effects: auth.verify, session.mint cookie sid;
  body username;
  body password;
  return { ok: true, username: username };
}

@route POST "/logout"
handler logout {
  effects: session.revoke cookie sid;
  return { ok: true };
}
