# CWL language changelog

## 1.0.84 - 2026-10-06

- Page form multipart (RFC-0041): `form … enctype multipart` + `field … "file"`
- Gold `93-page-form-multipart`. Upload UI as document facts; no upload middleware invent

## 1.0.83 - 2026-10-06

- Progressive asset integrity (RFC-0040): `script` / `style` may declare `integrity`, optional `module`, optional `crossorigin`
- Gold `92-asset-integrity`. Named assets deepen DNA; no JS/CSS runtime invent

## 1.0.82 - 2026-10-06

- DNA identity (RFC-0039): `replaces`, `from peel … at …`, `capability`, `works without client` — genes other web languages lack
- Gold `91-dna-identity`. Facts for Convert/Secure; no runtime invent

## 1.0.81 - 2026-10-06

- RFC-0038 framework façade residuals: Nest DI, LiveView, Flutter, middleware onion, raw SQL — catalogued, never invented
- Gold `90-framework-residuals`. Convert peels / Secure soak / EXTFMAP stay sibling or operator

## 1.0.80 - 2026-10-06

- Public agenticop.io genome drops “honest holes” slogans; leads with verify dispose and no façades
- Tip copy bump on the marketing site. Complete-site contract unchanged (no route `hole` statements to fill)
- Language `hole reason;` gene kept for peels and syntax docs — not a marketing slogan

## 1.0.79 - 2026-10-06

- `stream websocket;` duplex surface (RFC-0035). Gold `87`. Residual stays `unsupported:websocket`
- `job.enqueue` / `job.enqueue name <id>` background intent (RFC-0036). Gold `88`. Host owns the queue
- Broader island events `input` / `focus` / `blur` / `keydown` (RFC-0037). Gold `89`. No hydration invent

## 1.0.78 - 2026-10-05

- Complete CWL marketing site: `year 2026;` literal, checkbox menu + owned CSS (no host drawer/device JS), emit freeze, deploy stays ops
- Gold `86-site-complete`. Token `CWL_SITE_COMPLETE_OK`. Contract [`docs/language/CWL-SITE-COMPLETE.md`](./docs/language/CWL-SITE-COMPLETE.md)
- AgenticOps genome drops `year host`, `device host`, and `drawer` statements

## 1.0.77 - 2026-10-05

- Owned font faces for agenticop.io: layout `style "/fonts.css"`, latin woff2 under `fixtures/sites/agenticop-io/assets/fonts/`. Google Fonts CDN removed from the genome
- `emit:site` copies CSS `url(/…)` face files. Gold `85-site-owned-fonts`. Token `CWL_SITE_100_OK`
- Live Firebase CLI remains ops. Site lane deploys; CWL does not

## 1.0.76 - 2026-10-05

- Site 100% contract for agenticop.io: certified `emit:site` freeze, asset bytes under `fixtures/sites/agenticop-io/assets/`, year/device/drawer as host effects, off-site fonts and live Firebase CLI named outside
- Gold `84-site-100-contract`. Token `CWL_SITE_100_OK`
- `cwl-db.mjs` added to `sync-to-convert` ALWAYS so Convert does not keep a hand copy

## 1.0.75 - 2026-10-05

- The host emits a static Hosting site from a `.cwl` module. `year host` and `device host` are filled by the host pass. CSS and image bytes stay host files
- `npm run emit:site` writes the pages. `npm run deploy:demo` publishes only `agenticop-cwl-demo` and refuses live `agenticops` / `agenticop-io`. No Cloud Function
- Gold `83-host-site-emit`. The AgenticOps genome emits 26 pages the same way

## 1.0.74 - 2026-10-04

- `engine` names sqlite, postgres, mysql, mariadb, sqlserver, or oracle. `table` and `db select` / `insert` / `update` / `delete` are the same bound operations on each. Request values stay parameters
- Gold `82-database`. SQLite executes the module. The other engines compile that insert without pasting the title into SQL. An unknown engine does not run. Update and delete require `where`

## 1.0.73 - 2026-10-03

- Dynamic HTML emit builds the document from the page, the request, and host data. The HTML is not frozen when the module is written
- `repeat` writes one fragment per host row, including one nested list and `else html` when the collection is empty. `if` chooses another document for `==`, `!=`, `!`, `&&`, and `||` against the request or that data
- Gold `81-dynamic-site`. CWL does not query a database. `--data data.json` is the host bag. Load collections that are not in that bag stay empty

## 1.0.72 - 2026-10-03

- A CWL module can answer HTTP itself. `node scripts/cwl-live.mjs <file.cwl>` composes each page from the source on that request
- Declared `param` and `query` names in the page HTML are filled from the request and escaped. `year host` stays `<!-- cwl:year -->` until the live host passes a year. The device token is not evaluated
- Gold `80-live-document`. An unknown path returns the module's `/404.html` document with status 404. Load collections and repeats stay on the WebIR simulator

## 1.0.71 - 2026-10-03

- RFC-0029 deepen: `meta keywords`, `icon`, `alternate`, `preconnect`, a page `style`, and `jsonld` fill the remaining head markers
- Gold `79-site-head-rest`. An unknown icon, a non-URL alternate or preconnect, JSON that is not JSON, and JSON that closes the script tag are not written. Schema.org is not interpreted
- The public site genome names those facts on the pages that have them. Apple touch icons stay off the pages that do not declare them

## 1.0.70 - 2026-10-02

- RFC-0029 deepen: `meta robots`, `meta author`, `meta theme`, `meta og`, and `meta twitter` fill `<!-- cwl:meta -->`
- Gold `78-site-social`. A non-URL card image is `cwl:meta-not-url` and is not written. JSON-LD stays in `head html`
- The public site genome names the social card on the pages that have one

## 1.0.69 - 2026-10-02

- RFC-0029 deepen: `charset utf-8`, `viewport device`, `title`, `description`, and `canonical` fill document markers
- Gold `77-site-document`. The viewport meta is a fixed content string. CWL does not evaluate it. A non-URL canonical is `cwl:canonical-not-url` and is not written
- The public site genome names those facts. Open Graph, Twitter, and JSON-LD stay in `head html`

