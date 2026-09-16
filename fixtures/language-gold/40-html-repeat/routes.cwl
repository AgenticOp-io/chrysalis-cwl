# RFC-0031 — repeated markup per collection item (replaces host-filled list fragments)
module html_repeat;

@page GET "/pops"
page pops {
  effects: none;
  load { pops: "catalog" };
  repeat pops as pop html "<li>pop</li>";
  return html "<h1>POPs</h1><ul>pops</ul>";
}

