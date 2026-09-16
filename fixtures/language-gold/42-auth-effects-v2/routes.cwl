# RFC-0032 — credential / session intent declared in CWL (host keeps the crypto)
module auth_effects_v2;
use urlencoded;

@route POST "/login"
handler login {
  effects: auth.verify, session.mint;
  body username;
  body password;
  return { ok: true, username: username };
}

@route POST "/logout"
handler logout {
  effects: session.revoke;
  return { ok: true };
}