## 1.0.68 - 2026-10-02

- RFC-0029 deepen: `device host <a> <b> below <px>` names the viewport cut. `<!-- cwl:device -->` stays
- Gold `76-site-device-below`. CWL does not call `matchMedia` or write either class
- The public site genome declares `below 820`

## Site genome - 2026-10-02

- `fixtures/sites/agenticop-io/site.cwl` is the source of the 26 public AgenticOps pages
- The shell names the stylesheet, the logo, the Firebase public root, the year token, and the device token. `drawer` is the menu. The module does not load `ao-layout.js`
- `npm run smoke:agenticop-site`. Tip stays **1.0.67**. CWL still does not read the clock, parse CSS, read image bytes, or deploy

## 1.0.67 - 2026-10-01

- RFC-0029 deepen: `script` fills `<!-- cwl:script -->`. `form` / `field` / `submit` fill `<!-- cwl:form <id> -->` for a same-site action. `link` may say `target blank` and `rel`
- Gold `75-site-page`. CWL does not parse or run the script file. An off-site form action is `unsupported:offsite-form`
- A missing slot is `cwl:missing-script-slot` or `cwl:missing-form-slot`

## Goal - 2026-10-01

- CWL is the DNA of web languages. It is a language in its own right. It must be able to replace any web page
- The page's source is CWL. Emit produces that page. A behavior that cannot yet be said stays a named hole
- Tip stays **1.0.66**. Golds `68`–`74` replace a document shell. They do not yet replace every web page
- No grammar change

## 1.0.66 - 2026-10-01

- RFC-0029 deepen: `style` fills `<!-- cwl:style -->`. `image` fills `<!-- cwl:image <id> -->`. `host firebase` names the Hosting target, public directory, and error document
- Gold `74-site-assets`. CWL does not parse CSS, read image bytes, or deploy
- A missing slot is `cwl:missing-style-slot` or `cwl:missing-image-slot`

## 1.0.65 - 2026-10-01

- RFC-0029 deepen: `drawer` is the menu toggle (click, Escape, link). `device host` keeps `<!-- cwl:device -->`. `links <name>` is a separate list for footer columns
- Gold `73-site-shell-behavior`. CWL does not read the viewport or the user agent
- CSS, images, and Firebase Hosting stay outside the language

## 1.0.64 - 2026-10-01

- RFC-0029 deepen: `link <id> "<href>" "<label>";` is the shared nav. `<!-- cwl:links <base> <active> -->` expands every copy
- Gold `72-site-nav-links`; a row `class` replaces the base class; no slot is `cwl:missing-links-slot`
- The Menu control is document text. Opening the drawer and `data-ao-device` stay `unsupported:opaque-script`

## 1.0.63 - 2026-10-01

- RFC-0029 deepen: `year host;` names the host calendar year. `<!-- cwl:year -->` stays in the document
- Gold `71-site-year`; a declaration with no token is `cwl:missing-year-slot`
- CWL does not read the clock. The menu toggle and the mobile/desktop switch stay `unsupported:opaque-script`

## 1.0.62 - 2026-10-01

- RFC-0029 deepen: `nav <id>;` marks a shared nav id while the page keeps its own decl name
- Gold `70-site-nav-id`; header and footer use the same id
- A page with no `nav` still uses its decl name (gold `69`)
- Menu script, CSS, images, and Firebase Hosting stay outside the language

## 1.0.61 - 2026-10-01

- RFC-0029 deepen: per-page `head html`, `<!-- cwl:page -->`, and `<!-- cwl:active <page> <class> -->` on a shared shell
- Gold `69-site-shell`; a head with no slot is `cwl:missing-head-slot`
- Menu script, CSS, images, and Firebase Hosting stay outside the language

## 1.0.60 - 2026-09-30

- RFC-0029 deepen: multi-line `return html """` / `chrome html """` so a real document can be a page
- Gold `68-site-document`; `<!-- cwl:body -->` is the shell slot; gold 36 prefix chrome stays
- CSS, browser script, images, and Firebase Hosting stay outside the language

## 1.0.59 - 2026-09-30

- RFC-0020 deepen: `cache.no-cache` — a cache may store the response but must revalidate before reuse
- Gold `67-cache-no-cache`; composes with `cache.private`
- `cache.no-store` stays the stronger refusal. Host sets the header — no CDN invent

## 1.0.58 - 2026-09-30

- RFC-0020 deepen: `cache.no-store` — nothing may store the response
- Gold `66-cache-no-store`; composes with `cache.private`
- Host sets the header — no CDN invent

## 1.0.57 - 2026-09-30

- RFC-0006 deepen: `redirect "/path"` for a same-site path (optional status 301/302/303/307/308)
- Gold `65-redirect-same-origin`; off-site targets are `unsupported:open-redirect`
- `status` plus `response-header location` (gold `14`) stays valid
- Language runtime treats `__cwl_cookie_purpose` as a declaration so gold `04` still executes
- Ingest goldens `22` and `46` record named effect args (`origin`, `cookie`)

## 1.0.56 - 2026-09-26

- RFC-0034: cookie purpose — session, csrf, or an enumerated preference
- Gold `64-cookie-purpose`; bare cookie names and `samesite none` are `unsupported:tracking-cookie`
- Cookie values stay out of CWL; session and csrf names are not spliced into HTML

## 1.0.55 - 2026-09-26

- RFC-0020 deepen: `cache.private` — Cache-Control private intent
- Gold `63-cache-private`; composes with `cache.max-age`
- Host sets the header — no CDN invent

## 1.0.54 - 2026-09-26

- RFC-0020 deepen: `session.read cookie <name>` / `session.write cookie <name>`
- Gold `62-session-access-cookie`; bare forms unchanged
- Cookie name only — never a token value

## 1.0.53 - 2026-09-26

- RFC-0020 deepen: `cors.allow credentials` (composes with origin and methods)
- Gold `61-cors-allow-credentials`; bare / origin-only / methods-only forms unchanged
- Host sets Access-Control-Allow-Credentials — no CORS engine invent

