# CWL â€” THE language of the web

**Home:** `engines/chrysalis-cwl`  
**Repo:** https://github.com/AgenticOp-io/chrysalis-cwl  
**Version:** [`LANGUAGE_VERSION.md`](../../LANGUAGE_VERSION.md)  
**Portfolio:** [`AgenticOps/docs/THREE_PILLARS.md`](../../../../docs/THREE_PILLARS.md)

---

## 1. Thesis

**Chrysalis Web Language (CWL) is THE language of the web for AgenticOps.**

It is the canonical, human-readable way to say what a web application *is*:

- HTTP routes and handlers (**CWL API**)
- Pages and HTML (**CWL Pages**)
- Page data loaders (**CWL Data**)
- Component / island UI (**CWL UI**)
- Middleware and effects (**CWL Effects**)
- Explicit unsupported regions (**holes** â€” never silent invention)

CWL maps **1:1** to **WebIR**. WebIR is the semantic IR; CWL is the language surface. Emit targets (Hono, Fastify, Next, `runtime-cwl`, Chimera) and oracle verify pull from that pair.

**Convert** translates the worldâ€™s stacks *into and out of* CWL.  
**Secure (Helix)** protects with traffic DNA and *bridges* to CWL when surface must match live identity.  
Neither owns the grammar. Both **need** the language to be real, stable, and honest.

