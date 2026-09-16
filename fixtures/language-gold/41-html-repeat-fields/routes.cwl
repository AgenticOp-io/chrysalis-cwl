# RFC-0031 deepen — item field access inside repeated markup
module html_repeat_fields;

@page GET "/sessions"
page sessions {
  effects: none;
  load { sessions: "live" };
  repeat sessions as s html "<tr><td>s.user</td><td>s.site.city</td></tr>";
  return html "<table>sessions</table>";
}
