# CWL publish & consumer pin path

**Status:** Exit **1.0 published** — tip **`@agenticop-io/cwl@1.0.17`** on GitHub Packages (lineage from `1.0.0`; tags `cwl-v*`).  
See [`EXIT-1.0.md`](../history/EXIT-1.0.md) · queue [`DNA-BUILD-NEXT.md`](../history/DNA-BUILD-NEXT.md) (**CLOSED**).

Canonical version: [`LANGUAGE_VERSION.md`](../../LANGUAGE_VERSION.md)  
Local package: [`packages/cwl/package.json`](../../packages/cwl/package.json) (`@chrysalis/cwl`)  
Published package: **`@agenticop-io/cwl`** (org scope)

---

## Exit 1.0 gate

| Gate | Status |
| --- | --- |
| `LANGUAGE_VERSION.md` ≡ package version (tip) | Done |
| `npm run test:language` green | Done |
| `npm pack --dry-run` includes `lib/` + `bin/` (`CWL_EXIT_1_0_PACK_OK`) | Done |
| GitHub Packages publish | **Done** (`cwl-v*` → `@agenticop-io/cwl`) |
| Convert + Secure registry tip pin | **Requested** (`file:` still OK) |
| Public npm | **Forbidden** |

## Install (outside monorepo)

```text
@agenticop-io:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=TOKEN   # read:packages
```

```bash
npm install @agenticop-io/cwl@1.0.17
```

Ecology / VSIX: [`CWL-ECOLOGY.md`](./CWL-ECOLOGY.md).

## Package subpath exports

| Import | Role |
| --- | --- |
| `@chrysalis/cwl` or `@agenticop-io/cwl` | `VERSION`, `pillarRoot`, `languageVersion` |
| `…/diagnose` | diagnose helpers |
| `…/lsp-map` | editor diagnose map |
| `…/parser` | `parseCwlModule` |
| `…/print` | print / canonicalize |
| `…/dna-seed` | RFC-0022/0023 draft DNA |

Packable CLI: parse/print/fmt/diagnose/check/dna-seed — **no WebIR**. Pillar `npm run cwl -- emit-check` / `fmt --webir` for Rosetta reverse.

## Sibling pin

Prefer tip registry version; `file:../chrysalis-cwl/packages/cwl` OK during cutover. See [`CONVERT-GRAVITY-REQUESTED.md`](../history/CONVERT-GRAVITY-REQUESTED.md) · [`SECURE-CUTOVER-REQUESTED.md`](../history/SECURE-CUTOVER-REQUESTED.md).