```text
                    â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
                    â”‚   CWL  (this pillar)      â”‚
                    â”‚   THE language of the web â”‚
                    â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
                                 â”‚
              produce / consume  â”‚  semantics + fixtures + version
                                 â”‚
              â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
              â–¼                  â”‚                  â–¼
     â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”          â”‚         â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
     â”‚    Convert     â”‚â—„â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â–ºâ”‚  Secure/Helix  â”‚
     â”‚  translate onlyâ”‚   shared bar       â”‚ DNA + CWL bridgeâ”‚
     â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜                    â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

---

## 2. Why Convert needs CWL

| Need | Without CWL | With CWL |
| --- | --- | --- |
| Lift target | Ad-hoc emit per framework | One authored surface â†’ many emits |
| Hole language | Vague â€œTODOâ€ / silent stubs | Typed `hole reason;` â€” honest budget |
| Verify / oracle | Compare opaque JS trees | Replay against WebIR/CWL contract |
| Authoring | Edit generated Hono/Next forever | Edit `.cwl`, re-emit |
| Product law | Easy to ship demo faÃ§ades | FaÃ§ades fail the language bar |

**Convert rule:** Origin â†’ WebIR/CWL â†’ emit (**D6442**). No demo faÃ§ades (**D6447**). Language fixes land in **this** tree first, then sync mirrors.

Pointer in convert: [`chrysalis-convert/docs/CWL-PILLAR-HOME.md`](../../../chrysalis-convert/docs/CWL-PILLAR-HOME.md).

---

## 3. Why Secure needs CWL

Helix enforces **traffic DNA** (`app-dna-v1`) out of the box â€” it does not load the convert monorepo to protect a host.

Secure still needs CWL when:

| Moment | Role of CWL |
| --- | --- |
| Seed / compare | Route surface from CWL vs learned DNA routes |
| Cutover gate | â€œConverted app matches live DNAâ€ in shared vocabulary |
| Human review | Readable surface of what was certified / disputed |
| Future policy | Attach intent to named routes/pages/effects without inventing a second app language |

**Secure rule:** Never fork CWL grammar into Helix. Bridge to [`chrysalis-cwl`](../../) semantics only.

---

## 4. Surfaces (named layers)

All surfaces share one module (or multi-file `import`), one WebIR module, one honesty bar.

| Surface | Syntax | Language gold | RFC |
| --- | --- | --- | --- |
| **CWL API** | `@route` + `handler` | `01`â€“`08`, `13`â€“`14` | 0001â€“0008 |
| **CWL Pages** | `@page` + `return html` | `09`, `15`, `16` | 0010, 0011, 0014 |
| **CWL Data** | `load { â€¦ }` | `10`, `15` | 0013 |
| **CWL UI** | `return ui`, `@component`, islands | `17`, `18` | 0017â€“0019 |
| **CWL Effects** | `effects:`, `use auth` / `use json` | `07`, `13` | 0007, 0001, 0020 |
| **Control** | `if` / `foreach` | `19` | 0021 |
| **Holes** | `hole reason;` | `11` | 0012 catalog + honesty law |
| **Modules** | `module`, `import` | `12`, `16` | 0009 |

Full taxonomy: [`CWL-SURFACE-TAXONOMY.md`](./CWL-SURFACE-TAXONOMY.md).  
Grammar narrative: [`CWL.md`](./CWL.md).  
RFC index: [`CWL-RFC.md`](./CWL-RFC.md).

### Not CWL surfaces

| Name | Role |
| --- | --- |
| Chimera | Migration runtime shell |
| Emit backends | Hono / Fastify / Next â€” **targets** |
| Databases / queues / vendor SDKs | Infra â€” CWL declares *app* surface, not storage engines |
| Traffic DNA | Secure identity artifact â€” may *bridge* to CWL |

---

## 5. Source of truth (this tree)

| Artifact | Path |
| --- | --- |
| Language version | `LANGUAGE_VERSION.md` |
| Changelog | `CHANGELOG.md` |
| Agent instructions | `AGENTS.md` |
| Cursor rule | `.cursor/rules/cwl-primary.mdc` |
| Grammar + RFCs | `docs/language/` |
| This constitution | `docs/language/CWL-PILLAR-HOME.md` |
| Roadmap | `docs/history/ROADMAP.md` |
| Handoff | `docs/history/PILLAR_HANDOFF.md` |
| Golden fixtures | `fixtures/language-gold/` |
| Parser / print / diagnose / fmt | `scripts/hub-ingest/cwl-*.mjs` |
| Language gates | `scripts/gate-cwl-*.mjs` â†’ `npm run test:language` |
| Packages | `packages/cwl`, `runtime-cwl*`, `emit-runtime-cwl` |

### Packages

| Package | Role |
| --- | --- |
| `@chrysalis/cwl` (surface) | Language package README / public pointer |
| `@chrysalis/runtime-cwl` | In-process HTTP runtime over CWL/WebIR |
| `@chrysalis/runtime-cwl-browser` | Browser runtime |
| `@chrysalis/runtime-cwl-worker` | Worker runtime |
| `@chrysalis/emit-runtime-cwl` | Emit deployable Node project from CWL |

WebIR (`@chrysalis/webir`) still lives under **convert** until extracted â€” shared substrate, not a second language.

### Core scripts (language-owned)

| Script | Role | Convert dependency |
| --- | --- | --- |
| `cwl-parser.mjs` | Parse `.cwl` â†’ AST | **Mirror** â€” sync from here |
| `cwl-print.mjs` | AST â†’ `.cwl` | **Mirror** â€” sync from here |
| `cwl-ui-tree.mjs` | UI tree parse | **Mirror** â€” sync from here |
| `cwl-module-graph.mjs` | Multi-file resolve | **Mirror** |
| `cwl-diagnose.mjs` | Authoring diagnostics | **Mirror** |
| `cwl-fullstack-holes.mjs` | Hole catalog | **Mirror** |
| `hub-cwl-path-params.mjs` | Path `:id` extract | Pillar: no WebIR; convert may add WebIR helper |
| `cwl-fmt.mjs` | Format | Pillar: parseâ†’print; convert may keep WebIR fmt |
| `cwl-ingest.mjs` | CWL â†’ WebIR | Needs WebIR (convert for now) |
| `emit-cwl-from-hub.mjs` | WebIR â†’ CWL | Needs WebIR (convert for now) |

---

## 6. Laws (language)

1. **Honest holes** â€” unsupported behavior is `hole reason;`, never silent invention or demo faÃ§ades.
2. **CWL â†” WebIR authority** â€” no lossy â€œregex liftâ€ as the semantic path.
3. **Version breaking changes** â€” bump `LANGUAGE_VERSION.md` *before* landing breaks.
4. **Judge as a language** â€” RFCs + fixtures + tooling, not one customer POC (WISP showcases; it does not define CWL).
5. **One source of truth** â€” this tree owns semantics; Convert/Secure pull or bridge.
6. **Same bar as the portfolio** â€” propose Â· verify dispose Â· honest holes Â· no faÃ§ades.

---

## 7. Sync protocol (Convert mirrors)

Language behavior is edited **here**. Convert copies are mirrors until junctions replace them.

### Always sync (byte-identical preferred)

- `cwl-parser.mjs`
- `cwl-print.mjs`
- `cwl-ui-tree.mjs`
- `cwl-module-graph.mjs`
- `cwl-diagnose.mjs`
- `cwl-fullstack-holes.mjs`

### Sync carefully

- `hub-cwl-path-params.mjs` â€” keep `extractPathParamsFromCwlPath` identical; convert may retain `cwlPathParamsForWebir`
- Do **not** overwrite convert `cwl-fmt.mjs` with pillar local fmt without an explicit dual-mode decision

### Procedure

```bash
# In chrysalis-cwl
npm run test:language
npm run sync:convert          # copies mirrored scripts into ../chrysalis-convert
                              # (no-op for paths that are already reparse points)
