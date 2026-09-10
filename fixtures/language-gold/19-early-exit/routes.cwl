# Early-exit guards + foreach + else-if (RFC-0021)
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

@route GET "/gate"
handler gate {
  effects: none;
  query mode;
  if mode == "off" {
    status 503;
    return "not ready";
  } else if mode == "maint" {
    status 503;
    return "maintenance";
  }
  return { ready: true };
}

@page GET "/posts"
page posts_list {
  effects: none;
  return html "<ul></ul>";
  foreach posts as p {
    return html "<li>post</li>";
  }
}

@page GET "/post/:id"
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
