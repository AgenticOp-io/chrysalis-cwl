# CWL — DNA of the web (Rosetta + Universal Translator)

**Home:** `engines/chrysalis-cwl`  
**Repo:** https://github.com/AgenticOp-io/chrysalis-cwl  
**Version:** [`LANGUAGE_VERSION.md`](../../LANGUAGE_VERSION.md)  
**Portfolio:** [`AgenticOps/docs/THREE_PILLARS.md`](../../../../docs/THREE_PILLARS.md)  
**Path:** [`ROSETTA-UT-PATH.md`](./ROSETTA-UT-PATH.md)

---

## 1. Thesis

**Chrysalis Web Language (CWL) is the DNA of the web** — the genetic identity of what a web application *is*.

That DNA is reached by a deliberate path:

1. **Rosetta Stone** — CWL ↔ WebIR is one decree in a readable script (and its IR twin). Many frameworks are many writings of the same meaning.
2. **Universal Translator** — Convert is the Star Trek–style *device*: hear any honest stack as CWL; speak CWL into emit targets. The device does not own the tongue.
3. **DNA** — that shared meaning becomes heritable identity: versioned, gold-proven, comparable to live traffic, never silently invented.

| Metaphor | Chrysalis role |
| --- | --- |
| **Rosetta Stone** | One app meaning, many stack scripts — recoverable and human-readable in `.cwl` |
| **Universal Translator** | Convert: origin ↔ CWL/WebIR ↔ emit |
| **DNA of the web** | CWL as genome of routes, pages, data, UI, effects, honest holes |

CWL is not “another framework dialect” and not a general-purpose PL. It is the **canonical inscription** of web-app identity:

- HTTP routes and handlers (**CWL API**)
- Pages and HTML (**CWL Pages**)
- Page data loaders (**CWL Data**)
- Component / island UI (**CWL UI**)
- Middleware and effects (**CWL Effects**)
- Explicit unsupported regions (**holes** — never invent what you cannot translate)

CWL maps **1:1** to **WebIR**. WebIR is the semantic IR; CWL is the language surface. Emit targets (Hono, Fastify, Next, `runtime-cwl`, Chimera) and oracle verify pull from that pair — many scripts, one genome.

**Convert** runs the Universal Translator through this DNA.  
**Secure (Helix)** protects with traffic DNA and *bridges* to CWL when surface must match live identity.  
Neither owns the grammar. Both **need** the Rosetta tongue — the web’s DNA — to be real, stable, and honest.

```text
                    ┌──────────────────────────┐
                    │   CWL  (this pillar)     │
                    │   DNA of the web         │
                    │   (Rosetta inscription)  │
                    └────────────┬─────────────┘
                                 │
              produce / consume  │  genome + fixtures + version
                                 │
              ┌──────────────────┼──────────────────┐
              ▼                  │                  ▼
     ┌────────────────┐          │         ┌────────────────┐
     │    Convert     │◄─────────┴────────►│  Secure/Helix  │
     │ Universal      │   shared bar       │ live DNA ↔     │
     │ Translator     │                    │ CWL surface    │
     └────────────────┘                    └────────────────┘
```

**North star:** any honest web stack can be *heard* as CWL and *spoken* back without silent invention — holes where translation fails. That heritable meaning **is** the DNA of the web.

---

## 2. Why Convert (the Universal Translator) needs CWL

Convert is the **device**. CWL is the **tongue**. Without Rosetta meaning, every peel invents a private IR.

| Need | Without CWL | With CWL |
| --- | --- | --- |
| Lift target | Ad-hoc emit per framework | One authored surface → many emits |
| Hole language | Vague “TODO” / silent stubs | Typed `hole reason;` — honest budget |
| Verify / oracle | Compare opaque JS trees | Replay against WebIR/CWL contract |
| Authoring | Edit generated Hono/Next forever | Edit `.cwl`, re-emit |
| Product law | Easy to ship demo façades | Façades fail the Rosetta / DNA bar |

**Convert rule:** Origin → WebIR/CWL → emit (**D6442**). No demo façades (**D6447**). Language fixes land in **this** tree first, then sync mirrors.

Pointer in convert: [`chrysalis-convert/docs/CWL-PILLAR-HOME.md`](../../../chrysalis-convert/docs/CWL-PILLAR-HOME.md).

---

## 3. Why Secure needs CWL

Helix enforces **traffic DNA** (`app-dna-v1`) out of the box — it does not load the convert monorepo to protect a host.

Secure still needs CWL when the live organism must match the genome:

| Moment | Role of CWL |
| --- | --- |
| Seed / compare | Route surface from CWL vs learned DNA routes |
| Cutover gate | “Converted app matches live DNA” in shared vocabulary |
| Human review | Readable genome of what was certified / disputed |
| Future policy | Attach intent to named routes/pages/effects without inventing a second app language |

