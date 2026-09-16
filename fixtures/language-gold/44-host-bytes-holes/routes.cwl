# Precise host-byte residuals — the media type is CWL, the bytes are not
module host_bytes_holes;

@route GET "/device/:id/qr"
handler device_qr {
  effects: io;
  content-type "image/png";
  hole hub-cwl:binary-render;
}

@route GET "/device/:id/config"
handler device_config {
  effects: io;
  content-type "text/plain; charset=utf-8";
  hole hub-cwl:binary-render;
}

@route POST "/device/:id/keypair"
handler device_keypair {
  effects: io;
  content-type "application/json";
  hole hub-cwl:keypair-gen;
}
