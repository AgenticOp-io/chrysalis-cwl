# CWL RFC-0029 — Layout chrome wrap

**Status:** accepted (2026-09-14)  
**Tip:** **1.0.27**  
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

At resolve/ingest, `layout name;` merges layout headers, cookies, attachment holes, and page islands onto the route, and prefixes `chrome html` onto the HTML body.

## Syntax

| Construct | Meaning |
| --- | --- |
| `layout name { … }` | Module-level layout decl |
| `chrome html "…";` | HTML prefix composed before `return html` |
| `layout name;` | Page uses that layout |
| `header` / `cookie` / `hole` / `client ui` inside layout | Merged onto using pages |

## WebIR lowering

- Compose: `layoutChromeHtml + body.html`
- Merged bindings / holes / islands follow existing request-context, RFC-0024, and RFC-0030 paths

## Non-goals

- CSS/asset pipelines
- Nested `extends` / component slots
- Replacing RFC-0011 `import "layouts/….cwl"` route merge

## Verify

- Gold `fixtures/language-gold/36-layout-chrome`
