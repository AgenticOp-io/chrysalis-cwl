# RFC-0031 deepen — conditional markup inside repeats (`if` on item field)
module html_repeat_if;

@page GET "/sessions"
page sessions {
  effects: none;
  load { sessions: "live" };
  repeat sessions as s if s.active html "<tr><td>s.user</td></tr>";
  return html "<table>sessions</table>";
}
