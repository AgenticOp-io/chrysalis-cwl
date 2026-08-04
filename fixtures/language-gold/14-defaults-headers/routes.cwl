# Param/query defaults + response-header
module defaults;

@route GET "/items/:id"
handler item_show {
  effects: none;
  param id = "anon";
  query view = "full";
  response-header cache = "hit";
  return { id: id, view: view };
}

@route POST "/redirect"
handler redirect {
  effects: none;
  status 302;
  response-header location = "/items/1";
  return { ok: true };
}
