# Executable effects beyond session presets (RFC-0020 deepen)
# time.now / random lower to effect dialect; mail/db/io/rate.limit are sandbox stubs.
module effects_executable;

@route GET "/clock"
handler clock {
  effects: time.now;
  return { ok: true, surface: "clock" };
}

@route GET "/roll"
handler roll {
  effects: random;
  return { ok: true, surface: "roll" };
}

@route POST "/notify"
handler notify {
  effects: mail.send, rate.limit;
  return { ok: true, surface: "notify" };
}

@route GET "/catalog"
handler catalog {
  effects: db.read, io;
  return { ok: true, surface: "catalog" };
}

@route POST "/write"
handler write_row {
  effects: auth.require, db.write, csrf.verify;
  return { ok: true, surface: "write" };
}
