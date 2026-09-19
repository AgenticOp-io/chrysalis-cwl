# RFC-0031 deepen — nested repeat composes with `if` + `else`
module html_repeat_nested_filter;

@page GET "/regions"
page regions {
  effects: none;
  load { regions: "catalog" };
  repeat regions as region html "<section><h2>region.name</h2><ul>towers</ul></section>" else html "<p>no regions</p>";
  repeat region.towers as tower if tower.up html "<li>tower.id</li>" else html "<li>offline</li>";
  return html "<div>regions</div>";
}
