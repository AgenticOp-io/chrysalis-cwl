# CWL RFC-0030 — Page HTML + sibling client island

**Status:** accepted (2026-09-14)  
**Tip:** **1.0.27**  
**Extends:** [RFC-0010](CWL-RFC-0010-full-stack-pages.md), [RFC-0019](CWL-RFC-0019-native-ui-v1.md), [RFC-0028](CWL-RFC-0028-ui-island-contracts.md)  
**Ask:** [CWL-EXPAND.md](../history/CWL-EXPAND.md) §4

## Summary

A `@page` may author **both** a long HTML shell and a page-level client island:

```cwl
@page GET "/"
page home {
  client ui "device" {
    on resize { action "classify-device"; }
  }
  return html "<html data-device='desktop'><body><main>home</main></body></html>";
}
```

Layouts (RFC-0029) may also own islands once and merge them onto every using page.

## Syntax

| Construct | Meaning |
| --- | --- |
| `client ui "name" { … }` before `return html` | Page-level island (sibling, not nested inside `return ui`) |
| `return html "…"` | Page HTML body (unchanged) |

Islands remain **contract metadata** — they do not invent a browser runtime in CWL.

## WebIR lowering

- HTML body lowers as today (RFC-0014 templates when bindings match)
- Page islands lower as UI tree blocks attached beside the response (provenance `cwl:page-islands`)
- **Emit reverse (tip 1.0.28):** peels `cwl:page-islands` and reprints sibling `client ui` (including island events)

## Non-goals

- Hydration / client JS execution inside the language pillar
- Requiring `return ui` when only HTML + island is needed
- UA regex evaluate in CWL (stay hole / browser / executor)

## Verify

- Gold `fixtures/language-gold/38-html-page-island`
- Layout island merge covered by `36-layout-chrome` + RFC-0029
