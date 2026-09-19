# RFC-0032 deepen — session cookie policy attrs (never a token value)
module auth_session_cookie_attrs;
use urlencoded;

@route POST "/login"
handler login {
  effects: auth.verify, session.mint cookie sid httponly secure path / samesite lax;
  body username;
  body password;
  return { ok: true, username: username };
}

@route POST "/logout"
handler logout {
  effects: session.revoke cookie sid path /;
  return { ok: true };
}
