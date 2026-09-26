# RFC-0034 — cookie purpose (tip 1.0.56)
# Session and an enumerated preference stay useful.
# An undeclared name and samesite none are tracking holes.
module cookie_purpose;

@page GET "/"
page home {
  effects: none;
  cookie theme purpose preference values light dark;
  load { theme: cookie theme };
  return html "<html data-theme='theme'><body><p>class=theme</p></body></html>";
}

@route GET "/me"
handler me {
  effects: auth.require cookie sid;
  cookie sid purpose session;
  return { ok: true };
}

@route POST "/login"
handler login_track {
  effects: session.mint cookie sid httponly secure samesite none;
  return { ok: false };
}

@route GET "/ad"
handler ad {
  effects: none;
  cookie _ga;
  return { ok: false };
}
