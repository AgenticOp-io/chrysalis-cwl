# RFC-0020 deepen — named db.read / db.write table (tip 1.0.48)
module db_table_name;

@route GET "/users"
handler users_list {
  effects: db.read table users;
  return { ok: true, surface: "users" };
}

@route POST "/users"
handler users_write {
  effects: auth.require, db.write table users;
  return { ok: true, surface: "users_write" };
}

@route GET "/catalog"
handler catalog {
  effects: db.read;
  return { ok: true, surface: "catalog" };
}
