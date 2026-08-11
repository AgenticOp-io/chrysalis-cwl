# Language-pillar golden fixtures

**Authority:** [`docs/language/CWL-PILLAR-HOME.md`](../../docs/language/CWL-PILLAR-HOME.md)  
These are **language** golds — independent of convert hub product smokes.  
Convert may keep separate hub golds; they must not contradict this grammar.

## Suite map

| Dir | Surface / topic | RFC |
| --- | --- | --- |
| `01-literals` | API literal returns (+ `expected-webir.json` ingest gold) | core |
| `02-path-params` | Path `:id` (+ `expected-webir.json`) | 0002 |
| `03-query-params` | `query` | 0003 |
| `04-request-context` | header / cookie | 0004 |
| `05-request-body` | `body` + `use json` | 0005 |
| `06-response-status` | `status` | 0006 |
| `07-auth-effects` | `use auth` + effects | 0007 |
| `08-response-content-type` | `content-type` | 0008 |
| `09-fullstack-page` | `@page` + `return html` | 0010 |
| `10-page-load` | `load { }` | 0013 |
| `11-holes` | honest `hole` | 0012 |
| `12-multi-file` | `import` | 0009 |
| `13-middleware` | `use json` / `urlencoded` | 0001 |
| `14-defaults-headers` | defaults + `response-header` | 0002/0003 + headers |
| `15-html-interpolation` | HTML token surface | 0014 |
| `16-layout` | layout import | 0011 |
| `17-ui-v0` | UI tree + `@component` | 0017/0018 |
| `18-ui-v1` | islands + events | 0019 |
| `19-early-exit` | `if` / `foreach` | 0021 |
| `20-probes` | production readiness probe surfaces | 0015 |
| `21-form-action` | form-action catalogued hole | 0016 |
| `22-effects-middleware` | effects middleware chains | 0020 |
| `23-nested-control` | nested `if` / `foreach` stmt lists | 0021 |
| `24-dna-bridge` | CWL surface ↔ `app-dna-v1` (+ `expected-dna.json` + `expected-webir.json` + `deploy-profile.json`) | 0022/0023 |
| `25-island-kinds` | Wasm/vendor/opaque attachment holes (+ return shell) | 0024 |
| `26-nested-literals` | Nested object/array literals | 0025 |
| `27-data-v2` | Load redirect / error / cookie | 0013 |
| `28-response-cookie` | Hyphenated `Set-Cookie` response-header | headers |
| `29-transport-holes` | SSE / WebSocket / multipart catalogued holes | holes |
| `30-effects-executable` | Effects beyond session presets (executable) | 0020 |
| `31-multipart-binding` | Multipart field/file part bindings | 0026 |
| `32-stream-sse` | SSE single-shot `stream sse;` | 0027 |

## Parseable subset notes (0.1.8)

| Dir | In gold (parser accepts) | Honest gap / elsewhere |
| --- | --- | --- |
| `11-holes` | `unsupported:php-session`, `cwl:empty-handler` — both catalogued | uncatalogued reasons still warn |
| `20-probes` | `/search` query HTML + `/blog/:slug` load HTML | runtime probe assertions (convert) |
| `21-form-action` | `hole hub-svelte:form-action` + HTML form shell | no `actions{}` syntax invented |
| `22-effects-middleware` | `auth.require` / `cors.allow` / `csrf.verify` chains | middleware helper lowering (convert) |
| `25-island-kinds` | `hole` + `return html` on same page (`attachmentHoles`) | Wasm/vendor runtime (Convert/Secure) |

## Gates

```bash
npm run test:language
npm run test:ingest                 # needs npm run link:webir
npm run smoke:cwl-ingest-matrix     # all language-gold/*/routes.cwl
npm run smoke:cwl-runtime-gold      # execute 01-literals
npm run smoke:cwl-runtime-matrix    # execute README runtime-ok + allowlist
# npm run test:language:full        # language + ingest-roundtrip + ingest matrix + runtime matrix
```

- **Round-trip:** parse → print → parse AST equality + print idempotence; multi-file + layout resolve  
- **Diagnose:** no diagnose **errors** (warns OK for honest holes / hints); catalogued holes are **info**
- **Ingest (optional):** CWL → WebIR; compares `expected-webir.json` when present
- **Runtime execute (optional):** fixtures with **`runtime-ok`** in their README **and** checks in `scripts/cwl-runtime-smoke-lib.mjs` — API simulate only; no invented handlers

## Authoring rules

1. Write fixtures in print-canonical shape when practical.  
2. Prefer real RFC examples over invented mega-apps.  
3. Holes must be explicit — never “pass” by omitting unsupported syntax.  
4. When adding syntax, add a gold **in the same change** as parser/print.
