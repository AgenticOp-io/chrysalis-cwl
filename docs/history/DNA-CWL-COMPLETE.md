# CWL pillar — Exit / DNA queue complete

**Status:** **CLOSED (CWL-owned)** — tip **`1.0.16`** (2026-08-09)  
**Tip:** `@chrysalis/cwl@1.0.16` / published `@agenticop-io/cwl@1.0.0`…`1.0.16` (tag `cwl-v*`)  
**Queue:** [`DNA-BUILD-NEXT.md`](./DNA-BUILD-NEXT.md) — **no further CWL invent**  
**Scope:** [`CWL-LANGUAGE-SCOPE.md`](../language/CWL-LANGUAGE-SCOPE.md) — DNA of the web ≠ all PLs

## What “complete” means here

The **language genome** is done for the Exit 1.0 path:

| Area | Done |
| --- | --- |
| Grammar / RFCs / golds | RFCs through 0024; golds `01`–`25` |
| Package | Packable + GitHub Packages publish; exports diagnose/lsp-map/parser/print/**dna-seed** |
| WebIR | Physical home in this pillar; Convert reverse-home verified |
| Rosetta | Ingest + thin emit + dual-mode fmt + emit-check gates |
| LSP / editor | Diagnostics/fmt/hover/completion/definition/references/rename + TextMate catalog gate + private VSIX |
| DNA bridge | Default + multi-host seed golds; holes bridge report; opaque-residual diagnose |
| Ecology bootstrap | [`CWL-ECOLOGY.md`](../language/CWL-ECOLOGY.md) |
| UT evidence tip | `smoke:ut-evidence` reports tip `languageVersion` |

## Explicitly not CWL (siblings)

| Owner | Remaining |
| --- | --- |
| **Convert** | Tip pin `1.0.16`; peel/emit gravity; rewrite headers; `g_*` / N-iter / island **execution** |
| **Secure** | Tip pin `1.0.16`; multi-host profile at cutover; fill `dna_gaps` |

Those do **not** reopen the language genome. Hand off via Requested docs — do not invent Convert/Secure work in this repo.

## Prove

```bash
npm run build:webir
CWL_REQUIRE_WEBIR=1 npm run test:language
npm run smoke:cwl-emit
npm run pack:cwl-vsix
```

## Related

- Queue closed: [`DNA-BUILD-NEXT.md`](./DNA-BUILD-NEXT.md)
- Exit publish: [`EXIT-1.0.md`](./EXIT-1.0.md)
- Near-complete history: [`DNA-CWL-NEAR-COMPLETE.md`](./DNA-CWL-NEAR-COMPLETE.md)
