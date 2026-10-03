# CWL RFC-0029 — Layout chrome wrap

**Status:** accepted (2026-09-14); document shell deepened (2026-09-30); per-page head and shared nav id (2026-10-01)  
**Tip:** **1.0.69** (chrome prefix since 1.0.27)  
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

## Deepen — drawer, device, named lists (tip 1.0.65)

`links <name>;` starts a separate list. `<!-- cwl:links <name> <base> <active> -->` fills that list. A two-token marker still fills rows that have no name (gold `72`).

`drawer <navId> toggle <class> class <openClass> panel <panelId>;` writes one script into the document. A click on the toggle flips the open class and `aria-expanded`. Escape closes it. A click on a link inside the nav closes it. The panel id gets `aria-hidden`. A declaration whose chrome lacks those targets is `cwl:missing-drawer-target` and gets no script.

`device host <mobile> <desktop>;` keeps `<!-- cwl:device -->`. CWL does not read the viewport or the user agent and does not write either class. A declaration with no token is `cwl:missing-device-slot`.

## Deepen — stylesheet, image, Firebase root (tip 1.0.66)

`style "<href>";` fills every `<!-- cwl:style -->` with a stylesheet link. `image <id> "<path>";` fills `<!-- cwl:image <id> -->` with that path. `host firebase "<target>" public "<dir>" error "<path>";` records the Hosting target, the public directory, and the error document in the composed page. A stylesheet or image with no slot is `cwl:missing-style-slot` or `cwl:missing-image-slot`. CWL does not parse CSS, read image bytes, or deploy.

## Deepen — script, form, off-site anchor (tip 1.0.67)

`script "<href>";` fills every `<!-- cwl:script -->` with `<script src="…" defer>`. CWL does not parse or run that file. A script with no slot is `cwl:missing-script-slot`.

`form <id> method get|post action "<path>";` with following `field <name> "<type>";` and optional `submit "<label>";` fills `<!-- cwl:form <id> -->`. The action must be a same-site path. An off-site or protocol-relative action is `unsupported:offsite-form` and is not written. A form with no slot is `cwl:missing-form-slot`.

`link <id> "<href>" "<label>" target blank rel <token>;` emits `target="_blank"` and `rel`. An anchor may name another origin. A form may not post to one.

## Deepen — named viewport cut (tip 1.0.68)

`device host <a> <b> below <px>;` names the narrow-viewport cut in pixels. `<!-- cwl:device -->` stays. CWL does not call `matchMedia`, read the user agent, or write either class. A declaration with no token is still `cwl:missing-device-slot`. The public site genome uses `below 820`.

## Deepen — document identity (tip 1.0.69)

HTML names the charset, the viewport meta, the title, the description, and the canonical URL. Those facts were still an opaque `head html` blob. `charset utf-8;` fills `<!-- cwl:charset -->`. `viewport device;` fills `<!-- cwl:viewport -->` with `width=device-width, initial-scale=1`. CWL does not evaluate that content. `title`, `description`, and `canonical` fill their markers. A canonical value must be an absolute `http`/`https` URL or a same-site path. Anything else is `cwl:canonical-not-url` and is not written. A declared fact with no marker is `cwl:missing-charset-slot`, `cwl:missing-viewport-slot`, `cwl:missing-title-slot`, `cwl:missing-description-slot`, or `cwl:missing-canonical-slot`. Open Graph, Twitter, and JSON-LD stay in `head html`.

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
| `<!-- cwl:links <base> <active> -->` | Expands the unnamed link list. Every copy is filled (tip 1.0.64) |
| `links <name>;` | Following `link` rows belong to that list (tip 1.0.65) |
| `<!-- cwl:links <name> <base> <active> -->` | Expands that named list (tip 1.0.65) |
| `drawer …;` | Menu toggle script. No viewport or user-agent read (tip 1.0.65) |
| `device host <a> <b>;` | Host device classes. `<!-- cwl:device -->` stays (tip 1.0.65) |
| `device host <a> <b> below <px>;` | Named viewport cut. The token stays (tip 1.0.68) |
| `charset utf-8;` | Charset meta for `<!-- cwl:charset -->` (tip 1.0.69) |
| `viewport device;` | HTML viewport meta for `<!-- cwl:viewport -->`. Not evaluated (tip 1.0.69) |
| `title "…";` | Document title for `<!-- cwl:title -->` (tip 1.0.69) |
| `description "…";` | Meta description for `<!-- cwl:description -->` (tip 1.0.69) |
| `canonical "…";` | Canonical link for `<!-- cwl:canonical -->` (tip 1.0.69) |
| `style "<href>";` | Stylesheet link for `<!-- cwl:style -->` (tip 1.0.66) |
| `image <id> "<path>";` | Image path for `<!-- cwl:image <id> -->` (tip 1.0.66) |
| `host firebase "<target>" public "<dir>";` | Firebase Hosting target and public root (tip 1.0.66) |
| `script "<href>";` | Deferred script tag for `<!-- cwl:script -->` (tip 1.0.67) |
| `form <id> method post action "<path>";` | Same-site form for `<!-- cwl:form <id> -->` (tip 1.0.67) |
| `field <name> "<type>";` | Input on the current form (tip 1.0.67) |
| `submit "<label>";` | Submit button on the current form (tip 1.0.67) |
| `link … target blank rel <token>` | Off-site anchor attributes (tip 1.0.67) |
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

- Parsing CSS or image bytes, and deploying Firebase Hosting
- Nested `extends` / component slots
- Replacing RFC-0011 `import "layouts/….cwl"` route merge

## Verify

- Gold `fixtures/language-gold/36-layout-chrome`
- Gold `fixtures/language-gold/68-site-document`
- Gold `fixtures/language-gold/69-site-shell`
- Gold `fixtures/language-gold/70-site-nav-id`
- Gold `fixtures/language-gold/71-site-year`
- Gold `fixtures/language-gold/72-site-nav-links`
- Gold `fixtures/language-gold/73-site-shell-behavior`
- Gold `fixtures/language-gold/74-site-assets`
- Gold `fixtures/language-gold/75-site-page`
- Gold `fixtures/language-gold/76-site-device-below`
- Gold `fixtures/language-gold/77-site-document`
