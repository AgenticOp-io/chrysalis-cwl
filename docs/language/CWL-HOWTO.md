# CWL how-to — install and use

**Tip language:** **`1.0.35`** ([`LANGUAGE_VERSION.md`](../../LANGUAGE_VERSION.md))  
**Repo:** [AgenticOp-io/chrysalis-cwl](https://github.com/AgenticOp-io/chrysalis-cwl) (public, Apache-2.0)  
**Audience:** authors, integrators, Convert/Secure consumers, and anyone cloning the language pillar

This guide covers **everything this repo ships**: package install, CLI, authoring, golds, WebIR Rosetta checks, DNA seed, editor, runtime packages, and sibling pin paths. It does **not** teach Convert peels or Helix enforce — those stay in their pillars.

| You want… | Jump to |
| --- | --- |
| Clone and prove the language | [§1 Quick start (pillar)](#1-quick-start-pillar-checkout) |
| Install the npm package only | [§2 Install the language package](#2-install-the-language-package) |
| Write / check `.cwl` | [§3 Author `.cwl`](#3-author-cwl) · [§4 CLI](#4-cli-reference) |
| Learn by fixtures | [§5 Language golds](#5-learn-from-language-golds) |
| Call parser/print from JS | [§6 Programmatic API](#6-programmatic-api) |
| VS Code / LSP | [§7 Editor](#7-editor-vs-code--lsp) |
| Serve / emit runtime | [§8 Runtime packages](#8-runtime--emit-packages) |
| DNA for Secure | [§9 DNA seed](#9-dna-seed-secure-bridge) |
| Gates / CI | [§10 Prove it](#10-prove-it-gates--smokes) |
| Pin Convert/Secure | [§11 Sibling consumers](#11-sibling-consumers-convert--secure) |
| Stuck | [§12 Troubleshooting](#12-troubleshooting) |

**Constitution:** [`CWL-PILLAR-HOME.md`](./CWL-PILLAR-HOME.md) · **CLI detail:** [`CWL-CLI.md`](./CWL-CLI.md) · **Publish:** [`CWL-PUBLISH.md`](./CWL-PUBLISH.md)

---

## 0. What you get

CWL is the **readable genome** of a web app: routes, pages, data loaders, UI islands, effects, and **honest holes** when something cannot be claimed safely. Convert translates through it; Secure may bridge traffic DNA to it. This pillar owns grammar, RFCs, parser/print, golds, and the packable language surface.

| Artifact | Path / name | Role |
| --- | --- | --- |
| Language package | `packages/cwl` → `@chrysalis/cwl` / published `@agenticop-io/cwl` | Parser, print, diagnose, DNA seed, packable `cwl` bin |
| Pillar CLI | `scripts/cwl-cli.mjs` | Full authoring + **WebIR** `emit-check` / `fmt --webir` |
| Language golds | `fixtures/language-gold/` | Spec-by-example (`01` … `38`) |
| WebIR package | `packages/webir` | Homeable IR types/builder (build for Rosetta reverse) |
| Runtime | `packages/runtime-cwl*` | In-process HTTP serve via WebIR simulation |
| Emit runtime | `packages/emit-runtime-cwl` | Emit a deployable Node project from WebIR |
| Editor | `editors/vscode` | TextMate + stdio LSP (local VSIX) |
| RFCs / reference | `docs/language/CWL-RFC*.md`, `CWL.md` | Normative language docs |

**Honest limits**

- Public **GitHub** ≠ public **npm**. Default install is GitHub Packages or this checkout (`file:`).
- Packable `cwl` bin has **no WebIR**. Rosetta reverse (`emit-check`, `fmt --webir`) needs this pillar + `npm run build:webir`.
- `runtime-cwl` / emit packages expect a Chrysalis workspace (Convert junctions / workspace deps). They are not a standalone “npm install and production-serve” product.
- Nest / LiveView / Flutter façades and inventing missing origin behavior are **out of scope** — use `hole …;`.

---

## 1. Quick start (pillar checkout)

**Requirements:** Node.js **≥ 22**, git, network for first `npm install` under `packages/webir` when you need WebIR.

```bash
git clone https://github.com/AgenticOp-io/chrysalis-cwl.git
cd chrysalis-cwl

# Authoring CLI (no WebIR required)
npm run cwl -- parse fixtures/language-gold/01-literals/routes.cwl
npm run cwl -- check fixtures/language-gold/01-literals
npm run cwl -- diagnose fixtures/language-gold/11-holes/routes.cwl
npm run cwl -- dna-seed fixtures/language-gold/24-dna-bridge/routes.cwl

# Full language gates (build WebIR first for emit-check)
npm run build:webir
CWL_REQUIRE_WEBIR=1 npm run test:language
```

Optional: link the pillar bin globally from this repo:

```bash
npm link   # exposes `cwl` → scripts/cwl-cli.mjs
cwl check fixtures/language-gold/01-literals/routes.cwl
```

Windows Convert mirrors (only if you also have `../chrysalis-convert`):

```bash
npm run setup:mirrors    # Developer Mode / symlink privilege
npm run test:cwl-mirrors
```

---

## 2. Install the language package

### 2.1 From GitHub Packages (outside the monorepo)

Published name: **`@agenticop-io/cwl`**. Tip version must match [`LANGUAGE_VERSION.md`](../../LANGUAGE_VERSION.md) (today **`1.0.35`**). A token with `read:packages` on org **AgenticOp-io** is required.

```bash
# .npmrc (project or user)
@agenticop-io:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}

npm install @agenticop-io/cwl@1.0.35
```

```bash
npx cwl --help
npx cwl check ./routes.cwl
npx cwl parse ./routes.cwl
npx cwl fmt ./routes.cwl --check
npx cwl dna-seed ./routes.cwl
```

If the tip you need is not yet on Packages, pin this checkout instead (§2.2) — **do not** invent a public-npm default.

### 2.2 From a local clone (`file:`)

```json
{
  "dependencies": {
    "@chrysalis/cwl": "file:../chrysalis-cwl/packages/cwl"
  }
}
```

Same bits as the published package; scope stays `@chrysalis/cwl` for monorepo / Convert / Secure `file:` pins.

After pulling tip bumps:

```bash
cd chrysalis-cwl
npm run sync:cwl-package-lib   # stage scripts/hub-ingest → packages/cwl/lib
```

### 2.3 Packable bin vs pillar CLI

| Capability | `npx cwl` / `@agenticop-io/cwl` bin | Pillar `npm run cwl --` |
| --- | --- | --- |
| `parse` / `print` / `fmt` / `diagnose` / `check` / `dna-seed` | Yes | Yes |
| `fmt --webir` | No (redirect to pillar) | Yes (after `build:webir`) |
| `emit-check` | No | Yes (after `build:webir`) |

---

## 3. Author `.cwl`

### 3.1 Minimal module

Create `routes.cwl`:

```cwl
module hello;

@route GET "/health"
handler health {
  effects: none;
  return { ok: true };
}

@page GET "/"
handler home {
  effects: none;
  return html {
    <main><h1>Hello</h1></main>
  };
}
```

Check it:

```bash
npm run cwl -- check routes.cwl
# or, with the package bin:
npx cwl check routes.cwl
```

### 3.2 Surfaces (what to write)

| Surface | Syntax | Use when |
| --- | --- | --- |
| **API** | `@route METHOD "path"` | JSON/API handlers |
| **Pages** | `@page METHOD "path"` | HTML / SSR |
| **Data** | `load { … }` inside a page | Redirect, error, cookie, data for the page |
| **Effects** | `use …;` · `effects: …` | Middleware / side-effect presets |
| **UI** | `@component` / islands (RFCs 0017–0019, 0028) | Client islands — holes when unsafe |
| **Holes** | `hole reason;` | Anything you cannot honestly claim |

Reference: [`CWL.md`](./CWL.md) · taxonomy: [`CWL-SURFACE-TAXONOMY.md`](./CWL-SURFACE-TAXONOMY.md) · RFCs: [`CWL-RFC.md`](./CWL-RFC.md)

### 3.3 Urlencoded form POST (tip 1.0.26)

```cwl
module form_urlencoded;
use urlencoded;

@route POST "/signup"
handler signup {
  effects: none;
  body email;
  body name;
  return { ok: true, email: email, name: name };
}
```

Gold: `fixtures/language-gold/35-form-urlencoded/`.

### 3.4 Layout chrome + HTML island (tip 1.0.27+)

```cwl
layout shell {
  chrome html "<header><a href='/cwl'>CWL</a></header>";
}

@page GET "/"
page home {
  layout shell;
  client ui "device" {
    on resize { action "classify-device"; }
  }
  cookie cp_device;
  load { device: cookie cp_device };
  return html "<main data-device='device'>home</main>";
}
```

Golds: `36-layout-chrome`, `37-html-cookie-device`, `38-html-page-island`. RFCs 0029 / 0014 / 0030.

### 3.5 Honest holes

Never invent. Catalogued reasons diagnose as **info**; uncatalogued as **warn**.

```cwl
module holes;

@route GET "/legacy"
handler legacy {
  effects: none;
  hole unsupported:php-session;
}
```

See gold `11-holes` and RFC-0012.

### 3.5 Multi-file

```cwl
module api;
import "routes/health.cwl";
import "routes/items.cwl";
```

RFC-0009. Entry module merges imports; lift tools typically ingest the entry `routes.cwl`.

---

## 4. CLI reference

**Pillar entry:** `npm run cwl -- <command> …` · `node scripts/cwl-cli.mjs …`  
**Package entry:** `npx cwl <command> …`  
Full flag tables: [`CWL-CLI.md`](./CWL-CLI.md)

### 4.1 Everyday commands

```bash
# Parse → AST JSON
npm run cwl -- parse path/to/app.cwl

# Canonical print to stdout
npm run cwl -- print path/to/app.cwl

# Format (writes file by default)
npm run cwl -- fmt path/to/app.cwl
npm run cwl -- fmt path/to/app.cwl --stdout
npm run cwl -- fmt path/to/app.cwl --check          # CI: exit 1 if dirty

# Diagnostics JSON (editor-facing codes)
npm run cwl -- diagnose path/to/app.cwl

# Round-trip AST + diagnose (file or directory of *.cwl)
npm run cwl -- check path/to/app.cwl
npm run cwl -- check fixtures/language-gold
npm run check -- fixtures/language-gold             # shortcut

# Draft DNA (RFC-0022/0023)
npm run cwl -- dna-seed fixtures/language-gold/24-dna-bridge/routes.cwl
```

### 4.2 Rosetta reverse (pillar + WebIR)

```bash
npm run build:webir

npm run cwl -- emit-check fixtures/language-gold/19-early-exit/routes.cwl
npm run cwl -- emit-check fixtures/language-gold/19-early-exit/routes.cwl --stdout

npm run cwl -- fmt fixtures/language-gold/01-literals/routes.cwl --webir --stdout
```

`emit-check` prints a JSON report (`CWL_EMIT_CHECK_OK` on success). Honest emit holes stay holes (`holeReasons`).

### 4.3 Diagnose codes (short)

| Code | Severity | Meaning |
| --- | --- | --- |
| `parse` | error | Not valid CWL |
| `module-name` | warn | Missing `module name;` |
| `duplicate-route` | warn | Same method+path twice |
| `uncatalogued-hole` | warn | Hole reason not in catalog |
| `catalogued-hole` | info | Honest catalogued hole |
| `surface-mismatch` | warn | `@page` vs `@route` body mismatch |
| `param-unused` | warn | Declared param unused in HTML |
| `opaque-residual` | info | Authored `g_*` cond skipped on ingest (no invent) |

`check` fails on round-trip failure or diagnose **error**; warns are reported but do not fail (same policy as `test:cwl-diagnose`).

---

## 5. Learn from language golds

Golds are the **language proof**, not product demos. Browse `fixtures/language-gold/`:

| Start here | Topic |
| --- | --- |
| `01-literals` | Returns, API core |
| `02`–`08` | Params, body, status, auth, content-type |
| `09`–`10` | Pages + `load` |
| `11` | Holes |
| `12`–`16` | Multi-file, middleware, HTML, layout |
| `17`–`19` | UI + early-exit control |
| `24`, `34` | DNA bridge |
| `27`, `35` | Redirect/error shell + urlencoded forms (recent tip) |

Suite map: [`fixtures/language-gold/README.md`](../../fixtures/language-gold/README.md)

```bash
npm run cwl -- check fixtures/language-gold
npm run smoke:cwl-ingest          # after build:webir — ingest golds
npm run smoke:cwl-emit            # emit reverse matrix
```

---

## 6. Programmatic API

```js
import { readFile } from "node:fs/promises";
import {
  VERSION,
  pillarRoot,
  languageVersion,
} from "@chrysalis/cwl"; // or @agenticop-io/cwl

import { parseCwlModule } from "@chrysalis/cwl/parser";
import { printCwlModule, canonicalizeCwlModule } from "@chrysalis/cwl/print";
import { diagnoseCwlSource } from "@chrysalis/cwl/diagnose";
import { seedDraftDnaFromCwlPath } from "@chrysalis/cwl/dna-seed";

console.log(VERSION); // must equal LANGUAGE_VERSION.md when consuming tip

const src = await readFile("routes.cwl", "utf8");
const mod = parseCwlModule(src, "routes.cwl");
const out = printCwlModule(mod);
const diags = diagnoseCwlSource(src, "routes.cwl");
```

Subpath exports (from `packages/cwl/package.json`):

| Import | Role |
| --- | --- |
| `@chrysalis/cwl` | `VERSION`, `pillarRoot`, `languageVersion` |
| `…/parser` | `parseCwlModule` |
| `…/print` | print / canonicalize |
| `…/diagnose` | authoring diagnostics |
| `…/lsp-map` | editor diagnose map |
| `…/dna-seed` | RFC-0022/0023 draft DNA |

Canonical implementation lives under `scripts/hub-ingest/`; packing syncs into `packages/cwl/lib/` via `npm run sync:cwl-package-lib`.

---

## 7. Editor (VS Code / LSP)

```bash
cd chrysalis-cwl
npm run pack:cwl-vsix
# → dist-editors/cwl-lsp-<version>.vsix
```

Install: Extensions → **Install from VSIX…**, or:

```bash
code --install-extension dist-editors/cwl-lsp-1.0.35.vsix
```

(Exact filename follows tip / packer output.)

**Have:** TextMate highlighting, stdio LSP (diagnostics, format, hover, completion, definition/references/rename on the import graph), document symbols for `@route` / `@page`.

**Do not claim:** VS Code Marketplace by default; full IDE; rename that rewrites path strings/comments.

Detail: [`CWL-LSP.md`](./CWL-LSP.md) · ecology: [`CWL-ECOLOGY.md`](./CWL-ECOLOGY.md)

---

## 8. Runtime & emit packages

These live under `packages/` and are aimed at **Chrysalis workspaces** (Convert-linked deps such as `@chrysalis/rewrite`, workspace WebIR).

### 8.1 `@chrysalis/runtime-cwl`

In-process HTTP runtime: CWL/WebIR → `fetch` / Node `http` via the WebIR simulator (honest **501** on unsupported ops).

```bash
# From a workspace that can resolve runtime-cwl deps (typically Convert + CWL):
pnpm exec chrysalis-cwl-serve --cwl path/to/routes.cwl --port 8787
```

API sketch: `loadModuleFromCwlFile`, `createCwlRuntime`, `startCwlServer` — see [`packages/runtime-cwl/README.md`](../../packages/runtime-cwl/README.md).

Related: `runtime-cwl-browser`, `runtime-cwl-worker` for non-Node surfaces.

### 8.2 `@chrysalis/emit-runtime-cwl`

WebIR → deployable Node project that uses `runtime-cwl`. Build/test inside the workspace; not a public npm default.

### 8.3 WebIR in this pillar

```bash
npm run build:webir      # install + build packages/webir
npm run link:webir       # optional junction helpers
npm run smoke:webir      # resolve smoke
```

Ownership flip notes: [`packages/WEBIR.md`](../../packages/WEBIR.md).

---

## 9. DNA seed (Secure bridge)

Draft **app-dna-v1**-shaped JSON from CWL surface (RFC-0022 / RFC-0023). This does **not** replace live traffic DNA in Helix.

```bash
npm run cwl -- dna-seed fixtures/language-gold/24-dna-bridge/routes.cwl
# package bin:
npx cwl dna-seed ./routes.cwl
```

Golds: `24-dna-bridge`, `34-dna-bridge-surfaces`. Gate: `npm run test:cwl-dna-bridge`.

Secure consume/cutover stays in [chrysalis-security](https://github.com/AgenticOp-io/chrysalis-security) — any CWL bridge must match this tip’s semantics.

---

## 10. Prove it (gates & smokes)

### 10.1 Language tip gate (required before claiming language done)

```bash
npm run build:webir
CWL_REQUIRE_WEBIR=1 npm run test:language
```

`test:language` runs sync + roundtrip, diagnose, DNA bridge, hole catalog, pin, package exports, publish-prep, LSP map/server, grammar, fmt, emit-check.

### 10.2 Broader smokes

```bash
npm run smoke:cwl-ingest
npm run smoke:cwl-emit
npm run smoke:cwl-ingest-matrix
npm run smoke:cwl-runtime-matrix
npm run test:runtime-cwl
npm run test:language:full   # language + ingest/emit + matrices + runtime
```

UT ↔ Helix spine (needs Secure/Helix when `--require-helix`):

```bash
npm run smoke:ut-spine
npm run smoke:ut-evidence
```

### 10.3 Tip checklist ([`LANGUAGE_VERSION.md`](../../LANGUAGE_VERSION.md))

```bash
npm run build:webir
CWL_REQUIRE_WEBIR=1 npm run test:language
npm run smoke:cwl-ingest-matrix
npm run smoke:cwl-runtime-matrix
npm run smoke:cwl-emit
```

---

## 11. Sibling consumers (Convert · Secure)

| Consumer | Repo | How they use CWL |
| --- | --- | --- |
| **Convert** | [AgenticOp-io/chrysalis](https://github.com/AgenticOp-io/chrysalis) | UT: origin → WebIR/CWL → emit; pin `@chrysalis/cwl` via `file:` or Packages |
| **Secure** | [AgenticOp-io/chrysalis-security](https://github.com/AgenticOp-io/chrysalis-security) | Traffic DNA first; optional CWL bridge ≡ this tip |

**Rule:** language fixes land **here first**. Do not invent divergent parsers under Convert/Secure.

Mirror helpers (Convert checkout at `../chrysalis-convert`):

```bash
npm run setup:mirrors     # recreate convert→cwl file symlinks
npm run sync:convert      # copy when dest is a plain file
npm run test:cwl-mirrors  # hashes match OR reparse points
```

Coordination bus: [`docs/pillar-sync/`](../pillar-sync/README.md).

Platform orbit (already public): `wptp-ir`, adapters, emitters, `wptp-matrix` under AgenticOp-io — Convert consumes; they are not a second CWL grammar.

---

## 12. Troubleshooting

| Symptom | Fix |
| --- | --- |
| `emit-check` / `fmt --webir` fails from `npx cwl` | Expected — use pillar `npm run cwl --` after `npm run build:webir` |
| `test:cwl-emit-check` skipped | Set `CWL_REQUIRE_WEBIR=1` and build WebIR |
| Package version ≠ tip | Align `packages/cwl/package.json` with `LANGUAGE_VERSION.md`; run `sync:cwl-package-lib` |
| GitHub Packages 401 | Token needs `read:packages`; configure `@agenticop-io:registry` |
| Convert mirrors diverge | `setup:mirrors` or `sync:convert`, then `test:cwl-mirrors` |
| Windows symlink errors | Enable Developer Mode / grant symlink privilege; or use `sync:convert` copies |
| VSIX diagnostics empty | Extension expects pillar tree above `editors/vscode` (clone this repo) |
| Want Nest/LiveView/Flutter “support” | Out of scope — leave `hole …;` until a real language gene exists |
| Patent / counsel markdown | Keep out of public trees unless counsel clears |

---

## 13. Versioning & docs map

| Doc | Role |
| --- | --- |
| [`LANGUAGE_VERSION.md`](../../LANGUAGE_VERSION.md) | Tip semver + gate commands |
| [`CHANGELOG.md`](../../CHANGELOG.md) | Language deltas |
| [`CWL-PILLAR-HOME.md`](./CWL-PILLAR-HOME.md) | Ownership constitution |
| [`ROSETTA-UT-PATH.md`](./ROSETTA-UT-PATH.md) | Rosetta → UT path |
| [`CWL-HOWTO.md`](./CWL-HOWTO.md) | **This guide** |
| [`CWL-CLI.md`](./CWL-CLI.md) | CLI flags |
| [`CWL-PUBLISH.md`](./CWL-PUBLISH.md) | Packages publish / pin |
| [`CWL-ECOLOGY.md`](./CWL-ECOLOGY.md) | Outside-monorepo bootstrap |
| [`CWL.md`](./CWL.md) | Language reference |
| [`PRIVATE-PILLARS.md`](../history/PRIVATE-PILLARS.md) | Public repo catalog |

**Bump rule:** tip bump updates `LANGUAGE_VERSION.md` **and** `packages/cwl` version together, adds/adjusts golds, and keeps Convert/Secure pins notified via pillar-sync.

---

## 14. One-page cheat sheet

```bash
# Clone
git clone https://github.com/AgenticOp-io/chrysalis-cwl.git && cd chrysalis-cwl

# Check a file
npm run cwl -- check path/to/routes.cwl

# Format
npm run cwl -- fmt path/to/routes.cwl

# Package consumers
npm install @agenticop-io/cwl@1.0.35   # needs GH Packages auth
npx cwl check path/to/routes.cwl

# Rosetta reverse
npm run build:webir
npm run cwl -- emit-check path/to/routes.cwl

# Tip proof
CWL_REQUIRE_WEBIR=1 npm run test:language

# Editor
npm run pack:cwl-vsix
```

Website overview: [agenticop.io/whitepaper.html](https://agenticop.io/whitepaper.html) · DNA story: [agenticop.io/chrysalis.html](https://agenticop.io/chrysalis.html)
