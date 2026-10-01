# RFC-0029 deepen — host calendar year (tip 1.0.63)
module site_year;

layout site {
  hole unsupported:opaque-script;
  year host;
  chrome html """
<!doctype html>
<html>
<body>
<footer class="ao-footer">© <!-- cwl:year --> AgenticOps</footer>
<main>
<!-- cwl:body -->
</main>
</body>
</html>
""";
}

layout bare {
  year host;
  chrome html "<footer>end</footer>";
}

@page GET "/"
page home {
  effects: none;
  layout site;
  return html """
<section class="hero"><h1>Home</h1></section>
""";
}

@page GET "/bare"
page bare {
  effects: none;
  layout bare;
  return html "<p>bare</p>";
}
