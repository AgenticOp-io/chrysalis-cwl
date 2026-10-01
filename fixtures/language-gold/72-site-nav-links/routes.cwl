# RFC-0029 deepen — shared nav list (tip 1.0.64)
module site_links;

layout site {
  hole unsupported:opaque-script;
  link home "/" "Home";
  link docs "/docs.html" "Docs";
  link contact "/contact.html" "Start a Pilot" class ao-nav-cta;
  chrome html """
<!doctype html>
<html>
<body data-ao-page="<!-- cwl:page -->">
<header class="ao-nav" id="ao-site-nav">
<nav class="ao-nav-links ao-nav-links--desktop"><!-- cwl:links ao-nav-link ao-nav-link-active --></nav>
<button type="button" class="ao-nav-toggle" aria-expanded="false" aria-controls="ao-nav-drawer">Menu</button>
<div id="ao-nav-drawer" class="ao-nav-drawer">
<nav class="ao-nav-links ao-nav-links--mobile"><!-- cwl:links ao-nav-link ao-nav-link-active --></nav>
</div>
</header>
<main>
<!-- cwl:body -->
</main>
</body>
</html>
""";
}

layout bare {
  link home "/" "Home";
  chrome html "<p>no slot</p>";
}

@page GET "/"
page home {
  effects: none;
  layout site;
  return html """
<section class="hero"><h1>Home</h1></section>
""";
}

@page GET "/contact.html"
page contact {
  effects: none;
  layout site;
  return html "<p>Contact</p>";
}

@page GET "/paper-cwl.html"
page paper_cwl {
  effects: none;
  layout site;
  nav docs;
  return html "<p>Paper</p>";
}

@page GET "/bare"
page bare {
  effects: none;
  layout bare;
  return html "<p>bare</p>";
}
