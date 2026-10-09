# CWL-RFC-0042 — DNA certificate · fingerprint · bank · match live

**Status:** Accepted · Tip **1.0.85**  
**Gold:** `fixtures/language-gold/94-dna-fingerprint/routes.cwl`

## Why this deepens DNA

Tip **1.0.82** named *identity facts* (replaces / peel / capability). Tip **1.0.85** binds the genome to **traffic DNA certificates** so Convert and Secure can:

1. **Code identity into a fingerprint** — declare which promoted `app-dna-v1` artifact this genome claims  
2. **Proof against known fingerprints** — name a bank of certificates and an SRI digest  
3. **Expect live-match** — `match live;` means Secure should compare surface to that DNA (host enforces; CWL does not invent Helix)

Other web languages do not declare a traffic DNA certificate as first-class syntax. This is Rosetta ↔ phenotype binding — not a global scrape of all source on Earth.

## Syntax

```cwl
module invoice_site;

dna certificate "app.dna.json";
dna fingerprint "sha256-AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=";
dna bank "dna/";
match live;

@page GET "/invoice"
page invoice {
  effects: none;
  replaces "https://legacy.example/invoice.php";
  from peel "php" at "legacy/invoice.php";
  dna fingerprint "sha256-AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=";
  match live;
  works without client;
  return html "<main>Invoice</main>";
}
```

| Statement | Scope | Meaning |
| --- | --- | --- |
| `dna certificate "<path\|url>";` | module or route | Promoted DNA artifact this genome binds to |
| `dna fingerprint "<sri>";` | module or route | SRI digest of that certificate (host verifies). Tip **1.0.86** / RFC-0043: `sha384` / `sha512` only |
| `dna bank "<path\|url>";` | **module only** | Corpus of known certificates for proof |
| `match live;` | module or route | Expect Secure live-match / cutover against bound DNA |

## Holes

| Reason | When |
| --- | --- |
| `cwl:dna-certificate-not-url` | Bad certificate path/URL |
| `cwl:bad-dna-fingerprint` | Non-SRI fingerprint |
| `cwl:dna-fingerprint-too-weak` | `sha256-` used as DNA fingerprint (RFC-0043) |
| `cwl:dna-bank-not-path` | Bad bank path/URL |
| `cwl:dna-bank-not-on-route` | `dna bank` inside a route/page |

## Non-goals

- Computing or verifying digests inside CWL (host / Secure / CI supply the SRI string)
- Scraping or indexing all source code on the internet
- Inventing Helix learn/enforce runtimes or NGFW modules
- Replacing traffic DNA — CWL binds to it; Helix still owns promote/shadow/enforce

## Prove

```bash
npm run test:language
```
