# Cookie / load device token in HTML (RFC-0014 deepen) — no UA regex in CWL
module html_cookie_device;

@page GET "/"
page home {
  effects: none;
  cookie cp_device;
  load { device: cookie cp_device };
  return html "<html data-device='device'><body><p>class=device cookie=cp_device</p></body></html>";
}
