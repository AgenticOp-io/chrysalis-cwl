# Urlencoded form POST body bindings (RFC-0005 + use urlencoded)
module form_urlencoded;
use urlencoded;

@route POST "/signup"
handler signup {
  effects: none;
  body email;
  body name;
  return { ok: true, email: email, name: name };
}

@route POST "/login"
handler login {
  effects: none;
  body username;
  body password;
  return { ok: true, username: username };
}
