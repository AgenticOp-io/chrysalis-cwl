# `41-html-repeat-fields` — RFC-0031 deepen

Item **field** access inside a repeat template: `s.user`, `s.site.city`. This is the shape real list
fragments need (session tables, catalog rows), so they no longer require a host-filled fragment.

| Route | Surface |
| --- | --- |
| `GET /sessions` | `repeat sessions as s html "…s.user…s.site.city…"` + `return html` |

Fields lower to `data.member` chains on the item `param`; emit reverses the dotted text exactly.
Hyphenated words (`item-list`) and `.`-prefixed text stay literal markup.
