# RFC-0031 deepen — one-level nested repeat (`outerItem.field`)
module html_repeat_nested;

@page GET "/regions"
page regions {
  effects: none;
  load { regions: "catalog" };
  repeat regions as region html "<section><h2>region.name</h2><ul>towers</ul></section>";
  repeat region.towers as tower html "<li>tower.id</li>";
  return html "<div>regions</div>";
}
