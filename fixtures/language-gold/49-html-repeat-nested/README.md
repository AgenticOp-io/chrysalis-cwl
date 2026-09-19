# `49-html-repeat-nested` — RFC-0031 deepen (tip 1.0.41)

One level of nesting: the inner collection is a field of the outer item (`region.towers`).
The outer template interpolates the leaf name (`towers`). Deeper nests (`a.b.c`) stay holes.

| Route | Surface |
| --- | --- |
| `GET /regions` | outer `repeat regions as region` + inner `repeat region.towers as tower` |

Sorting and pagination remain non-goals.
