# CWL OUTBOX (git)

Pushed asks for siblings. Newest first.

---

## 2026-10-04 - tip-1.0.74-database

**To:** convert + secure  
**Priority:** P0  
**Status:** **open**  
**CWL tip:** **1.0.74**

### Ask

| Who | Action |
| --- | --- |
| Convert | Pin to **1.0.74**. Peel gold `79`. Gold `82` is the database host inside CWL. Do not freeze that module into one HTML file. Do not invent a SQL dialect. Do not deploy Firebase project `agenticops` |
| Secure | Pin to **1.0.74**. `engine` names sqlite, postgres, mysql, mariadb, sqlserver, or oracle. A row value is a parameter. It is not SQL text, not a media-query evaluation, and not a stored cookie value |

### CWL landed

- `engine`, `table`, and `db select` / `insert` / `update` / `delete` are one set of statements. The host speaks that engine
- Gold `82`. SQLite executes the module. The same insert compiles for the other five engines with the title left as a parameter
- Land `9f62655`. Convert `920d1329` and Secure `24750e2` remain the **1.0.70** pins
- The public site files are still the old HTML

---

## 2026-10-03 - tip-1.0.73-dynamic-html

**To:** convert + secure  
**Priority:** P0  
**Status:** **open**  
**CWL tip:** **1.0.73**

### Ask

| Who | Action |
| --- | --- |
| Convert | Pin to **1.0.73**. Peel gold `79`. Gold `81` is dynamic HTML emit inside CWL. Do not freeze that page into one HTML file. Do not add a database. Do not deploy Firebase project `agenticops` |
| Secure | Pin to **1.0.73**. A repeated row is host data for that request. A branch is a comparison against the request or that data. It is not a media-query evaluation and not a stored cookie value |

### CWL landed

- `repeat` and `if` build the document when `npm run live` runs. `--data` is the host bag
- Gold `81`. The board page changes with the rows and with `?view=closed`. The note page changes with the host record
- Land `4d849ec`. Convert `920d1329` and Secure `24750e2` remain the **1.0.70** pins
- The public site files are still the old HTML

---

## 2026-10-03 - tip-1.0.72-live-document

**To:** convert + secure  
**Priority:** P0  
**Status:** **open**  
**CWL tip:** **1.0.72**

### Ask

| Who | Action |
| --- | --- |
| Convert | Pin to **1.0.72**. Peel gold `79` from tip **1.0.71**. Gold `80` is the live host, not a new emit phenotype. Do not replace `npm run live` with a static file write. Do not deploy Firebase project `agenticops` |
| Secure | Pin to **1.0.72**. A request path or query filled into HTML is that request. The device token is not a media-query evaluation |

### CWL landed

- `node scripts/cwl-live.mjs` reads the `.cwl` file on each request and composes the document
- Gold `80`. Declared `param` and `query` names are escaped into the page. Unknown paths return `/404.html` with status 404
- Land `425b01f`. Convert `920d1329` and Secure `24750e2` remain the **1.0.70** pins
- The public site files are still the old HTML

---

## 2026-10-03 - tip-1.0.71-head-rest

**To:** convert + secure  
**Priority:** P0  
**Status:** **open**  
**CWL tip:** **1.0.71** (RFC-0029 deepen)

### Ask

| Who | Action |
| --- | --- |
| Convert | Pin to **1.0.71**. Peel gold `79`. Emit `meta keywords`, `icon`, `alternate`, `preconnect`, page `style`, and `jsonld` from their markers. Do not invent an apple touch icon on a page that does not declare `apple`. Do not interpret schema.org. Do not deploy Firebase project `agenticops` |
| Secure | Pin to **1.0.71**. Keywords, icon, alternate, preconnect, and JSON-LD are document facts. A non-URL alternate or preconnect is not copied |

### CWL landed

- Gold `79`. `cwl:unknown-icon`, `cwl:alternate-not-url`, `cwl:preconnect-not-url`, `cwl:jsonld-not-json`, and `cwl:jsonld-closes-script` are not written
- The public site genome names those facts on the pages that have them
- Land `4bc7b6b`. Convert `920d1329` and Secure `24750e2` remain the **1.0.70** pins
- The live site is still the old HTML. The site lane writes `brand/agenticops-web` and deploys Firebase project `agenticops` after Convert peels

---

## 2026-10-02 - tip-1.0.70-social-card

**To:** convert + secure  
**Priority:** P0  
**Status:** **done**  
**CWL tip:** **1.0.70** (RFC-0029 deepen)

### Ask

| Who | Action |
| --- | --- |
| Convert | Pin to **1.0.70**. Peel gold `78`. Emit the social card from `<!-- cwl:meta -->`. Do not invent Open Graph on a page that does not declare it. JSON-LD stays in the head fragment. Keep reading `deviceHost.below`. Do not hardcode `820`. Do not deploy Firebase project `agenticops` |
| Secure | Pin to **1.0.70**. Robots, author, theme-color, Open Graph, and Twitter are document facts. A non-URL card image is not copied |

### CWL landed

- Gold `78`. `cwl:meta-not-url`, `cwl:meta-theme`, `cwl:meta-og-type`, and `cwl:meta-twitter-card` are not written
- The public site genome names the card on the pages that have one
- Land `efc006c`. Convert `920d1329` peels golds `76`–`78`. Secure `24750e2` pins **1.0.70**. Tag `cwl-v1.0.70` is at `d043649`
- The live site is still the old HTML. The site lane writes `brand/agenticops-web` and deploys Firebase project `agenticops`

---

## 2026-10-02 - tip-1.0.69-document-identity

**To:** convert + secure  
**Priority:** P0  
**Status:** **done**  
**CWL tip:** **1.0.69** (RFC-0029 deepen)

### Ask

| Who | Action |
| --- | --- |
| Convert | Pin to **1.0.69**. Peel gold `77`. Emit `title`, `description`, `canonical`, `charset utf-8`, and `viewport device` from the site genome. The viewport meta content stays `width=device-width, initial-scale=1`. Do not evaluate it. Keep reading `deviceHost.below` for the host device script. Do not hardcode `820`. Do not deploy Firebase project `agenticops` |
| Secure | Pin to **1.0.69**. Charset, viewport meta, title, description, and canonical are document facts. A media-query evaluation is not genome |

### CWL landed

- Gold `77`. A non-URL canonical is `cwl:canonical-not-url` and is not written
- The public site genome names those facts on all 26 pages. Open Graph stays in `head html`
- Land `5c8dbfd`. Tip **1.0.68** `below 820` is included. Convert and Secure pins for **1.0.68** and **1.0.69** are still open

---

## 2026-10-02 - tip-1.0.68-device-below

**To:** convert + secure  
**Priority:** P0  
**Status:** **done**  
**CWL tip:** **1.0.68** (RFC-0029 deepen)

### Ask

| Who | Action |
| --- | --- |
| Convert | Pin to **1.0.68**. Peel gold `76`. The host device script must use the declared `below` width. Do not hardcode `820`. Do not call `matchMedia` inside CWL. Deploy of Firebase project `agenticops` stays with the site lane |
| Secure | Pin to **1.0.68**. `below 820` is a document fact. A media-query evaluation is not genome |

### CWL landed

- `device host mobile desktop below 820` on the public site genome
- `<!-- cwl:device -->` stays. Gold `76`
- Convert emit of the 26 pages and Secure pin **1.0.67** are done
- Land `e5452e1`. Tag `cwl-v1.0.67` published at genome land `b6402dc`

---

## 2026-10-02 - agenticop-site-genome

**To:** convert + secure  
**Priority:** P0  
**Status:** **done**  
**CWL tip:** **1.0.67**

### Ask

| Who | Action |
| --- | --- |
| Convert | Emit `fixtures/sites/agenticop-io/site.cwl`. Serve `/agenticops.css` and `/logo.svg`. Replace `<!-- cwl:year -->` and `<!-- cwl:device -->` on the host. Deploy the named Firebase public root. Do not inject `ao-layout.js` |
| Secure | Pin to **1.0.67**. The page source is this genome. Stylesheet bytes, image bytes, and the script file are not genome |

### CWL landed

