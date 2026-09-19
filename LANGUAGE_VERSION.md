# CWL language version

| Field | Value |
| --- | --- |
| **Language** | Chrysalis Web Language (CWL) |
| **Version** | `1.0.43` |
| **Status** | RFC-0032 deepen — session cookie policy attrs |
| **Date** | 2026-09-19 |

## What this version means

Phase **1.x** deepen continues (no Nest / LiveView / Flutter façades; no origin-PL dialects):

- **RFC-0032 deepen:** `session.mint cookie sid httponly secure path / samesite lax` — policy flags, never a token value
- **Gold `51`:** mint with full attrs + revoke with matching `path /`
- Attrs lower as `__object_literal` on the mint/revoke call; emit reverses exactly
- Prior: RFC-0031 composition closed (`1.0.42`), nested repeats (`1.0.41`)

Queue: [`DNA-BUILD-NEXT.md`](./docs/history/DNA-BUILD-NEXT.md) · [`CWL-GENOME-DEEPEN.md`](./docs/language/CWL-GENOME-DEEPEN.md)

## Gate

```bash
npm run build:webir
CWL_REQUIRE_WEBIR=1 npm run test:language
```
