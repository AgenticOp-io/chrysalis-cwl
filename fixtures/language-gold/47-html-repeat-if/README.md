# `47-html-repeat-if` — RFC-0031 deepen (tip 1.0.39)

Conditional markup inside a repeat: only emit the fragment when an item field is truthy.
The filter is a field chain rooted on the item (`s.active`) — never a free name or expression.

| Route | Surface |
| --- | --- |
| `GET /sessions` | `repeat sessions as s if s.active html "…s.user…"` + `return html` |

`when` lowers to a third `__cwl_html_repeat` arg (member chain); emit reverses `if s.active` exactly.
Sorting, pagination, and nested repeats remain non-goals.
