# RFC-0041 — page form file + enctype multipart (tip 1.0.84)
module page_form_multipart;

layout site {
  form upload method post action "/upload" enctype multipart;
  field resume "file";
  field note "text";
  submit "Upload";
  chrome html """
<!doctype html>
<html>
<body>
<!-- cwl:form upload -->
<!-- cwl:body -->
</body>
</html>
""";
}

layout refuse {
  hole cwl:file-needs-multipart;
  hole cwl:multipart-not-get;
  chrome html "<p>no</p>";
}

@page GET "/upload"
page upload {
  effects: none;
  replaces "https://legacy.example/upload";
  from peel "express" at "routes/upload.js";
  capability network-same-origin;
  works without client;
  layout site;
  return html "<main><h1>Upload</h1></main>";
}

@page GET "/refuse"
page refuse {
  effects: none;
  layout refuse;
  return html "<p>refuse</p>";
}

@route POST "/upload"
handler receive {
  effects: none;
  use urlencoded;
  multipart file resume;
  multipart field note;
  return { ok: true };
}
