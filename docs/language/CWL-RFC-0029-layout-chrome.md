# CWL RFC-0029 — Layout chrome wrap

**Status:** accepted (2026-09-14); document shell deepened (2026-09-30)  
**Tip:** **1.0.60** (chrome prefix since 1.0.27)  
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

If chrome contains `<!-- cwl:body -->`, that marker is the page slot (head, header, main, footer). One marker. No nested slots, no CSS pipeline, no browser runtime.

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

## Syntax

| Construct | Meaning |
| --- | --- |
| `layout name { … }` | Module-level layout decl |
| `chrome html "…";` | HTML prefix composed before `return html` |
| `chrome html """` … `""";` | Multi-line chrome. `<!-- cwl:body -->` is the page slot (tip 1.0.60) |
| `return html """` … `""";` | Multi-line page body; quotes and newlines stay (tip 1.0.60) |
| `layout name;` | Page uses that layout |
| `header` / `cookie` / `hole` / `client ui` inside layout | Merged onto using pages |

## WebIR lowering

- Compose: if chrome contains `<!-- cwl:body -->`, that marker is replaced by the page body; otherwise `layoutChromeHtml + body.html`
- Merged bindings / holes / islands follow existing request-context, RFC-0024, and RFC-0030 paths
- **Emit reverse:** recovers the **composed** HTML phenotype (chrome + body) and merged holes/bindings; it does not reconstruct a separate `layout` decl (authoring sugar stays in source)

## Non-goals

- CSS/asset pipelines
- Nested `extends` / component slots
- Replacing RFC-0011 `import "layouts/….cwl"` route merge

## Verify

- Gold `fixtures/language-gold/36-layout-chrome`
- Gold `fixtures/language-gold/68-site-document`
