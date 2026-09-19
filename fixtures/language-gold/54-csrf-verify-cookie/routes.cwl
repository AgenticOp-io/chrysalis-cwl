# RFC-0020 deepen — CSRF cookie name (tip 1.0.46)
module csrf_verify_cookie;
use urlencoded;

@route POST "/form"
handler form_post {
  effects: csrf.verify cookie csrf;
  body title;
  return { ok: true, title: title };
}

@route POST "/form-default"
handler form_default {
  effects: csrf.verify;
  body title;
  return { ok: true, title: title };
}
