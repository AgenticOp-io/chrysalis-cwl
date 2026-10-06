# Complete CWL marketing site — literal year, CSS menu, owned assets, emit freeze (tip 1.0.78)
module site_complete;

layout site {
  year 2026;
  charset utf-8;
  style "/fonts.css";
  style "/agenticops.css";
  image logo "/logo.svg";
  host firebase "agenticop-cwl-demo" public "." error "/404.html";
  chrome html """
<!doctype html>
<html lang="en">
<head>
<!-- cwl:charset -->
<!-- cwl:title -->
<!-- cwl:style -->
</head>
<body>
<header class="ao-nav" id="ao-site-nav">
  <input type="checkbox" id="ao-nav-open" class="ao-nav-open" />
  <label for="ao-nav-open" class="ao-nav-toggle">Menu</label>
  <div id="ao-nav-drawer" class="ao-nav-drawer"></div>
</header>
<p>© <!-- cwl:year --></p>
<img src="<!-- cwl:image logo -->" alt="" />
<main>
<!-- cwl:body -->
</main>
</body>
</html>
""";
}

@page GET "/"
page home {
  effects: none;
  layout site;
  title "Complete";
  return html """
<section><h1>Complete</h1></section>
""";
}

@page GET "/404.html"
page missing {
  effects: none;
  layout site;
  title "Missing";
  return html """
<section><h1>Missing</h1></section>
""";
}
