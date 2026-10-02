# Rosetta → Universal Translator → DNA of web languages

**CWL is a language in its own right.**  
**Goal:** replace any web page. The page's source is CWL. Emit produces that page.  
**Convert is the Universal Translator** that hears other web languages and speaks them as CWL.

## The chain (follow this)

```text
  Many web dialects          Shared meaning           Live organism
  (PHP, Next, Hono, …)  →   (CWL ↔ WebIR)      →   (traffic / runtime)
         │                        │                        │
         │                   ROSETTA STONE                 │
         │                   one decree                    │
         │                   many scripts                  │
         │                        │                        │
         └──── UNIVERSAL TRANSLATOR (Convert) ─────────────┘
              hear any stack as CWL
              speak CWL into any stack

                      DNA OF WEB LANGUAGES
              CWL replaces any web page: routes, pages,
              data, UI, effects, honest holes — versioned,
              verified, never silently invented
```

| Metaphor | Means | Owner |
| --- | --- | --- |
| **Rosetta Stone** | Same page meaning recoverable across web languages | **CWL** + WebIR |
| **Universal Translator** | Device that peels/emits without inventing culture | **Convert** |
| **DNA of web languages** | CWL is that language. It can replace any web page | **CWL** (genome) · Convert (heredity) · Secure (phenotype check) |

## Why “DNA of web languages”

DNA here is the **web page**: what the page is in markup, behavior, and declared host facts. C++, SQL engines, and vendor SDKs stay bridges or `hole reason;` until a page behavior can be said honestly. A hole is a page CWL cannot yet replace. The next language change closes that gap.

Star Trek’s UT preserves meaning across tongues.  
Rosetta proves one decree in many scripts.  
**DNA** is what you inherit, mutate honestly, and check against the living host.

## Path checklist

1. [x] **Inscription** — RFCs + language-gold: every surface is a gene that round-trips. *(CWL — gates + golds in-pillar)*
2. [x] **Translation** — Convert origin → CWL → emit; façades fail the bar. *(Convert — [`CONVERT-GRAVITY-REQUESTED.md`](../history/CONVERT-GRAVITY-REQUESTED.md) **Done**)*
3. [x] **Hearing / speaking** — ingest matrix + emit + runtime gold prove the decree survives. *(CWL spine/matrix landed; Convert keeps dists buildable — [`DNA-STEP-EXECUTE.md`](../history/DNA-STEP-EXECUTE.md))*
4. [x] **Live match** — Secure: traffic DNA ↔ CWL surface (RFC-0022/0023). *(Secure — [`SECURE-CUTOVER-REQUESTED.md`](../history/SECURE-CUTOVER-REQUESTED.md) · `live-match-smoke` · SHA `08ba546`+)*
5. [x] **Authoring** — humans/agents edit `.cwl` as the readable genome (LSP / check / fmt). *(Phase 0.6 exit met — rename + exports; end-columns with sibling 0.1.14 — [`DNA-CWL-NEAR-COMPLETE.md`](../history/DNA-CWL-NEAR-COMPLETE.md))*
6. [x] **Gene bank** — versioned `@chrysalis/cwl` / `@agenticop-io/cwl` pins (tag `cwl-v*`). *(Phase 1.0 published lineage; siblings may still use `file:` during cutover; GitHub pillars public as of 2026-09-03)*

## Honesty law (anti-mutation)

If it cannot lower to WebIR/CWL → **`hole reason;`**.  
Guessing is a forged gene. Silent stubs are cancer.

## Related

- Constitution: [`CWL-PILLAR-HOME.md`](./CWL-PILLAR-HOME.md)
- Near-term authoring complete: [`../history/DNA-CWL-NEAR-COMPLETE.md`](../history/DNA-CWL-NEAR-COMPLETE.md)
- DNA queue: [`../history/DNA-BUILD-NEXT.md`](../history/DNA-BUILD-NEXT.md)
- Convert whole-system notify (WPTP orbit, no DNA fork): [`../history/CONVERT-WHOLE-SYSTEM-NOTIFIED.md`](../history/CONVERT-WHOLE-SYSTEM-NOTIFIED.md)
- DNA evolution: [`../history/DNA-EVOLUTION-0.1.9.md`](../history/DNA-EVOLUTION-0.1.9.md)
- Portfolio: `AgenticOps/docs/THREE_PILLARS.md`
