# Exit 1.0 — private registry language release

**Status:** **Published** — `@agenticop-io/cwl@1.0.0`+ (tip **`1.0.17`**) on GitHub Packages  
**CWL Exit/DNA queue:** **CLOSED** — [`DNA-CWL-COMPLETE.md`](./DNA-CWL-COMPLETE.md) · [`DNA-BUILD-NEXT.md`](./DNA-BUILD-NEXT.md)  
**Registry:** GitHub Packages only (`https://npm.pkg.github.com`) — **not** public npm  
**REPOS:** public ([`PRIVATE-PILLARS.md`](./PRIVATE-PILLARS.md))  
**Tip language:** **1.0.26**


## What 1.0.0 is

Packable language surface containing:

- Version pin helpers (`VERSION`, `pillarRoot`, …)
- Staged language modules under `packages/cwl/lib/`
- CLI `bin/cwl` (parse / print / fmt / diagnose / check)
- Subpath exports: `diagnose`, `lsp-map`, `parser`, `print`

**Published name:** `@agenticop-io/cwl` tip `1.0.17` (org scope; lineage from `1.0.0`)  
**Local / `file:` name:** `@chrysalis/cwl` tip `1.0.17` (same tree)

Thesis: DNA of the web / Rosetta meaning — [`ROSETTA-UT-PATH.md`](../language/ROSETTA-UT-PATH.md).

## Prove

```bash
npm run sync:cwl-package-lib
npm run test:language
npm run test:cwl-pack    # CWL_EXIT_1_0_PACK_OK
```

## Consumer pin (Convert / Secure)

```json
"@agenticop-io/cwl": "1.0.17"
```

```text
@agenticop-io:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=TOKEN   # read:packages
```

`file:../chrysalis-cwl/packages/cwl` remains valid during cutover.

## Still Requested (siblings)

| Sibling | Ask |
| --- | --- |
| **Convert** | Registry pin + peel/emit gravity — [`CONVERT-GRAVITY-REQUESTED.md`](./CONVERT-GRAVITY-REQUESTED.md) |
| **Convert** | Reverse-junction WebIR → CWL — [`WEBIR-FLIP-REQUESTED.md`](./WEBIR-FLIP-REQUESTED.md) |
| **Secure** | Cutover default + registry pin — [`SECURE-CUTOVER-REQUESTED.md`](./SECURE-CUTOVER-REQUESTED.md) |

## Honesty

Exit 1.0 is **language package** maturity + private gene bank. It does not claim Convert gravity finished or Secure cutover defaulted. Ecology bootstrap: [`CWL-ECOLOGY.md`](../language/CWL-ECOLOGY.md).
