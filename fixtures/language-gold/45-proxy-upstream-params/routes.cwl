# RFC-0033 deepen — a forwarded route may carry its path params into the upstream target
module proxy_upstream_params;

@route GET "/api/device/:id/status"
handler device_status {
  effects: io;
  proxy upstream "https://backend-services.internal/device/:id/status";
}

@route GET "/api/site/:site/tower/:tower"
handler site_tower {
  effects: io;
  proxy upstream "https://backend-services.internal/sites/:site/towers/:tower";
}

# `:region` is not a param of this route — parses to cwl:unknown-proxy-param:region
@route GET "/api/pop/:id/health"
handler pop_health {
  effects: io;
  proxy upstream "https://backend-services.internal/pop/:region/health";
}
