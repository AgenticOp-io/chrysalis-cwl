# RFC-0043 — DNA fingerprint strength sha384+ (tip 1.0.86)
module dna_fingerprint_strong;

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
  dna fingerprint "sha512-AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
  match live;
  title "Invoice";
  return html "<main><h1>Invoice</h1></main>";
}

@route GET "/refuse-weak-fingerprint"
handler refuse_weak {
  effects: none;
  hole cwl:dna-fingerprint-too-weak;
}

@route GET "/refuse-fingerprint"
handler refuse_fp {
  effects: none;
  hole cwl:bad-dna-fingerprint;
}
