# CWL language version

| Field | Value |
| --- | --- |
| **Language** | Chrysalis Web Language (CWL) |
| **Goal** | DNA of web languages. Tip `1.0.86` raises DNA fingerprint digests to `sha384` / `sha512` so long-lived genome binds keep a stronger Grover margin — without inventing PQ hashes in CWL. |
| **Version** | `1.0.86` |
| **Status** | DNA fingerprint strength |
| **Date** | 2026-10-09 |

## What this version means

- RFC-0043 + gold `95`: `dna fingerprint` requires `sha384-` / `sha512-`; `sha256-` → `cwl:dna-fingerprint-too-weak`
- Asset integrity (RFC-0040) may still declare `sha256`
- Prior tip **1.0.85:** DNA certificate / fingerprint / bank / `match live` (RFC-0042)

## Gate

```bash
npm run build:webir
CWL_REQUIRE_WEBIR=1 npm run test:language
```
