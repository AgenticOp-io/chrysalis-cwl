# RFC-0031 deepen — empty-collection markup (`else html`)
module html_repeat_else;

@page GET "/sessions"
page sessions {
  effects: none;
  load { sessions: "live" };
  repeat sessions as s if s.active html "<tr><td>s.user</td></tr>" else html "<tr><td>none</td></tr>";
  return html "<table>sessions</table>";
}
