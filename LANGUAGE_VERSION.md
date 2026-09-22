# CWL language version

| Field | Value |
| --- | --- |
| **Language** | Chrysalis Web Language (CWL) |
| **Version** | `1.0.50` |
| **Status** | RFC-0020 deepen — cors.allow methods |
| **Date** | 2026-09-22 |

## What this version means

- **RFC-0020 deepen:** `cors.allow methods GET POST` (+ optional `origin` composition)
- **Gold `58`:** methods-only, origin+methods, bare `cors.allow` unchanged
- Prior tip **1.0.49:** `mail.send template <name>` (gold `57`)
- Tagged after land; prior tags `cwl-v1.0.46` / `cwl-v1.0.47`

## Gate

```bash
npm run build:webir
CWL_REQUIRE_WEBIR=1 npm run test:language
```
