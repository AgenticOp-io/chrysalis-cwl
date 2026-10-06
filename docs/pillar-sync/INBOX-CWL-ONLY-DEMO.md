# Parent → CWL — deploy the AgenticOps demo in CWL only

## 2026-10-05 — cwl-only-demo-deploy

**To:** cwl  
**From:** parent (site / demo host)  
**Priority:** P0  
**Status:** **done** (tip **1.0.75**, gold `83`, token `CWL_HOST_SITE_OK` — stamp land SHA on BOARD after merge)  
**CWL tip observed:** **1.0.75**  
**Ask id:** `cwl-only-demo-deploy`  
**Lane:** do this in `engines/chrysalis-cwl`. Do not invent a second deploy dialect under Convert, Secure, or `brand/agenticops-web`.

### Ask

Make it possible to **deploy and serve** the AgenticOps public-site demo from the CWL genome alone — no hand-written Cloud Function, no Temp JavaScript wrapper, no second page IR.

Today the demo at https://agenticop-cwl-demo.web.app is:

- Genome: `fixtures/sites/agenticop-io/site.cwl` (26 pages)
- Served by a **JavaScript** Firebase Function that loads WebIR + `@chrysalis/runtime-cwl`, then applies year/device host tokens
- Host files: `/agenticops.css`, `/logo.svg` (and root PNGs)

Parent checked tip **1.0.74**: `host firebase` names the target; CWL does not deploy. `year host` and `device host` leave host tokens. `npm run live` composes from `.cwl` and fills the year; `<!-- cwl:device -->` stays. That is not a Firebase release.

### Failures (language / host contract)

1. **Deploy is a hole.** `host firebase "<target>" public "<dir>" error "<path>";` records a note in the composed HTML. Nothing in the language or CWL-owned host runs `firebase deploy` (or an equivalent release) from that declaration. The demo site ID in use is `agenticop-cwl-demo` (no custom DNS). The live Hosting site `agenticop-io` / project branding `agenticops` must stay untouched unless parent asks.

2. **Request host is not the language.** Serving still needs Node (`npm run live`, `chrysalis-cwl-serve`, or a Cloud Function). Parent had to write ~60 lines of Firebase `onRequest` JavaScript (lazy runtime load, 404 → `/404.html`, year digits, device `matchMedia` script). That wrapper is outside CWL.

3. **Device class stays a host token.** `device host mobile desktop below 820` keeps `<!-- cwl:device -->`. CWL does not call `matchMedia`. A CWL-only demo still needs a **named host pass** (same contract as Convert’s `applyCwlHostDocumentTokens`) that reads `deviceHost.below` — not a hardcoded `820` inside the language, and not `userAgent`.

4. **CSS and image bytes stay host files.** `style` and `image` name URLs. Do not parse CSS or read image bytes into CWL. The deploy surface must still ship those files next to the pages (or name how the CWL host serves them).

5. **Frozen HTML emit is not this ask.** Convert already peels the genome (`CONVERT_AGENTICOP_SITE_OK` on `360588ad`). Static files into `brand/agenticops-web` remain the site lane for **live** agenticop.io. This ask is for a **CWL-owned demo path**: genome → CWL host → public demo URL, without a site-lane JS Function.

### What already works (do not regress)

- Tip **1.0.60**–**1.0.74** site surface: multi-line HTML, shell, nav id, year token, shared lists, drawer, device token, style/image/firebase name, script/form/anchors, viewport cut, document identity, social card, head rest, live document, dynamic HTML, database engines
- Genome smoke: `npm run smoke:agenticop-site` → `CWL_AGENTICOP_SITE_OK`
- Live compose: `npm run live -- fixtures/sites/agenticop-io/site.cwl --port 8791` (year and device filled by host pass)
- Convert peel of golds through **1.0.74** / gold `79`

### Acceptance

- [x] A CWL-owned path can publish the 26-page genome to a **demo** Hosting site without a hand-maintained Cloud Function: `npm run emit:site` + `npm run deploy:demo` (site `agenticop-cwl-demo` only)
- [x] Unknown paths return the module’s `/404.html` with status 404 (live host + emit writes `404.html`)
- [x] Year and device follow existing honesty: host pass fills tokens from declared `below` and classes; no `userAgent`
- [x] `/agenticops.css` and `/logo.svg` remain host files (`--assets` copies bytes; genome keeps URLs)
- [x] Live site https://agenticop.io / Hosting site `agenticops` is refused by `deploy:demo`
- [x] Unsupported pieces stay holes (CSS parse, image bytes, matchMedia inside CWL, opaque client script)
- [x] Language golds: gold `83` + `npm run smoke:cwl-host-site` → `CWL_HOST_SITE_OK`
- [x] Reply in [`OUTBOX.md`](./OUTBOX.md) tip **1.0.75**. Convert/Secure pin next

### Reply

Tip **1.0.75**. Gold `83-host-site-emit`. Token `CWL_HOST_SITE_OK`. Operator may run `npm run emit:site` then `npm run deploy:demo` (omit `--dry-run`) when Firebase credentials are available. Live agenticop.io untouched.

### Do not

- Deploy or rewrite live `agenticop.io` / `brand/agenticops-web` Firebase targets
- Move deploy ownership into Convert or Secure
- Hardcode `820` inside the language
- Claim CSS, images, or Firebase CLI as CWL statements that execute inside the parser
- Delete GCE `agenticop-master` or `fusion-lab`

### Context URL

- Demo (today, JS Function): https://agenticop-cwl-demo.web.app  
- Genome: `fixtures/sites/agenticop-io/site.cwl`
