module nested_literals;

@route GET "/api/nested"
handler nested {
  effects: none;
  return { ok: true, meta: { v: 1, tags: ["a", "b"] } };
}

@route GET "/api/pair"
handler pair {
  effects: none;
  return { outer: { inner: { n: 2 } }, list: [1, 2, 3] };
}
