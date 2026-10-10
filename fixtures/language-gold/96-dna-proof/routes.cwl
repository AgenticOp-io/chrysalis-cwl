# RFC-0044 — DNA proof deepen (tip 1.0.87)
module dna_proof;

dna certificate "app.dna.json";
dna fingerprint "sha384-AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
dna fingerprint "sha512-AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
dna bank "dna/";
match live;
match bank;
dna expect enforce;

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
  match bank;
  dna expect shadow;
  title "Invoice";
  return html "<main><h1>Invoice</h1></main>";
}

@route GET "/refuse-match-no-cert"
handler refuse_match {
  effects: none;
  hole cwl:match-without-certificate;
}

@route GET "/refuse-match-bank"
handler refuse_bank_match {
  effects: none;
  hole cwl:match-bank-without-bank;
}

@route GET "/refuse-expect"
handler refuse_expect {
  effects: none;
  hole cwl:dna-expect-unknown;
}
