# Language-pillar golden fixtures (parse → print round-trip)

Fixtures under this tree are **language** golds — independent of convert hub product smokes.

| Dir | Covers |
| --- | --- |
| `01-literals` | bool / int / object returns |
| `02-path-params` | RFC-0002 |
| `03-query-params` | RFC-0003 |
| `04-request-context` | RFC-0004 header/cookie |
| `05-request-body` | RFC-0005 + `use json` |
| `06-response-status` | RFC-0006 |
| `07-auth-effects` | RFC-0007 |
| `08-response-content-type` | RFC-0008 |
| `09-fullstack-page` | RFC-0010 `@page` + `return html` |
| `10-page-load` | RFC-0013 `load` |
| `11-holes` | honest `hole` |
| `12-multi-file` | RFC-0009 imports |
| `13-middleware` | RFC-0001 `use json` / `urlencoded` |
| `14-defaults-headers` | param/query defaults + `response-header` |
| `15-html-interpolation` | RFC-0014 string surface |
| `16-layout` | RFC-0011 layout import |
| `17-ui-v0` | RFC-0017/0018 components + trees |
| `18-ui-v1` | RFC-0019 islands + events |

Run: `npm run test:cwl-roundtrip`
