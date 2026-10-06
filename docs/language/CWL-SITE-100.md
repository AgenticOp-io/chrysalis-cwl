# What “100% CWL” means for agenticop.io

**Tip:** **1.0.77** · Ask `site-owned-fonts` · Genome: `fixtures/sites/agenticop-io/site.cwl`

## Official host path

**Certified freeze:** `npm run emit:site` is the public host for https://agenticop.io.  
Each page is composed from the genome, then written as static HTML. Production does **not** require request-time `npm run live` or a Cloud Function.

Request-time compose (`npm run live`) remains a valid CWL host for dynamic modules. It is not the live marketing deploy path.

## In the genome (required)

| Surface | How |
| --- | --- |
| Pages | 26 `@page` routes in `site.cwl` |
| Shell / nav / drawer name / device cut | Layout statements + golds `68`–`79` |
| Stylesheet, fonts, and logo URLs | `style` / `image` |
| Explainer and card images | Paths in page HTML / meta |
| Firebase name | `host firebase` (record only) |

## CWL-owned asset bytes

Bytes for this site live under **`fixtures/sites/agenticop-io/assets/`** (stylesheet, `/fonts.css`, latin woff2 faces, logo, explainer PNGs).  
`emit:site` copies those files next to the HTML when `--assets` is omitted and that directory exists. CSS `url(/…)` faces are copied after `/fonts.css`.  
CWL still does **not** parse CSS or invent image pixels. Ownership means SoR path, not a CSS dialect.

`brand/agenticops-web` is **assets/ops only** after cutover. It is not a second page source. Do not hand-edit emitted HTML there.

## Certified host effects (genome-declared, host-implemented)

| Effect | Genome | Host |
| --- | --- | --- |
| Calendar year | `year host;` | Emit/live fills `<!-- cwl:year -->` |
| Device class | `device host … below N` | Host pass injects `matchMedia` from declared classes and `below` — not `userAgent` |
| Drawer toggle | `drawer` | Host injects click/Escape script only when chrome has drawer targets |

These scripts are **not** opaque leftover chrome. They are gold-tested host effects of named statements. The language does not evaluate media queries or click handlers inside the parser.

## Outside “100% language bytes” (named)

| Gap | Status |
| --- | --- |
| Live Firebase CLI deploy | Ops. `deploy:demo` publishes only `agenticop-cwl-demo`. Live `agenticops` / `agenticop-io` stay site/ops under parent auth. |
| Dead `ao-layout.js` | Not referenced by any page. Site deletes it on redeploy. |

## Acceptance token

`npm run smoke:cwl-site-100` → **`CWL_SITE_100_OK`**

## Site lane after this tip

CWL creates the language. **The site lane deploys.** CWL does not run `firebase deploy` for live agenticop.io.

1. Stop hand-editing page HTML in `brand/agenticops-web`  
2. Refresh assets from `fixtures/sites/agenticop-io/assets/` when bytes change (include `fonts.css` + `fonts/`)  
3. Delete `ao-layout.js`  
4. Site merges and runs `firebase deploy --only hosting:agenticops`  
