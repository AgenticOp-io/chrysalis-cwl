# RFC-0029 deepen — named viewport cut (tip 1.0.68)
module site_device_below;

layout site {
  device host mobile desktop below 820;
  chrome html """
<html data-ao-device="<!-- cwl:device -->">
<body>
<!-- cwl:body -->
</body>
</html>
""";
}

layout bare {
  device host mobile desktop below 820;
  chrome html "<p>no</p>";
}

@page GET "/"
page home {
  effects: none;
  layout site;
  return html """
<main><h1>Home</h1></main>
""";
}

@page GET "/bare"
page bare {
  effects: none;
  layout bare;
  return html "<p>bare</p>";
}
