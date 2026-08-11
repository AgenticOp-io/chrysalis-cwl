# Chrysalis Web Language (CWL) — RFC index

CWL evolves by **RFC**: each proposal must cite cross-language evidence (path knowledge, gold suites, or oracle traces) and lower to WebIR without a second IR.

| RFC | Title | Status |
| --- | --- | --- |
| [0001](CWL-RFC-0001-module-use-middleware.md) | Module `use json` / `use urlencoded` | accepted |
| [0002](CWL-RFC-0002-path-parameters.md) | Path parameters (`:id` templates) | accepted |
| [0003](CWL-RFC-0003-query-parameters.md) | Query parameters (`query name;`) | accepted |
| [0004](CWL-RFC-0004-request-context.md) | Headers and cookies | accepted |
| [0005](CWL-RFC-0005-request-body.md) | JSON request body fields | accepted |
| [0006](CWL-RFC-0006-response-status.md) | Response status | accepted |
| [0007](CWL-RFC-0007-auth-effects.md) | Auth presets and effects | accepted |
| [0008](CWL-RFC-0008-response-content-type.md) | Response content-type | accepted |
| [0009](CWL-RFC-0009-multi-file-modules.md) | Multi-file modules (`import`) | accepted |
| [0010](CWL-RFC-0010-full-stack-pages.md) | Full-stack page surface (`@page`, `return html`) | accepted |
| [0011](CWL-RFC-0011-full-stack-layouts.md) | Layout imports + page params | accepted |
| [0012](CWL-RFC-0012-full-stack-components.md) | Full-stack component holes (SvelteKit) | accepted |
| [0013](CWL-RFC-0013-page-load-functions.md) | Page load / SSR data (`+page.server`) | accepted |
| [0014](CWL-RFC-0014-html-interpolation.md) | HTML interpolation in `@page` | accepted |
| [0015](CWL-RFC-0015-production-readiness-probes.md) | Production readiness probes | accepted |
| [0016](CWL-RFC-0016-form-action-probe.md) | Form action probe + hole catalog | accepted |
| [0017](CWL-RFC-0017-native-ui-v0.md) | Native UI v0 (`return ui`, `data.ui.tree`) | accepted |
| [0018](CWL-RFC-0018-native-ui-components.md) | Native UI components (`@component`) | accepted |
| [0019](CWL-RFC-0019-native-ui-v1.md) | Native UI v1 (client islands, events) | accepted |
| [0020](CWL-RFC-0020-effects-middleware.md) | Effects middleware chains | accepted |
| [0021](CWL-RFC-0021-early-exit-cond-expr.md) | Early-exit cond expressions + opaque call/member/empty residual + foreach bind | accepted (`!param` / `g_empty_<name>`) |
| [0022](CWL-RFC-0022-dna-surface-bridge.md) | CWL `@route`/`@page` surface ↔ `app-dna-v1` route identity (Secure bridge contract) | accepted (contract only) |
| [0023](CWL-RFC-0023-deploy-dna-profiles.md) | Deploy / DNA surface profiles (`cwl-deploy-profile-v1`) | accepted (normative) |
| [0024](CWL-RFC-0024-island-kinds.md) | Island kinds (Wasm / vendor / opaque) — declare, don’t absorb | accepted (vocabulary) |
| [0025](CWL-RFC-0025-nested-structured-literals.md) | Nested structured object/array literals | accepted |

**Process**

1. Open RFC in `docs/language/CWL-RFC-NNNN-*.md` with motivation, syntax, WebIR mapping, and verify plan.
2. Add parser + ingest + fixture; extend language-gold (and convert `hub-gold-manifest` only when Convert gates it).
3. Record decision in `CHANGELOG.md` / `LANGUAGE_VERSION.md` and checklist item in `ROADMAP.md`.
