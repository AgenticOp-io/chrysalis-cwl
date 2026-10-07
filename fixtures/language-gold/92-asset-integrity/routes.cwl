# RFC-0040 — progressive asset integrity (tip 1.0.83)
module asset_integrity;

layout site {
  style "/app.css" integrity "sha384-Abcdefghijklmnopqrstuvwxyz0123456789+/=" crossorigin;
  script "/site.js" integrity "sha384-Abcdefghijklmnopqrstuvwxyz0123456789+/=" crossorigin;
  script "/editor.mjs" module integrity "sha384-Abcdefghijklmnopqrstuvwxyz0123456789+/=";
  chrome html """
<!doctype html>
<html>
<head>
<!-- cwl:style -->
<!-- cwl:script -->
</head>
<body>
<!-- cwl:body -->
</body>
</html>
""";
}

layout refuse {
  hole cwl:bad-integrity;
  hole cwl:bad-asset-url;
  hole cwl:bad-asset-tail;
  chrome html "<p>no</p>";
}

@page GET "/editor"
page editor {
  effects: none;
  replaces "https://legacy.example/editor";
  from peel "express" at "routes/editor.js";
  capability client;
  layout site;
  style "/page.css" integrity "sha256-AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=";
  return html "<main><h1>Editor</h1></main>";
}

@page GET "/refuse"
page refuse {
  effects: none;
  layout refuse;
  return html "<p>refuse</p>";
}

@route GET "/api/health"
handler health {
  effects: none;
  return { ok: true };
}
