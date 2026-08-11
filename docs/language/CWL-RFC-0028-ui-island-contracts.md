# CWL RFC-0028 — Named client islands + form event contracts

**Status:** accepted (2026-08-11)  
**Tip:** **1.0.23**  
**Extends:** [RFC-0019](CWL-RFC-0019-native-ui-v1.md)

## Summary

Deepen client-island **contracts** without inventing React/Svelte/hydration runtimes:

1. Optional **island name** on `client ui`
2. Gold coverage for non-click events (`submit` / `change`) already accepted by the grammar

## Syntax

```cwl
return ui {
  element "form" {
    client ui "signup" {
      element "input" name "email" {
        on change { action "email.changed"; }
      }
      element "button" {
        text "Save";
        on submit { action "signup.save"; }
      }
    }
  }
};
```

| Construct | Meaning |
| --- | --- |
| `client ui { … }` | Anonymous client island (RFC-0019) |
| `client ui "name" { … }` | Named island → `data-cwl-island-id="name"` in SSR HTML |
| `on EVENT { action "…"; }` | Event metadata (`click`, `submit`, `change`, …) — not a client runtime |

## Non-goals

- Hydration / client JS execution
- Silent React/Svelte/Vue lowering
- WebSocket duplex façades (remain `unsupported:websocket`)

## Verify

- Gold `fixtures/language-gold/33-ui-island-contracts`
