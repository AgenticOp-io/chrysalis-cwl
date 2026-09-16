# Catalogued host-executor holes (Cinderpath / hub-cwl) — RFC-0012 deepen
module cinderpath_holes;

@route GET "/fragment"
handler fragment {
  effects: none;
  hole hub-cwl:html-fragment;
}

@route POST "/login"
handler login {
  effects: none;
  use urlencoded;
  hole hub-cwl:credential-store;
}

@route GET "/upstream"
handler upstream {
  effects: none;
  hole hub-cwl:upstream-proxy;
}
