# Dynamic site — CWL builds the HTML from the request and host data (tip 1.0.73)
module dynamic_site;

layout site {
  charset utf-8;
  chrome html """
<html>
<head>
<!-- cwl:charset -->
<!-- cwl:title -->
</head>
<body>
<!-- cwl:body -->
</body>
</html>
""";
}

@page GET "/board"
page board {
  effects: none;
  layout site;
  title "Board";
  query view;
  load { notes: "board" };
  if view == "closed" {
    status 503;
    return html "<main><h1>Closed</h1></main>";
  }
  repeat notes as note if note.open html "<li>note.title<ul>tags</ul></li>" else html "<li>No notes</li>";
  repeat note.tags as tag html "<li>tag</li>";
  return html "<main><h1>Board</h1><p>view</p><ul>notes</ul></main>";
}

@page GET "/notes/:id"
page note {
  effects: none;
  layout site;
  title "Note";
  param id;
  load { note: "one" };
  if !note {
    status 404;
    return html "<main><h1>Missing note</h1></main>";
  }
  return html "<article><h1>note.title</h1><p>note.body</p><p>id</p></article>";
}

@page GET "/404.html"
page missing {
  effects: none;
  layout site;
  title "Missing";
  return html "<main><h1>Missing</h1></main>";
}
