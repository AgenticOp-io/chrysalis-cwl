# RFC-0029 deepen — multi-line page HTML and a document shell (tip 1.0.60)
module site_document;

layout site {
  hole unsupported:opaque-script;
  chrome html """
<!doctype html>
<html>
<head><title>Site</title></head>
<body>
<header class="top">AgenticOps</header>
<main>
<!-- cwl:body -->
</main>
<footer class="end">end</footer>
</body>
</html>
""";
}

@page GET "/"
page home {
  effects: none;
  layout site;
  return html """
<section class="hero">
  <h1>Home</h1>
  <script type="application/ld+json">{"@type":"WebSite","name":"AgenticOps"}</script>
</section>
""";
}
