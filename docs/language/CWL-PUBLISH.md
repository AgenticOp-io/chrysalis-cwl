# CWL publish & consumer pin path

**Status:** Exit **1.0.0 published** — `@agenticop-io/cwl@1.0.0` on GitHub Packages ([`EXIT-1.0.md`](../history/EXIT-1.0.md)).

Canonical version: [`LANGUAGE_VERSION.md`](../../LANGUAGE_VERSION.md)  
Local package: [`packages/cwl/package.json`](../../packages/cwl/package.json) (`@chrysalis/cwl`)  
Published package: **`@agenticop-io/cwl`** (org scope)

---

## Exit 1.0 gate

| Gate | Status |
| --- | --- |
| `LANGUAGE_VERSION.md` ≡ package version (`1.0.0`) | Done |
| `npm run test:language` green | Done |
| `npm pack --dry-run` includes `lib/` + `bin/` (`CWL_EXIT_1_0_PACK_OK`) | Done |
| GitHub Packages publish | **Done** (`@agenticop-io/cwl@1.0.0`) |
| Convert + Secure registry pins | Requested (`file:` still OK) |
| Public npm | **Forbidden** |

## Install (outside monorepo)

```text
@agenticop-io:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=TOKEN   # read:packages
```

```bash
npm install @agenticop-io/cwl@1.0.0
```

Ecology / VSIX: [`CWL-ECOLOGY.md`](./CWL-ECOLOGY.md).

## Package subpath exports

| Import | Role |
| --- | --- |
| `@chrysalis/cwl` or `@agenticop-io/cwl` | `VERSION`, `pillarRoot`, `languageVersion` |
| `…/diagnose` | diagnose helpers |
| `…/lsp-map` | LSP map helpers |
| `…/parser` | `parseCwlModule` |
| `…/print` | `printCwlModule`, `canonicalizeCwlModule` |

## How Convert / Secure should pin

### Transition

`file:../chrysalis-cwl/packages/cwl` (proven by `test:cwl-pin`).

### Registry (preferred after Exit 1.0)

```json
"@agenticop-io/cwl": "1.0.0"
```

See [`EXIT-1.0.md`](../history/EXIT-1.0.md) · [`CONVERT-GRAVITY-REQUESTED.md`](../history/CONVERT-GRAVITY-REQUESTED.md) · [`SECURE-CUTOVER-REQUESTED.md`](../history/SECURE-CUTOVER-REQUESTED.md).
