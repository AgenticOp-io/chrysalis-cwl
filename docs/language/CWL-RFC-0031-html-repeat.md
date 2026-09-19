# CWL RFC-0031 — Repeated markup (`repeat … as … html`)

**Status:** accepted (2026-09-16) · deepen tip `1.0.39`  
**Tip:** `1.0.39` · golds `40-html-repeat`, `41-html-repeat-fields`, `47-html-repeat-if`

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
- The collection identifier interpolates in `return html` as the **rendered list**, not a scalar —
  `repeat` wins over the same name in `load`.
- The item identifier interpolates inside the template as a bare name (RFC-0014 rules, escaped).
- Item **fields** interpolate as dotted chains — `s.user`, `s.site.city` (tip `1.0.32`).
- Hyphenated words (`item-list`) and `.`-prefixed text stay literal markup.
- A non-literal template is `hole cwl:invalid-html-repeat;` — never a guessed fragment.
- An `if` not rooted on the item is `hole cwl:invalid-html-repeat-if;`.

```cwl
  load { sessions: "live" };
  repeat sessions as s if s.active html "<tr><td>s.user</td></tr>";
  return html "<table>sessions</table>";
```

## WebIR lowering

The repeat becomes one expr part of the page `html.template`:

```text
data.call __cwl_html_repeat(param <collection>, html.template <item template>[, when])
```

`argNames` carries the item name (and `"when"` when filtered) so emit reverses the exact statement.
Item fields and the optional `when` predicate become `data.member` chains on the item `param`.
No loop runtime, framework template engine, or hydration is introduced; the callee is a named CWL
helper like the executable effects of RFC-0020.

## Emit reverse

`repeat` statements round-trip: CWL → WebIR → CWL reproduces the source line (including `if`).
When the iterable, item template, or `when` cannot be recovered, emit keeps `cwl:emit:html-repeat`
instead of inventing markup.

## Non-goals

- Nested repeats, sorting, pagination
- Method calls / expressions on the item (fields only; `if` is a field chain, not a general expr)
- Client hydration of the rendered list
- Replacing `hub-cwl:html-fragment` for fragments whose bytes the host still owns
