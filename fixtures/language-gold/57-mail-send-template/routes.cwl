# RFC-0020 deepen — named mail.send template (tip 1.0.49)
module mail_send_template;

@route POST "/notify/welcome"
handler notify_welcome {
  effects: mail.send template welcome;
  return { ok: true, surface: "welcome" };
}

@route POST "/notify/plain"
handler notify_plain {
  effects: mail.send;
  return { ok: true, surface: "plain" };
}
