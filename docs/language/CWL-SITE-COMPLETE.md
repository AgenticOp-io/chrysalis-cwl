# Complete CWL site (agenticop.io)

**Tip:** **1.0.78** · Ask `site-complete-cwl` · Genome: `fixtures/sites/agenticop-io/site.cwl`  
**Supersedes for the complete claim:** tip **1.0.77** “100% contract” host-JS leftovers.

## What “complete” means

A **complete CWL marketing site** is a genome + required asset companions + certified `emit:site` freeze, with **No host-injected drawer** or device JavaScript and a **year literal** (not a host clock). Deploy CLI stays ops.

Tip **1.0.76** / **1.0.77** remain valid for modules that still declare `year host`, `device host`, and `drawer` (certified host effects). The public AgenticOps genome does **not** use those for the complete claim.

## Official host path

**Certified freeze:** `npm run emit:site` is the complete public form for demo and live marketing.  
Request-time `npm run live` is still a valid CWL host for dynamic modules; it is not required for agenticop.io.

## In the genome

| Surface | Complete form |
| --- | --- |
| Pages | 26 `@page` routes |
| Year | `year 2026;` literal fills `<!-- cwl:year -->` at compose (not `year host;`) |
| Menu | Checkbox + label in chrome HTML; open state via owned CSS `:has(.ao-nav-open:checked)` |
| Device cut | Owned CSS `@media (max-width: 820px)` — no `device host` / `matchMedia` script |
| Styles / fonts / logo | `style` / `image` URLs |
| Firebase name | `host firebase` record only |

## Required asset companions

Bytes under **`fixtures/sites/agenticop-io/assets/`** must ship with the freeze (`agenticops.css`, `fonts.css`, `fonts/*.woff2`, logo, explainers). Smokes prove copy. CWL does not parse CSS or invent pixels.

## Forever outside language

| Gap | Status |
| --- | --- |
| Firebase CLI deploy | Ops. `deploy:demo` → `agenticop-cwl-demo` only. Live `hosting:agenticops` is the site lane under parent auth. |
| `ao-layout.js` | Forbidden on complete pages. Must not be referenced or required. |

## Acceptance token

`npm run smoke:cwl-site-complete` → **`CWL_SITE_COMPLETE_OK`**

Prior `CWL_SITE_100_OK` still proves the broader 100% contract (including modules that keep host effects). It does not alone prove the complete marketing genome.

## Site lane

CWL creates the language. **The site lane deploys.**

1. Refresh from `npm run emit:site` (include fonts + CSS)  
2. Redeploy demo via CWL `deploy:demo` when tasked  
3. Live: `firebase deploy --only hosting:agenticops --project agenticop-io` under parent auth  
