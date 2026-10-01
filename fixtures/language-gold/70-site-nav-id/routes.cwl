# RFC-0029 deepen — shared nav id distinct from the page name (tip 1.0.62)
module site_nav;

layout site {
  hole unsupported:opaque-script;
  chrome html """
<!doctype html>
<html>
<head>
<!-- cwl:head -->
</head>
<body data-ao-page="<!-- cwl:page -->">
<header class="ao-nav">
<a class="ao-nav-link<!-- cwl:active home ao-nav-link-active -->" href="/">Home</a>
<a class="ao-nav-link<!-- cwl:active docs ao-nav-link-active -->" href="/docs.html">Docs</a>
<a class="ao-nav-link<!-- cwl:active about ao-nav-link-active -->" href="/about.html">About</a>
</header>
<main>
<!-- cwl:body -->
</main>
<footer class="ao-footer">
<a class="ao-footer-link<!-- cwl:active docs ao-footer-link-active -->" href="/docs.html">Docs</a>
<a class="ao-footer-link<!-- cwl:active about ao-footer-link-active -->" href="/about.html">About</a>
</footer>
</body>
</html>
""";
}

@page GET "/"
page home {
  effects: none;
  layout site;
  head html "<title>Home</title>";
  return html """
<section class="hero"><h1>Home</h1></section>
""";
}

@page GET "/paper-cwl.html"
page paper_cwl {
  effects: none;
  layout site;
  nav docs;
  head html "<title>CWL paper</title>";
  return html """
<section class="paper"><h1>CWL</h1></section>
""";
}

@page GET "/whitepaper.html"
page whitepaper {
  effects: none;
  layout site;
  nav about;
  head html "<title>Whitepaper</title>";
  return html """
<section class="paper"><h1>Overview</h1></section>
""";
}
