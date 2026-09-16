# `40-html-repeat` — RFC-0031

Repeated markup is a CWL gene now, not a host-filled fragment: `repeat <collection> as <item> html "…";`
declares the per-item template, and the collection identifier interpolates as the rendered list.

| Route | Surface |
| --- | --- |
| `GET /pops` | `load` collection + `repeat pops as pop html` + `return html` |

Ingest lowers the repeat to `__cwl_html_repeat(items, itemTemplate)` inside the page `html.template`;
emit reverses it back to the same statement. Non-reconstructable repeats stay `cwl:emit:html-repeat`.
