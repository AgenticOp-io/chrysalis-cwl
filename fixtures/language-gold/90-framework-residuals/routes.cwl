# RFC-0038 — framework façade residuals (catalogued; never invent runtimes)
module framework_residuals;

@route GET "/nest"
handler nest {
  effects: none;
  hole unsupported:nest-di;
}

@route GET "/live"
handler live {
  effects: none;
  hole unsupported:liveview;
}

@route GET "/flutter"
handler flutter {
  effects: none;
  hole unsupported:flutter;
}

@route GET "/onion"
handler onion {
  effects: none;
  hole unsupported:middleware-onion;
}

@route POST "/sql"
handler sql {
  effects: none;
  hole unsupported:raw-sql;
}

@route GET "/script"
handler script {
  effects: none;
  hole unsupported:opaque-script;
}
