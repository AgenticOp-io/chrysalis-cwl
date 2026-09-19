# Confidential invention disclosure — Chrysalis (CWL · Convert · Helix)

**To:** Patent counsel (USPTO-registered; software / computer-implemented inventions)  
**From:** David / AgenticOps (AgenticOp.io)  
**Date:** 11 August 2026  
**Purpose:** Request patentability review, disclosure-clock advice, and filing strategy (provisional vs nonprovisional; possible PCT).  
**Status:** Technical disclosure only. **Not a claim draft. Not a patentability opinion.**

Please treat this as confidential attorney-client material once engagement exists. Sending this email **does not** create an attorney-client relationship until you say so.

---

## 1. One-sentence invention

A **canonical, versioned “genome” of a web application** (human-readable language + semantic IR) that (a) **translates** heterogeneous origin stacks without silently inventing missing behavior, instead recording **typed holes**, and (b) can be **compared to live traffic DNA** so a firewall may learn / shadow / enforce “is this still the certified app?” — with enforcement remaining possible from traffic DNA alone.

## 2. What we are *not* claiming as the invention

Please do **not** treat the following as the novel core (crowded prior art / product incompleteness):

- “A DSL for web apps” in the abstract (cf. OpenAPI, GraphQL, WASM, LLVM-style IRs).
- “A WAF that learns routes from traffic” in the abstract (cf. API security / RASP / behavioral WAFs).
- Completing every web framework (Nest DI, Phoenix LiveView, Flutter, middleware onions, WebSocket duplex). We **refuse** to forge those runtimes.
- COBOL `COPY EXTFMAP` close (needs licensed z/OS books or operator ABSENT attest).
- Production **customer soak** of Helix (lab/preflight exists; live customer traffic is operational).

## 3. Problem we actually solve

Today these three jobs use **incompatible models**:

| Job | Typical artifact | Failure mode |
| --- | --- | --- |
| Migrate / rewrite a web app | Ad-hoc IR or generated code per framework | Silent stubs, demo façades, unverifiable “complete” conversions |
| Describe what the app *is* | Framework source, OpenAPI, or tribal knowledge | Not heritable across stacks; not comparable to live traffic |
| Protect the live app | Packet/payload/user anomaly (NGFW/WAF) | Does not answer “is this still the **certified application surface**?” |

We built **one honesty bar** across language, translation, and live protection: **if it cannot be translated or certified, it must be a named hole — not invented.**

## 4. System (three pillars)

```
 Origin stacks (PHP, Node, Rails, COBOL, …)
        │
        ▼
 ┌──────────────┐     CWL ↔ WebIR      ┌──────────────┐
 │   Convert    │◄──── Rosetta ───────►│     CWL      │
 │  Universal   │   (one meaning)      │  genome /    │
 │  Translator  │                      │  language    │
 └──────┬───────┘                      └──────┬───────┘
        │                                     │
        │ emit / holes                        │ optional seed / compare
        ▼                                     ▼
   modern stacks                    ┌──────────────────┐
                                    │  Secure / Helix  │
                                    │  traffic DNA     │
                                    │  learn→shadow→   │
                                    │  enforce         │
                                    └──────────────────┘
```

| Pillar | Role | Working software |
| --- | --- | --- |
| **CWL** | Canonical genome language + RFCs + gold fixtures + parse/print/runtime | `@chrysalis/cwl` **1.0.23** (2026-08-11). Public repo: https://github.com/AgenticOp-io/chrysalis-cwl |
| **Convert** | Origin → WebIR/CWL → emit; hole catalogs; refuse façades | Working translator + dialect peels; pin ≥ 1.0.23. Repo: `AgenticOp-io/chrysalis` (treat as **private** unless counsel confirms otherwise) |
| **Secure (Helix)** | `app-dna-v1` from traffic; Mode A proxy; learn / shadow / enforce; optional CWL cutover | Working proxy + smokes. CWL **not required** to enforce (product law D5) |

**Working title for claim families (for your drafting, not ours):**

1. **Honest genome translation** — heterogeneous web-app sources → canonical genome + typed holes; forbid silent completion.  
2. **Rosetta dual representation** — human CWL ↔ semantic WebIR with round-trip golds.  
3. **Application-identity firewall** — traffic-derived DNA certificate; learn → promote → shadow → ready → enforce → reload.  
4. **Cutover / live match** — compare authored genome **surface** to certified live DNA (genome ⊆ DNA); enforcement still DNA-only.  
5. **Hole type system** — machine catalogs of untranslatable constructs; leadership/scoreboard must not pad with invented runtimes.

## 5. Method sketches (enablement for counsel)

### 5.1 Translate without invention

1. Ingest origin files (routes, handlers, UI, copybooks, etc.).  
2. Lower what is peelable into **WebIR / CWL** (routes, pages, loads, UI islands, effects, headers, multipart, SSE, …).  
3. For constructs that are not peelable (e.g. Nest DI, LiveView sockets, Flutter engine, duplex WebSocket, licensed COBOL books not on disk): emit **`hole reason;`** (typed, catalogued) — **do not** generate a fake equivalent runtime.  
4. Prove with language-gold fixtures and ingest/runtime matrices. Conversion is **incomplete** if holes remain; completeness is not “zero holes via force-settle.”

### 5.2 Genome as identity

CWL encodes web-app identity, not a general-purpose PL:

