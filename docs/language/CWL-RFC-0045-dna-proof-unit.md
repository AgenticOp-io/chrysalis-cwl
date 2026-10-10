# CWL-RFC-0045 — DNA proof units (lineage · quorum · witness · named proof)

**Status:** Accepted · Tip **1.0.88**  
**Gold:** `fixtures/language-gold/97-dna-proof-unit/routes.cwl`  
**Deepens:** [RFC-0042](./CWL-RFC-0042-dna-fingerprint.md) · [RFC-0043](./CWL-RFC-0043-dna-fingerprint-strong.md) · [RFC-0044](./CWL-RFC-0044-dna-proof.md)

## Why this is beyond other web languages

No mainstream web language treats **traffic DNA identity** as a first-class syntax cell. Tip **1.0.88** packages the bind Secure already consumes into a **named proof unit**: dual digests, quorum, bank proof, expected Helix mode, certificate lineage, superseded fingerprint, external witness URL, and bind scope — then lets any surface `use dna proof <name>;`.

That is Rosetta ↔ phenotype as a heritable genome object. CWL still does not hash, sign, or run Helix. Convert peels; Secure verifies; the language **names the proof**.

## Syntax

```cwl
module invoice_site;

dna proof invoice_v3 {
  certificate "app.dna.json";
  fingerprint "sha384-…";
  fingerprint "sha512-…";
  quorum 2;
  bank "dna/";
  match live;
  match bank;
  expect enforce;
  lineage "dna/invoice_v2.dna.json";
  supersedes "sha384-…prior…";
  witness "https://attest.example/invoice/v3";
  scope path;
}

@page GET "/invoice"
page invoice {
  effects: none;
  use dna proof invoice_v3;
  replaces "https://legacy.example/invoice.php";
  from peel "php" at "legacy/invoice.php";
  return html "<main>Invoice</main>";
}
```

Flat module genes remain (`dna quorum`, `dna lineage`, `dna supersedes`, `dna witness`, `dna scope`) for genomes that do not need a named unit.

| Gene | Meaning |
| --- | --- |
| `dna proof <id> { … }` | Named proof cell (module scope) |
| `use dna proof <id>;` | Surface binds that cell |
| `quorum N` | Require N strong fingerprints (N ≤ count) |
| `lineage "<path\|url>"` | Prior certificate in the succession |
| `supersedes "<sri>"` | Strong fingerprint this proof replaces |
| `witness "<https>"` | External attestation URL (host/Secure fetch) |
| `scope path\|host\|method\|surface` | Bind granularity document fact |

## Holes

| Reason | When |
| --- | --- |
| `cwl:dna-proof-unknown` | `use dna proof` names a missing unit |
| `cwl:dna-proof-duplicate` | Two units share a name |
| `cwl:dna-proof-empty` | Unit has neither certificate nor fingerprint |
| `cwl:dna-quorum-bad` / `cwl:dna-quorum-too-high` | Bad or oversized quorum |
| `cwl:bad-dna-lineage` / `cwl:bad-dna-supersedes` / `cwl:bad-dna-witness` | Bad artifact / SRI / URL |
| `cwl:dna-scope-unknown` | Scope outside the closed set |

## Non-goals

- Computing digests or PQ signatures inside CWL  
- Fetching witnesses or enforcing Helix modes  
- Inventing a second DNA IR or NGFW grammar  
- Global source scrape

## Prove

```bash
npm run test:language
```
