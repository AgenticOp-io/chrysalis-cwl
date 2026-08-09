# CWL ecology outside AgenticOps

**Status:** bootstrap (Exit 1.0) — private registry + private editor; not Marketplace / public npm  
**Package:** tip `@agenticop-io/cwl@1.0.16` on GitHub Packages (lineage from `1.0.0`)  
**Editor:** `editors/vscode` → private VSIX (`npm run pack:cwl-vsix`)

Ecology outside the AgenticOps monorepo starts here: a versioned language artifact + installable editor support that do **not** require Convert or Secure checkouts.

## 1. Install the language package

Needs a GitHub token with `read:packages` for org `AgenticOp-io`.

```bash
# .npmrc (project or user)
@agenticop-io:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}

npm install @agenticop-io/cwl@1.0.16
```

```js
import { VERSION, pillarRoot } from "@agenticop-io/cwl";
import { parseCwlModule } from "@agenticop-io/cwl/parser";
import { printCwlModule } from "@agenticop-io/cwl/print";
```

CLI (from package bin after install): `cwl check path/to/file.cwl` (no WebIR; pillar owns `emit-check`).

Local monorepo still uses `@chrysalis/cwl` via `file:` — same bits, different scope for GH Packages.

## 2. Private VS Code extension

From this repo:

```bash
npm run pack:cwl-vsix
# → dist-editors/cwl-lsp-<tip>.vsix
```

Install: Extensions → `Install from VSIX…` (or `code --install-extension dist-editors/cwl-lsp-1.0.16.vsix`).

Extension spawns `scripts/cwl-lsp-server.mjs` from the chrysalis-cwl checkout above `editors/vscode`. For a machine without the full pillar, clone this private repo (or set path in extension settings when added).

**Not** on VS Code Marketplace while pillars are private.

## 3. Minimal outsider loop (no Convert)

1. Install `@agenticop-io/cwl@1.0.0`
2. Author `.cwl` with holes for unknowns
3. `cwl check` / `cwl fmt`
4. Optional: private VSIX for diagnostics / completion / same-file rename

WebIR ingest/emit and UT peels remain Convert-owned. Secure DNA cutover remains Secure-owned.

## 4. Honest limits

| Have | Do not claim |
| --- | --- |
| Private GH Packages gene | Public npm |
| Private VSIX | Marketplace listing |
| Stdio LSP (completion + rename v0) | Full IDE / cross-file rename |
| RFCs + language golds in this repo | Convert peel gravity finished |

## Related

- [`CWL-PUBLISH.md`](./CWL-PUBLISH.md) · [`EXIT-1.0.md`](../history/EXIT-1.0.md)
- [`CWL-LSP.md`](./CWL-LSP.md)
- Convert gravity: [`CONVERT-GRAVITY-REQUESTED.md`](../history/CONVERT-GRAVITY-REQUESTED.md)
- Secure cutover: [`SECURE-CUTOVER-REQUESTED.md`](../history/SECURE-CUTOVER-REQUESTED.md)
