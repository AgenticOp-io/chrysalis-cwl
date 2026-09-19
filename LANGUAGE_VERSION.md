# CWL language version

| Field | Value |
| --- | --- |
| **Language** | Chrysalis Web Language (CWL) |
| **Version** | `1.0.41` |
| **Status** | RFC-0031 deepen — one-level nested repeats (`outerItem.field`) |
| **Date** | 2026-09-19 |

## What this version means

Phase **1.x** deepen continues (no Nest / LiveView / Flutter façades; no origin-PL dialects):

- **RFC-0031 deepen:** `repeat outerItem.field as inner html "…"` — one nest under the outer item
- **Gold `49`:** regions → towers; deeper nests (`a.b.c`) stay `hole cwl:invalid-html-repeat-nested`
- Outer item template interpolates the leaf name (`towers`); iterable lowers as `param` → `member`
- Prior: empty `else html` (`1.0.40`), repeat `if` (`1.0.39`), session cookie names (`1.0.38`)

Queue: [`DNA-BUILD-NEXT.md`](./docs/history/DNA-BUILD-NEXT.md) · [`CWL-GENOME-DEEPEN.md`](./docs/language/CWL-GENOME-DEEPEN.md)

## Gate

```bash
npm run build:webir
CWL_REQUIRE_WEBIR=1 npm run test:language
```
