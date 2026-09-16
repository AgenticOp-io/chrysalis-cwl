# CWL RFC-0031 — Repeated markup (`repeat … as … html`)

**Status:** accepted (2026-09-16)  
**Tip:** `1.0.31` · gold `40-html-repeat`

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
- The collection identifier interpolates in `return html` as the **rendered list**, not a scalar —
  `repeat` wins over the same name in `load`.
- The item identifier interpolates inside the template as a bare name (RFC-0014 rules, escaped).
- A non-literal template is `hole cwl:invalid-html-repeat;` — never a guessed fragment.

## WebIR lowering

The repeat becomes one expr part of the page `html.template`:

```text
data.call __cwl_html_repeat(param <collection>, html.template <item template>)
```

`argNames` carries the item name so emit reverses the exact statement. No loop runtime, framework
template engine, or hydration is introduced; the callee is a named CWL helper like the executable
effects of RFC-0020.

## Emit reverse

`repeat` statements round-trip: CWL → WebIR → CWL reproduces the source line. When the iterable or the
item template cannot be recovered, emit keeps `cwl:emit:html-repeat` instead of inventing markup.

## Non-goals

- Item **field** access (`item.name`) — separate deepen; bare item only in `1.0.31`
- Nested repeats, filters, sorting, pagination
- Client hydration of the rendered list
- Replacing `hub-cwl:html-fragment` for fragments whose bytes the host still owns
