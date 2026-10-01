# RFC-0006 deepen — same-site redirect (tip 1.0.57)
# Off-site targets are an open-redirect hole.
module redirect_same_origin;
use urlencoded;

@route POST "/login"
handler login {
  effects: auth.verify;
  body username;
  body password;
  redirect "/account";
  return { ok: true };
}

@route POST "/moved"
handler moved {
  effects: none;
  redirect "/home" status 301;
  return { ok: true };
}

@route GET "/out"
handler out {
  effects: none;
  redirect "https://evil.example/phish";
  return { ok: false };
}
