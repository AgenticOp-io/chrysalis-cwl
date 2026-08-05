# Language-pillar golden fixtures

**Authority:** [`docs/language/CWL-PILLAR-HOME.md`](../../docs/language/CWL-PILLAR-HOME.md)  
These are **language** golds — independent of convert hub product smokes.  
Convert may keep separate hub golds; they must not contradict this grammar.

## Suite map

| Dir | Surface / topic | RFC |
| --- | --- | --- |
| `01-literals` | API literal returns | core |
| `02-path-params` | Path `:id` | 0002 |
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
| `24-dna-bridge` | CWL surface ↔ `app-dna-v1` seed shape (+ `expected-dna.json`) | 0022 |

## Parseable subset notes (0.1.5)

| Dir | In gold (parser accepts) | Honest gap / elsewhere |
| --- | --- | --- |
| `11-holes` | `unsupported:php-session`, `cwl:empty-handler` — both catalogued | uncatalogued reasons still warn |
| `20-probes` | `/search` query HTML + `/blog/:slug` load HTML | runtime probe assertions (convert) |
| `21-form-action` | `hole hub-svelte:form-action` + HTML form shell | no `actions{}` syntax invented |
| `22-effects-middleware` | `auth.require` / `cors.allow` / `csrf.verify` chains | middleware helper lowering (convert) |

## Gates

```bash
npm run test:language
```

- **Round-trip:** parse → print → parse AST equality + print idempotence; multi-file + layout resolve  
- **Diagnose:** no diagnose **errors** (warns OK for honest holes / hints)

## Authoring rules

1. Write fixtures in print-canonical shape when practical.  
2. Prefer real RFC examples over invented mega-apps.  
3. Holes must be explicit — never “pass” by omitting unsupported syntax.  
4. When adding syntax, add a gold **in the same change** as parser/print.
