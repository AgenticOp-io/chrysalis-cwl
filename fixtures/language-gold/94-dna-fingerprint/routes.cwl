# RFC-0042 — DNA certificate · fingerprint · bank · match live (tip 1.0.85; tip 1.0.86 floor sha384+)
module dna_fingerprint;

dna certificate "app.dna.json";
dna fingerprint "sha384-AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
dna bank "dna/";
match live;

@page GET "/invoice"
page invoice {
  effects: none;
  replaces "https://legacy.example/invoice.php";
  from peel "php" at "legacy/invoice.php";
  capability network-same-origin;
  works without client;
  dna certificate "app.dna.json";
  dna fingerprint "sha384-AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
  match live;
  title "Invoice";
  return html "<main><h1>Invoice</h1></main>";
}

@route GET "/api/invoice"
handler invoice_api {
  effects: none;
  replaces "/legacy/api/invoice";
  from peel "express" at "routes/invoice.js";
  capability network-same-origin;
  match live;
  return { ok: true };
}

@route GET "/refuse-fingerprint"
handler refuse_fp {
  effects: none;
  hole cwl:bad-dna-fingerprint;
}

@route GET "/refuse-weak-fingerprint"
handler refuse_weak {
  effects: none;
  hole cwl:dna-fingerprint-too-weak;
}

@route GET "/refuse-certificate"
handler refuse_cert {
  effects: none;
  hole cwl:dna-certificate-not-url;
}

@route GET "/refuse-bank-route"
handler refuse_bank {
  effects: none;
  hole cwl:dna-bank-not-on-route;
}
