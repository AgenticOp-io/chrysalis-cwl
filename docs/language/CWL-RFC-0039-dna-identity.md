# CWL-RFC-0039 — DNA identity (replace · peel · capability)

**Status:** Accepted · Tip **1.0.82**  
**Gold:** `fixtures/language-gold/91-dna-identity/routes.cwl`

## Why this is unique

Other web languages describe *how* a handler runs. None declare, in the page language itself:

1. **Which live URL this surface replaces**
2. **Which origin peel the meaning was heard from**
3. **Which capabilities the surface is allowed to use**
4. **That the page is complete without a client island**

That is Rosetta DNA: replace any web page, remember where it came from, and bind privacy/network intent without inventing runtimes.

## Syntax

```cwl
@page GET "/invoice"
page invoice {
  effects: none;
  replaces "https://legacy.example/invoice.php";
  from peel "php" at "legacy/invoice.php";
  capability cookies;
  capability network-same-origin;
  works without client;
  return html "<main>Invoice</main>";
}
```

| Statement | Meaning |
| --- | --- |
| `replaces "<url>";` | This surface replaces that live URL (absolute `http(s)` or same-site path) |
| `from peel "<stack>" at "<path>";` | Convert heard meaning from that stack at that origin path |
| `capability <class>;` | Closed set: `cookies` · `network-same-origin` · `network-cross-origin` · `storage` · `client` |
| `works without client;` | Progressive certificate: HTML/effects suffice; no required island |

## Holes

| Reason | When |
| --- | --- |
| `cwl:replaces-not-url` | Bad `replaces` href |
| `cwl:peel-not-identity` | Bad peel stack id or empty `at` |
| `cwl:unknown-capability` | Capability not in the closed set |

## Non-goals

- Enforcing capabilities in a browser (host / Secure consume the facts)
- Inventing peel runtimes or migration engines
- Hydration or client frameworks

## Prove

```bash
npm run test:language
```
