# RFC-0029 deepen — drawer, device token, named link lists (tip 1.0.65)
module site_shell_behavior;

layout site {
  device host mobile desktop;
  drawer ao-site-nav toggle ao-nav-toggle class is-open panel ao-nav-drawer;
  links primary;
  link home "/" "Home";
  link docs "/docs.html" "Docs";
  link contact "/contact.html" "Start a Pilot" class ao-nav-cta;
  links practice;
  link method "/method.html" "Method";
  link contact "/contact.html" "Contact";
  chrome html """
<!doctype html>
<html data-ao-device="<!-- cwl:device -->">
<body data-ao-page="<!-- cwl:page -->">
<header class="ao-nav" id="ao-site-nav">
<nav class="ao-nav-links ao-nav-links--desktop"><!-- cwl:links primary ao-nav-link ao-nav-link-active --></nav>
<button type="button" class="ao-nav-toggle" aria-expanded="false" aria-controls="ao-nav-drawer">Menu</button>
<div id="ao-nav-drawer" class="ao-nav-drawer">
<nav class="ao-nav-links ao-nav-links--mobile"><!-- cwl:links primary ao-nav-link ao-nav-link-active --></nav>
</div>
</header>
<main>
<!-- cwl:body -->
</main>
<footer>
<nav><!-- cwl:links practice ao-footer-link ao-footer-link-active --></nav>
</footer>
</body>
</html>
""";
}

layout bare {
  device host mobile desktop;
  drawer ao-site-nav toggle ao-nav-toggle class is-open panel ao-nav-drawer;
  links primary;
  link home "/" "Home";
  chrome html "<p>no</p>";
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

@page GET "/bare"
page bare {
  effects: none;
  layout bare;
  return html "<p>bare</p>";
}
