# RFC-0029 deepen — document identity (tip 1.0.69)
module site_document;

layout site {
  charset utf-8;
  viewport device;
  chrome html """
<html>
<head>
<!-- cwl:charset -->
<!-- cwl:viewport -->
<!-- cwl:title -->
<!-- cwl:description -->
<!-- cwl:canonical -->
<!-- cwl:head -->
</head>
<body>
<!-- cwl:body -->
</body>
</html>
""";
}

layout bare {
  charset utf-8;
  viewport device;
  chrome html "<p>no</p>";
}

@page GET "/"
page home {
  effects: none;
  layout site;
  title "Proof · AgenticOps";
  description "Recorded traffic decides.";
  canonical "https://agenticop.io/proof.html";
  head html """
<meta property="og:title" content="Proof" />
""";
  return html """
<main><h1>Proof</h1></main>
""";
}

@page GET "/bare"
page bare {
  effects: none;
  layout bare;
  title "Bare";
  description "Missing slots.";
  canonical "javascript:alert(1)";
  return html "<p>bare</p>";
}
