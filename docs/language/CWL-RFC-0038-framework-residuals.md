# CWL-RFC-0038 — Framework façade residuals

**Status:** Accepted · Tip **1.0.81**  
**Gold:** `fixtures/language-gold/90-framework-residuals/routes.cwl`

## Intent

Name Nest DI, LiveView, Flutter, and middleware-onion as **catalogued residuals**. Convert may peel origin into CWL or leave these reasons. CWL does **not** invent framework runtimes or façade genes (**D6442** / **D6447** / `DO-NOT-INVENT`).

## Reasons

| Reason | Means |
| --- | --- |
| `unsupported:nest-di` | NestJS dependency-injection / module graph not lowered |
| `unsupported:liveview` | Phoenix LiveView (or kin) duplex UI protocol not lowered |
| `unsupported:flutter` | Flutter / Dart UI tree not lowered as a web page genome |
| `unsupported:middleware-onion` | Layered middleware onion not expressible as CWL effects |
| `unsupported:raw-sql` | Raw SQL text string — not a CWL statement (bound `db *` stays) |

Related existing catalog (unchanged): `unsupported:opaque-script`, `unsupported:websocket`, `unsupported:wasm-module`, `unsupported:vendor-sdk`.

## Non-goals

- Nest / LiveView / Flutter / onion **façades** that look complete
- Absorbing those stacks as CWL dialects
- Closing EXTFMAP or customer soak inside the language tip

## Prove

```bash
npm run test:cwl-hole-catalog
npm run test:language
```
