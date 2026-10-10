# CWL-RFC-0044 — DNA proof deepen (multi-fingerprint · match bank · expect)

**Status:** Accepted · Tip **1.0.87**  
**Gold:** `fixtures/language-gold/96-dna-proof/routes.cwl`  
**Deepens:** [RFC-0042](./CWL-RFC-0042-dna-fingerprint.md) · [RFC-0043](./CWL-RFC-0043-dna-fingerprint-strong.md)

## Why

Secure tip **1.0.86** consumes DNA binds as bridge document facts (`cwl_dna_certificate` / `cwl_dna_fingerprint` / `cwl_dna_bank` / `cwl_match_live`) and refuses weak digests. Tip **1.0.87** expands the **genome side** of that contract so Convert and Secure can:

1. **Declare dual digests** — multiple `dna fingerprint` lines (sha384 + sha512) for long-lived binds  
2. **Expect bank proof** — `match bank;` means proof against the module DNA bank, not only live traffic  
3. **Name expected Helix mode** — `dna expect promote|shadow|enforce;` is a document fact; Secure owns promote/shadow/enforce  
4. **Refuse unbound match** — `match live` / `match bank` without a certificate is a hole

CWL still does not invent digests, PQ signatures, or Helix runtimes.

## Syntax

```cwl
module invoice_site;

dna certificate "app.dna.json";
dna fingerprint "sha384-…";
dna fingerprint "sha512-…";
dna bank "dna/";
match live;
match bank;
dna expect enforce;

@page GET "/invoice"
page invoice {
  effects: none;
  dna certificate "app.dna.json";
  dna fingerprint "sha384-…";
  match live;
  match bank;
  dna expect shadow;
  return html "<main>Invoice</main>";
}
```

| Statement | Scope | Meaning |
| --- | --- | --- |
| `dna fingerprint "<sri>";` (repeatable) | module or route | Accumulate strong SRI digests; primary remains first |
| `match bank;` | module or route | Expect Secure proof against module `dna bank` |
| `dna expect promote\|shadow\|enforce;` | module or route | Expected Helix lifecycle mode (document fact) |

## Holes

| Reason | When |
| --- | --- |
| `cwl:match-bank-without-bank` | `match bank` without module `dna bank` |
| `cwl:match-without-certificate` | `match live` / `match bank` without a certificate |
| `cwl:dna-expect-unknown` | Mode outside the closed set |

## Non-goals

- Computing or verifying digests inside CWL  
- Implementing Helix promote / shadow / enforce  
- PQ certificate signing (Secure-owned)  
- Inventing a second DNA IR

## Prove

```bash
npm run test:language
```
