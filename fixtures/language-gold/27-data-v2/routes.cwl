module data_v2;

@page GET "/go"
page go {
  effects: none;
  load { redirect: "/landed" };
  return html "<p>redirected</p>";
}

@page GET "/missing"
page missing {
  effects: none;
  load { error: 404, message: "Not found" };
  return html "<p>missing</p>";
}

@page GET "/who"
page who {
  effects: none;
  load { sessionId: cookie session_id, source: "data-v2" };
  return html "<p>who</p>";
}
