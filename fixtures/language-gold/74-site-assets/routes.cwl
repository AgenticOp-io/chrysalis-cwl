# RFC-0029 deepen — stylesheet, image, Firebase public root (tip 1.0.66)
module site_assets;

layout site {
  style "/agenticops.css";
  image logo "/logo.svg";
  host firebase "agenticops" public "." error "/404.html";
  chrome html """
<!doctype html>
<html>
<head>
<!-- cwl:style -->
</head>
<body>
<img src="<!-- cwl:image logo -->" alt="AgenticOps" />
<main>
<!-- cwl:body -->
</main>
</body>
</html>
""";
}

layout bare {
  style "/agenticops.css";
  image logo "/logo.svg";
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

@page GET "/bare"
page bare {
  effects: none;
  layout bare;
  return html "<p>bare</p>";
}