- HTTP routes / handlers (API)  
- Pages / HTML  
- Data loaders (redirect, error, cookie)  
- UI islands + event **metadata** (not a hydration runtime)  
- Effects / middleware contracts  
- Explicit unsupported regions (holes)

Versioned (`LANGUAGE_VERSION.md`). Gold fixtures `fixtures/language-gold/` (through `33-ui-island-contracts` / RFC-0028).

### 5.3 Live DNA firewall (Helix)

1. **Learn** DNA from observations (routes, JSON/query/status shapes, hosts).  
2. **Promote** / sign certificate (`app-dna-v1`).  
3. **Shadow**: traffic flows; out-of-DNA events go to `SHADOW_LOG` / SIEM NDJSON.  
4. **Ready** gate: `helix ready --target enforce --shadow-log … --max-shadow-holes 0` (or written budget).  
5. **Enforce**: fail closed on out-of-DNA; **reload** without rewriting the app.

Optional bridge: seed DNA from CWL surface and/or compare CWL ⊆ live DNA (cutover / live-match smokes). Operators may run Helix with **zero CWL**.

## 6. Reduction to practice (what exists today)

| Proof | Where |
| --- | --- |
| Language golds + parse/print | `chrysalis-cwl` · `npm run test:language` |
| Ingest / runtime matrices | `smoke:cwl-ingest-matrix` · `smoke:cwl-runtime-matrix` |
| Convert pin + gravity | Convert `hub:cwl-pin-smoke` · language-pillar gold 33 |
| Helix DNA core / cutover / live match | Secure `cutover-smoke` · `live-match-smoke` · `soak-preflight-smoke` |
| Honesty catalogs | Convert `docs/DO-NOT-INVENT.md` + `fixtures/ci/*honest*.json` |

**Lab Helix** has run locally (e.g. `:19092`, Mode A proxy, `MODE=enforce` against demo-api). That is **not** a customer soak.

## 7. Known prior art / crowded fields (please search)

Counsel should assume crowded art and look for **combination + honesty constraint**, not category labels:

- Interface/IR languages: OpenAPI, GraphQL, Protobuf, WASM, LLVM, language workbenches (e.g. DMS / TXL-class).  
- Migration / rewrite tools: commercial + OSS transpilers, “lift and shift” generators.  
- Security: NGFW, WAF (signature + behavioral), RASP, API discovery/security (Salt / Noname / Traceable class), service mesh authz.  
- Configuration-as-policy: Kubernetes NetworkPolicy, Open Policy Agent.  
- “DNA” as marketing metaphor in other products (likely non-analogous; still search).

We believe the **non-obvious combination**, if any, is: **canonical web-app genome + typed untranslatable holes + traffic DNA certificate + optional genome↔live cutover, with a hard prohibition on façade completion.** Please confirm or reject.

## 8. Public disclosure (urgent)

| Surface | Note |
| --- | --- |
| GitHub `AgenticOp-io/chrysalis-cwl` | **Public.** RFCs, golds, language packages. First public commit dates need a docket. |
| Convert / Secure repos | Likely private — please confirm. |
| Marketing / agenticop.io / talks | Operator should list any public posts, demos, or investor decks. |

**Ask:** Has the U.S. (and foreign) grace / absolute-novelty clock already started? Should we file a **provisional immediately** to lock a date while you draft claims?

## 9. What is *not* reduced to practice (honesty)

- Customer production soak → enforce (needs real peak/off-peak traffic + durable shadow log).  
- EXTFMAP COBOL copybook (licensed z/OS / ABSENT attest).  
- Full duplex WebSocket gene; Nest DI / LiveView / Flutter runtimes (intentionally holes).  
- Hydration / silent React–Svelte lowering (non-goal).

We do **not** want claims that assume these are solved.

## 10. Ownership / inventors (operator to complete)

| Field | Fill in |
| --- | --- |
| Applicant / assignee | AgenticOps / AgenticOp.io / entity TBD |
| Inventors | David ________ + any co-inventors who conceived claim elements |
| First conception / reduction notes | CWL pillar extraction and three-pillar split ~2026-08; Helix DNA and Convert peels earlier in 2026 — git history available under NDA |
| Funding / employees / contractors | Confirm assignment agreements |
| Entity size | Micro / small / large (USPTO fees) |

## 11. Asks of counsel

1. Patentability / §101 (Alice) risk on computer-implemented “identity / translation / policy” claims.  
2. Recommended **claim families** and what to leave as trade secret (hole catalogs? specific peels?).  
3. **Provisional now** vs wait.  
4. PCT / first-foreign if we may sell outside the U.S.  
5. Disclosure audit of public GitHub.  
6. Engagement letter + estimate (provisional vs two-family nonprovisional).

## 12. Attachments we can provide under NDA

- This brief.  
- `docs/language/CWL-PILLAR-HOME.md`, `ROSETTA-UT-PATH.md`, `LANGUAGE_VERSION.md`.  
- Convert `DO-NOT-INVENT.md`, `UNIVERSAL-TRANSLATOR-CANON.md` (if private repo access).  
- Secure `PRODUCT.md`, `SOAK.md`, `LIVE-MATCH.md`, Helix proxy `server.mjs`.  
- Selected gold fixtures and smoke transcripts.

---

*Prepared as a technical brief for patent counsel. AgenticOps makes no representation that any claim will issue.*
