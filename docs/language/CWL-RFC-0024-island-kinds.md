# CWL RFC-0024 — Island kinds (Wasm / vendor / progressive UI)

**Status:** accepted (vocabulary — 2026-08-07)  
**Pillar:** language (`chrysalis-cwl`)  
**Depends on:** [RFC-0019](CWL-RFC-0019-native-ui-v1.md) (islands), [RFC-0012](CWL-RFC-0012-full-stack-components.md) (holes)  
**Non-goal:** Embedding Wasm Component Model or vendor SDKs into CWL grammar.

## Motivation

The web is hybrid: HTML/HTTP surfaces plus Wasm compute, map SDKs, payment widgets, and progressive enhancement. CWL must **name** these attachments so Convert/emit never invent silent JS, and so holes stay honest.

## Island kind catalog

| Kind | Meaning | Language expression |
| --- | --- | --- |
| `ui.island` | Client island already in RFC-0019 | `return ui` / island syntax |
| `hypermedia` | HTML-driven progressive enhancement (HTMX-class) | Prefer `@page` + effects; emit may attach attrs — no new grammar required for v0 |
| `wasm.module` | On-demand Wasm compute | `hole unsupported:wasm-module;` until a future optional surface |
| `vendor.sdk` | Third-party client SDK (maps, payments, analytics) | `hole unsupported:vendor-sdk;` + preserve origin behavior (Convert law) |
| `opaque.script` | Unclassified browser script | `hole unsupported:opaque-script;` |

## Rules

1. **Declare, don’t absorb.** Wasm Component Model / vendor APIs stay outside CWL core syntax.
2. **Prefer holes over façades.** If behavior cannot be expressed as routes/pages/data/ui/effects, emit a catalogued hole.
3. **Catalog is language-owned.** New kinds land here as RFCs before Convert invents strings.
4. Fixture: `fixtures/language-gold/25-island-kinds/routes.cwl` documents the hole vocabulary.
5. **Attachment holes:** `hole reason;` may appear **with** a later `return` / `return html` / `return ui` on the same handler/page. Parser keeps reasons on `attachmentHoles` and does not drop them when the return sets `body`. Print emits holes before the return. Diagnose treats catalogued reasons as **info**.

## Ownership

| Concern | Owner |
| --- | --- |
| Kind names + hole reasons | **CWL** |
| Preserve/emit vendor islands from origin | **Convert** |
| Runtime policy for Wasm/vendor traffic | **Secure** (optional; DNA still route-first) |
