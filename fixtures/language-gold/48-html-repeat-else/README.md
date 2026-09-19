# `48-html-repeat-else` — RFC-0031 deepen (tip 1.0.40)

When a filtered repeat yields no items, the page still needs markup — not a blank hole.
`else html "…"` is that empty-collection fragment. It is not a sorter, paginator, or nested repeat.

| Route | Surface |
| --- | --- |
| `GET /sessions` | `repeat … if s.active html "…" else html "…"` |

`empty` lowers as a named `__cwl_html_repeat` arg (literal `html.template`); emit reverses `else html` exactly.
