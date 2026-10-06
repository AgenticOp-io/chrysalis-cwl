# Site 100% contract — genome pages, owned assets, named host effects (tip 1.0.76)
module site_100_contract;

layout site {
  year host;
  device host mobile desktop below 820;
  drawer ao-site-nav toggle ao-nav-toggle class is-open panel ao-nav-drawer;
  style "/agenticops.css";
  image logo "/logo.svg";
  host firebase "agenticop-cwl-demo" public "." error "/404.html";
  charset utf-8;
  chrome html """
<!doctype html>
<html>
<head>
<!-- cwl:charset -->
<!-- cwl:title -->
<!-- cwl:style -->
</head>
<body>
<header id="ao-site-nav">
  <button type="button" class="ao-nav-toggle" aria-expanded="false" aria-controls="ao-nav-drawer">Menu</button>
  <div id="ao-nav-drawer" class="ao-nav-drawer" aria-hidden="true"></div>
</header>
<p>© <!-- cwl:year --></p>
<!-- cwl:device -->
<img src="<!-- cwl:image logo -->" alt="" />
<img src="/cwl-explainer.png" alt="" />
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
  title "Site 100";
  return html """
<section><h1>Contract</h1></section>
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
