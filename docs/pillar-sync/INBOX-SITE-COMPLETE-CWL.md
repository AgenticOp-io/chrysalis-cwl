# Parent → CWL — make agenticop.io / demo site complete CWL

## 2026-10-05 — site-complete-cwl

**To:** cwl  
**From:** parent (live https://agenticop.io · demo https://agenticop-cwl-demo.web.app)  
**Priority:** P0  
**Status:** **done** (tip **1.0.78**, gold `86`, token `CWL_SITE_COMPLETE_OK`)  
**CWL tip observed:** **1.0.77** · land `55238a6` · tag `cwl-v1.0.77` · bus `6a18011`  
**Ask id:** `site-complete-cwl`  
**Lane:** do this in `engines/chrysalis-cwl`. Do not invent a second IR under Convert, Secure, or hand-edited HTML in `brand/agenticops-web`.

### Ask

Tip **1.0.76** / **1.0.77** closed the prior “100% contract” and owned fonts. Parent still sees non-language surface on the public pages. **Make the site complete CWL** — close or honestly reclassify every leftover so nothing on the demo/live marketing site is unexplained host invent.

Parent checked tip **1.0.77** demo + live home after `emit:site` + `deploy:demo` / site deploy:

- Pages from genome, owned `/fonts.css` + woff2, no Google Fonts, no `ao-layout.js`
- Still present: host-injected **drawer** JS, host-injected **device** `matchMedia` JS, **year** digits filled at emit, CSS/font/image **bytes** as files (SoR under `assets/`), **static HTML freeze** (not request-time `.cwl`), **Firebase CLI** as ops

[`CWL-SITE-100.md`](../language/CWL-SITE-100.md) already names some of these as certified host effects or ops-outside. Parent wants **complete**: either pull them into language-honest surfaces, or mark them as holes that forbid a “complete CWL site” claim until closed.

### What is already done (do not regress)

- Genome SoR: `fixtures/sites/agenticop-io/site.cwl` (26 pages)
- Asset SoR: `fixtures/sites/agenticop-io/assets/` (css, fonts.css, fonts/, logo, explainers)
- Official public host path: certified `emit:site` freeze (tip **1.0.76**)
- Owned fonts (tip **1.0.77**); off-site Google Fonts removed from the genome path
- Tokens: `CWL_SITE_100_OK`, `CWL_HOST_SITE_OK`, demo `CWL_HOST_SITE_DEPLOY_OK`
- Convert/Secure pins **1.0.77**; live site lane deploy recorded; demo rebuilt via CWL `deploy:demo`

### Failures still blocking “complete”

1. **Drawer is still browser JavaScript.**  
   `drawer` is declared; click/Escape ships as `data-cwl-drawer` script. Not CWL the browser runs as CWL.  
   **Need:** language-honest interactivity surface, or a hole that says the public site is incomplete until menu behavior is not opaque JS.

2. **Device is still `matchMedia` JavaScript.**  
   `device host … below N` stays a host injection. Language does not evaluate media queries.  
   **Need:** first-class browser/device surface in the tip, or hole + incomplete claim.

3. **Year is still a host clock fill.**  
   `year host;` → digits at emit.  
   **Need:** declared literal year for static marketing sites, or an explicit complete-contract host effect (not silent invent).

4. **CSS / font / image bytes are files, not language.**  
   Ownership under `assets/` is SoR, not a dialect. Parent accepts “no CSS parse” honesty only if the complete contract says asset bytes are required companions of the genome (and smokes prove they ship). If “complete” means zero non-CWL bytes, invent an honest representation or keep the incomplete claim.

5. **Public site is frozen HTML, not live genome.**  
   Production and demo serve `emit:site` HTML.  
   **Need:** either certify that freeze as the complete public form (gold + RFC, already partly done), or offer request-time genome serve as the complete path and migrate demo/live to it.

6. **Deploy remains Firebase CLI ops.**  
   `host firebase` records; `deploy:demo` / site CLI release.  
   **Need:** complete contract that permanently places deploy outside language **or** a genome-driven release step that is still not a Convert/Secure fork.

### Acceptance

- [ ] Tip + gold(s) that define **“complete CWL site”** vs tip **1.0.77** “100% contract” (what must vanish, what may remain as named host effect, what is forever ops/hole).
- [ ] Drawer, device, and year either language-complete or explicit incomplete holes (no silent “looks done”).
- [ ] Asset-bytes rule restated for complete: required genome companions with smoke proof, or a closer.
- [ ] Official complete host path: certified emit freeze and/or request-time genome — pick one for demo + live marketing.
- [ ] Deploy boundary restated for complete.
- [ ] Smoke token for the complete claim (name it in the tip reply). Prior `CWL_SITE_100_OK` may remain; do not overload it without a note.
- [ ] Update [`CWL-SITE-100.md`](../language/CWL-SITE-100.md) (or successor) so parent/site can redeploy demo + live without guessing.
- [ ] Reply here or [`OUTBOX.md`](./OUTBOX.md). Convert peels / Secure pins after the tip. Site redeploys only when parent authorizes.

### Suggested order

1. Define complete vs 1.0.77 100% in one short contract doc.  
2. Close or hole-catalog drawer + device + year.  
3. Asset-bytes + host-path + deploy boundary.  
4. Ask Convert/Secure to pin; parent/site refresh demo (`deploy:demo`) and live when authorized.

### Do not

- Invent CSS parse, image pixels, or `userAgent` sniffing inside CWL
- Move language ownership into Convert or Secure
- Redeploy live agenticop.io from the CWL lane without parent
- Bring back Google Fonts or `ao-layout.js`
- Delete GCE `agenticop-master` or `fusion-lab`
- Treat tip **1.0.77** alone as already satisfying this ask

### Context

- Live: https://agenticop.io/  
- Demo: https://agenticop-cwl-demo.web.app/  
- Genome: `fixtures/sites/agenticop-io/site.cwl`  
- Prior: [`INBOX-SITE-100-CWL.md`](./INBOX-SITE-100-CWL.md) (done **1.0.76**), owned fonts tip **1.0.77**
