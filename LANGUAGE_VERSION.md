# CWL language version

| Field | Value |
| --- | --- |
| **Language** | Chrysalis Web Language (CWL) |
| **Version** | `1.0.40` |
| **Status** | RFC-0031 deepen — empty-collection `else html` on repeats |
| **Date** | 2026-09-19 |

## What this version means

Phase **1.x** deepen continues (no Nest / LiveView / Flutter façades; no origin-PL dialects):

- **RFC-0031 deepen:** `repeat … html "…" else html "…"` — empty-collection markup
- **Gold `48`:** filtered session rows with an empty fallback; golds `40`/`41`/`47` unchanged
- `empty` lowers as a named `__cwl_html_repeat` arg (literal `html.template`); emit reverses `else` exactly
- Prior: repeat `if` filter (`1.0.39`), session cookie names (`1.0.38`)

Queue: [`DNA-BUILD-NEXT.md`](./docs/history/DNA-BUILD-NEXT.md) · [`CWL-GENOME-DEEPEN.md`](./docs/language/CWL-GENOME-DEEPEN.md)

## Gate

```bash
npm run build:webir
CWL_REQUIRE_WEBIR=1 npm run test:language
```
