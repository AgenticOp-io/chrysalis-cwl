# HTML body + sibling client island (RFC-0030)
module html_page_island;

@page GET "/"
page home {
  effects: none;
  client ui "device" {
    on resize { action "classify-device"; }
  }
  return html "<html data-device='desktop'><body><main>home</main></body></html>";
}
