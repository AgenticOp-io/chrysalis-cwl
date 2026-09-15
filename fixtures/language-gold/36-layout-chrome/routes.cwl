# Layout chrome wrap (RFC-0029) — shared header HTML + layout use on @page
module layout_chrome;

layout shell {
  header User-Agent;
  hole unsupported:opaque-script;
  chrome html "<header class='top'><a href='/cwl'>CWL</a></header>";
}

@page GET "/"
page home {
  effects: none;
  layout shell;
  return html "<main>home</main>";
}

@page GET "/about"
page about {
  effects: none;
  layout shell;
  return html "<main>about</main>";
}
