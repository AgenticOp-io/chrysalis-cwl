# RFC-0045 — DNA proof units (tip 1.0.88)
module dna_proof_unit;

dna proof invoice_v3 {
  certificate "app.dna.json";
  fingerprint "sha384-AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
  fingerprint "sha512-AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
  quorum 2;
  bank "dna/";
  match live;
  match bank;
  expect enforce;
  lineage "dna/invoice_v2.dna.json";
  supersedes "sha384-BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB";
  witness "https://attest.example/invoice/v3";
  scope path;
}

dna certificate "site.dna.json";
dna fingerprint "sha384-CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC";
dna quorum 1;
dna lineage "dna/site_v1.dna.json";
dna witness "https://attest.example/site";
dna scope host;
match live;
dna expect shadow;

@page GET "/invoice"
page invoice {
  effects: none;
  use dna proof invoice_v3;
  replaces "https://legacy.example/invoice.php";
  from peel "php" at "legacy/invoice.php";
  capability network-same-origin;
  works without client;
  title "Invoice";
  return html "<main><h1>Invoice</h1></main>";
}

@route GET "/refuse-unknown-proof"
handler refuse_proof {
  effects: none;
  hole cwl:dna-proof-unknown;
}

@route GET "/refuse-quorum"
handler refuse_quorum {
  effects: none;
  hole cwl:dna-quorum-too-high;
}

@route GET "/refuse-witness"
handler refuse_witness {
  effects: none;
  hole cwl:bad-dna-witness;
}

@route GET "/refuse-lineage"
handler refuse_lineage {
  effects: none;
  hole cwl:bad-dna-lineage;
}

@route GET "/refuse-supersedes"
handler refuse_supersedes {
  effects: none;
  hole cwl:bad-dna-supersedes;
}
