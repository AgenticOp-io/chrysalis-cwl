# Nested if / else / foreach stmt lists (RFC-0021).
# Honest documentation: foreach empty-iter IR only — no N-iteration HTML claim.
module nested_control;

@route POST "/login"
handler login_nested {
  effects: none;
  body username;
  body password;
  if username == "" || password == "" {
    status 400;
    if password == "" {
      return "Password required";
    } else {
      return "Missing credentials";
    }
  }
  if !user {
    if g_verify_password {
      status 401;
      return "Invalid credentials";
    }
    status 404;
    return "User not found";
  }
  return { ok: true };
}

@page GET "/posts"
page posts_nested_if {
  effects: none;
  return html "<ul></ul>";
  foreach posts as p {
    if p == null {
      return html "<li>missing</li>";
    } else {
      return html "<li>post</li>";
    }
  }
}

@page GET "/threads"
page threads_nested_foreach {
  effects: none;
  return html "<div></div>";
  foreach threads as t {
    return html "<section></section>";
    foreach comments as c {
      return html "<li>comment</li>";
    }
  }
}
