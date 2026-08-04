# Multi-file fragment — meta
module meta_frag;

@route GET "/meta"
handler meta {
  effects: none;
  return { ok: true, version: 1 };
}