**Secure rule:** Never fork CWL grammar into Helix. Bridge to [`chrysalis-cwl`](../../) semantics only.

---

## 4. Surfaces (named layers)

All surfaces share one module (or multi-file `import`), one WebIR module, one honesty bar — genes of the web DNA.

| Surface | Syntax | Language gold | RFC |
| --- | --- | --- |
| **CWL API** | `@route` + `handler` | `01`–`08`, `13`–`14` | 0001–0008 |
| **CWL Pages** | `@page` + `return html` | `09`, `15`, `16` | 0010, 0011, 0014 |
| **CWL Data** | `load { … }` | `10`, `15` | 0013 |
| **CWL UI** | `return ui`, `@component`, islands | `17`, `18` | 0017–0019 |
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
| Emit backends | Hono / Fastify / Next — **targets** (scripts, not the decree) |
| Databases / queues / vendor SDKs | Infra — CWL declares *app* surface, not storage engines |
| Traffic DNA | Secure identity artifact — may *bridge* to CWL genome |

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
| Rosetta → UT → DNA path | `docs/language/ROSETTA-UT-PATH.md` |
| Roadmap | `docs/history/ROADMAP.md` |
| Handoff | `docs/history/PILLAR_HANDOFF.md` |
| Golden fixtures | `fixtures/language-gold/` |
| Parser / print / diagnose / fmt | `scripts/hub-ingest/cwl-*.mjs` |
| Language gates | `scripts/gate-cwl-*.mjs` → `npm run test:language` |
| Packages | `packages/cwl`, `runtime-cwl*`, `emit-runtime-cwl` |

### Packages

| Package | Role |
| --- | --- |
| `@chrysalis/cwl` (surface) | Language package README / public pointer |
| `@chrysalis/runtime-cwl` | In-process HTTP runtime over CWL/WebIR |
| `@chrysalis/runtime-cwl-browser` | Browser runtime |
| `@chrysalis/runtime-cwl-worker` | Worker runtime |
| `@chrysalis/emit-runtime-cwl` | Emit deployable Node project from CWL |

WebIR (`@chrysalis/webir`) still lives under **convert** until extracted — shared substrate, not a second language.

### Core scripts (language-owned)

| Script | Role | Convert dependency |
| --- | --- | --- |
| `cwl-parser.mjs` | Parse `.cwl` → AST | **Mirror** — sync from here |
| `cwl-print.mjs` | AST → `.cwl` | **Mirror** — sync from here |
| `cwl-ui-tree.mjs` | UI tree parse | **Mirror** — sync from here |
| `cwl-module-graph.mjs` | Multi-file resolve | **Mirror** |
| `cwl-diagnose.mjs` | Authoring diagnostics | **Mirror** |
| `cwl-fullstack-holes.mjs` | Hole catalog | **Mirror** |
| `hub-cwl-path-params.mjs` | Path `:id` extract | Pillar: no WebIR; convert may add WebIR helper |
| `cwl-fmt.mjs` | Format | Pillar: parse→print; convert may keep WebIR fmt |
| `cwl-ingest.mjs` | CWL → WebIR | Needs WebIR (convert for now) |
| `emit-cwl-from-hub.mjs` | WebIR → CWL | Needs WebIR (convert for now) |

---

## 6. Laws (language / genome)

1. **Honest holes** — unsupported behavior is `hole reason;`, never silent invention or demo façades.
2. **CWL ↔ WebIR authority** — no lossy “regex lift” as the semantic path.
3. **Version breaking changes** — bump `LANGUAGE_VERSION.md` *before* landing breaks.
4. **Judge as a language / genome** — RFCs + fixtures + tooling, not one customer POC (WISP showcases; it does not define CWL).
5. **One source of truth** — this tree owns semantics; Convert/Secure pull or bridge.
6. **Same bar as the portfolio** — propose · verify dispose · honest holes · no façades.

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

- `hub-cwl-path-params.mjs` — keep `extractPathParamsFromCwlPath` identical; convert may retain `cwlPathParamsForWebir`
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

Convert always-sync paths become **file reparse points** (Windows file symlinks) or package links into this tree so there is **one** inode for language scripts. Prefer: edit here → `test:language` → `test:cwl-mirrors`. `sync:convert` remains for non-junction setups and for careful merges (`hub-cwl-path-params`).

---

## 8. Gates

```bash
npm run test:language          # round-trip + diagnose (+ pin / publish-prep / lsp)
npm run test:cwl-roundtrip     # parse → print → parse
npm run test:cwl-diagnose      # no diagnose errors on language-gold
npm run test:cwl-mirrors       # convert mirrors identical or reparse points
```

