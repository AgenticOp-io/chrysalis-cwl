# Parent → CWL — public site documentation build (tip 1.0.84)

## 2026-10-06 — site-docs-build-1.0.84

**To:** cwl  
**From:** parent (website SoR / `fixtures/sites/agenticop-io/site.cwl` · live https://agenticop.io)  
**Priority:** P0  
**Status:** **open**  
**CWL tip observed:** **1.0.84** · land `ed50c0b` · merge `ca346e2` · tag `cwl-v1.0.84`  
**Ask id:** `site-docs-build-1.0.84`  
**Lane:** do this in `engines/chrysalis-cwl`. Refresh the **public documentation genome** so agenticop.io matches the language tip. Do not invent docs under Convert or Secure. Site lane emits/deploys after your land.

### Ask

Language tip is **1.0.84**. Live public docs still pin **1.0.80** and stop at golds **01–86** / complete-site contract. Parent audited the website as SoR: documentation is **not complete** for tips **1.0.79–1.0.84**.

BOARD currently says `SITE_NEXT: idle · no site emit change required` for 1.0.84 (genome routes need no multipart). That is true for **emit shape**. It is **false for public documentation**.

Refresh `fixtures/sites/agenticop-io/site.cwl` (and assets/README if needed) so the public record is comprehensive. Then Site emits + deploys.

### What is already on the site (do not regress)

- Complete marketing genome tip **1.0.78** contract (`CWL-SITE-COMPLETE.md`, `emit:site`, owned fonts/CSS, literal year, CSS menu)
- Tip **1.0.80** verify-dispose / no-façades marketing copy (partially applied)
- Papers: CWL / WebIR / Convert / Helix / traffic, docs index, press, published, whitepaper
- Graphics: tip-era `cwl-explainer.png`, LinkedIn banner (may still say 1.0.80 — bump with tip)

### Failures (documentation lag)

Observed on live https://agenticop.io (2026-10-06) and local genome:

| Surface | Current public | Missing vs tip **1.0.84** |
| --- | --- | --- |
| Tip pin (footer, home, chrysalis, docs, press, paper-cwl) | **1.0.80** | **1.0.84** |
| Language golds cited | through **86** | **87–93** |
| RFCs cited on paper-cwl / chrysalis | largely through **0028–0029** era | **0035–0041** |
| Package version on paper-cwl | still shows **1.0.78** in places | **1.0.84** / `@agenticop-io/cwl` |
| Tip section TOC on paper-cwl | link text still **1.0.78** | current tip |
| **1.0.79** | absent | WebSocket duplex (RFC-0035 / gold 87), `job.enqueue` (RFC-0036 / gold 88), UI events input/focus/blur/keydown (RFC-0037 / gold 89) — residuals honesty |
| **1.0.81** | absent | Framework façade residuals Nest/LiveView/Flutter/middleware/raw SQL (RFC-0038 / gold 90) |
| **1.0.82** | absent | DNA identity genes `replaces`, `from peel`, `capability`, `works without client` (RFC-0039 / gold 91) |
| **1.0.83** | absent | Asset integrity `integrity` / `module` / `crossorigin` on script/style (RFC-0040 / gold 92) |
| **1.0.84** | absent | Page form `enctype multipart` + `field … "file"` (RFC-0041 / gold 93) |
| Docs index (`docs.html`) | golds 01–86 · tip 1.0.80 | tip **1.0.84** · golds through **93** · links to new RFC story |
| HOWTO / SITE-COMPLETE public summary | complete-site only | Short public path: complete site **plus** tips 79–84 as language deepen (not required on marketing routes) |
| Zenodo / published catalog | tip 1.0.26 / 1.0.80 mix | Note language tip **1.0.84**; Zenodo concept DOI may stay; do not invent a new DOI |

### Acceptance

- [ ] Genome tip pins and paper-cwl / chrysalis / docs / press / published / whitepaper cite **1.0.84** consistently (no stale 1.0.78/1.0.80 package or TOC leftovers)
- [ ] Public CWL paper (or a dedicated section) covers tips **1.0.79–1.0.84** with RFC + gold ids and honesty (host owns queues/uploads; websocket residual; no façade invent)
- [ ] Gold table / surfaces table extended through **93** (or clearly “01–93” with a tip ladder)
- [ ] RFC list on the public site includes **0035–0041** (link to `docs/language/` on GitHub is OK)
- [ ] `npm run smoke:agenticop-site` and `npm run smoke:cwl-site-complete` still pass
- [ ] Reply here or [`OUTBOX.md`](./OUTBOX.md) with tip / SHA / token. Convert/Secure already pin **1.0.84**. Site emits + `firebase deploy` after your land (parent authorizes deploy)

### Suggested order

1. Bump tip pins site-wide in `site.cwl` to **1.0.84**  
2. Deepen `paper-cwl.html` tip + golds + RFCs for 79–84  
3. Refresh docs index + chrysalis surfaces blurb  
4. Optional: tip line on explainer/banner art (Site can re-screenshot if you leave copy hooks)  
5. Stamp BOARD `SITE_NEXT: emit + deploy docs build`

### Do not

- Invent Nest/LiveView/Flutter/upload middleware in the language
- Claim marketing pages must use multipart/websocket/jobs — those are language surfaces, not required on agenticop.io routes
- Redeploy live from the CWL lane without parent
- Leave package/TOC tip pins at 1.0.78 while the eyebrow says 1.0.84

### Context

- Live: https://agenticop.io/docs.html · https://agenticop.io/paper-cwl.html · https://agenticop.io/chrysalis.html  
- Genome: `fixtures/sites/agenticop-io/site.cwl`  
- Language SoR: `CHANGELOG.md` tips **1.0.79–1.0.84**, RFCs **0035–0041**, golds **87–93**  
- Prior site asks: [`INBOX-SITE-COMPLETE-CWL.md`](./INBOX-SITE-COMPLETE-CWL.md), [`INBOX-SITE-100-CWL.md`](./INBOX-SITE-100-CWL.md)
