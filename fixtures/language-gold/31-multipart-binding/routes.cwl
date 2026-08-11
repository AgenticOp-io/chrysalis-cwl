# Multipart field/file bindings (RFC-0026)
module multipart_binding;

@route POST "/upload"
handler upload {
  effects: none;
  multipart field title;
  multipart file avatar;
  return { ok: true, title: title, avatar: avatar };
}

@route POST "/meta-only"
handler meta_only {
  effects: none;
  multipart field label;
  return { ok: true, label: label };
}
