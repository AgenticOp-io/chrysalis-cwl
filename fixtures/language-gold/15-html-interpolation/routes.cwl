# HTML interpolation surface (RFC-0014) — tokens in string are runtime; parse keeps literal
module html_interp;

@page GET "/docs/:slug"
page doc_show {
  effects: none;
  param slug;
  return html "<p>slug: slug</p>";
}

@page GET "/blog/:slug"
page blog_show {
  effects: none;
  param slug;
  load { slug: slug, source: "flagship" };
  return html "<p>slug: slug source: source</p>";
}
