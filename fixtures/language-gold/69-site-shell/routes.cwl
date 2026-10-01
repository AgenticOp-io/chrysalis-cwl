# RFC-0029 deepen — per-page head, page id, and active class (tip 1.0.61)
module site_shell;

layout site {
  hole unsupported:opaque-script;
  chrome html """
<!doctype html>
<html>
<head>
<link rel="stylesheet" href="/agenticops.css" />
<!-- cwl:head -->
</head>
<body data-ao-page="<!-- cwl:page -->">
<header class="ao-nav">
<a class="ao-nav-link<!-- cwl:active home ao-nav-link-active -->" href="/">Home</a>
<a class="ao-nav-link<!-- cwl:active docs ao-nav-link-active -->" href="/docs.html">Docs</a>
</header>
<main>
<!-- cwl:body -->
</main>
<footer class="ao-footer">end</footer>
</body>
</html>
""";
}

@page GET "/"
page home {
  effects: none;
  layout site;
  head html """
<title>Home</title>
<meta name="description" content="CWL is the DNA of the web" />
""";
  return html """
<section class="hero"><h1>Home</h1></section>
""";
}

@page GET "/docs.html"
page docs {
  effects: none;
  layout site;
  head html """
<title>Docs</title>
<meta name="description" content="CWL papers" />
""";
  return html """
<section class="docs"><h1>Docs</h1></section>
""";
}

@page GET "/bare"
page bare {
  effects: none;
  head html "<title>Bare</title>";
  return html "<p>bare</p>";
}
