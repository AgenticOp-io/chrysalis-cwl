# CWL language version

| Field | Value |
| --- | --- |
| **Language** | Chrysalis Web Language (CWL) |
| **Version** | `1.0.42` |
| **Status** | RFC-0031 composition — nested repeat + `if`/`else` |
| **Date** | 2026-09-19 |

## What this version means

Phase **1.x** deepen continues (no Nest / LiveView / Flutter façades; no origin-PL dialects):

- **RFC-0031 composition:** one-level nest composes with `if` and `else` on outer and inner (gold `50`)
- No new grammar — proves tips `1.0.39`–`1.0.41` combine honestly
- Prior: one-level nest (`1.0.41`), empty `else` (`1.0.40`), `if` filter (`1.0.39`)

Queue: [`DNA-BUILD-NEXT.md`](./docs/history/DNA-BUILD-NEXT.md) · [`CWL-GENOME-DEEPEN.md`](./docs/language/CWL-GENOME-DEEPEN.md)

## Gate

```bash
npm run build:webir
CWL_REQUIRE_WEBIR=1 npm run test:language
```