## 1.0.52 - 2026-09-26

- RFC-0020 deepen: `io host <name>` — logical host only
- Gold `60-io-host`; bare `io` unchanged
- Transfer stays host-side — no HTTP client invent

## 1.0.51 - 2026-09-22

- RFC-0020 deepen: `cache.max-age <seconds>` — Cache-Control max-age intent
- Gold `59-cache-max-age`; host sets headers — no CDN / cache engine invent

## 1.0.50 - 2026-09-22

- RFC-0020 deepen: `cors.allow methods GET POST …` and `cors.allow origin <url> methods …`
- Gold `58-cors-allow-methods`; bare / origin-only forms unchanged
- Host enforces CORS — no invented CORS engine

## 1.0.49 - 2026-09-22

- RFC-0020 deepen: `mail.send template <name>` — host-owned template name only
- Gold `57-mail-send-template`; bare `mail.send` unchanged
- No SMTP / message-body invent

## 1.0.48 - 2026-09-22

- RFC-0020 deepen: `db.read table <name>` / `db.write table <name>` — logical table only (no SQL invent)
- Gold `56-db-table-name`; bare `db.read`/`db.write` unchanged
- Tagged `cwl-v1.0.47`
## 1.0.47 - 2026-09-22

- RFC-0007 deepen: `auth.require cookie <name>` — session cookie name only (never a token value)
- Gold `55-auth-require-cookie`; bare `auth.require` unchanged (sessionRead path)
- Tagged `cwl-v1.0.46` for sibling CI; Convert/Secure tip-1.0.46 pins closed
## 1.0.46 - 2026-09-19

- RFC-0020 deepen: `csrf.verify cookie <name>` — CSRF cookie name only (never a token value)
- Gold `54-csrf-verify-cookie`; bare `csrf.verify` unchanged
## 1.0.45 - 2026-09-19

- RFC-0020 deepen: `rate.limit rpm <n>` — named requests-per-minute budget
- Gold `53-rate-limit-rpm`; bare `rate.limit` unchanged
- Host enforces; CWL does not invent a limiter runtime
## 1.0.44 - 2026-09-19

- RFC-0020 deepen: `cors.allow origin <url>` — named CORS origin (bare `cors.allow` still `*`)
- Gold `52-cors-allow-origin`; gold `22` unchanged
- Origin lowers as named arg on `__cwl_middleware_cors`; emit reverses exactly
## 1.0.43 - 2026-09-19

- RFC-0032 deepen: session cookie policy attrs - `httponly`, `secure`, `path /...`, `samesite lax|strict|none`
- Gold `51-session-cookie-attrs`; gold `46` (name-only) unchanged
- Attrs lower as `__object_literal` arg on mint/revoke; token values stay forbidden
- Package lib stages `hub-cwl-effects.mjs` (parser dependency)
## 1.0.42 - 2026-09-19

- RFC-0031 composition: nested repeat + `if`/`else` on outer and inner (gold `50`)
- No new grammar - proves tips `1.0.39`-`1.0.41` compose; golds `40`/`41`/`47`-`49` unchanged
- RFC-0031 deepen queue for declared repeat surface: **closed** (WebSocket / sort / multi-level nest stay non-goals)
## 1.0.41 - 2026-09-19

- RFC-0031 deepen: one-level nested repeats - `repeat outerItem.field as inner html "..."`
- Gold `49-html-repeat-nested`; golds `40`/`41`/`47`/`48` unchanged
- Outer item template interpolates the leaf (`towers`); iterable is `param`->`member`; emit reverses both statements
- Deeper nests (`a.b.c`) -> `hole cwl:invalid-html-repeat-nested` - sorting/pagination still non-goals

## 1.0.40 — 2026-09-19

- RFC-0031 deepen: `repeat … html "…" else html "…"` — empty-collection markup
- Gold `48-html-repeat-else`; golds `40`/`41`/`47` unchanged
- `empty` lowers as named `__cwl_html_repeat` arg (literal `html.template`); emit reverses `else` exactly
- Works with or without `if` filter; inventing empty-state copy when omitted stays forbidden

## 1.0.39 — 2026-09-19

- RFC-0031 deepen: `repeat coll as item if item.field html "…"` — truthy item-field filter inside repeats
- Gold `47-html-repeat-if`; bare/field repeats (`40`/`41`) unchanged
- `when` lowers as third `__cwl_html_repeat` arg (member chain); emit reverses `if` exactly
- Invalid `if` (not rooted on item) → `hole cwl:invalid-html-repeat-if`

## 1.0.38 — 2026-09-19

