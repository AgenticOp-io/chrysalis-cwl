# CWL pillar — Exit / DNA queue complete

**Status:** **Complete (CWL-owned)** as of **`1.0.3`** (2026-08-09); tip polish **`1.0.4`**  
**Tip:** `@chrysalis/cwl@1.0.4` / published lineage `@agenticop-io/cwl@1.0.0`… (tag `cwl-v*` for tip)  
**Scope:** [`CWL-LANGUAGE-SCOPE.md`](../language/CWL-LANGUAGE-SCOPE.md) — DNA of the web ≠ all PLs

## What “complete” means here

The **language genome** is done for the Exit 1.0 path:

| Area | Done |
| --- | --- |
| Grammar / RFCs / golds | RFCs through 0024; golds `01`–`25` |
| Package | Packable + GitHub Packages publish; exports diagnose/lsp-map/parser/print/**dna-seed** |
| WebIR | Physical home in this pillar; Convert reverse-home verified |
| LSP | Diagnostics/fmt/hover/completion/definition/references/rename (import-graph aware) + private VSIX |
| DNA bridge | Default + multi-host seed golds; holes bridge report |
| Ecology bootstrap | [`CWL-ECOLOGY.md`](../language/CWL-ECOLOGY.md) |

## Explicitly not CWL (siblings)

| Owner | Remaining |
| --- | --- |
| **Convert** | Registry pin `@agenticop-io/cwl`; peel/emit gravity; rewrite headers (`04-request-context`) |
| **Secure** | Pin tip `1.0.4`; apply multi-host profile at cutover; fill `dna_gaps` |

Those do **not** reopen the language genome. Hand off via Requested docs — do not invent Convert/Secure work in this repo.

## Prove

```bash
npm run test:language
npm run smoke:webir
npm run pack:cwl-vsix
```

## Related

- Queue (empty for CWL): [`DNA-BUILD-NEXT.md`](./DNA-BUILD-NEXT.md)
- Exit publish: [`EXIT-1.0.md`](./EXIT-1.0.md)
- Near-complete history: [`DNA-CWL-NEAR-COMPLETE.md`](./DNA-CWL-NEAR-COMPLETE.md)
