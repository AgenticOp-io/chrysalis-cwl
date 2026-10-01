# CWL RFC-0029 — Layout chrome wrap

**Status:** accepted (2026-09-14); document shell deepened (2026-09-30); per-page head and shared nav id (2026-10-01)  
**Tip:** **1.0.64** (chrome prefix since 1.0.27)  
**Extends:** [RFC-0011](CWL-RFC-0011-full-stack-layouts.md) (import merge stays; this adds wrap)  
**Ask:** [CWL-EXPAND.md](../history/CWL-EXPAND.md) §1

## Summary

Declare shared page chrome once and attach it to `@page` surfaces:

```cwl
layout shell {
  header User-Agent;
  hole unsupported:opaque-script;
  chrome html "<header class='top'><a href='/cwl'>CWL</a></header>";
}

@page GET "/"
page home {
  layout shell;
  return html "<main>home</main>";
}
```

At resolve/ingest, `layout name;` merges layout headers, cookies, attachment holes, and page islands onto the route.

Chrome without a body marker is still a prefix: `layoutChromeHtml + body.html` (gold 36).

## Deepen — document shell (tip 1.0.60)

A page document is not one quoted line. `return html """` … `""";` and `chrome html """` … `""";` keep newlines and `"` characters.

If chrome contains `<!-- cwl:body -->`, that marker is the page slot. `<!-- cwl:head -->` is the per-page head fragment. `<!-- cwl:page -->` is the page name. `<!-- cwl:active <page> <class> -->` inserts that class only when the page name matches. No general slot language, no CSS pipeline, no browser runtime.

```cwl
layout site {
  hole unsupported:opaque-script;
  chrome html """
<!doctype html>
<html><body><main>
<!-- cwl:body -->
</main></body></html>
""";
}

@page GET "/"
page home {
  layout site;
  return html """
<section class="hero"><h1>Home</h1></section>
""";
}
```

## Deepen — per-page head (tip 1.0.61)

A shared shell still cannot say which page is current, or carry that page's title. The page decl name fills `<!-- cwl:page -->`. `head html` fills `<!-- cwl:head -->`. A head with no slot is `cwl:missing-head-slot` and is not inserted. The menu script that reads the viewport stays `unsupported:opaque-script`.

## Deepen — shared nav id (tip 1.0.62)

`nav docs;` keeps the page decl name and supplies the id that `<!-- cwl:page -->` and `<!-- cwl:active -->` compare. Header and footer markers use that same id. No `nav` statement means the page name, so gold `69` stays valid. The menu script stays `unsupported:opaque-script`.

## Deepen — host year (tip 1.0.63)

`year host;` tells the host to fill the calendar year. `<!-- cwl:year -->` stays in the composed document. CWL does not replace it with digits. A declaration with no token is `cwl:missing-year-slot`. The menu toggle and the `data-ao-device` switch stay `unsupported:opaque-script`.

## Deepen — shared nav list (tip 1.0.64)

The live header is empty. `ao-layout.js` writes the same link list into the desktop nav and the mobile drawer, and the contact row uses `ao-nav-cta` instead of `ao-nav-link`. `link <id> "<href>" "<label>";` is that list. `<!-- cwl:links <baseClass> <activeClass> -->` expands every copy. `class <token>` on a row replaces the base class. The active class is added when the row id matches the nav id. A list with no slot is `cwl:missing-links-slot`. The Menu button can sit in the chrome as text. Opening the drawer and setting `data-ao-device` stay `unsupported:opaque-script`.

## Syntax

| Construct | Meaning |
| --- | --- |
| `layout name { … }` | Module-level layout decl |
| `chrome html "…";` | HTML prefix composed before `return html` |
| `chrome html """` … `""";` | Multi-line chrome. `<!-- cwl:body -->` is the page slot (tip 1.0.60) |
| `head html """` … `""";` | Per-page head fragment for `<!-- cwl:head -->` (tip 1.0.61) |
| `nav <id>;` | Shared nav id. Header and footer markers use it (tip 1.0.62) |
| `year host;` | Host calendar year. `<!-- cwl:year -->` stays in the document (tip 1.0.63) |
| `link <id> "<href>" "<label>";` | Shared nav row. Optional `class <token>` (tip 1.0.64) |
| `<!-- cwl:links <base> <active> -->` | Expands the link list. Every copy is filled (tip 1.0.64) |
| `<!-- cwl:page -->` | Nav id when `nav` is set; otherwise the page decl name |
| `<!-- cwl:active <page> <class> -->` | Inserts ` <class>` only when the page name matches |
| `return html """` … `""";` | Multi-line page body; quotes and newlines stay (tip 1.0.60) |
| `layout name;` | Page uses that layout |
| `header` / `cookie` / `hole` / `client ui` inside layout | Merged onto using pages |

## WebIR lowering

- Compose: markers in the shell resolve first (`<!-- cwl:page -->`, `<!-- cwl:active … -->`, then `<!-- cwl:head -->`). If chrome contains `<!-- cwl:body -->`, that marker is replaced by the page body; otherwise `layoutChromeHtml + body.html`
- Merged bindings / holes / islands follow existing request-context, RFC-0024, and RFC-0030 paths
- **Emit reverse:** recovers the **composed** HTML phenotype (chrome + body) and merged holes/bindings; it does not reconstruct a separate `layout` decl (authoring sugar stays in source)

## Non-goals

- CSS/asset pipelines
- Nested `extends` / component slots
- Replacing RFC-0011 `import "layouts/….cwl"` route merge

## Verify

- Gold `fixtures/language-gold/36-layout-chrome`
- Gold `fixtures/language-gold/68-site-document`
- Gold `fixtures/language-gold/69-site-shell`
- Gold `fixtures/language-gold/70-site-nav-id`
- Gold `fixtures/language-gold/71-site-year`
- Gold `fixtures/language-gold/72-site-nav-links`
