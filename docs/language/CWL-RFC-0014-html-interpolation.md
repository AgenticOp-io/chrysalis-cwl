# CWL RFC-0014 — HTML template interpolation

**Status:** accepted (2026-06-01); **deepened 1.0.27** (cookie bindings)  
**Tracking:** G1189, DESIGN D1189

## Summary

Bare identifiers in `return html "..."` strings that match declared `param`, `query`, `cookie`, or `load { … }` keys interpolate at runtime via WebIR `data.html.template`.

Prefer **classified tokens** (e.g. a device cookie / load key) over dumping raw `User-Agent` into HTML.

## Syntax

```cwl
@page GET "/docs/:slug"
page doc_show {
  effects: none;
  param slug;
  return html "<p>slug: slug</p>";
}
```

The second `slug` token is a path-param reference, not literal text.

Load fields become available after `load { … };` executes:

```cwl
load { slug: slug, source: "flagship" };
return html "<p>slug: slug source: source</p>";
```

Cookie / classified device token (tip **1.0.27**):

```cwl
cookie cp_device;
load { device: cookie cp_device };
return html "<html data-device='device'>…</html>";
```

## WebIR lowering

- Matching identifiers → `data.html.template` with `data.request.field` (path/query/cookie) or `data.param` (load keys).
- Interpolations are HTML-escaped at runtime (`escape: true`).

## Verify

- `fixtures/language-gold/15-html-interpolation`
- `fixtures/language-gold/37-html-cookie-device` (cookie + load)

## Non-goals (v1)

- Expression syntax inside HTML strings
- Component slots or partials
- Client-side hydration bindings
- UA substring / regex evaluate inside CWL
