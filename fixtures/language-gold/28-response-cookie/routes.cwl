module response_cookie;

@route POST "/login"
handler login {
  effects: none;
  response-header Set-Cookie = "session_id=xyz; Path=/; HttpOnly";
  return { ok: true };
}
