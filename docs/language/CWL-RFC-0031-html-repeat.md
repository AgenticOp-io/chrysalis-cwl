# CWL RFC-0031 — Repeated markup (`repeat … as … html`)

**Status:** accepted (2026-09-16) · deepen tip `1.0.41`  
**Tip:** `1.0.41` · golds `40-html-repeat`, `41-html-repeat-fields`, `47-html-repeat-if`, `48-html-repeat-else`, `49-html-repeat-nested`

## Summary

A page could interpolate scalars into `return html` (RFC-0014) but could not render one markup fragment
per item of a collection. That gap is why list surfaces (catalogs, session lists, nav rows) were declared
`hole hub-cwl:html-fragment;` and filled by a host executor. This RFC makes the repetition a CWL gene.

## Syntax

```cwl
@page GET "/pops"
page pops {
  effects: none;
  load { pops: "catalog" };
  repeat pops as pop html "<li>pop</li>";
  return html "<h1>POPs</h1><ul>pops</ul>";
}
```

- `repeat <collection> as <item> html "<template>";` declares the per-item markup.
- Optional `if <item[.field…]>` keeps only items whose field chain is truthy (tip `1.0.39`).
- Optional `else html "<empty>";` is the markup when the (filtered) collection is empty (tip `1.0.40`).
- Nested collections may be **one level** under the outer item: `repeat region.towers as tower html "…"`
  (tip `1.0.41`). The outer item template interpolates the leaf name (`towers`).
- The collection identifier interpolates in `return html` as the **rendered list**, not a scalar —
  `repeat` wins over the same name in `load`.
- The item identifier interpolates inside the template as a bare name (RFC-0014 rules, escaped).
- Item **fields** interpolate as dotted chains — `s.user`, `s.site.city` (tip `1.0.32`).
- Hyphenated words (`item-list`) and `.`-prefixed text stay literal markup.
- A non-literal template (or non-literal `else`) is `hole cwl:invalid-html-repeat;` — never a guessed fragment.
- An `if` not rooted on the item is `hole cwl:invalid-html-repeat-if;`.
- Deeper nests (`a.b.c`) are `hole cwl:invalid-html-repeat-nested;`.

```cwl
  load { sessions: "live" };
  repeat sessions as s if s.active html "<tr><td>s.user</td></tr>" else html "<tr><td>none</td></tr>";
  return html "<table>sessions</table>";
```

```cwl
  load { regions: "catalog" };
  repeat regions as region html "<section><h2>region.name</h2><ul>towers</ul></section>";
  repeat region.towers as tower html "<li>tower.id</li>";
  return html "<div>regions</div>";
```

## WebIR lowering

The repeat becomes one expr part of the page `html.template`:

```text
data.call __cwl_html_repeat(param <collection> | member(param <outer>, <field>), html.template <item template>[, when][, empty])
```

`argNames` carries the item name (and `"when"` / `"empty"` when present) so emit reverses the exact statement.
Item fields and the optional `when` predicate become `data.member` chains on the item `param`.
`empty` is a literal `html.template` with no item binding — the collection had nothing to bind.
A one-level nest embeds the inner `__cwl_html_repeat` call inside the outer item `html.template`
(leaf name in the outer markup; full `outerItem.field` on the inner statement).
No loop runtime, framework template engine, or hydration is introduced; the callee is a named CWL
helper like the executable effects of RFC-0020.

## Emit reverse

`repeat` statements round-trip: CWL → WebIR → CWL reproduces the source line (including `if`, `else`,
and one-level nests). Nested children recovered from an outer item template are emitted as sibling
`repeat` statements after the outer. When the iterable, item template, `when`, or `empty` cannot be
recovered, emit keeps `cwl:emit:html-repeat` instead of inventing markup.

## Non-goals

- Multi-level nests beyond `outerItem.field`, sorting, pagination
- Method calls / expressions on the item (fields only; `if` is a field chain, not a general expr)
- Client hydration of the rendered list
- Replacing `hub-cwl:html-fragment` for fragments whose bytes the host still owns
- Inventing empty-state copy when the author omitted `else`