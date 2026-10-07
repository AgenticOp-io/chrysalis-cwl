# CWL language version

| Field | Value |
| --- | --- |
| **Language** | Chrysalis Web Language (CWL) |
| **Goal** | DNA of web languages. Tip `1.0.83` deepens named assets with Subresource Integrity, optional module scripts, and crossorigin — document facts that shrink opaque-script without inventing a JS runtime. |
| **Version** | `1.0.83` |
| **Status** | Progressive asset integrity |
| **Date** | 2026-10-06 |

## What this version means

- RFC-0040 + gold `92`: `script` / `style` with `integrity`, optional `module`, optional `crossorigin`
- Emit writes SRI tags from genome facts; CWL does not hash or run the file
- Prior tip **1.0.82:** DNA identity (`replaces` / `from peel` / `capability` / `works without client`)

## Gate

```bash
npm run build:webir
CWL_REQUIRE_WEBIR=1 npm run test:language
```
