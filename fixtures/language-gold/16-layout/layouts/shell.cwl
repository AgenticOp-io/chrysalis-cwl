# Shared layout fragment (RFC-0011)
module shell;
use json;

@page GET "/about"
page about {
  effects: none;
  return html "<html><body><h1>About</h1></body></html>";
}
