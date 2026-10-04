# RFC-0029 deepen — remaining head facts (tip 1.0.71)
module site_head_rest;

layout site {
  image logo "/logo.svg";
  style "/agenticops.css";
  chrome html """
<html>
<head>
<!-- cwl:meta -->
<!-- cwl:icon -->
<!-- cwl:alternate -->
<!-- cwl:jsonld -->
<!-- cwl:preconnect -->
<!-- cwl:style -->
</head>
<body>
<!-- cwl:image logo -->
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
  meta keywords "CWL, WebIR";
  icon logo apple;
  preconnect "https://fonts.googleapis.com" crossorigin;
  alternate "text/plain" "https://agenticop.io/llms.txt" "LLM digest";
  style "https://fonts.googleapis.com/css2?family=Inter&display=swap";
  jsonld """
{"@context":"https://schema.org","@type":"WebPage"}
""";
  return html """
<main><h1>Home</h1></main>
""";
}

@page GET "/bare"
page bare {
  effects: none;
  layout bare;
  icon ghost;
  preconnect "https://fonts.gstatic.com";
  preconnect "javascript:alert(1)";
  alternate "text/plain" "https://agenticop.io/llms.txt" "digest";
  alternate "text/plain" "javascript:alert(1)" "bad";
  jsonld """
{"@type":"WebPage"}
""";
  jsonld """
not-json
""";
  jsonld """
{"@type":"WebPage"}</script><script>
""";
  return html "<p>bare</p>";
}
