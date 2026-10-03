# RFC-0029 deepen — social card (tip 1.0.70)
module site_social;

layout site {
  chrome html """
<html>
<head>
<!-- cwl:meta -->
<!-- cwl:head -->
</head>
<body>
<!-- cwl:body -->
</body>
</html>
""";
}

layout bare {
  chrome html "<p>no</p>";
}

@page GET "/"
page home {
  effects: none;
  layout site;
  meta robots "index, follow";
  meta author "AgenticOps";
  meta theme "#020208";
  meta og type "website";
  meta og site "AgenticOps";
  meta og url "https://agenticop.io/proof.html";
  meta og title "Proof";
  meta og description "Recorded traffic decides.";
  meta og image "https://agenticop.io/logo.svg";
  meta twitter card "summary_large_image";
  meta twitter title "Proof";
  head html """
<script type="application/ld+json">{"@type":"WebPage"}</script>
""";
  return html """
<main><h1>Proof</h1></main>
""";
}

@page GET "/bare"
page bare {
  effects: none;
  layout bare;
  meta robots "noindex";
  meta theme "red";
  meta og image "javascript:alert(1)";
  meta twitter card "tracker";
  return html "<p>bare</p>";
}