| Gate | Pass means |
| --- | --- |
| Round-trip | Every `fixtures/language-gold/**/*.cwl` AST-stable under print; multi-file resolve OK |
| Diagnose | No parse/diagnose **errors** (warns allowed for honest holes / hints) |
| Mirrors | Convert always-sync scripts are byte-identical **or** reparse points into this pillar |

Convert product proves (complete-conversion, hub golds) are **consumer** gates — they must not redefine grammar.

---

## 9. Completeness definition

### Language pillar “complete enough” for Convert/Secure to depend on

| Criterion | Status (0.1.x) |
| --- | --- |
| RFC index 0001–0024 accepted and in-tree | Yes |
| Parse → print round-trip golds for core surfaces | Yes (`01`–`25`) |
| Diagnose gate over golds | Yes |
| Version + changelog | Yes |
| Documented ownership + sync protocol | Yes (this file) |
| Rosetta → UT → DNA path documented | Yes (`ROSETTA-UT-PATH.md`) |
| Local fmt without WebIR | Yes |
| Ingest/fmt via WebIR without convert checkout | Partial — `link:webir` + matrix; ownership flip still open |
| Junctions instead of copies | In progress (0.2) — six always-sync hub-ingest scripts file-symlinked on Windows |
| Published language version ≡ `LANGUAGE_VERSION.md` | Prep only (private) |
| DNA ↔ CWL bridge library in Secure | Contract here; enforce in Secure |

### Per-surface language bar

A surface is **language-ready** when:

1. RFC accepted  
2. Parser + print round-trip fixture green  
3. Semantics documented in `CWL.md` / taxonomy  
4. Breaking changes versioned  

**Runtime/emit/verify depth** can lag the language bar — Convert deepens verify; this pillar does not wait on one POC to define syntax.

---

## 10. Roadmap (summary)

See [`docs/history/ROADMAP.md`](../history/ROADMAP.md) for the working checklist.

| Phase | Outcome |
| --- | --- |
| **0.1.x** | Bootstrap: golds, gates, UI/print, RFC-0021+, Convert sync, this constitution |
| **0.2** | Junctions for mirrored scripts; sync script CI |
| **0.3** | WebIR extract or vendor so ingest runs in this pillar |
| **0.4** | Pillar CLI (`cwl parse|print|fmt|diagnose|check`) |
| **0.5–0.6** | DNA bridge + private-first authoring / LSP |
| **1.0** | Published private language package; Convert/Secure depend on versioned release |

---

## 11. Agent operating procedure

1. Read `AGENTS.md`, this file, `ROSETTA-UT-PATH.md`, `LANGUAGE_VERSION.md`, `ROADMAP.md`.
2. Change language behavior **only** in `chrysalis-cwl`.
3. Add/adjust `fixtures/language-gold` when syntax/semantics change.
4. Run `npm run test:language`.
5. Sync convert mirrors (`npm run sync:convert`).
6. Bump `LANGUAGE_VERSION.md` + `CHANGELOG.md` for user-visible language changes.
7. Refuse Helix firewall features and demo façades.
8. UT↔Helix spine: `npm run smoke:ut-spine` (this pillar) — never re-home in Convert.

## Prove (RFC-0022 spine)

```bash
npm run test:cwl-dna-bridge   # contract gold
npm run smoke:ut-spine        # + Helix when Secure sibling present
npm run smoke:ut-spine:helix  # fail if Secure absent
```

Starter paste: [`docs/history/NEW_AGENT_STARTER.md`](../history/NEW_AGENT_STARTER.md).

---

## 12. Related index

| Doc | Role |
| --- | --- |
| [`ROSETTA-UT-PATH.md`](./ROSETTA-UT-PATH.md) | Rosetta → UT → DNA of the web |
| [`CWL.md`](./CWL.md) | Language reference |
| [`CWL-RFC.md`](./CWL-RFC.md) | RFC index |
| [`CWL-SURFACE-TAXONOMY.md`](./CWL-SURFACE-TAXONOMY.md) | Named surfaces |
| [`LANGUAGE_VERSION.md`](../../LANGUAGE_VERSION.md) | Semver for the language |
| [`CWL-RFC-0022-dna-surface-bridge.md`](./CWL-RFC-0022-dna-surface-bridge.md) | DNA surface contract |
| [`UT-CONVERT-SECURE-SPINE.md`](../../../../docs/UT-CONVERT-SECURE-SPINE.md) | CWL-owned spine (not Convert) |
| [`fixtures/language-gold/README.md`](../../fixtures/language-gold/README.md) | Gold map |
| [`THREE_PILLARS.md`](../../../../docs/THREE_PILLARS.md) | Portfolio map |

---

## One line

**CWL is the DNA of the web (Rosetta meaning). Convert is the Universal Translator through it. Secure proves live identity — and speaks CWL when bridging surface to DNA.**
