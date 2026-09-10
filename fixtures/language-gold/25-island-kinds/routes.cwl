# Island kinds vocabulary gold (RFC-0024)
# Honest holes — declare Wasm/vendor/opaque; do not invent runtimes.
module island_kinds;

@route GET "/api/health"
handler health {
  effects: none;
  return { ok: true };
}

@page GET "/map"
page map_view {
  effects: none;
  hole unsupported:vendor-sdk;
  return html "<!doctype html><html><body><h1>Map</h1></body></html>";
}

@page GET "/compute"
page compute_view {
  effects: none;
  hole unsupported:wasm-module;
  return html "<!doctype html><html><body><h1>Compute</h1></body></html>";
}

@page GET "/legacy-script"
page legacy_script {
  effects: none;
  hole unsupported:opaque-script;
  return html "<!doctype html><html><body><h1>Legacy</h1></body></html>";
}
