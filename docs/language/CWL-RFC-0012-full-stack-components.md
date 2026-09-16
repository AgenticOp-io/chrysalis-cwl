# CWL RFC-0012 — Full-stack component holes

**Status:** accepted (2026-06-01)  
**Tracking:** G1149, DESIGN D1149

## Summary

Full-stack origins (SvelteKit first) lift **route surfaces** before component/SSR semantics. Unsupported constructs emit **catalogued holes** in WebIR and CWL projection — never silent stubs.

## Hole catalog

| Reason | Origin | Surface | Meaning |
| --- | --- | --- | --- |
| `hub-svelte:page-component` | svelte | page | `+page.svelte` component tree |
| `hub-svelte:server-handler` | svelte | api | `+server.ts` handler when AST lift fails |
| `hub-svelte:load-function` | svelte | data | `+page.server.ts` load (reserved) |
| `hub-svelte:form-action` | svelte | api | form actions (reserved) |
| `hub-cwl:html-fragment` | cwl | page | Live HTML fragments filled by host executor |
| `hub-cwl:credential-store` | cwl | api | Password hash / session mint — host owns store |
| `hub-cwl:upstream-proxy` | cwl | api | Transfer mechanics only — destination is `proxy upstream` (RFC-0033) |
| `hub-cwl:keypair-gen` | cwl | api | Host generates a keypair (WireGuard / X25519 / SSH); no private material in the genome |
| `hub-cwl:binary-render` | cwl | api | Host renders non-text bytes (QR PNG, PDF, archive); `content-type` stays in CWL |

Registry: `scripts/hub-ingest/cwl-fullstack-holes.mjs`. Golds: `39-cinderpath-holes`, `44-host-bytes-holes`.

A hole body does **not** erase the rest of the route: `content-type`, effects, and the path all
survive ingest and thin emit next to `hole …;`. Prefer the narrowest reason — a keypair or an image
encoder is not a proxy.

## CWL projection

Hole routes render as:

```cwl
@route GET "/blog/:slug"
handler blog_slug_page {
  effects: none;
  hole hub-svelte:page-component;
}
```

When HTML body semantics exist, emit uses `@page` + `return html` (RFC-0010).

## Verify plan

- `hub:sveltekit-smoke` — file-route discovery (hole-free gold)
- `hub:sveltekit-deep-smoke` — POST handlers, load holes, Svelte blocks (`hub-gold-svelte-kit-deep`)
- `hub:sveltekit-cwl-export-smoke` — lift → emit CWL
- `hub:cwl-fullstack-flagship-smoke` — CWL-authored flagship + hole budget (G1157)
- `cwl diagnose` — warns on uncatalogued `hole` tokens

## Non-goals (this RFC)

- Hydration, stores, client-only routing
- Vue/React component lowering
- Automatic promotion to matrix gold while holes remain
