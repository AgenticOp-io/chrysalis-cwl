# Host site emit — static Hosting pages from the genome (tip 1.0.75)
module host_site_emit;

layout site {
  year host;
  device host mobile desktop below 820;
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
<p>© <!-- cwl:year --></p>
<!-- cwl:device -->
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
  title "Demo Home";
  return html """
<section><h1>Host site</h1></section>
""";
}

@page GET "/about.html"
page about {
  effects: none;
  layout site;
  title "About";
  return html """
<section><h1>About</h1></section>
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
