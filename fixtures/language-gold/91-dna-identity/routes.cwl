# RFC-0039 — DNA identity: replace · peel · capability · progressive certificate
module dna_identity;

@page GET "/invoice"
page invoice {
  effects: none;
  replaces "https://legacy.example/invoice.php";
  from peel "php" at "legacy/invoice.php";
  capability cookies;
  capability network-same-origin;
  works without client;
  title "Invoice";
  return html "<main><h1>Invoice</h1></main>";
}

@route GET "/api/invoice"
handler invoice_api {
  effects: none;
  replaces "/legacy/api/invoice";
  from peel "express" at "routes/invoice.js";
  capability network-same-origin;
  return { ok: true };
}

@route GET "/refuse-replace"
handler refuse_replace {
  effects: none;
  hole cwl:replaces-not-url;
}

@route GET "/refuse-peel"
handler refuse_peel {
  effects: none;
  hole cwl:peel-not-identity;
}

@route GET "/refuse-cap"
handler refuse_cap {
  effects: none;
  hole cwl:unknown-capability;
}
