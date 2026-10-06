# Parent → CWL — agenticop.io must be 100% CWL

## 2026-10-05 — site-100-cwl

**To:** cwl  
**From:** parent (live https://agenticop.io / site lane)  
**Priority:** P0  
**Status:** **done** (tip **1.0.76**, gold `84`, token `CWL_SITE_100_OK` — stamp land SHA after merge)  
**CWL tip observed:** **1.0.76**  
**Ask id:** `site-100-cwl`  
**Lane:** do this in `engines/chrysalis-cwl`. Do not invent a second IR under Convert, Secure, or hand-edited HTML in `brand/agenticops-web`.

### Ask

Close every remaining gap so the public AgenticOps site is **100% CWL** — genome as the only page source, with an explicit honest contract for anything that stays a host effect or hole.

Parent already cut live https://agenticop.io over from `fixtures/sites/agenticop-io/site.cwl` via Convert peel (`CONVERT_AGENTICOP_SITE_OK`) + CWL `emit:site` + site Hosting deploy. **All 26 HTML pages** are genome emits. **No page loads `ao-layout.js`.** That is not yet 100% CWL.

### What is already CWL (do not regress)

- 26 `@page` routes, shared shell, nav id, drawer declaration, titles, description, canonical, social card, head rest (golds `68`–`79`)
- Genome smoke `CWL_AGENTICOP_SITE_OK`
- Host site emit tip **1.0.75** / gold `83` / `CWL_HOST_SITE_OK`
- Live pages: year digits and device script filled by host pass; stylesheet URL `/agenticops.css`; logo URL `/logo.svg`

### Failures still blocking “100% CWL”

1. **CSS bytes are not in the genome.**  
   `style "/agenticops.css"` names a URL. `agenticops.css` (~71KB) still ships as a host file. Tip honesty: CWL does not parse CSS.  
   **Need:** a language/host contract that owns stylesheet bytes for this site (inline `style` body, bound host asset with genome SoR, or an RFC’d hole that forbids claiming 100% until closed).

2. **Image bytes are not in the genome.**  
   `image logo "/logo.svg"` plus hardcoded `/cwl-explainer.png`, `/chrysalis-explainer.png`, `/helix-explainer.png`, `/linkedin-cwl-release.png` (and kin) in HTML blocks. Bytes stay on the public root.  
   **Need:** same class of contract as CSS — named assets with bytes under a CWL-owned path, or catalogued holes.

3. **Device class is still injected browser JS.**  
   25/26 pages embed `matchMedia("(max-width: ${below}px)")` via the host pass. Language keeps `<!-- cwl:device -->` and does not call `matchMedia`.  
   **Need:** first-class browser surface for `device host … below N`, or keep it as a named hole and document that 100% excludes client media queries.

4. **Drawer toggle is still injected browser JS.**  
   25/26 pages embed `data-cwl-drawer` click / Escape script. `drawer` names chrome; behavior is not authored as CWL the browser executes as CWL.  
   **Need:** declare that behavior in the language (or emit it as a named, gold-tested host effect), or `unsupported:opaque-script` and drop the 100% claim for menu interactivity.

5. **Year is a host clock fill.**  
   `year host;` becomes digits at emit/live host. CWL does not read the clock.  
   **Need:** either an explicit host effect in the 100% contract, or a declared literal year in the genome for static public sites.

6. **Off-site stylesheets (Google Fonts) on all 26 pages.**  
   Genome declares `preconnect "https://fonts.googleapis.com"` and `style "https://fonts.googleapis.com/css2?…"`. Not CWL-owned bytes.  
   **Need:** self-host fonts as genome assets, or accept off-site CSS as a remaining hole (and say so in the tip).

7. **Live site is frozen HTML, not request-time CWL.**  
   Production serves static files from `emit:site`. It does not compose `site.cwl` per request.  
   **Need:** define official 100% host: (A) request-time live/`runtime-cwl` from the genome, or (B) `emit:site` as the certified CWL host freeze (gold + RFC). Parent will follow that definition for redeploy.

8. **Deploy is still ops.**  
   `host firebase` names the target. Live cutover used site `firebase deploy` / brand `firebase.json` / `.firebaserc`. Tip **1.0.75** `deploy:demo` refuses live `agenticops` / `agenticop-io`.  
   **Need:** a closed deploy contract from the genome for the live target when parent authorizes, or permanently classify Firebase CLI as out-of-band ops (not “100% language”).

9. **Dead host chrome still ships.**  
   `ao-layout.js` remains downloadable on the public root (200) though no page references it. Site can delete it; call out so CWL acceptance does not assume it is required.

10. **Brand tree is still a second source.**  
    `brand/agenticops-web` holds emitted HTML copies + assets + Firebase config.  
    **Need:** CWL states that `fixtures/sites/agenticop-io/site.cwl` is SoR; brand is assets/ops only. Site will stop hand-editing page HTML once the contract lands.

### Acceptance

- [x] Tip **1.0.76** + gold `84` + [`CWL-SITE-100.md`](../language/CWL-SITE-100.md)
- [x] CSS/image bytes under `fixtures/sites/agenticop-io/assets/` (SoR; no CSS parse)
- [x] Drawer/device/year = certified host effects from genome declarations
- [x] Off-site fonts named outside language bytes
- [x] Official host = certified `emit:site` freeze
- [x] Live Firebase CLI = ops-outside-100%; `deploy:demo` refuses live targets
- [x] Token `CWL_SITE_100_OK`
- [x] OUTBOX ask for Convert/Secure/Site

### Reply

Tip **1.0.76**. Gold `84-site-100-contract`. Token `CWL_SITE_100_OK`. Convert: pin + drop hand `cwl-db`. Site: delete `ao-layout.js`, mirror assets, redeploy when parent authorizes.

### Suggested order (for CWL)

1. Write the 100% contract (RFC deepen or tip note) — what must be in-genome vs named host effect vs hole.  
2. Asset bytes (CSS + images) or honest holes.  
3. Drawer + device (language or holes).  
4. Year + fonts.  
5. Host path (live vs emit) + deploy boundary.  
6. Ask Convert/Secure to pin; site cleans `ao-layout.js` and redeploys when parent authorizes.

### Do not

- Invent CSS/image/matchMedia inside Convert or Secure forks
- Silently stub WebSocket, off-site forms, or opaque scripts
- Redeploy live agenticop.io from the CWL lane without parent
- Delete GCE `agenticop-master` or `fusion-lab`
- Treat tip **1.0.75** host-site emit as already satisfying this ask (it closed demo deploy without a Cloud Function; it did not claim 100% CWL pages+assets+effects)

### Context

- Live: https://agenticop.io/  
- Genome: `fixtures/sites/agenticop-io/site.cwl`  
- Prior ask closed: [`INBOX-CWL-ONLY-DEMO.md`](./INBOX-CWL-ONLY-DEMO.md) (`cwl-only-demo-deploy` → tip **1.0.75**)
