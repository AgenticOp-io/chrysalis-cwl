# `50-html-repeat-nested-filter` — RFC-0031 composition (tip 1.0.42)

One-level nest plus filters/empty markup on both levels. Proves `if` / `else` compose with `outerItem.field` without new grammar.

| Route | Surface |
| --- | --- |
| `GET /regions` | outer `else` + nested `if`/`else` on `region.towers` |

Sorting and pagination remain non-goals. Deeper nests stay holes.
