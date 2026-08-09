# CWL publish & consumer pin path

**Status:** Exit **1.0.0** CWL-side — packable for GitHub Packages. Actual `npm publish` needs a token ([`EXIT-1.0.md`](../history/EXIT-1.0.md)).

Canonical version: [`LANGUAGE_VERSION.md`](../../LANGUAGE_VERSION.md)  
Package: [`packages/cwl/package.json`](../../packages/cwl/package.json) (`@chrysalis/cwl`)

---

## Exit 1.0 gate

| Gate | Status |
| --- | --- |
| `LANGUAGE_VERSION.md` ≡ package version (`1.0.0`) | Required |
| `npm run test:language` green | Required |
| `npm pack --dry-run` includes `lib/` + `bin/` (`CWL_EXIT_1_0_PACK_OK`) | Required |
| Convert + Secure `file:` pins still accepted | Transition OK |
| Registry | **GitHub Packages only** (`publishConfig.access: restricted`) |
| Public npm | **Forbidden** unless human reopens |

## GitHub Packages publish name

Local / `file:` consumers keep package name **`@chrysalis/cwl`**.

GitHub Packages requires the npm scope to match the org (`AgenticOp-io`), so the **published** artifact is:

```text
@agenticop-io/cwl@1.0.0
```

CI (`.github/workflows/publish-cwl.yml`) renames at publish time. After publish, Convert/Secure may:

```json
"@agenticop-io/cwl": "1.0.0"
```

with `.npmrc`:

```text
@agenticop-io:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_TOKEN
```

Or keep `file:../chrysalis-cwl/packages/cwl` until ready.

## Package subpath exports

| Import | Role |
| --- | --- |
| `@chrysalis/cwl` | `VERSION`, `pillarRoot`, `languageVersion` |
| `@chrysalis/cwl/diagnose` | diagnose helpers |
| `@chrysalis/cwl/lsp-map` | LSP map helpers |
| `@chrysalis/cwl/parser` | `parseCwlModule` |
| `@chrysalis/cwl/print` | `printCwlModule`, `canonicalizeCwlModule` |

Staged from `scripts/hub-ingest/` via `npm run sync:cwl-package-lib`.

## How Convert / Secure should pin

### Until registry publish lands

Prefer `file:../chrysalis-cwl/packages/cwl` (proven by `test:cwl-pin`).

### After GitHub Packages has `@chrysalis/cwl@1.0.0`

```json
"@chrysalis/cwl": "1.0.0"
```

with `.npmrc` pointing `@chrysalis` at `https://npm.pkg.github.com`.

See [`EXIT-1.0.md`](../history/EXIT-1.0.md).
