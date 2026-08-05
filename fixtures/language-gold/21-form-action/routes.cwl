# Form-action hole probe (RFC-0016)
# No form-action / actions{} lowering in parser scope — honest catalogued hole only.
module form_action;

@route POST "/notify"
handler notify {
  effects: none;
  hole hub-svelte:form-action;
}

@page GET "/notify"
page notify_form {
  effects: none;
  return html "<form method=\"post\" action=\"/notify\"><button>Notify</button></form>";
}
