# CWL RFC-0037 — Broader client-island event contracts

**Status:** accepted (2026-10-06)  
**Tip:** **1.0.79**  
**Extends:** [RFC-0028](CWL-RFC-0028-ui-island-contracts.md)

## Summary

Deepen named island **event metadata** for common form/field interactions without inventing hydration or a client framework.

## Syntax

```cwl
client ui "editor" {
  element "input" name "title" {
    on input { action "title.input"; }
    on focus { action "title.focus"; }
    on blur { action "title.blur"; }
  }
  element "textarea" name "body" {
    on keydown { action "body.keydown"; }
  }
}
```

| Event | Contract |
| --- | --- |
| `click`, `submit`, `change` | Already in RFC-0028 |
| `input`, `focus`, `blur`, `keydown` | Same shape — metadata only |

## Non-goals

- Hydration / client JS execution
- Silent React/Svelte/Vue lowering
- Interpreting key codes or focus rings inside the parser

## Verify

- Gold `fixtures/language-gold/89-ui-event-contracts`
