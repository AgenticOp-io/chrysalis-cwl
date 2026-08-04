# Early-exit guards + foreach (RFC-0021)
module early_exit;

@route POST "/login"
handler login {
  effects: none;
  body username;
  body password;
  if username == "" || password == "" {
    status 400;
    return "Missing credentials";
  }
  if g_verify_password {
    status 401;
    return "Invalid credentials";
  }
  return { ok: true };
}

@route GET "/posts/:id"
handler post_show {
  effects: none;
  param id;
  if !post {
    status 404;
    return "Post not found";
  }
  return { ok: true, id: id };
}

@page GET "/posts"
page posts_list {
  effects: none;
  return html "<ul></ul>";
  foreach posts as p {
    return html "<li>post</li>";
  }
}

@page GET "/posts/:id"
page post_view {
  effects: none;
  param id;
  if post == null {
    status 404;
    return html "<p>missing</p>";
  }
  return html "<article></article>";
  foreach comments as c {
    return html "<li>comment</li>";
  }
}
