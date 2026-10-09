# CWL-RFC-0043 — DNA fingerprint strength (sha384+)

**Status:** Accepted · Tip **1.0.86**  
**Gold:** `fixtures/language-gold/95-dna-fingerprint-strong/routes.cwl`  
**Deepens:** [RFC-0042](./CWL-RFC-0042-dna-fingerprint.md)

## Why

Tip **1.0.85** accepted any SRI form (`sha256` / `sha384` / `sha512`) for `dna fingerprint`. On the eve of large-scale quantum search, SHA-256’s ~128-bit Grover margin is light for a **long-lived genome ↔ traffic DNA bind**. CWL does not invent post-quantum hashes or signatures — those stay on Secure’s certificate. CWL raises the **declared digest floor** for DNA binds only.

Asset integrity (`script` / `style` + `integrity`, RFC-0040) still allows `sha256` — browsers and CDNs use it widely. DNA certificates are different: they bind identity across peels and live-match.

## Syntax (unchanged shape)

```cwl
dna fingerprint "sha384-…";
dna fingerprint "sha512-…";
```

| Digest | DNA fingerprint | Asset integrity |
| --- | --- | --- |
| `sha256-…` | hole `cwl:dna-fingerprint-too-weak` | allowed |
| `sha384-…` | allowed | allowed |
| `sha512-…` | allowed | allowed |
| other | hole `cwl:bad-dna-fingerprint` | hole `cwl:bad-integrity` |

## Holes

| Reason | When |
| --- | --- |
| `cwl:dna-fingerprint-too-weak` | Valid `sha256-` SRI used as `dna fingerprint` |
| `cwl:bad-dna-fingerprint` | Non-SRI or unsupported algorithm |

## Non-goals

- Homegrown or PQ hash algorithms as CWL grammar
- Computing digests inside CWL
- Changing Helix promote / ML-DSA certificate signing (Secure owns that)
- Forbidding sha256 on progressive assets

## Prove

```bash
npm run test:language
```
