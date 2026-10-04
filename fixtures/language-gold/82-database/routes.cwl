# Database — named tables and bound row operations (tip 1.0.74)
module db_site;

engine sqlite;

table notes {
  id text key;
  title text;
  open bool;
  body text;
}

table tags {
  note text;
  tag text;
}

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
  effects: db.read table notes;
  layout site;
  title "Board";
  db select notes where open == true as notes;
  db select tags.tag where note == notes.id into notes.tags;
  repeat notes as note html "<li>note.title<ul>tags</ul></li>" else html "<li>No notes</li>";
  repeat note.tags as tag html "<li>tag</li>";
  return html "<main><h1>Board</h1><ul>notes</ul></main>";
}

@page GET "/notes/:id"
page note {
  effects: db.read table notes;
  layout site;
  title "Note";
  param id;
  db select one notes where id == id as note;
  if !note {
    status 404;
    return html "<main><h1>Missing note</h1></main>";
  }
  return html "<article><h1>note.title</h1><p>note.body</p></article>";
}

@page POST "/notes"
page create {
  effects: db.write table notes;
  layout site;
  title "Saved";
  body id;
  body title;
  body open;
  body body;
  db insert notes { id: id, title: title, open: open, body: body };
  db select one notes where id == id as note;
  return html "<article><h1>note.title</h1></article>";
}

@page POST "/notes/:id"
page edit {
  effects: db.write table notes;
  layout site;
  title "Updated";
  param id;
  body title;
  body open;
  db update notes where id == id { title: title, open: open };
  db select one notes where id == id as note;
  return html "<article><h1>note.title</h1></article>";
}

@page POST "/notes/:id/tags"
page tag {
  effects: db.write table tags;
  layout site;
  title "Tagged";
  param id;
  body tag;
  db insert tags { note: id, tag: tag };
  return html "<p>saved</p>";
}

@page DELETE "/notes/:id"
page remove {
  effects: db.write table notes;
  layout site;
  title "Removed";
  param id;
  db delete notes where id == id;
  return html "<p>removed</p>";
}

@page GET "/bad"
page bad {
  effects: none;
  layout site;
  title "Bad";
  db select notes where missing == true as rows;
  return html "<p>kept</p>";
}

@page POST "/nowhere"
page nowhere {
  effects: none;
  layout site;
  title "Nowhere";
  body title;
  db update notes { title: title };
  return html "<p>no</p>";
}

@page GET "/404.html"
page missing {
  effects: none;
  layout site;
  title "Missing";
  return html "<main><h1>Missing</h1></main>";
}
