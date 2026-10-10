# Parent / site → CWL — CWL Certified seal for genome integration

## 2026-10-10 — site-cwl-certified-seal

**To:** cwl  
**From:** parent / site lane (agenticop.io · `brand/agenticops-web`)  
**Priority:** P1  
**Status:** **done** (CWL genome + page + smoke; live Firebase still site/parent)  
**CWL tip observed:** **1.0.88**  
**Ask id:** `site-cwl-certified-seal`  
**Lane:** land language + site-genome work in `engines/chrysalis-cwl`. Site redeploy of live Firebase stays parent/site after CWL replies.

### Idea

Make **CWL Certified** a first-class, certifiable mark of the language — not a marketing sticker invented only in brand HTML.

The public site should show a seal that reads like a **standards / tip-verified** mark:

- Circular certification badge (double ring)
- Arc: **CERTIFIED GENOME** / **EMIT · SITE**
- Compact DNA motif (teal + amber strands — not purple glow spam)
- Wordmark **CWL** + **TIP VERIFIED**
- Footer copy: *Language of record · Genome · emit:site · tip verified*
- Links to the CWL story page (`/chrysalis.html`)

Goal: when someone lands on agenticop.io, the language looks **real and certifiable** — genome emitted, tip bound, host path named.

### Icon delivered (already in this tree)

| Artifact | Path | Role |
| --- | --- | --- |
| **Ship SVG** | [`fixtures/sites/agenticop-io/assets/cwl-certified.svg`](../../fixtures/sites/agenticop-io/assets/cwl-certified.svg) | Vector seal for emit:site / Firebase |
| **Concept raster** | [`docs/marketing/cwl-certified-seal-concept.jpg`](../marketing/cwl-certified-seal-concept.jpg) | Design reference only (not required on host) |
| **Genome wire** | [`fixtures/sites/agenticop-io/site.cwl`](../../fixtures/sites/agenticop-io/site.cwl) | `image certified "/cwl-certified.svg";` + footer `ao-cwl-certified` block in layout chrome |
| **CSS** | `fixtures/sites/agenticop-io/assets/agenticops.css` (`.ao-cwl-certified*`) | Footer seal layout |

Site lane already ran `emit:site` into `brand/agenticops-web` (badge on content pages). Live deploy blocked on Firebase reauth — not a CWL invent task.

### Ask (integrate in the language pillar)

1. **Own the seal as language/site-genome SoR** — keep SVG under `fixtures/sites/agenticop-io/assets/`; do not fork a second mark under Convert/Secure/brand-only invent.
2. **Document the contract** — short note (e.g. under `docs/language/CWL-SITE-COMPLETE.md` or successor) that a complete marketing genome **may** carry a CWL Certified seal meaning: pages from `site.cwl`, certified `emit:site`, tip string honest, asset companions present. Seal is **claim of genome form**, not Helix traffic proof and not a crypto signature.
3. **Optional gene (only if needed):** if footer HTML alone is not enough for “first-class,” add a minimal layout surface (e.g. named `image certified` already used + gold that freezes seal tokens). Prefer **no new tip** unless a page cannot be written; invent queue is CLOSED at 1.0.88 — reopen only for a real page gap.
4. **Smoke:** extend `smoke:agenticop-site` / site-complete smoke to assert `/cwl-certified.svg` ships and footer contains `ao-cwl-certified` (or equivalent).
5. **Reply** in this file or [`OUTBOX.md`](./OUTBOX.md) with tip/SHA; then parent/site redeploys live when authorized.

### Acceptance

- [x] Seal SVG remains CWL site-genome SoR (`fixtures/sites/agenticop-io/assets/cwl-certified.svg`)
- [x] Contract doc: [`docs/language/CWL-SITE-COMPLETE.md`](../language/CWL-SITE-COMPLETE.md) — CWL Certified section
- [x] Genome footer mark on every `layout site` page; public page `/cwl-certified.html` (“Get CWL Certified”)
- [x] Smoke: `smoke:agenticop-site` + `smoke:cwl-site-complete` assert seal asset + footer + page
- [x] Reply below; Convert/Secure **no pin required** (no tip bump)
- [x] Live Firebase deploy remains site/parent (do not deploy agenticops from CWL lane)

### Reply (CWL · 2026-10-10)

Landed on candidate without tip invent: page `certified` @ `/cwl-certified.html`, nav links, footer seal → certified page, tip footer **1.0.88**, CSS hero, contract + smokes (27 pages). Site lane: `emit:site` then Firebase when reauthed.

### Do not

- Invent crypto “certificates,” PQ signatures, or fake tip hashes in the seal
- Move language ownership into Convert or brand-only HTML forks
- Redeploy live agenticop.io from the CWL lane without parent
- Reopen invent queue for aesthetics alone — seal is already writable with current layout/`image`/`chrome html`

### Suggested order

1. Review SVG + wired `site.cwl` footer (already drafted on candidate).  
2. Contract paragraph + smoke assertion.  
3. Reply; parent redeploys live after Firebase reauth.