- 26 public pages, including `/404.html`
- Shared nav, footer lists, drawer, year token, device token, stylesheet, logo, Firebase root
- `npm run smoke:agenticop-site` → `CWL_AGENTICOP_SITE_OK`
- Convert tip pin **1.0.67** is done (PR #76). Tag `cwl-v1.0.67` is at `b6402dc`

---

## 2026-10-01 - tip-1.0.67-site-page

**To:** convert + secure  
**Priority:** P1  
**Status:** **done**  
**CWL tip:** **1.0.67** (RFC-0029 deepen)

### Ask

| Who | Action |
| --- | --- |
| Convert | Pin to **1.0.67**. Peel gold `75`. Serve the named script file. Accept the same-site form post. Do not emit a form whose action is another origin |
| Secure | Pin to **1.0.67**. A script URL and a same-site form are document facts. An off-site form action is a hole. Do not treat the script bytes as genome |

### CWL landed

- `script` fills `<!-- cwl:script -->`
- `form` / `field` / `submit` fill `<!-- cwl:form <id> -->` for a same-site action
- `link … target blank rel` emits the anchor attributes
- Off-site form actions stay `unsupported:offsite-form`
- Reply on [`INBOX-SITE-CWL.md`](./INBOX-SITE-CWL.md)

---

## 2026-10-01 - goal-dna-of-web-languages

**To:** convert + secure  
**Priority:** P0  
**Status:** **open**  
**CWL tip:** **1.0.66** (no grammar change)

### Ask

| Who | Action |
| --- | --- |
| Convert | Treat CWL as the page language. The goal is to replace any web page. Pin stays **1.0.66** until the open 1.0.63–1.0.66 asks land. Do not redefine the goal in Convert |
| Secure | A CWL bridge speaks this language. The goal is page replacement, not a second grammar. Pin stays **1.0.66**. Do not redefine the goal in Secure |

### CWL landed

- Constitution, README, scope, Rosetta path, and `LANGUAGE_VERSION.md` state the goal
- Golds `68`–`74` replace a document shell. Form actions, websocket, SQL engines, and arbitrary client script stay holes
- Umbrella `THREE_PILLARS.md` is not edited from this repo

---

## 2026-10-01 - tip-1.0.66-site-assets

**To:** convert + secure  
**Priority:** P1  
**Status:** **open**  
**CWL tip:** **1.0.66** (RFC-0029 deepen)

### Ask

| Who | Action |
| --- | --- |
| Convert | Pin to **1.0.66**. Peel gold `74`. Serve the named stylesheet and image. Deploy the named Firebase public root. Do not parse CSS or image bytes inside CWL |
| Secure | Pin to **1.0.66**. A stylesheet URL, an image path, and a hosting target are document facts. Do not treat the CSS file or the image bytes as genome |

### CWL landed

- `style` fills `<!-- cwl:style -->`
- `image <id>` fills `<!-- cwl:image <id> -->`
- `host firebase` names the target, public directory, and error document
- Missing slots stay named holes
- Reply on [`INBOX-SITE-CWL.md`](./INBOX-SITE-CWL.md)

---

## 2026-10-01 - tip-1.0.65-site-shell-behavior

**To:** convert + secure  
**Priority:** P1  
**Status:** **open**  
**CWL tip:** **1.0.65** (RFC-0029 deepen)

### Ask

| Who | Action |
| --- | --- |
| Convert | Pin to **1.0.65**. Peel gold `73`. Emit the drawer script with the page. Replace `<!-- cwl:device -->` in the browser with one of the declared classes. Do not add a user-agent or viewport read to the language |
| Secure | Pin to **1.0.65**. The drawer script is the declared toggle. A device token is document text. Do not treat the user agent as genome |

### CWL landed

- `drawer` writes click, Escape, and link-close
- `device host <a> <b>;` keeps `<!-- cwl:device -->`
- `links <name>;` is a separate list
- Missing targets or tokens stay named holes
- CSS, images, and Firebase Hosting stay outside the language
- Reply on [`INBOX-SITE-CWL.md`](./INBOX-SITE-CWL.md)

---

## 2026-10-01 - tip-1.0.64-site-nav-links

**To:** convert + secure  
**Priority:** P1  
**Status:** **open**  
**CWL tip:** **1.0.64** (RFC-0029 deepen)

### Ask

| Who | Action |
| --- | --- |
| Convert | Pin to **1.0.64**. Peel gold `72`. Emit the expanded link list as static HTML. Do not depend on `ao-layout.js` to fill `#ao-site-nav`. Do not invent the drawer click or a device sniff |
| Secure | Pin to **1.0.64**. A nav list is document text. Do not treat the viewport or the user agent as genome |

### CWL landed

- `link <id> "<href>" "<label>";` fills every `<!-- cwl:links -->`
- `class <token>` replaces the base class
- A list with no slot is `cwl:missing-links-slot`
- The Menu button is document text. Opening the drawer and `data-ao-device` stay `unsupported:opaque-script`
- Reply on [`INBOX-SITE-CWL.md`](./INBOX-SITE-CWL.md)

---

## 2026-10-01 - tip-1.0.63-site-year

**To:** convert + secure  
**Priority:** P1  
**Status:** **open**  
**CWL tip:** **1.0.63** (RFC-0029 deepen)

### Ask

| Who | Action |
| --- | --- |
| Convert | Pin to **1.0.63**. Peel gold `71`. When emitting static HTML, replace `<!-- cwl:year -->` with the calendar year. Do not invent the menu script or a device sniff |
| Secure | Pin to **1.0.63**. A year token is document text. Do not treat the clock, the viewport, or the user agent as genome |

### CWL landed

- `year host;` keeps `<!-- cwl:year -->`
- CWL does not write digits
- A declaration with no token is `cwl:missing-year-slot`
- The menu toggle and `data-ao-device` stay `unsupported:opaque-script`
- Reply on [`INBOX-SITE-CWL.md`](./INBOX-SITE-CWL.md)

---

## 2026-10-01 - tip-1.0.62-nav-id

**To:** convert + secure  
**Priority:** P1  
**Status:** **done**  
**CWL tip:** **1.0.62** (RFC-0029 deepen)

### Ask

| Who | Action |
| --- | --- |
| Convert | Pin to **1.0.62**. Peel gold `70`. Static HTML emit stays Convert. Do not invent the menu script |
| Secure | Pin to **1.0.62**. A nav id is document text. `ao-layout.js` stays outside the genome |

### CWL landed

- `nav <id>;` is the shared id for `<!-- cwl:page -->` and `<!-- cwl:active -->`
- The page decl name stays
- No `nav` statement still uses the page name (gold `69`)
- Reply on [`INBOX-SITE-CWL.md`](./INBOX-SITE-CWL.md)

### Noted

Convert and Secure pinned **1.0.61** on their candidate branches. Convert asked for tag `cwl-v1.0.61`.

### Parent check (2026-10-01)

Convert **main** is at gold **70**. `12f3b551` (`convert: follow CWL 1.0.62 (D6582) - gold 70 shared nav id`) is on `origin/main` via pull request #75 (`f2854e90`). Tip floor is **1.0.62**. `nav docs;` on `paper_cwl` marks Docs in the header and the footer. Convert did not add the menu script, CSS, images, or Firebase hosting. Reply: `engines/chrysalis-convert/docs/pillar-sync/OUTBOX.md` `convert-tip-1.0.62`. Secure pin **1.0.62** is done (`secure-tip-1.0.62`). Tag `cwl-v1.0.62` is still the ask back.

---

## 2026-10-01 - tip-1.0.61-site-shell

**To:** convert + secure  
**Priority:** P1  
**Status:** **open**  
**CWL tip:** **1.0.61** (RFC-0029 deepen)

### Ask

| Who | Action |
| --- | --- |
| Convert | Pin to **1.0.61**. Peel gold `69`. Static HTML emit stays Convert. Do not invent the menu script, CSS, images, or Firebase |
| Secure | Pin to **1.0.61**. A page id and an active class are document text. Do not treat `ao-layout.js` as genome |

### CWL landed

- `head html` fills `<!-- cwl:head -->`
- `<!-- cwl:page -->` is the page name
- `<!-- cwl:active <page> <class> -->` marks the current page
- A head with no slot is `cwl:missing-head-slot`
- Reply on [`INBOX-SITE-CWL.md`](./INBOX-SITE-CWL.md)

---

## 2026-09-30 - tip-1.0.60-site-document

**To:** convert + secure  
**Priority:** P1  
**Status:** **open**  
**CWL tip:** **1.0.60** (RFC-0029 deepen)

### Ask

| Who | Action |
| --- | --- |
| Convert | Pin to **1.0.60**. Peel gold `68`. Static emit of `@page` HTML to a host `public/` directory is Convert’s job once this grammar is pinned. Do not invent CSS, browser JS, images, or Firebase inside the peel |
| Secure | Pin to **1.0.60**. A document shell is page HTML. Do not treat `agenticops.css` or `ao-layout.js` as genome |

### CWL landed

- `return html """` … `""";` and `chrome html """` … `""";` keep newlines and quotes
- `<!-- cwl:body -->` is the one document slot
- Chrome without that marker stays a prefix (gold 36)
- Reply to [`INBOX-SITE-CWL.md`](./INBOX-SITE-CWL.md)

---

## 2026-09-30 - tip-1.0.59-cache-no-cache

**To:** convert + secure  
**Priority:** P0  
**Status:** **open**  
**CWL tip:** **1.0.59** (RFC-0020 deepen)

### Ask

| Who | Action |
| --- | --- |
| Convert | Pin to **1.0.59**; peel gold `67` (`cache.no-cache`, including with `cache.private`). Host sets Cache-Control. No CDN invent. Still peel golds `65`–`66` if those tips are not pinned yet |
| Secure | Pin to **1.0.59**. `cache.no-cache` means a cache may store the response only if it revalidates first. Do not invent a cache |

### CWL landed

- `cache.no-cache` composes with `cache.private`
- `cache.no-store` is unchanged and stronger
- Siblings are still on tip **1.0.56**

---

## 2026-09-30 - tip-1.0.58-cache-no-store

**To:** convert + secure  
**Priority:** P0  
**Status:** **open**  
**CWL tip:** **1.0.58** (RFC-0020 deepen)

### Ask

| Who | Action |
| --- | --- |
| Convert | Pin to **1.0.58**; peel gold `66` (`cache.no-store`, including with `cache.private`). Host sets Cache-Control. No CDN invent. Still peel gold `65` if 1.0.57 is not pinned yet |
| Secure | Pin to **1.0.58**. `cache.no-store` is genome intent that nothing may store the response. Do not invent a cache |

### CWL landed

- `cache.no-store` composes with `cache.private`
- `cache.max-age` is unchanged
- Siblings are still on tip **1.0.56**

---

## 2026-09-30 - tip-1.0.57-same-site-redirect

**To:** convert + secure  
**Priority:** P0  
**Status:** **open**  
**CWL tip:** **1.0.57** (RFC-0006 deepen)

### Ask

| Who | Action |
| --- | --- |
| Convert | Pin to **1.0.57**; peel gold `65` (`redirect "/path"` and `redirect "/path" status 301`). Off-site targets stay `unsupported:open-redirect`. Gold `14` status plus location header stays. Treat `__cwl_cookie_purpose` as a declarative no-op in simulate (same class as cors/mail). Do not invent cookie values |
| Secure | Pin to **1.0.57**. A declared redirect is a same-site path only. Do not follow a genome target that is off-site |

### CWL landed

- `redirect "/account"` defaults to 302
- `redirect "/home" status 301` (also 303, 307, 308)
- Scheme and protocol-relative targets are `unsupported:open-redirect`
- Siblings closed tip **1.0.56**

---

## 2026-09-26 - tip-1.0.56-cookie-purpose

**To:** convert + secure  
**Priority:** P0  
**Status:** **done**  
**CWL tip:** **1.0.56** (RFC-0034)

### Ask

| Who | Action |
| --- | --- |
| Convert | Pin to **1.0.56**; peel gold `64` (`cookie <name> purpose preference values …`, `cookie <name> purpose session`). Bare `cookie <name>` and `samesite none` are `unsupported:tracking-cookie` |
| Secure | Pin to **1.0.56**. Refuse a live `Set-Cookie` whose name is not session, csrf, or an enumerated preference, and refuse a preference value outside the declared class list. Never a token value |

### CWL landed

- Closed purposes: `session`, `csrf`, `preference` (class list of 2–8 short tokens)
- `samesite` on session mint/revoke is `lax` or `strict`
- Session and csrf names are not spliced into HTML
- Prior tip **1.0.55** still open for sibling pin (golds 62–63)

---

## 2026-09-26 - tip-1.0.55-cache-private

**To:** convert + secure  
**Priority:** P0  
**Status:** **open**  
**CWL tip:** **1.0.55** (RFC-0020 deepen) · includes tip **1.0.54**

### Ask

| Who | Action |
| --- | --- |
| Convert | Pin to **1.0.55**; peel `session.read|write cookie <name>` (gold `62`) and `cache.private` (gold `63`); bare forms unchanged |
| Secure | Pin to **1.0.55**; cookie name and private-cache intent only — never a token value, no CDN |

### CWL landed

- `session.read cookie sid` / `session.write cookie sid` (1.0.54)
- `cache.private` composes with `cache.max-age` (1.0.55)
- Siblings already closed tip **1.0.53**

---


## 2026-09-26 - tip-1.0.53-cors-allow-credentials

**To:** convert + secure  
**Priority:** P0  
**Status:** **open**  
**CWL tip:** **1.0.53** (RFC-0020 deepen) · includes tip **1.0.52**

### Ask

| Who | Action |
| --- | --- |
| Convert | Pin to **1.0.53**; peel `io host <name>` (gold `60`) and `cors.allow credentials` (gold `61`); bare forms unchanged |
| Secure | Pin to **1.0.53**; host name and credentials flag are genome intent only — no invented HTTP client or CORS engine |

### CWL landed

- `io host api.example.com` — logical host only (1.0.52)
- `cors.allow origin … credentials` / `cors.allow methods … credentials` (1.0.53)
- Siblings already closed tip **1.0.51**

---


## 2026-09-22 - tip-1.0.51-cache-max-age

**To:** convert + secure  
**Priority:** P0  
**Status:** **open**  
**CWL tip:** **1.0.51** (RFC-0020 deepen)

### Ask

| Who | Action |
| --- | --- |
| Convert | Pin to **1.0.51**; peel `cache.max-age <seconds>` (gold `59`) |
| Secure | Pin to **1.0.51**; cache intent only — no invented CDN |

### CWL landed

- `cache.max-age 86400` / `cache.max-age 0` — host sets Cache-Control
- No CDN / cache-engine invent

---


## 2026-09-22 - tip-1.0.50-cors-allow-methods

**To:** convert + secure  
**Priority:** P0  
**Status:** **open**  
**CWL tip:** **1.0.50** (RFC-0020 deepen) · includes tip **1.0.49**

### Ask

| Who | Action |
| --- | --- |
| Convert | Pin to **1.0.50**; peel `mail.send template <name>` (gold `57`) and `cors.allow methods` / origin+methods (gold `58`); bare forms unchanged |
| Secure | Pin to **1.0.50**; CORS methods / mail template are genome intent only — no invented CORS or mailer |

### CWL landed

- `mail.send template welcome` — host-owned template name (1.0.49)
- `cors.allow methods GET POST` + `cors.allow origin … methods …` (1.0.50)
- Tags: publish `cwl-v1.0.48`–`cwl-v1.0.50` when ready
- No SMTP / CORS engine invent

---


## 2026-09-22 - docs-chrysalis-direction

**To:** convert + secure  
**Priority:** P0  
**Status:** **open**  
**CWL tip:** **1.0.48** (docs / GitHub identity) · CWL `main` `21de53f`

### Ask

| Who | Action |
| --- | --- |
| Convert | Rewrite root `README.md` lead: drop `legacy PHP to modern TypeScript` as the product identity. Lead with Universal Translator + three-pillar table (CWL / chrysalis / chrysalis-security). PHP stays **one peel**. GitHub description already updated. |
| Secure | Optional: add the same three-pillar table near the top of `README.md` (clarify CWL bridge does not own the language). |

### CWL landed

- Org profile Chrysalis section refreshed
- Repo descriptions: `chrysalis-cwl`, `chrysalis`, `chrysalis-security`
- CWL README / scope / PRIVATE-PILLARS / packages/cwl README

---

## 2026-09-22 - tip-1.0.48-db-table-name

**To:** convert + secure  
**Priority:** P0  
**Status:** **open** (language landed on `main` `b3f7530` - pin/peel pending)  
**CWL tip:** **1.0.48** (RFC-0020 deepen) · CWL `main` `b3f7530`

### Ask

| Who | Action |
| --- | --- |
| Convert | Pin to **1.0.48**; peel ``db.read|write table <name>`` (gold ``56``); bare forms unchanged |
| Secure | Pin to **1.0.48**; no new Secure surface required (data intent only) |

### CWL landed

- ``db.read table users`` / ``db.write table users`` — table name as named arg
- Tag ``cwl-v1.0.47`` published
- No SQL invent

---

## 2026-09-22 - tip-1.0.47-auth-require-cookie

**To:** convert + secure  
**Priority:** P0  
**Status:** **open** (language landed on `main` `65144a5` - pin/peel pending)  
**CWL tip:** **1.0.47** (RFC-0007 deepen) · CWL `main` `65144a5`

### Ask

| Who | Action |
| --- | --- |
| Convert | Pin to **1.0.47**; peel ``auth.require cookie <name>`` (gold ``55``); bare ``auth.require`` remains sessionRead |
| Secure | Pin to **1.0.47**; may cross-check named session cookie presence — never token values |

### CWL landed

- ``auth.require cookie sid`` lowers as ``__cwl_effect_auth_require`` with named cookie arg
- Bare ``auth.require`` unchanged
- Tag ``cwl-v1.0.46`` published at ``e08629c``

---

## 2026-09-19 - tip-1.0.46-csrf-verify-cookie

**To:** convert + secure  
**Priority:** P0  
**Status:** **done** (Convert + Secure tip-1.0.46 OK; tag `cwl-v1.0.46` published)  
**CWL tip:** **1.0.46** (RFC-0020 deepen) · CWL `main` `fdd7e3d`

### Ask

| Who | Action |
| --- | --- |
| Convert | Pin to **1.0.46**; peel ``csrf.verify cookie <name>`` (gold ``54``) |
| Secure | Pin to **1.0.46**; may cross-check CSRF cookie names — never token values |

### CWL landed

- ``csrf.verify cookie csrf`` lowers cookie name as named arg on ``__cwl_middleware_csrf``
- Bare ``csrf.verify`` unchanged

---

## 2026-09-19 - tip-1.0.45-rate-limit-rpm

**To:** convert + secure  
**Priority:** P0  
**Status:** **done** (Convert + Secure tip-1.0.46 OK; tag `cwl-v1.0.46` published)  
**CWL tip:** **1.0.45** (RFC-0020 deepen) · CWL `main` `41ebba8`

### Ask

| Who | Action |
| --- | --- |
| Convert | Pin to **1.0.45**; peel ``rate.limit rpm <n>`` (gold ``53``) |
| Secure | Pin to **1.0.45**; no new Secure surface required |

### CWL landed

- ``rate.limit rpm 60`` lowers rpm as named int arg on ``__cwl_middleware_rate_limit``
- Bare ``rate.limit`` unchanged

---

## 2026-09-19 - tip-1.0.44-cors-allow-origin

**To:** convert + secure  
**Priority:** P0  
**Status:** **done** (Convert + Secure tip-1.0.46 OK; tag `cwl-v1.0.46` published)  
**CWL tip:** **1.0.44** (RFC-0020 deepen) · CWL `main` `1b9f921`

### Ask

| Who | Action |
| --- | --- |
| Convert | Pin to **1.0.44**; peel ``cors.allow origin <url>`` (gold ``52``); bare ``cors.allow`` remains ``*`` |
| Secure | Pin to **1.0.44**; no new Secure surface required |

### CWL landed

- ``cors.allow origin https://…`` lowers origin as named arg on ``__cwl_middleware_cors``
- Gold ``22`` unchanged

---

## 2026-09-19 - tip-1.0.43-session-cookie-attrs

**To:** convert + secure  
**Priority:** P0  
**Status:** **done** (Convert + Secure tip-1.0.46 OK; tag `cwl-v1.0.46` published)  
**CWL tip:** **1.0.43** (RFC-0032 deepen) · CWL `main` `ef4e4b4`

### Ask

| Who | Action |
| --- | --- |
| Convert | Pin to **1.0.43**; peel/recover ``session.mint cookie sid httponly secure path / samesite lax`` (gold ``51``); attrs are ``__object_literal`` on mint/revoke |
| Secure | Pin to **1.0.43**; may honor policy attrs against live ``Set-Cookie`` — still never read token values into CWL |

### CWL landed

- Cookie policy attrs on mint/revoke: ``httponly``, ``secure``, ``path /...``, ``samesite lax|strict|none``
- Package lib now stages ``hub-cwl-effects.mjs``
- Gold ``46`` (name-only) unchanged

---

## 2026-09-19 - tip-1.0.42-html-repeat-composition

**To:** convert + secure  
**Priority:** P0  
**Status:** **done** (Convert + Secure tip-1.0.46 OK; tag `cwl-v1.0.46` published)  
**CWL tip:** **1.0.42** (RFC-0031 composition - gene closed) · CWL `main` `5bd854a`

### Ask

| Who | Action |
| --- | --- |
| Convert | Pin to **1.0.42**; peel/recover golds ``49`` + ``50`` (nested; nested+if/else) |
| Secure | Pin to **1.0.42**; no new Secure surface - page DNA only |

### CWL landed

- Gold ``50-html-repeat-nested-filter`` - nest composes with ``if``/``else``
- No new grammar; RFC-0031 deepen queue for declared repeat surface **closed**
- Golds ``40``/``41``/``47``-``49`` unchanged

---

## 2026-09-19 - tip-1.0.41-html-repeat-nested

**To:** convert + secure  
**Priority:** P0  
**Status:** **done** (Convert + Secure tip-1.0.46 OK; tag `cwl-v1.0.46` published)  
**CWL tip:** **1.0.41** (RFC-0031 deepen) · CWL `main` `82cd85f`

### Ask

| Who | Action |
| --- | --- |
| Convert | Pin to **1.0.41**; peel/recover `repeat outerItem.field as inner html "..."` (gold `49`); outer item template leaf (`towers`) embeds inner `__cwl_html_repeat`; iterable is `param`->`member` - ALWAYS already syncs `cwl-html-template.mjs` / `cwl-emit-ui.mjs` |
| Secure | Pin to **1.0.41**; no new Secure surface - nested markup is page DNA only |

### CWL landed

- One-level nested repeats: `repeat region.towers as tower html "..."`
- Deeper nests (`a.b.c`) -> `hole cwl:invalid-html-repeat-nested`
- Emit reverses outer + nested sibling statements
- Golds `40`/`41`/`47`/`48` unchanged

---

## 2026-09-19 — tip-1.0.40-html-repeat-else

**To:** convert + secure  
**Priority:** P0  
**Status:** **done** (Convert + Secure tip-1.0.46 OK; tag `cwl-v1.0.46` published)  
**CWL tip:** **1.0.40** (RFC-0031 deepen) · CWL `main` `6d215b8`  

### Ask

| Who | Action |
| --- | --- |
| Convert | Pin to **1.0.40**; peel/recover `repeat coll as item … html "…" else html "…"` (gold `48`); named `__cwl_html_repeat` arg `empty` is a literal `html.template` — ALWAYS already syncs `cwl-html-template.mjs` / `cwl-emit-ui.mjs` |
| Secure | Pin to **1.0.40**; no new Secure surface — empty markup is page DNA only |

### CWL landed

- Optional `else html "…"` on RFC-0031 repeats — empty-collection fragment
- Lowers as named arg `empty` on `__cwl_html_repeat` (works with or without `if`)
- Emit reverses `else html` exactly
- Golds `40`/`41`/`47` unchanged

---

## 2026-09-19 — tip-1.0.39-html-repeat-if

**To:** convert + secure  
**Priority:** P0  
**Status:** **open**  
**CWL tip:** **1.0.39** (RFC-0031 deepen) · Packages land with tip · CWL `main` `3c608e9`

### Ask

| Who | Action |
| --- | --- |
| Convert | Pin to **1.0.39**; peel/recover `repeat coll as item if item.field html "…"` (gold `47`); third `__cwl_html_repeat` arg is the `when` member chain — ALWAYS already syncs `cwl-html-template.mjs` / `cwl-emit-ui.mjs` |
| Secure | Pin to **1.0.39**; no new Secure surface — filter is page DNA only |

### CWL landed

- Optional `if <item[.field…]>` on RFC-0031 repeats — truthy item-field filter
- Parser rejects `if` not rooted on the item (`cwl:invalid-html-repeat-if`)
- Lower: third call arg + `argNames` includes `"when"`; emit reverses `if` exactly
- Golds `40`/`41` unchanged

---

## 2026-09-19 — tip-1.0.38-session-cookie-name

**To:** convert + secure  
**Priority:** P0  
**Status:** **superseded** (tip advanced to 1.0.39 — pin asks roll forward)  
**CWL tip:** **1.0.38** (RFC-0032 deepen) · Packages **`@agenticop-io/cwl@1.0.38`** live · CWL `main` `d9c9fb9`

### Ask

| Who | Action |
| --- | --- |
| Convert | Pin to **1.0.38**; peel/recover `session.mint cookie <name>` / `session.revoke cookie <name>` (gold `46`); attachment holes now count in thin emit `holeCount` (gold `36`) |
| Secure | Pin to **1.0.38**; genome may now name the session cookie — cutover can honor `session.mint cookie sid` against certificate `set_cookie_names` (name only; never seed a value) |

### CWL landed

- `effects: session.mint cookie sid;` / `session.revoke cookie sid;` — optional cookie **name** on mint/revoke
- Lowers as string literal arg on `__cwl_effect_session_mint` / `_revoke`; emit reverse recovers the phrase
- Bare `session.mint` (gold `42`) unchanged
- Emit `holeCount` increments for each attachment hole (Convert counter alignment)
- Completes the soft Secure note from response-surface work without inventing cookie values

---

## 2026-09-19 — runtime-upstream-passthrough

**To:** convert + secure  
**Priority:** P0  
**Status:** **done**  
**CWL tip:** **1.0.37** (unchanged — runtime package, not a language tip) · CWL `main` `9f8b520`

### Landed

| Item | Detail |
| --- | --- |
| `CwlRuntimeConfig.upstream` | Optional `StubUpstream`; default `DEFAULT_STUB_UPSTREAM` |
| Call site | `simulateHandler(module, route, input, db, upstream)` |
| Gate | `gate-runtime-cwl` fixture `upstream-passthrough` (bare 501 + stub 200 + `:param` substitution on golds 43/45) |
| ALWAYS | `cwl-html-template.mjs` + `cwl-emit-ui.mjs` added (Convert already byte-identical) |
| Re-exports | `StubUpstream`, `DEFAULT_STUB_UPSTREAM` from `@chrysalis/runtime-cwl` |

### Ask

| Who | Action |
| --- | --- |
| Convert | Wire host transport via `createCwlRuntime({ upstream })` when serving CWL under the junctioned runtime; tip-sync will now keep html-template/emit-ui |
| Secure | none |

Closes Convert P0 “runtime-cwl transport passthrough” from `convert-tip-1.0.37`.

---

## 2026-09-19 — cwl-builds-from-sibling-acks

**To:** convert + secure  
**Priority:** P0  
**Status:** **closed** (built — see `runtime-upstream-passthrough`)  
**CWL tip:** **1.0.37** (unchanged) · Convert `89b1d2a8` · Secure `f9c6f95`

### Reply to siblings

| Who | Ack read | CWL action |
| --- | --- | --- |
| Convert | `convert-tip-1.0.37` + `convert-tip-1.0.37-resync` + CI bootstrap | **Building** runtime-cwl `StubUpstream` passthrough; **building** ALWAYS for `cwl-html-template.mjs` + `cwl-emit-ui.mjs` |
| Secure | `secure-tip-1.0.37-resync` (+ triage / response-surface / Mode B notes) | No language ask — tip consume closed; soft session-cookie note parked (not building) |

Tip pin asks `1.0.33`…`1.0.37` → **closed** (both siblings `*_TIP_1_0_37_OK`). BOARD tip-ack rows were stale; corrected 2026-09-19.

---

## 2026-09-16 — tip-1.0.37-hole-message-resolution

**To:** convert + secure  
**Priority:** P1  
**Status:** **closed** (Convert `CONVERT_HOLE_PARAM_LOOKUP_OK` · Secure `SECURE_HOLE_PARAM_LOOKUP_OK`)  
**CWL tip:** **1.0.37** · Packages **`@agenticop-io/cwl@1.0.37`** live · CWL `main` `177fc0b`

### Ask

| Who | Action |
| --- | --- |
| Convert | Pin to **1.0.37**; if you surface hole reasons in UI, use `lookupFullstackHole` — argument-carrying reasons now resolve to their entry |
| Convert | **P0 (separate):** execute `__cwl_effect_upstream_proxy` in `@chrysalis/rewrite` `simulateHandler`; `runtime-cwl` delegates there, so a declared forward is currently inert at runtime |
| Secure | Pin to **1.0.37**; no semantic change to seeds |

### CWL landed

- `cwl:unknown-proxy-param:region` and friends resolve to their catalog entry instead of warning "uncatalogued hole"
- Entries opt in with `param`; everything else stays exact-match, so the catalog does not get looser
- Hole-catalog gate asserts both directions

---

## 2026-09-16 — tip-1.0.36-proxy-upstream-params

**To:** convert + secure  
**Priority:** P0  
**Status:** **closed** (consumed under Convert/Secure tip **1.0.37**)  
**CWL tip:** **1.0.36** (RFC-0033 deepen) · Packages **`@agenticop-io/cwl@1.0.36`** live · CWL `main` `5c43891`

### Ask

| Who | Action |
| --- | --- |
| Convert | Pin to **1.0.36**; the proxy peel must keep `:param` segments in the target and read the extra `data.requestField` path operands (gold `45`) |
| Secure | Pin to **1.0.36**; a forwarded route's full destination (params included) is genome data |

### CWL landed

- `proxy upstream "https://backend/device/:id/status";` — the target may reuse the route's path params
- Params lower to `data.requestField` path reads (`cwl:proxy-path-param`) as operands after the target literal
- A `:name` the route's path does not declare → `hole cwl:unknown-proxy-param:<name>;`
- Fixes a latent `1.0.34` bug: rejected proxy targets now round-trip print→reparse as honest holes

---

## 2026-09-16 — tip-1.0.35-host-byte-reasons

**To:** convert + secure  
**Priority:** P0  
**Status:** **closed** (consumed under Convert/Secure tip **1.0.37**)  
**CWL tip:** **1.0.35** (RFC-0012 catalog) · Packages **`@agenticop-io/cwl@1.0.35`** live · CWL `main` `98ac08d`

### Ask

| Who | Action |
| --- | --- |
| Convert | Pin to **1.0.35**; when a peel hits host-produced bytes, emit `hub-cwl:keypair-gen` / `hub-cwl:binary-render` instead of `hub-cwl:upstream-proxy` |
| Secure | Pin to **1.0.35**; host-byte routes now carry a declared `content-type` next to the hole — usable for seed/live-match |

### CWL landed

- Two narrow reasons: `hub-cwl:keypair-gen` (host keypair) and `hub-cwl:binary-render` (QR / PDF / archive / config blob)
- Since RFC-0033, `hub-cwl:upstream-proxy` means transfer mechanics only — keypair and byte work no longer belong there
- Gold `44-host-bytes-holes` proves a hole body keeps its `content-type` through WebIR and thin emit
- No grammar change; crypto and image encoders stay host-owned

---

## 2026-09-16 — tip-1.0.34-proxy-upstream

**To:** convert + secure  
**Priority:** P0  
**Status:** **closed** (consumed under Convert/Secure tip **1.0.37**)  
**CWL tip:** **1.0.34** (RFC-0033) · Packages **`@agenticop-io/cwl@1.0.34`** live · CWL `main` `e218afb`

### Ask

| Who | Action |
| --- | --- |
| Convert | Pin to **1.0.34**; peel `__cwl_effect_upstream_proxy(<literal>)` back to `proxy upstream "…";` (gold `43`) |
| Secure | Pin to **1.0.34**; a forwarded route's destination is now genome data, not a hole — seed/live-match may read it |

### CWL landed

- `proxy upstream "<url>";` is a handler body: the destination of a forwarded route is heritable
- Lowering: `__cwl_effect_upstream_proxy(<literal>)` with `cwl:proxy-upstream` provenance; emit reverse returns the target verbatim
- Missing target never guessed — `cwl:invalid-proxy-upstream` (parse) / `cwl:emit:proxy-target` (emit)
- `hub-cwl:upstream-proxy` narrowed to transfer mechanics: TLS, hop-by-hop headers, retries, timeouts, tunnels

---

## 2026-09-16 — tip-1.0.33-credential-effects

**To:** convert + secure  
**Priority:** P0  
**Status:** **closed** (consumed under Convert/Secure tip **1.0.37**)  
**CWL tip:** **1.0.33** (RFC-0032) · Packages **`@agenticop-io/cwl@1.0.33`** live

### Ask

| Who | Action |
| --- | --- |
| Convert | Pin to **1.0.33**; peel effect tags `auth.verify` / `session.mint` / `session.revoke` (gold `42`) |
| Secure | Pin to **1.0.33**; DNA seed / live-match may now read login intent from the genome instead of a hole |

### CWL landed

- Effect vocabulary for credential verify + session mint/revoke; login and logout golds are hole-free
- Lowering: `db.read` / `session.write` + `__cwl_effect_*` nodes; emit reverse recovers tags
- Hashing, token format, expiry, and stores stay host-owned — `hub-cwl:credential-store` narrowed, not deleted

---

## 2026-09-16 — tip-1.0.32-repeat-fields

**To:** convert + secure  
**Priority:** P0  
**Status:** **open**  
**CWL tip:** **1.0.32** (RFC-0031 deepen) · Packages **`@agenticop-io/cwl@1.0.32`** live

### Ask

| Who | Action |
| --- | --- |
| Convert | Pin to **1.0.32**; repeat peel must handle `data.member` chains on the item param (gold `41`) |
| Secure | Pin to **1.0.32**; DNA seed vs golds `40`–`41` |

### CWL landed

- Dotted item fields in repeats (`s.user`, `s.site.city`) → member chains; emit reverse exact
- Gold `41-html-repeat-fields` + emit-check case; session/catalog tables are CWL surfaces now
- Unchanged holes by design: credential crypto, upstream bytes, WebSocket duplex

---

## 2026-09-16 — tip-1.0.31-html-repeat

**To:** convert + secure  
**Priority:** P0  
**Status:** **open**  
**CWL tip:** **1.0.31** (RFC-0031) · Packages **`@agenticop-io/cwl@1.0.31`** live

### Ask

| Who | Action |
| --- | --- |
| Convert | Pin to **1.0.31**; peel repeated markup (`__cwl_html_repeat` in `html.template`) — list surfaces are CWL now, not host fragments |
| Secure | Pin to **1.0.31**; DNA seed vs tip (gold `40`) |

### CWL landed

- `repeat <collection> as <item> html "…";` — parse/print, WebIR lift, exact emit reverse, gold `40`
- Catalog: `cwl:invalid-html-repeat`, `cwl:emit:html-repeat`; `hub-cwl:html-fragment` narrowed to host-owned bytes
- Still host-executor by design: `hub-cwl:credential-store` (crypto), `hub-cwl:upstream-proxy`, `unsupported:websocket`

---

## 2026-09-15 — tip-1.0.30-layout-export

**To:** convert + secure  
**Priority:** P0  
**Status:** **open**  
**CWL tip:** **1.0.30** · Packages **`@agenticop-io/cwl@1.0.30`** live (`cwl-v1.0.30`)

### Ask

| Who | Action |
| --- | --- |
| Convert | Pin to **1.0.30**; `cwl-layout.mjs` now on ALWAYS (closes prior optional ask); gold `39` in language-pillar |
| Secure | Pin to **1.0.30**; DNA seed vs tip |

### CWL landed

- ALWAYS + `@chrysalis/cwl/layout` export
- Gold `39-cinderpath-holes` (html-fragment / credential-store / upstream-proxy)
- Packages published: `@agenticop-io/cwl@1.0.30`
- No WebSocket invent

---

## 2026-09-15 — adoption-1.0.29

**To:** convert + secure + operator  
**Priority:** P0  
**Status:** **open**  
**CWL tip:** **1.0.29** · Packages **`@agenticop-io/cwl@1.0.29`** live (`cwl-v1.0.29`)

### Ask

| Who | Action |
| --- | --- |
| Convert | Pin to **1.0.29**; peels for layout chrome + page islands (ack still **1.0.27**) |
| Secure | Pin to **1.0.29** (ack **1.0.28**) |
| Operator | Redeploy Cinderpath web with compiled genome tip **1.0.29** |

### CWL done

- Tip **1.0.29** on main: html-fragment + credential-store catalog; layout-after-import fix
- Packages published: `@agenticop-io/cwl@1.0.29`
- Cinderpath genome already declares holes in CWL (`4c436e1`)
- Path: adoption + honesty — not native CWL rewrite

---

## 2026-09-15 — tip-1.0.29-hole-catalog

**To:** convert + secure  
**Priority:** P0  
**Status:** **open**  
**CWL tip:** **1.0.29**

### Ask

Pin ≡ **1.0.29**. New catalog reasons: `hub-cwl:html-fragment`, `hub-cwl:credential-store` (Cinderpath genome declares; Go executes).

---

## 2026-09-14 — tip-1.0.28-emit-reverse

**To:** convert + secure  
**Priority:** P0  
**Status:** **open** (await sibling pin ack)  
**CWL tip:** **1.0.28**

### Ask

| Consumer | Action |
| --- | --- |
| Convert | Pin ≡ **1.0.28**; peels may rely on page-island + cookie-load emit reverse |
| Secure | Pin ≡ **1.0.28**; DNA seed / live-match vs tip |

### Shipped

- Gold `38` emit hole-free (RFC-0030 reverse)
- Island events in WebIR serialise; `load { …: cookie name }` emit recovery

---

## 2026-09-14 — tip-1.0.27-expand

**To:** convert + secure  
**Priority:** P0  
**Status:** **open** (await sibling pin ack)  
**CWL tip:** **1.0.27**

### Ask

| Consumer | Action |
| --- | --- |
| Convert | Pin `file:../chrysalis-cwl/packages/cwl` ≡ **1.0.27**; peel layout chrome compose + page islands + cookie HTML interpolate |
| Secure | Pin ≡ **1.0.27**; DNA seed / live-match vs tip surfaces |

### Shipped in CWL

- RFC-0029 layout chrome (`36-layout-chrome`)
- RFC-0014 cookie/load HTML deepen (`37-html-cookie-device`)
- RFC-0030 HTML + sibling `client ui` (`38-html-page-island`)
- Cinderpath consume process: [`../history/CWL-EXPAND.md`](../history/CWL-EXPAND.md)

### Honesty

No UA regex invent. Holes remain for bcrypt/session, WireGuard/POP/QR, opaque script.

---

## 2026-09-09 — full-oss-surface (informational)

**To:** convert + secure + brand  
**Priority:** —  
**Status:** **done** (visibility + site wiring)  
**CWL tip:** **1.0.26**

### Note

Ghost Museum public. WPTP README/matrix URLs retargeted to AgenticOp-io. Brand site: `whitepaper.html` + hub WPTP/Ghost + `llms.txt`. Marketing MD does not auto-deploy — HTML + Firebase.

---

## 2026-09-03 â€” public-pillars (informational)

**To:** convert + secure  
**Priority:** â€”  
**Status:** **done** (GitHub visibility flip)  
**CWL tip:** **1.0.26**

### Note

`AgenticOp-io/chrysalis-cwl`, `AgenticOp-io/chrysalis`, and `AgenticOp-io/chrysalis-security` are **public**. Update any â€œprivate repoâ€ copy in sibling docs. Public npm still not default â€” Packages / `file:` pins. Do not commit counsel/patent drafts without clearance.

---

## 2026-08-21 â€” convert-tip-1.0.26 + next

**To:** convert  
**Priority:** P0  
**Status:** **done** (Convert tip `5844a00f` / work `b437daf6` Â· `CONVERT_TIP_1_0_26_OK`)  
**CWL tip:** **1.0.26** Â· SHA `9fe485a`

### Closed

Pin â‰¡ 1.0.26; gold `35` in language-pillar; gravity + ingest green.

### Standing next (Convert)

| Pri | Work |
| --- | --- |
| P1 | Keep `TRAFFIC_DECIDES_CONVERT_OK` |
| P1 | Peels: urlencoded forms + redirect/error HTML shells |
| â€” | No Nest / LiveView / Flutter invent |

---

## 2026-08-21 â€” secure-tip-1.0.26 + next

**To:** secure  
**Priority:** P0  
**Status:** **done** (Secure tip `1be6670` / work `f20f070` Â· `SECURE_TIP_1_0_26_OK`)  
**CWL tip:** **1.0.26** Â· SHA `9fe485a`

### Closed

Pin â‰¡ 1.0.26; cutover / live-match / traffic-decides-secure green.

### Standing next (Secure)

| Pri | Work |
| --- | --- |
| P1 | Honor `cwl_stream` / multipart fingerprints in cutover |
| **ops** | EXTFMAP Â· customer soak â†’ enforce â€” operator only |
| â€” | D5 DNA-only; no fake soak |

---

## 2026-08-21 â€” convert-tip-1.0.25 + next

**To:** convert  
**Priority:** P0  
**Status:** **done** (Convert tip `cf5fbd1a` / work `342c4afe` Â· `CONVERT_TIP_1_0_25_OK`)  
**CWL tip:** **1.0.25** Â· SHA `83f4d7e`

### Closed

Pin â‰¡ 1.0.25; gravity / ingest / language-pillar green.

### Standing next (Convert)

| Pri | Work |
| --- | --- |
| P1 | Keep `hub:traffic-decides-bar-smoke` â†’ `TRAFFIC_DECIDES_CONVERT_OK` |
| P1 | Peel honesty: redirect/error loads â†’ CWL `load { redirect\|error }` |
| P2 | Optional urlencoded form POST peel demand |
| â€” | No Nest / LiveView / Flutter invent |

---

## 2026-08-21 â€” secure-tip-1.0.25 + next

**To:** secure  
**Priority:** P0  
**Status:** **done** (Secure tip `67fd171` / work `712b189` Â· `SECURE_TIP_1_0_25_OK`)  
**CWL tip:** **1.0.25** Â· SHA `83f4d7e`

### Closed

Pin â‰¡ 1.0.25; cutover / live-match / traffic-decides-secure green.

### Standing next (Secure)

| Pri | Work |
| --- | --- |
| P1 | Honor bridge `cwl_stream` / multipart fingerprints in cutover when present |
| **ops** | EXTFMAP Â· customer soak â†’ enforce (`SHADOW_LOG`) â€” operator only |
| â€” | D5 DNA-only; no fake soak |

---

## 2026-08-21 â€” convert-tip-1.0.24

**To:** convert  
**Priority:** P0  
**Status:** **done** (Convert tip `74133d97` / work `63b9bd59` Â· `CONVERT_TIP_1_0_24_OK`)  
**CWL tip:** **1.0.24** Â· SHA `5982a9b`

### Closed

Pin â‰¡ 1.0.24; gold `34` in language-pillar smoke; gravity + ingest/runtime matrices green.

---

## 2026-08-21 â€” secure-tip-1.0.24

**To:** secure  
**Priority:** P0  
**Status:** **done** (Secure tip `6f6f3dd` / work `10f5964` Â· `SECURE_TIP_1_0_24_OK`)  
**CWL tip:** **1.0.24** Â· SHA `5982a9b`

### Closed

Pin â‰¡ 1.0.24; cutover / live-match / traffic-decides-secure green. Soak remains ops.

---

## 2026-08-21 â€” convert-traffic-decides-bar

**To:** convert  
**Priority:** P0  
**Status:** **done** (Convert tip `5d9c39b4` / work `d85dde6d` Â· `TRAFFIC_DECIDES_CONVERT_OK`)  
**CWL tip:** **1.0.23**  
**Program:** [`../history/TRAFFIC-DECIDES-BAR.md`](../history/TRAFFIC-DECIDES-BAR.md)

### Closed

`pnpm run hub:traffic-decides-bar-smoke` â†’ dispose + verify-gated apply + `verify:flagship` oracle â†’ `TRAFFIC_DECIDES_CONVERT_OK`.

---

## 2026-08-21 â€” secure-traffic-decides-bar

**To:** secure  
**Priority:** P0  
**Status:** **done** (Secure tip `7db986f` / work `d7cb765` Â· `TRAFFIC_DECIDES_SECURE_OK`)  
**CWL tip:** **1.0.23**  
**Program:** [`../history/TRAFFIC-DECIDES-BAR.md`](../history/TRAFFIC-DECIDES-BAR.md)

### Closed

`npm run traffic-decides-bar-smoke` â†’ `SOAK_PREFLIGHT_OK` Â· `LIVE_MATCH_OK` Â· `TRAFFIC_DECIDES_SECURE_OK`. Customer soakâ†’enforce remains ops.

---

## 2026-08-11 â€” try-soak-and-ui

**To:** secure + convert (informational)  
**Priority:** â€”  
**Status:** **done** (agent attempt â€” both blocked honestly)  
**CWL tip:** **1.0.23**

### Tried

1. **Soak (#2):** re-ran `soak-preflight-smoke` â†’ `SOAK_PREFLIGHT_OK`. Live soakâ†’enforce still needs operator customer traffic + `SHADOW_LOG` (no fake traffic).
2. **UI (#3):** scanned Convert consume â€” no peel demand beyond RFC-0028 / gold 33. No CWL tip bump.

### Still operator

EXTFMAP Â· customer soak host/log Â· named peel demand for next UI gene.

---

## 2026-08-11 â€” fleet-idle-ops

**To:** convert + secure (informational)  
**Priority:** â€”  
**Status:** **done** (no agent ask â€” operator owns residuals)  
**CWL tip:** **1.0.23**

### Note

CWL invent drained. EXTFMAP close and customer soak are **operator-only** (see `docs/history/OPERATOR-NEXT-1.0.23.md`). Do not invent ABSENT, fake soak traffic, or dialect faÃ§ades. Heartbeat `waiting` is correct until operator evidence lands.

---

## 2026-08-11 â€” convert-tip-1.0.23

**To:** convert  
**Priority:** P0  
**Status:** **done** (Convert tip `26b54df6` / work `13c2937a` Â· `CONVERT_TIP_1_0_23_OK`)  
**CWL tip:** **1.0.23**

### Closed

ALWAYS mirrors + pin floor â‰¥ 1.0.23; gold 33; island-id simulate kept; no faÃ§ades.

---

## 2026-08-11 â€” secure-tip-1.0.23

**To:** secure  
**Priority:** P1  
**Status:** **done** (Secure tip `87aa654` / work `5c508a9` Â· `SECURE_TIP_1_0_23_OK`)  
**CWL tip:** **1.0.23**

### Closed

Pin â†’ 1.0.23; bridge/cutover/live-match/DNA core OK. Soak remains ops.

---

## 2026-08-11 â€” convert-tip-1.0.22

**To:** convert  
**Priority:** P0  
**Status:** **done** (Convert tip `6b3f84aa` / work `c1132cbc` Â· `CONVERT_TIP_1_0_22_OK`)  
**CWL tip:** **1.0.22**

### Closed

ALWAYS mirrors + pin floor â‰¥ 1.0.22; gold 32; no faÃ§ades.

---

## 2026-08-11 â€” secure-tip-1.0.22

**To:** secure  
**Priority:** P1  
**Status:** **done** (Secure tip `2f3a7f3` / work `729f675` Â· `SECURE_TIP_1_0_22_OK`)  
**CWL tip:** **1.0.22**

### Closed

Pin â†’ 1.0.22; bridge/cutover/live-match/DNA core OK. Soak remains ops.

---

## 2026-08-11 â€” convert-tip-1.0.21

**To:** convert  
**Priority:** P0  
**Status:** **done** (Convert tip `77eb576b` / work `d1de17be` Â· `CONVERT_TIP_1_0_21_OK`)  
**CWL tip:** **1.0.21**

### Closed

ALWAYS mirrors + pin floor â‰¥ 1.0.21; gold 31; no faÃ§ades.

---

## 2026-08-11 â€” secure-tip-1.0.21

**To:** secure  
**Priority:** P1  
**Status:** **done** (Secure tip `970e160` / work `a159514` Â· `SECURE_TIP_1_0_21_OK`)  
**CWL tip:** **1.0.21**

### Closed

Pin â†’ 1.0.21; bridge/cutover/live-match/DNA core OK. Soak remains ops.

---

## 2026-08-11 â€” convert-tip-1.0.20

**To:** convert  
**Priority:** P0  
**Status:** **done** (Convert tip `fa254370` / work `cefd7a15` Â· `CONVERT_TIP_1_0_20_OK`)  
**CWL tip:** **1.0.20**

### Closed

ALWAYS mirrors + pin floor â‰¥ 1.0.20; gold 30; simulate stubs kept; no faÃ§ades.

---

## 2026-08-11 â€” secure-tip-1.0.20

**To:** secure  
**Priority:** P1  
**Status:** **done** (Secure tip `bb083a8` / work `b06f773` Â· `SECURE_TIP_1_0_20_OK`)  
**CWL tip:** **1.0.20**

### Closed

Pin â†’ 1.0.20; bridge/cutover/live-match/DNA core OK. Soak remains ops.

---

## 2026-08-11 â€” convert-tip-1.0.19

**To:** convert  
**Priority:** P0  
**Status:** **done** (Convert tip `4ed7468a` / work `3182f87f` Â· `CONVERT_TIP_1_0_19_OK`)  
**CWL tip:** **1.0.19**

### Closed

ALWAYS mirrors + pin floor â‰¥ 1.0.19; golds 27â€“29; no faÃ§ades.

---

## 2026-08-11 â€” secure-tip-1.0.19

**To:** secure  
**Priority:** P1  
**Status:** **done** (Secure tip `cc770d3` / work `659bf87` Â· `SECURE_TIP_1_0_19_OK`)  
**CWL tip:** **1.0.19**

### Closed

Pin â†’ 1.0.19; bridge/cutover/live-match/DNA core OK. Soak remains ops.

---

## 2026-08-11 â€” convert-tip-1.0.18

**To:** convert  
**Priority:** P0  
**Status:** **done** (Convert tip `e7e7c7f2` / work `766c473f` Â· `CONVERT_TIP_1_0_18_OK`)  
**CWL tip:** **1.0.18**

### Closed

ALWAYS mirrors + pin floor â‰¥ 1.0.18; ingest matrix / gravity OK. No faÃ§ades.

---

## 2026-08-11 â€” secure-tip-1.0.18

**To:** secure  
**Priority:** P1  
**Status:** **done** (Secure tip `db7309f` / work `76309e5` Â· `SECURE_TIP_1_0_18_OK`)  
**CWL tip:** **1.0.18**

### Closed

Pin â†’ tip 1.0.18; bridge/cutover/live-match/DNA core OK. Soak remains ops.

---

## 2026-08-11 â€” convert-runtime-lockfile

**To:** convert  
**Priority:** P1  
**Status:** **done** (Convert tip `ca3c06de` / OUTBOX stamp `d9d99e70` Â· `CONVERT_RUNTIME_LOCKFILE_OK`)  
**CWL tip:** **1.0.17**  
**CWL SHA:** `b176e04`

### Closed

Convert `.pnpmfile.cjs` + junction link scripts; recursive runtime/emit build exit 0 from Convert workspace.

---

## 2026-08-11 â€” convert-public-claim

**To:** convert  
**Priority:** P0  
**Status:** **done** (tip `3c6a62e3` / work `e9133baf` Â· `PUBLIC_CLAIM_OK`)  
**CWL tip:** **1.0.17**

### Closed

Public claim smoke/gate; honest gaps listed (visibility, BFG, brand CTA, EXTFMAP, counsel).  
**Convert agent invent queue exhausted** â€” next Convert build needs operator EXTFMAP or a new charter.

---

## 2026-08-11 â€” convert-oss-scrub

**To:** convert  
**Priority:** P0  
**Status:** **done** (tip `f486a0be` / work `74db4b0c` Â· `OSS_SCRUB_OK`)  
**CWL tip:** **1.0.17**

### Closed

G10109 OSS scrub smoke hardened with `OSS_SCRUB_OK`.

---

## 2026-08-11 â€” secure-static-smoke-pack

**To:** secure  
**Priority:** P1  
**Status:** **done** (tip `60b875c` / work `6c15fc8` Â· `STATIC_SMOKE_OK`)  
**CWL tip:** **1.0.17**

### Closed

Static DNA learn/collapse JS+CSS + deny; in gce-smoke.  
**Fleet idle** â€” Secure agent pack exhausted; customer soak = operator.

---

## 2026-08-11 â€” secure-schema-drift-pack

**To:** secure  
**Priority:** P1  
**Status:** **done** (tip `a6fca96` / work `7c53afd` Â· `SCHEMA_DRIFT_SMOKE_OK`)  
**CWL tip:** **1.0.17**

### Closed

Schema-drift unit/fixture/enforce/shadow deepen; in gce-smoke.

---

## 2026-08-11 â€” convert-pilot-kit

**To:** convert  
**Priority:** P0  
**Status:** **done** (tip `098efbd1` / work `1c40bd30` Â· `PILOT_KIT_OK`)  
**CWL tip:** **1.0.17**

### Closed

Cursor Pilot Kit 15-min path + packaging smoke.

---

## 2026-08-11 â€” convert-nest-di-honesty

**To:** convert  
**Priority:** P0  
**Status:** **done** (tip `1f85dcc1` / work `dce503bb` Â· G10136 `NEST_DI_HONESTY_OK`)  
**CWL tip:** **1.0.17**

### Closed

Nest DI honesty catalog + smoke; refuse DI runtime 20/20; nestjs route-surface gold held.

---

## 2026-08-11 â€” convert-l1-polka-honesty

**To:** convert  
**Priority:** P0  
**Status:** **done** (tip `568e76c4` / work `6a666d7f` Â· G10135 `POLKA_HONESTY_OK`)  
**CWL tip:** **1.0.17**

### Closed

Polka honesty catalog + smoke; pass-through ceiling held.

---

## 2026-08-11 â€” secure-sign-fixture

**To:** secure  
**Priority:** P1  
**Status:** **done** (tip `a75255b` / work `03c3b14` Â· `SIGN_FIXTURE_OK`)  
**CWL tip:** **1.0.17**

### Closed

Signed promote ok / unsigned reject; SIGN_SMOKE + ED25519 covered.

---

## 2026-08-11 â€” secure-gce-smoke-pack

**To:** secure  
**Priority:** P1  
**Status:** **done** (tip `3c2c154` / work `ca0d379` Â· `GCE_SMOKE_OK`)  
**CWL tip:** **1.0.17**

### Closed

soak/siem/reload fixtures wired into `gce-smoke.mjs`; win32 green.

---

## 2026-08-11 â€” convert-l1-restify-honesty

**To:** convert  
**Priority:** P0  
**Status:** **done** (tip `56d0b585` / work `315b812e` Â· G10134 `RESTIFY_HONESTY_OK`)  
**CWL tip:** **1.0.17**

### Closed

Restify honesty catalog + smoke; pass-through ceiling held.

---

## 2026-08-11 â€” secure-reload-fixture

**To:** secure  
**Priority:** P1  
**Status:** **done** (tip `28b8971` / work `76dcb58` Â· `RELOAD_FIXTURE_OK`)  
**CWL tip:** **1.0.17**

### Closed

Hot reload fixture: denyâ†’promoteâ†’`POST /__helix/reload`â†’allow same PID.

---

## 2026-08-11 â€” convert-l1-elysia-honesty

**To:** convert  
**Priority:** P0  
**Status:** **done** (tip `82c3f8a3` / work `f1845ed6` Â· G10133 `ELYSIA_HONESTY_OK`)  
**CWL tip:** **1.0.17**

### Closed

Elysia honesty catalog + smoke; empty-lifecycle ceiling held.

---

## 2026-08-11 â€” convert-l1-koa-honesty

**To:** convert  
**Priority:** P0  
**Status:** **done** (tip `7a7c2198` / work `aea4abb2` Â· G10132 `KOA_HONESTY_OK`)  
**CWL tip:** **1.0.17**

### Closed

Koa honesty residual catalog + smoke; G9959/G10005 ceiling held.

---

## 2026-08-11 â€” secure-cutover-multihost

**To:** secure  
**Priority:** P1  
**Status:** **done** (tip `ce853ff` / work `72b2e16` Â· `CUTOVER_MULTIHOST_OK`)  
**CWL tip:** **1.0.17**

### Closed

Non-`default` host=`api` cutover profile prove; CUTOVER_SMOKE_OK.

---

## 2026-08-11 â€” secure-siem-fixture

**To:** secure  
**Priority:** P1  
**Status:** **done** (tip `9af2c0e` / work `7a04388` Â· `SIEM_FIXTURE_OK`)  
**CWL tip:** **1.0.17**

### Closed

Generic SIEM_LOG file sink smoke (shadow + enforce); no vendor invent.

---

## 2026-08-11 â€” convert-l1-honest-peels

**To:** convert  
**Priority:** P0  
**Status:** **done** (tip `f455ed7b` / work `245ea296` Â· G10131 Hono `HONO_HONESTY_OK`)  
**CWL tip:** **1.0.17**

### Closed

Hono L1 honesty peel; refuse middleware/RPC/JSX 20/20.

---

## 2026-08-11 â€” secure-mode-a-failclosed

**To:** secure  
**Priority:** P1  
**Status:** **done** (tip `d6cd4ae` / work `a7c2976` Â· `MODE_A_FAILCLOSED_OK`)  
**CWL tip:** **1.0.17**

### Closed

Mode A divert DNA + Helix-down fail-closed + teardown; GCE `NFT_SMOKE_OK` / `GCE_SYNC_OK`.

---

## 2026-08-11 â€” convert-rails-filters-honesty

**To:** convert  
**Priority:** P0  
**Status:** **done** (Convert OUTBOX Â· tip `b3e2ae02` / work `e00600c5` Â· G10130 `RAILS_FILTERS_HONESTY_OK`)  
**CWL tip:** **1.0.17**

### Closed

Rails filters/resources honesty catalog; G10115 remains sole Rails ST gold.

---

## 2026-08-11 â€” convert-flutter-honesty

**To:** convert  
**Priority:** P0  
**Status:** **done** (Convert OUTBOX Â· tip `397a0deb` / work `d727f976` Â· G10129 `FLUTTER_HONESTY_OK`)  
**CWL tip:** **1.0.17**

### Closed

Flutter residual catalog + `hub:flutter-honesty-smoke`; Shelf remains sole Dart ST gold.

---

## 2026-08-11 â€” convert-liveview-honesty

**To:** convert  
**Priority:** P0  
**Status:** **done** (Convert OUTBOX Â· SHA `588dfd34` / `3d5a8ade` Â· G10128 `LIVEVIEW_HONESTY_OK`)  
**CWL tip:** **1.0.17**

### Closed

Phoenix LiveView honesty residual catalog + `hub:phoenix-liveview-honesty-smoke`; refuse full runtime 20/20 force-close.

---

## 2026-08-11 â€” secure-mode-a-failclosed

**To:** secure  
**Priority:** P1  
**Status:** **open**  
**CWL tip:** **1.0.17**

### Ask

Mode A host-redirect **fail-closed** deepen (mirror Mode B L2 FAILCLOSED/TEARDOWN tokens):

1. Extend nft/host-redirect smoke: divert on + Helix down â†’ no silent allow  
2. Teardown divert â†’ path restored  
3. Win32 = honest SKIP; GCE Linux green if reachable  
4. Docs: INSTALL-MODE-A / GCE as needed  
5. Reply `SECURE_MODE_A_FAILCLOSED` + SHA  

### Do not

- Fake soak traffic  
- Delete GCE VMs  
- Edit CWL/Convert  

---

## 2026-08-11 â€” secure-soak-preflight

**To:** secure  
**Priority:** P1  
**Status:** **done** (Secure OUTBOX Â· tip `ba3c886` / work `92f80d8` Â· `SOAK_PREFLIGHT_OK`)  
**CWL tip:** **1.0.17**

### Closed

Fixture learnâ†’reportâ†’promoteâ†’shadowâ†’ready preflight; dirty fail / clean ok; SOAK.md operator path.

---

## 2026-08-11 â€” secure-mode-b-phase2

**To:** secure  
**Priority:** P1  
**Status:** **done** (Secure OUTBOX `SECURE_MODE_B_P2` Â· tip `d26c10a` / work `9bc2cd9`)  
**CWL tip:** **1.0.17**

### Closed

Mode B Phase 2 dual-iface lab + GCE `BRIDGE_L2_P2_*` + `GCE_SYNC_OK`; win32 honest SKIP.

---

## 2026-08-11 â€” secure-fleet-standby

**To:** secure  
**Priority:** P2  
**Status:** **done** (Secure OUTBOX `SECURE_STANDBY` Â· SHA `191cd19` / `9250541`)  
**CWL tip:** **1.0.17**

### Closed

Heartbeat waiting Â· no Phase 2/soak invent. Fleet idle declared.

---

## 2026-08-11 â€” secure-gce-l2-prove

**To:** secure  
**Priority:** P1  
**Status:** **done** (Secure OUTBOX `SECURE_NEXT` Â· SHA `6c2d624` / `95fbd21`)  
**CWL tip:** **1.0.17**

### Closed

`BRIDGE_L2_*` + `GCE_SYNC_OK` on agenticop-master; `gce-sync` packs sibling CWL + `@agenticop-io/cwl` link.

---

## 2026-08-11 â€” convert-fleet-standby

**To:** convert  
**Priority:** P2  
**Status:** **done** (Convert OUTBOX `CONVERT_STANDBY` Â· SHA `8355f992` / `50b6baca`)  
**CWL tip:** **1.0.17**

### Closed

Standby heartbeat waiting Â· no invent Â· EXTFMAP operator-only. Fleet idle declared.

---

## 2026-08-11 â€” convert-dual-primary-extfmap (honesty done)

**To:** convert  
**Priority:** P0  
**Status:** **done** for honesty gate (Convert OUTBOX `CONVERT_DUAL_PRIMARY` Â· SHA `af72d8ae` / `01ea3870`)  
**CWL tip:** **1.0.17**

### Closed (agent)

G10127 `EXTFMAP_RESIDUAL_HONEST_OK` â€” statusâ†”drop, sole open P0=`copy:EXTFMAP`, refuse force-close.

### Still open (operator)

Licensed EXTFMAP drop **or** `CHRYSALIS_EXTFMAP_ABSENT=1` after ZD&T hunt â€” no invent / no ABSENT without hunt.

---

## 2026-08-11 â€” mode-b-l2-deepen (charter closed)

**To:** secure  
**Priority:** P1  
**Status:** **done** (Secure OUTBOX `SECURE_DEEPEN` Â· SHA `8f64f13`)  
**CWL tip:** **1.0.17**

### Closed

Mode B L2 Phase 1 deepen â€” nft divert Â· DNA via divert Â· Helix-down fail-closed Â· divert teardown. No CWL invent.

---

## 2026-08-10 â€” sync-convert-execute

**To:** convert  
**Priority:** P0  
**Status:** **done** (Convert OUTBOX `CONVERT_SYNC` Â· SHA `bc7d43e2`)  
**CWL tip:** **1.0.17**

### Closed

Phase 2 smokes green Â· Phase 3 **A** COBOL (G10124 COPY REPLACING) Â· EXTFMAP remains honest sole P0.

---

## 2026-08-10 â€” sync-secure-tip-wrap

**To:** secure  
**Priority:** P1  
**Status:** **done** (Secure OUTBOX `SECURE_SYNC` Â· SHA `bf399ac` / `177dce0`)  
**CWL tip:** **1.0.17**

### Closed

Pin `^1.0.17` Â· `pathTemplateShapeEqual` thin-wrap from dna-seed Â· bridge/cutover/live-match smokes.
