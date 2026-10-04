# Live document — the page HTML is composed per request (tip 1.0.72)
module live_document;

layout site {
  year host;
  charset utf-8;
  chrome html """
<html>
<head>
<!-- cwl:charset -->
<!-- cwl:title -->
</head>
<body>
<p>© <!-- cwl:year --></p>
<!-- cwl:body -->
</body>
</html>
""";
}

@page GET "/hello"
page hello {
  effects: none;
  layout site;
  title "Hello";
  query name;
  return html "<main><h1>Hello name</h1></main>";
}

@page GET "/docs/:slug"
page doc {
  effects: none;
  layout site;
  title "Doc";
  param slug;
  return html "<article>slug</article>";
}

@page GET "/404.html"
page missing {
  effects: none;
  layout site;
  title "Missing";
  return html "<main><h1>Missing</h1></main>";
}
