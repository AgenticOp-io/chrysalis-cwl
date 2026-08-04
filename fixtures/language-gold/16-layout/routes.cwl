# Layout import gold (RFC-0011)
module docs;

import "layouts/shell.cwl";

@page GET "/docs/:slug"
page doc_show {
  effects: none;
  param slug;
  return html "<html><body><h1>Doc</h1><p>slug: slug</p></body></html>";
}

@route GET "/api/docs/:slug"
handler doc_api {
  effects: none;
  param slug;
  return { ok: true, slug: slug };
}
