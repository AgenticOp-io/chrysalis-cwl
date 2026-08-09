# Exit 1.0 — private registry language release

**Status:** **Published** — `@agenticop-io/cwl@1.0.0` on GitHub Packages (2026-08-09)  
**Workflow:** [publish-cwl run 31320726984](https://github.com/AgenticOp-io/chrysalis-cwl/actions/runs/31320726984) · tag `cwl-v1.0.0`  
**Registry:** GitHub Packages only (`https://npm.pkg.github.com`) — **not** public npm  
**Repos:** remain private ([`PRIVATE-PILLARS.md`](./PRIVATE-PILLARS.md))

## What 1.0.0 is

Packable language surface containing:

- Version pin helpers (`VERSION`, `pillarRoot`, …)
- Staged language modules under `packages/cwl/lib/`
- CLI `bin/cwl` (parse / print / fmt / diagnose / check)
- Subpath exports: `diagnose`, `lsp-map`, `parser`, `print`

**Published name:** `@agenticop-io/cwl@1.0.0` (org scope required by GH Packages)  
**Local / `file:` name:** `@chrysalis/cwl@1.0.0` (same tree)

Thesis: DNA of the web / Rosetta meaning — [`ROSETTA-UT-PATH.md`](../language/ROSETTA-UT-PATH.md).

## Prove

```bash
npm run sync:cwl-package-lib
npm run test:language
npm run test:cwl-pack    # CWL_EXIT_1_0_PACK_OK
```

## Consumer pin (Convert / Secure)

```json
"@agenticop-io/cwl": "1.0.0"
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