npm run test:cwl-mirrors      # fail if hash diverges and convert path is not a reparse point
```

Or manually: copy the always-sync list into `chrysalis-convert/scripts/hub-ingest/`.

### Junction end-state (target)

Convert always-sync paths become **file reparse points** (Windows file symlinks) or package links into this tree so there is **one** inode for language scripts. Prefer: edit here â†’ `test:language` â†’ `test:cwl-mirrors`. `sync:convert` remains for non-junction setups and for careful merges (`hub-cwl-path-params`).

---

## 8. Gates

```bash
npm run test:language          # round-trip + diagnose
npm run test:cwl-roundtrip     # parse â†’ print â†’ parse
npm run test:cwl-diagnose      # no diagnose errors on language-gold
npm run test:cwl-mirrors       # convert mirrors identical or reparse points
```

| Gate | Pass means |
| --- | --- |
| Round-trip | Every `fixtures/language-gold/**/*.cwl` AST-stable under print; multi-file resolve OK |
| Diagnose | No parse/diagnose **errors** (warns allowed for honest holes / hints) |
| Mirrors | Convert always-sync scripts are byte-identical **or** reparse points into this pillar |

Convert product proves (complete-conversion, hub golds) are **consumer** gates â€” they must not redefine grammar.

---

## 9. Completeness definition

### Language pillar â€œcomplete enoughâ€ for Convert/Secure to depend on

| Criterion | Status (0.1.x) |
| --- | --- |
| RFC index 0001â€“0021 accepted and in-tree | Yes |
| Parse â†’ print round-trip golds for core surfaces | Yes (`01`â€“`19`) |
| Diagnose gate over golds | Yes |
| Version + changelog | Yes |
| Documented ownership + sync protocol | Yes (this file) |
| Local fmt without WebIR | Yes |
| Ingest/fmt via WebIR without convert checkout | No â€” blocked on WebIR extract |
| Junctions instead of copies | In progress (0.2) â€” six always-sync hub-ingest scripts file-symlinked on Windows; `test:cwl-mirrors` gate; copies still used when no reparse |
| Published npm language version â‰¡ `LANGUAGE_VERSION.md` | No |
| Nested `if` / nested `foreach` stmt lists | No (RFC-0021 remaining gap) |
| DNAâ†”CWL bridge library in Secure | No (Secure later) |

### Per-surface language bar

A surface is **language-ready** when:

1. RFC accepted  
2. Parser + print round-trip fixture green  
3. Semantics documented in `CWL.md` / taxonomy  
4. Breaking changes versioned  

**Runtime/emit/verify depth** can lag the language bar â€” Convert deepens verify; this pillar does not wait on one POC to define syntax.

---

## 10. Roadmap (summary)

See [`docs/history/ROADMAP.md`](../history/ROADMAP.md) for the working checklist.

| Phase | Outcome |
| --- | --- |
| **0.1.x** | Bootstrap: golds, gates, UI/print, RFC-0021 capture, Convert sync, this constitution |
| **0.2** | Junctions for mirrored scripts; sync script CI; expand golds for RFC-0015/0016/0020 |
| **0.3** | WebIR extract or vendor so ingest runs in this pillar |
| **0.4** | Pillar CLI (`cwl parse|print|fmt|diagnose|check`) |
| **1.0** | Published language package; Convert/Secure depend on versioned release |

---

## 11. Agent operating procedure

1. Read `AGENTS.md`, this file, `LANGUAGE_VERSION.md`, `ROADMAP.md`.
2. Change language behavior **only** in `chrysalis-cwl`.
3. Add/adjust `fixtures/language-gold` when syntax/semantics change.
4. Run `npm run test:language`.
5. Sync convert mirrors (`npm run sync:convert`).
6. Bump `LANGUAGE_VERSION.md` + `CHANGELOG.md` for user-visible language changes.
7. Refuse Helix firewall features and demo faÃ§ades.

Starter paste: [`docs/history/NEW_AGENT_STARTER.md`](../history/NEW_AGENT_STARTER.md).

---

## 12. Related index

| Doc | Role |
| --- | --- |
| [`CWL.md`](./CWL.md) | Language reference |
| [`CWL-RFC.md`](./CWL-RFC.md) | RFC index |
| [`CWL-SURFACE-TAXONOMY.md`](./CWL-SURFACE-TAXONOMY.md) | Named surfaces |
| [`LANGUAGE_VERSION.md`](../../LANGUAGE_VERSION.md) | Semver for the language |
| [`CHANGELOG.md`](../../CHANGELOG.md) | What changed |
| [`fixtures/language-gold/README.md`](../../fixtures/language-gold/README.md) | Gold map |
| [`THREE_PILLARS.md`](../../../../docs/THREE_PILLARS.md) | Portfolio map |

---

## One line

**CWL is THE language of the web. Convert lifts apps into it. Secure proves live identity â€” and speaks CWL when bridging surface to DNA.**
