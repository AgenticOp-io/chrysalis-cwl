# Exit 1.0 — private registry language release

**Status:** CWL-side Exit 1.0 opened (`LANGUAGE_VERSION` **1.0.0**)  
**Registry:** GitHub Packages only (`https://npm.pkg.github.com`) — **not** public npm  
**Repos:** remain private ([`PRIVATE-PILLARS.md`](./PRIVATE-PILLARS.md))

## What 1.0.0 is

Packable `@chrysalis/cwl@1.0.0` containing:

- Version pin helpers (`VERSION`, `pillarRoot`, …)
- Staged language modules under `packages/cwl/lib/` (synced from `scripts/hub-ingest/`)
- CLI `bin/cwl` (parse / print / fmt / diagnose / check)
- Subpath exports: `diagnose`, `lsp-map`, `parser`, `print`

Thesis: DNA of the web / Rosetta meaning — [`ROSETTA-UT-PATH.md`](../language/ROSETTA-UT-PATH.md).

## CWL prove (before publish)

```bash
npm run sync:cwl-package-lib
npm run test:language
npm run test:cwl-pack    # alias → publish-prep pack dry-run → CWL_EXIT_1_0_PACK_OK
```

## Publish (human / CI)

**Preferred:** push tag `cwl-v*` → workflow `publish-cwl` publishes **`@agenticop-io/cwl`** (org scope required by GitHub Packages). Local package name stays `@chrysalis/cwl` for `file:` pins.

**Local (needs Packages scope):**

```bash
gh auth refresh -h github.com -s write:packages,read:packages,repo
# complete device login in browser

cd packages/cwl
npm pkg set name=@agenticop-io/cwl
# .npmrc:
# @agenticop-io:registry=https://npm.pkg.github.com
# //npm.pkg.github.com/:_authToken=$(gh auth token)
npm publish --access restricted
npm pkg set name=@chrysalis/cwl   # restore local name
```

`gh` default token often lacks `write:packages` (only `repo`) — refresh is required.

## After publish — Requested

| Sibling | Ask |
| --- | --- |
| **Convert** | Pin `@chrysalis/cwl@1.0.0` from GitHub Packages (or keep `file:` until ready) — [`CONVERT-GRAVITY-REQUESTED.md`](./CONVERT-GRAVITY-REQUESTED.md) |
| **Secure** | Same registry pin when bridging — [`SECURE-CUTOVER-REQUESTED.md`](./SECURE-CUTOVER-REQUESTED.md) |
| **Convert** | WebIR flip still open — [`WEBIR-FLIP-REQUESTED.md`](./WEBIR-FLIP-REQUESTED.md) |

## Honesty

Exit 1.0 is **language package** maturity. It does not claim Convert gravity finished, WebIR flipped, or Secure cutover defaulted.
