# CWL language version

| Field | Value |
| --- | --- |
| **Language** | Chrysalis Web Language (CWL) |
| **Version** | `1.0.55` |
| **Status** | RFC-0020 deepen — cache.private |
| **Date** | 2026-09-26 |

## What this version means

- **RFC-0020 deepen:** `cache.private` — Cache-Control private intent
- **Gold `63`:** composes with `cache.max-age`
- Prior tip **1.0.54:** `session.read cookie <name>` / `session.write cookie <name>` (gold `62`)

## Gate

```bash
npm run build:webir
CWL_REQUIRE_WEBIR=1 npm run test:language
```