- RFC-0032 deepen: `session.mint cookie <name>` / `session.revoke cookie <name>` — genome names the cookie, never the token value
- Gold `46-session-cookie-name` + emit-check; bare `session.mint` (gold `42`) still valid
- Emit `holeCount` now counts attachment holes (gold `36` aligns with Convert's fat counter)
- LSP snippets for the cookie forms; Secure can honor genome cookie names against `set_cookie_names`

## 1.0.37 — 2026-09-16

- Fix: parameterized hole reasons resolve to their catalog entry, so authors get the explanation instead of "not in the language hole catalog"
- Catalog entries marked `param`: `cwl:unknown-proxy-param`, `cwl:param-not-in-path`, `cwl:unknown-component`, `cwl:emit:unsupported-call`
- Prefix resolution applies **only** to `param` entries — `hub-cwl:upstream-proxy:extra` stays uncatalogued
- Hole-catalog gate now asserts both directions of that resolution

### Runtime follow-up (2026-09-19, tip unchanged)

- `@chrysalis/runtime-cwl`: `CwlRuntimeConfig.upstream` → `simulateHandler(..., upstream)` so RFC-0033 forwards can run when the host injects transport
- Default still `DEFAULT_STUB_UPSTREAM` (501 inconclusive — no invented body)
- ALWAYS sync adds `cwl-html-template.mjs` + `cwl-emit-ui.mjs` for Convert tip-sync

## 1.0.36 — 2026-09-16

- RFC-0033 deepen: `proxy upstream` targets may reuse the route's path params (`…/device/:id/status`)
- Target params lower to `data.requestField` path reads (`cwl:proxy-path-param`) — real dependencies, not text
- A `:name` the route's path does not declare holes out as `cwl:unknown-proxy-param:<name>`; never guessed
- Gold `45-proxy-upstream-params` + emit-check case: params come back as `param …;` next to the statement
- Fix (`1.0.34` latent): a rejected proxy target now records an attachment hole, so the hole round-trips print→reparse
- Still forbidden: query / header / body values in the target, body rewriting, upstream pools

## 1.0.35 — 2026-09-16

- Catalog precision after RFC-0033: `hub-cwl:keypair-gen` (host keypair) and `hub-cwl:binary-render` (host bytes)
- Keypair / QR / config-blob residuals stop borrowing `hub-cwl:upstream-proxy`, which now means transfer mechanics only
- Gold `44-host-bytes-holes` + emit-check case: a hole body keeps its declared `content-type` through WebIR and back
- Cinderpath working note re-filed onto the narrow reasons
- No grammar change; still forbidden: crypto or image encoders in CWL

## 1.0.34 — 2026-09-16

- RFC-0033 `proxy upstream "<url>";` — a forwarded route now names its destination in the genome
- Lowers to `__cwl_effect_upstream_proxy(<literal>)` with `cwl:proxy-upstream` provenance; emit reverse reads the target back verbatim
- Gold `43-proxy-upstream` (hole-free) + emit-check case; catalog `cwl:invalid-proxy-upstream` + `cwl:emit:proxy-target`
- `hub-cwl:upstream-proxy` narrowed: destination is expressible, transfer mechanics (TLS, hop headers, retries, tunnels) stay host-owned
- Still forbidden: body/path rewriting, upstream pools or health checks, guessing a destination

## 1.0.33 — 2026-09-16

- RFC-0032 credential / session effects: `auth.verify`, `session.mint`, `session.revoke`
- Lower to `db.read` / `session.write` plus named `__cwl_effect_*` nodes; emit reverse recovers the tags
- Gold `42-auth-effects-v2` (login + logout, hole-free) + emit-check case; LSP presets updated
- `hub-cwl:credential-store` narrowed: intent is expressible, the store/hashing stays host-owned
- Still forbidden: hashing or session runtimes in CWL; UA regex; framework façades; WebSocket duplex invent

## 1.0.32 — 2026-09-16

- RFC-0031 deepen: item **field** access in repeats — `repeat sessions as s html "…s.user…s.site.city…"`
- Fields lower to `data.member` chains on the item `param`; emit reverse reproduces dotted text
- Hyphenated words (`item-list`) and `.`-prefixed text stay literal markup
- Gold `41-html-repeat-fields` + emit-check case; list/table fragments no longer need a host executor
- Still forbidden: UA regex; Nest / LiveView / Flutter façades; WebSocket duplex invent

## 1.0.31 — 2026-09-16

- RFC-0031 `repeat <collection> as <item> html "…";` — repeated markup is a gene, not a host fragment
- Collection name interpolates as rendered list in `return html`; item name interpolates per iteration
- WebIR `__cwl_html_repeat(iterable, itemTemplate)` with `argNames` item; emit reverse reproduces the statement
- Gold `40-html-repeat`; catalog `cwl:invalid-html-repeat` + `cwl:emit:html-repeat`; LSP/TextMate `repeat`
- `hub-cwl:html-fragment` narrowed to fragments whose bytes the host still owns
- Still forbidden: UA regex; Nest / LiveView / Flutter façades; WebSocket duplex invent

## 1.0.30 — 2026-09-15

- ALWAYS sync: `cwl-layout.mjs` (Convert ask — RFC-0029 apply lands with language mirrors)
- Package export: `@chrysalis/cwl/layout` (`composeLayoutChromeHtml` / `applyLayoutsToParsedModule`)
- Gold `39-cinderpath-holes`: catalog proof for `hub-cwl:html-fragment` / `credential-store` / `upstream-proxy`
- Still forbidden: UA regex; Nest / LiveView / Flutter façades; WebSocket duplex invent

## 1.0.29 — 2026-09-15

- Hole catalog: `hub-cwl:html-fragment`, `hub-cwl:credential-store` — declare Go residuals in the genome; do not invent auth/fragment runtimes
- Fix: apply layout chrome once after import merge (no spurious `cwl:unknown-layout` on imported pages)
- Cinderpath consume: holes named in CWL; Go remains executor only
- Still forbidden: UA regex; Nest / LiveView / Flutter façades; WebSocket duplex invent

## 1.0.28 — 2026-09-14

- Emit reverse: page-level `client ui` siblings (RFC-0030 / gold `38`) — no more `cwl:emit:multi-statement-body`
- Island events survive WebIR serialise/deserialise; cookie load emit recovers `cookie name`
- Layout chrome emit stays composed HTML phenotype (honest; no fake `layout` reconstruct)
- Still forbidden: UA regex; Nest / LiveView / Flutter façades; WebSocket duplex invent

## 1.0.27 — 2026-09-14

- RFC-0029 layout chrome wrap (`layout` + `chrome html` + page use); gold `36-layout-chrome`
- RFC-0014 deepen: cookie (+ load) identifiers in `return html`; gold `37-html-cookie-device`
- RFC-0030 page-level `client ui` sibling to `return html`; gold `38-html-page-island`
- Process note: Go/host as hole executor vs CWL as genome/renderer record ([`CWL-EXPAND.md`](./docs/history/CWL-EXPAND.md))
- Still forbidden: UA regex in CWL; Nest / LiveView / Flutter façades; WebSocket duplex invent

## Docs / ops — 2026-09-03

- Pillar GitHub repos flipped **public** (`chrysalis-cwl`, `chrysalis`, `chrysalis-security`) — see [`PRIVATE-PILLARS.md`](./docs/history/PRIVATE-PILLARS.md)
- Tip was **1.0.26** (redirect/error HTML shell + urlencoded form gold)

## 1.0.26 — 2026-08-21

- Ingest preserves authored HTML shell with `load { redirect|error }` (`cwl-load-*-html` blocks); emit recovers exact shell
- Gold `35-form-urlencoded` — native urlencoded form POST + `body` bindings
- Still forbidden: Nest / LiveView / Flutter façades; WebSocket duplex invent

## 1.0.25 — 2026-08-21

- Emit reverse: `effect.redirect` / `effect.http.error` → `load { redirect|error … }` (gold `27-data-v2` hole-free)
- HTML shell for redirect/error still not preserved at ingest (empty `return html ""` on emit)
- Still forbidden: Nest / LiveView / Flutter façades; WebSocket duplex invent

## 1.0.24 — 2026-08-21

- RFC-0022 deepen: DNA seed honesty for SSE (`content_class: other` + `cwl_stream`), multipart field/file fingerprints, HEAD identity
- Gold `34-dna-bridge-surfaces`; gate schemaVersion 4
- Emit honesty: `27-data-v2` load redirect/error remain catalogued emit holes (not forged reverse)
- Still forbidden: Nest / LiveView / Flutter façades; WebSocket duplex invent; synthetic soak traffic

## 1.0.23 — 2026-08-11

- RFC-0028 named client islands + form event contracts; gold `33-ui-island-contracts`
- WebSocket duplex kept as honest hole (no invent)
- Still forbidden: Nest / LiveView / Flutter façades; silent React/Svelte lowering

## 1.0.22 — 2026-08-11

- RFC-0027 SSE single-shot `stream sse;`; gold `32-stream-sse`
- Transport gold `29` keeps WebSocket hole only
- Still forbidden: Nest / LiveView / Flutter façades; inventing EventSource runtimes

## 1.0.21 — 2026-08-11

- RFC-0026 multipart field/file bindings; gold `31-multipart-binding`
- Transport gold `29` keeps SSE/WebSocket holes only (multipart named parts are genes)
- Still forbidden: Nest / LiveView / Flutter façades; inventing upload middleware

## 1.0.20 — 2026-08-11

- RFC-0020 deepen: executable Effects beyond session presets (`time.now`, `random`, `mail.send`, `db.read`/`db.write`, `io`, `rate.limit`)
- Gold `30-effects-executable`; emit peel recovers new effect tags
- Still forbidden: Nest / LiveView / Flutter façades; inventing mail/SQL/rate engines

## 1.0.19 — 2026-08-11

- Data v2 language gold `27-data-v2` (load redirect / error / cookie) — RFC-0013 v2
- Hyphenated `response-header` names (`Set-Cookie`) + gold `28-response-cookie`
- Catalogued transport holes SSE / WebSocket / multipart + gold `29-transport-holes`
- Still forbidden: Nest / LiveView / Flutter façades; origin PLs as CWL dialects

## 1.0.18 — 2026-08-11

- **Genome deepen reopened** (Exit 1.0.17 = bootstrap, not full web-app DNA)
- RFC-0025 nested structured object/array literals (parser/print/ingest/emit)
- Gold `26-nested-literals`; `24-dna-bridge` nested `meta` runtime JSON
- Docs: `CWL-GENOME-DEEPEN.md`, `DNA-BUILD-NEXT.md` queue

## History — 2026-08-10

- Git-backed pillar sync: `docs/pillar-sync/` in each engine (pull all three every turn; commit+push OUTBOX) — [`docs/pillar-sync/PROTOCOL.md`](./docs/pillar-sync/PROTOCOL.md)
- Convert agent execute plan Phase 2–3 — [`docs/history/CONVERT-AGENT-EXECUTE-PLAN.md`](./docs/history/CONVERT-AGENT-EXECUTE-PLAN.md)
- Convert mirrors landed `56a75d35`; dual-mode control-lower sync skip
- Convert notify: whole-system / WPTP orbit cohesion (no DNA tip bump)

## 1.0.17 — 2026-08-09

- DNA seed Helix parity: fingerprint depth ≤ 2, `pathTemplateShapeEqual`, request/query name FPs
- `24-dna-bridge` gold: nested JSON, `status`, body/query bindings
- Sync `cwl-control-lower.mjs` into Convert helper list
- RFC-0022 SoR updates; sibling tip ask → 1.0.17

## 1.0.16 — 2026-08-09

- CWL-owned DNA queue **CLOSED** — tip/doc handoff only
- Align README / EXIT / PUBLISH / ecology / fleet / starter / ROADMAP to tip
- Sibling Requested tip pin → `@agenticop-io/cwl@1.0.16`

## 1.0.15 — 2026-08-09

- UT evidence: parse `LANGUAGE_VERSION.md` table (tip fidelity)
- Gates: nested foreach on `emit-check` / `fmt --webir` (`23`)
- Diagnose `opaque-residual` info for authored `g_*`
- Packable CLI rejects WebIR commands; constitution/RFC-0021 tip sync

## 1.0.14 — 2026-08-09

- Nested foreach after `return` kept as documentation IR + thin emit reverse (`23-nested-control`)
- TextMate / language-config sync with LSP control/UI catalog; `test:cwl-grammar`
- CLI `emit-check` gated (`test:cwl-emit-check`, WebIR-aware)

## 1.0.13 — 2026-08-09

- CI: `build:webir` + `CWL_REQUIRE_WEBIR=1` language gate + emit smoke on language/publish workflows
- Catalogued thin-emit hole reasons (`cwl:emit:*`) in fullstack hole catalog
- CLI `emit-check` (CWL → WebIR → thin emit reverse report; `--stdout` optional)
- LSP snippets: `if` / `else` / `else if` / `foreach` / `return ui` / `client ui` (+ gate asserts)

## 1.0.12 — 2026-08-09

- Thin emit: HTML templates, UI trees, `client ui` islands/events (SSR), attachment-hole pages
- Emit smoke covers all language-gold (honest holes on `11` / `21`)
- `test:runtime-cwl` → language-gold gate (`CWL_RUNTIME_CWL_OK`)
- Dual-mode `cwl-fmt` (`--webir`) + `CWL_FMT_OK`

## 1.0.11 — 2026-08-09

- Thin emit: response chrome (`status` / `content-type` / `response-header`), executable effects peel, page-load
- Param/query defaults + hyphenated header idents on emit reverse
- Emit smoke matrix **15** golds → `CWL_EMIT_SMOKE_OK`

## 1.0.10 — 2026-08-09

- Thin emit Rosetta reverse: projectable early-guards / else / else-if / foreach (`cwl-emit-control.mjs`)
- `runtime-cwl`: authored content-type only (no body-sniff invent)
- Emit smoke defaults: `01` + `19` + `23`

## 1.0.9 — 2026-08-09

- RFC-0021: top-level `foreachBindings` → WebIR `data.foreach` (`appendForeachBindings`; empty-iter honesty)
- RFC-0021: projectable `else` / `else if` (incl. same-line `} else`) → `ifElse.else`
- Unshadow page early-exit HTML (`/post/:id`); gate else-if route; deeper `19` / `23` matrix

## 1.0.8 — 2026-08-09

- RFC-0021: lower projectable early-exit / nested `if` to WebIR (`cwl-control-lower.mjs`); opaque `g_*` skipped
- RFC-0024: attachment-hole soft-path in `runtime-cwl` — HTML returns while hole IR remains
- Deeper matrix checks for `19-early-exit`, `23-nested-control`, `25-island-kinds`

## 1.0.7 — 2026-08-09

- Full language-gold **runtime-ok** matrix (**25**): middleware, probes, effects chains, DNA bridge routes, holes/form-action **501**, island-kind attachment-hole **501**
- Partial surfaces documented honestly (`19` list page; `23` empty shells; no invented auth/loops)

## 1.0.6 — 2026-08-09

- Fix HTML ingest double-response wrap (single body for `@page` / `return html`)
- Execute optional: `07` auth effects, `09` fullstack page, `10` page-load, `15` HTML interp, `16` layout, `17` UI v0, `18` UI v1
- Runtime matrix **16** → `CWL_RUNTIME_MATRIX_OK`

## 1.0.5 — 2026-08-09

- Execute: JSON/urlencoded body → `RequestInput.post` (`05-request-body` runtime-ok)
- Execute: authored WebIR `content-type` on HTTP response (`08-response-content-type` runtime-ok)
- Ingest + execute: CWL `response-header` → WebIR `ResponseAttrs.headers` (`14-defaults-headers` runtime-ok)
- Runtime matrix **9** → `CWL_RUNTIME_MATRIX_OK`

## Unreleased — execute

- Pass HTTP `Headers` → rewrite `RequestInput.headers` in `runtime-cwl` `buildRequestInput`
- Mark `04-request-context` **`runtime-ok`**; runtime matrix **6** → `CWL_RUNTIME_MATRIX_OK`
- Convert rewrite-headers Requested → **Verified**

## 1.0.4 — 2026-08-09

- CLI `dna-seed` / `--holes-report` on pillar + packable `bin/cwl`
- LSP: `import "…"` sibling `.cwl` path completion
- Gate `test:cwl-hole-catalog` (`CWL_HOLE_CATALOG_OK`) in `test:language`
- CI Node 22; docs: package README + `DNA-STEP-EXECUTE` WebIR home truth

## 1.0.3 — 2026-08-09

- Package export `@chrysalis/cwl/dna-seed` (RFC-0022/0023 seed helpers for Secure)
- LSP import-graph (RFC-0009) definition / references / rename; `listCwlImportGraph`
- **CWL pillar Exit/DNA queue complete** — [`DNA-CWL-COMPLETE.md`](./docs/history/DNA-CWL-COMPLETE.md)

## 1.0.2 — 2026-08-09

- DNA bridge: RFC-0023 multi-host seed gold (`deploy-profile-api.json` / `expected-dna-api.json`)
- `loadDeployProfile` / `resolveHostFromProfile` / `cwlHolesBridgeReport` in `cwl-dna-seed.mjs`
- Gate `test:cwl-dna-bridge` → `CWL_DNA_BRIDGE_OK` (default + api host + hosts{} validation + holes report)

## 1.0.1 — 2026-08-09

- LSP polish: context-aware completion (effects presets, HTTP methods, same-file handlers/paths)
- Same-file `textDocument/references`; hover on handler name idents
- Docs: `CWL-LSP.md`; private VSIX already via `pack:cwl-vsix`
- Sibling verify: Convert WebIR reverse-home + Secure cutover done; [`CWL-LANGUAGE-SCOPE.md`](./docs/language/CWL-LANGUAGE-SCOPE.md) (DNA ≠ all PLs)

## 1.0.0 — 2026-08-09

- **Exit 1.0:** `@agenticop-io/cwl@1.0.0` **published** on GitHub Packages (tag `cwl-v1.0.0`); local name stays `@chrysalis/cwl`
- Stage `packages/cwl/lib/` from hub-ingest (`sync:cwl-package-lib`); packable `bin/cwl`
- **WebIR physical home** in `packages/webir` (Convert reverse-home still Requested)
- Ecology bootstrap: `docs/language/CWL-ECOLOGY.md` + `npm run pack:cwl-vsix`
- LSP completion + same-file rename already in stdio server (`CWL-LSP.md`)
- Docs: `EXIT-1.0.md`; Convert gravity / Secure cutover Requested at `1.0.0`

## Unreleased — thesis

- Constitution reframed: **Rosetta Stone → Universal Translator → DNA of the web** (`CWL-PILLAR-HOME.md`, `ROSETTA-UT-PATH.md`); AGENTS / cursor rule / README aligned

## Unreleased / DNA authoring

- *(cleared into 0.1.14)*

## Unreleased / execute

- DNA Execute slice: `smoke:cwl-runtime-gold` → `CWL_RUNTIME_GOLD_OK` on `fixtures/language-gold/01-literals` via `@chrysalis/runtime-cwl` + WebIR `simulateHandler` (not Convert emit)
- Runtime matrix: `smoke:cwl-runtime-matrix` → `CWL_RUNTIME_MATRIX_OK` over `runtime-ok` fixtures (`01-literals`, `02-path-params`, `03-query-params`, `06-response-status`, `12-multi-file`); allowlist in `scripts/cwl-runtime-smoke-lib.mjs` (no invented handlers)
- Wired into optional `test:language:full` (stable/fast)
- Plan/honesty: `docs/history/DNA-STEP-EXECUTE.md`

### Requested (Convert) — execute

- Keep sibling `webir` / `rewrite` / `emit-shared` dists buildable; Slice 3.4 dep retarget so pillar runtime imports need fewer resolve hooks
- **Rewrite headers:** `RequestInput.headers` + `pickBag(..., "header")` so CWL can mark `04-request-context` `runtime-ok` and matrix goes to 6 — [`docs/history/CONVERT-REWRITE-HEADERS-REQUESTED.md`](./docs/history/CONVERT-REWRITE-HEADERS-REQUESTED.md)

## 0.1.14 — 2026-08-09

- Token end columns v1: parser records exclusive keyword ends for `module`, `@route`/`@page`, `hole`
- Diagnose schema **v5**: emits `endCharacter`/`endColumn` on those cheap sites
- LSP map schema **v2**: `range.end.character` from end fields when present (else line-end `1<<20`)
- Gate: `test:cwl-lsp-map` asserts holes gold end characters are finite and `> start` (not line sentinel)
- Package exports: `@chrysalis/cwl/parser` + `@chrysalis/cwl/print` (gate extended; docs in `CWL-PUBLISH.md`)
- Package / editor / LSP server version `0.1.14`; pillars stay `"private": true`

### Requested (Convert)

- Pull `0.1.14` junctions after land; prefer package subpaths over hub-ingest deep-links

### Requested (Secure)

- Keep `file:` pin; import diagnose/lsp-map/parser/print via `@chrysalis/cwl/*` when bridging

## 0.1.13 — 2026-08-09

- Package exports: `@chrysalis/cwl/diagnose` and `@chrysalis/cwl/lsp-map` re-export hub-ingest helpers (no deep-link required)
- Gate: `test:cwl-package-exports` → `CWL_PACKAGE_EXPORTS_OK` (wired into `test:language`)
- Package / editor version `0.1.13`; pillars stay `"private": true`

### Requested (Convert)

- Pull `0.1.13` junctions after land; prefer package subpaths over `scripts/hub-ingest/cwl-diagnose.mjs` deep-links

### Requested (Secure)

- Keep `file:` pin; import diagnose/lsp-map via `@chrysalis/cwl/*` when bridging

## 0.1.12 — 2026-08-09

- Diagnostic column ranges v1: parser records 0-based keyword starts for `module`, `@route`/`@page`, `hole`; diagnose schema v4 emits `character`/`column` when cheap
- LSP map: `range.start.character` from `character`/`column` (default 0); end still line-granular (`1<<20`)
- Gate: `test:cwl-lsp-map` asserts ≥1 mapped diagnostic with `character > 0` (holes gold indent + synthetic)
- Line sites folded in: holes / duplicates / layout / module → accurate LSP lines
- Definition v0 + document symbols: `textDocument/definition` / `documentSymbol` (same-file surface); VS Code providers; server gate asserts ≥1 each
- Package / editor / LSP server version `0.1.12`; pillars stay private

### Requested (Convert)

- Pull `0.1.12` junctions after land; WebIR flip still open

### Requested (Secure)

- Keep `file:` pin; no grammar forks

## 0.1.11 — 2026-08-09

- LSP completion v0: `textDocument/completion` on `cwl-lsp-server.mjs` — keywords / surface starters (`module`, `@route`, `@page`, `@component`, `handler`, `effects`, `hole`, `return`, `load`) + common effect presets; prefix filter only (no import/path smarts)
- Gate: `test:cwl-lsp-server` asserts completion returns ≥1 item; advertise `completionProvider`
- VS Code thin client: CompletionItemProvider (`@` / `.` triggers)
- Docs: `CWL-LSP.md` honesty (completion v0 limits)
- Package / editor version `0.1.11`; pillars stay private

### Requested (Convert)

- Pull `0.1.11` junctions after land; WebIR flip still open

### Requested (Secure)

- Keep `file:` pin; no grammar forks

## 0.1.10 — 2026-08-08

- Minimal stdio Language Server: `scripts/cwl-lsp-server.mjs` (JSON-RPC `Content-Length`) — initialize/shutdown, doc sync → `publishDiagnostics` via `mapDiagnoseSource`, `textDocument/formatting` via `formatCwlSource`, cheap hover (module / route surface)
- VS Code extension: thin spawn client (zero npm deps; no `vscode-languageclient`)
- `npm run test:cwl-lsp-server` → `CWL_LSP_SERVER_OK` (wired into `test:language`)
- Docs: `CWL-LSP.md` honesty update; ROADMAP Phase 0.6 stdio LSP checkbox
- Package / editor version `0.1.10`; pillars stay private (no Marketplace)

### Requested (Convert)

- Pull `0.1.10` junctions after land; WebIR flip still open

### Requested (Secure)

- Keep `file:` pin; no grammar forks

## 0.1.9 — 2026-08-08

- **Private pillars:** GitHub `chrysalis-cwl`, `chrysalis` (Convert), `chrysalis-security` set private; docs in `PRIVATE-PILLARS.md`
- DNA authoring slice: diagnose → LSP map (`cwl-lsp-map.mjs`) + `test:cwl-lsp-map` → `CWL_LSP_MAP_OK`
- CLI: `diagnose --stdin [--lsp]`, `fmt --stdin` for editor buffers
- VS Code extension: push diagnostics + document formatting (still not Marketplace / not full LSP server)
- Private-first publish posture: Exit 1.0 defaults to private registry, not public npm
- Plan: `docs/history/DNA-EVOLUTION-0.1.9.md`

### Requested (Convert)

- WebIR physical flip still open (`WEBIR-FLIP-REQUESTED.md`); pull `0.1.9` junctions after land; repo is now **private**
- **DNA Step E:** actionable flip checklist + acceptance/prove commands in `WEBIR-FLIP-REQUESTED.md` / `DNA-STEP-E-WEBIR.md` — Convert can execute without guessing; CWL will re-run `smoke:webir` + `test:ingest` + `test:language:full` after SHA reply
- **Step G gravity:** every peel/emit lands honest CWL (no façades); consume junctions + `hub:cwl-helix-cutover-smoke` — [`CONVERT-GRAVITY-REQUESTED.md`](./docs/history/CONVERT-GRAVITY-REQUESTED.md)

### Requested (Secure)

- Keep `file:` pin; repo is now **private**; no grammar forks
- **Step G cutover default:** live DNA vs CWL surface (RFC-0022/0023); `cwl-bridge-smoke` / `cutover-smoke` — [`SECURE-CUTOVER-REQUESTED.md`](./docs/history/SECURE-CUTOVER-REQUESTED.md)

## 0.1.8 — 2026-08-07

- Boundary-break execution: ingest matrix covers all `language-gold/*/routes.cwl` with `expected-webir.json`
- RFC-0023 deploy/DNA profiles + `24-dna-bridge/deploy-profile.json`
- RFC-0024 island kinds + `25-island-kinds` + catalogued `unsupported:wasm-module|vendor-sdk|opaque-script`
- **Attachment holes:** `hole` + later `return` kept on `attachmentHoles` (parse/print/diagnose/ingest); RFC-0024 gold no longer silently drops island holes
- `test:cwl-publish-prep` → `CWL_PUBLISH_PREP_OK` (still no npm publish); wired into `test:language`; validates deploy-profile schema
- UT spine reads RFC-0023 `deploy-profile.json` when present
- VS Code scaffold (`editors/vscode`) + `docs/language/CWL-LSP.md` (honest TextMate+check limits)
- GitHub Actions `cwl-language.yml`
- WebIR flip handoff: `docs/history/WEBIR-FLIP-REQUESTED.md` (Convert agent)
- `pnpm-workspace.yaml` prepared for future `packages/webir`

## 0.1.7 — 2026-08-05

- Convert + Secure pin `@chrysalis/cwl` via `file:../chrysalis-cwl/packages/cwl`; package exports `VERSION` / `pillarRoot()`; `npm run test:cwl-pin` (wired into `test:language`)
- Phase 0.3 ingest: thin `hub-lift-cwl-webir.mjs` + WebIR helpers; `cwl-ingest` / `export-cwl-webir` use `load-webir.mjs`
- `npm run smoke:cwl-ingest` / `test:ingest` green on `01-literals` with `expected-webir.json` golden
- `test:language` unchanged (no WebIR required); optional `test:language:full` = language + ingest-roundtrip
- Phase 0.3 Slice 4: thin WebIR→CWL emit (`hub-emit-cwl-webir.mjs`) + `npm run smoke:cwl-emit` / `test:ingest-roundtrip` on `01-literals`; pillar `cwl-fmt` remains parse→print (no dual-mode)
- Phase 1.0 pin path (docs only, no npm publish): `CWL-PUBLISH.md` fleshed for Convert/Secure (`file:` / sibling / `CHRYSALIS_CWL_ROOT`); ROADMAP 1.0 honest (publish still open)
- **WebIR Slice 3:** ownership flip deferred — **link-until-pnpm** decision locked in `WEBIR-EXTRACT-PLAN.md` (2026-08-05); UT↔Helix spine is **CWL-owned** (`npm run smoke:ut-spine`), not Convert
- Ingest matrix + UT evidence pack: `smoke:cwl-ingest-matrix` (01/02/24-dna-bridge) · `smoke:ut-evidence` → `UT_EVIDENCE_OK`

## 0.1.6 — 2026-08-05

- RFC-0022 DNA surface bridge: `cwl-dna-seed.mjs` + `npm run test:cwl-dna-bridge` (seed ≡ `24-dna-bridge/expected-dna.json`)
- `test:language` now includes DNA bridge contract gate
- Phase 0.2–0.5 tooling landed in tree: convert script junctions + `test:cwl-mirrors`, pillar CLI (`cwl` / `check`), WebIR resolve link + smoke, RFC-0022 docs/fixture
- Phase 1.0 prep: `@chrysalis/cwl` package version aligned to `LANGUAGE_VERSION.md` (`0.1.6`); publish/pin path in `docs/language/CWL-PUBLISH.md` (still `private`, not published)

## 0.1.5 — 2026-08-05

- Language golds `20-probes` (RFC-0015), `21-form-action` (RFC-0016), `22-effects-middleware` (RFC-0020) — parse→print only; honest gaps documented in fixture READMEs
- Catalogued `unsupported:php-session` + `cwl:empty-handler` so `11-holes` diagnose warns drop to info
- Suite map updated in `fixtures/language-gold/README.md`
- Nested `if` / nested `foreach` stmt-list AST capture + print round-trip (RFC-0021 remaining gap; surface only — no loop evaluate); fixture `23-nested-control`

## 0.1.4 — 2026-08-05

- Fleshed out `CWL-PILLAR-HOME.md` as full constitution (Convert/Secure needs, surfaces, sync, completeness, agent SOP)
- Full phased `ROADMAP.md` (0.1 → 1.0) with exit criteria
- Expanded `fixtures/language-gold/README.md` + planned golds (0015/0016/0020)
- Added `npm run sync:convert` (`scripts/sync-to-convert.mjs`)
- Convert pointer doc expanded to match

## 0.1.3 — 2026-08-04

- Synced language parser + print into convert (`cwl-parser.mjs`, `cwl-print.mjs`)
- Documented CWL as **THE** language of the web (initial home, AGENTS, THREE_PILLARS, cursor rule)
- Convert keeps WebIR `cwl-fmt`; pillar fmt remains parse→print

## 0.1.2 — 2026-08-04

- Parser captures RFC-0021 `if` guards and `foreach` bindings
- Fixture `19-early-exit`; diagnose gate; convert `cwl-ui-tree` attr/`on` fixes

## 0.1.1 — 2026-08-04

- UI print; element attr + `on` event parser fixes; local fmt; golds through UI v1

## 0.1.0 — 2026-08-04

- Pillar bootstrap: version, golds, parse→print gate
