# Production-readiness probe surfaces (RFC-0015)
# Language gold: query-param HTML + slug page-load — parse/print only.
# Runtime smoke assertions live in convert/runtime gates, not here.
module probes;

@page GET "/search"
page search {
  effects: none;
  query q;
  return html "<p>search: q</p>";
}

@page GET "/blog/:slug"
page blog_show {
  effects: none;
  param slug;
  load { slug: slug, source: "page-server" };
  return html "<h1>Blog</h1><p>slug: slug</p>";
}
