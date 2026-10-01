# Parent → CWL — agenticop.io cannot be rewritten in complete CWL

## 2026-09-30 — site-complete-cwl

**To:** cwl
**From:** parent (agenticop.io / `brand/agenticops-web`)
**Priority:** P1
**Status:** **done** (language, tip **1.0.62**)
**CWL tip observed:** 1.0.61
**Lane:** do this in `engines/chrysalis-cwl`. Do not invent a second HTML syntax under `brand/agenticops-web`, Convert, or Secure.

### Ask

Make it possible to author the public AgenticOps site as CWL pages. The live site stays HTML + CSS + `ao-layout.js` on Firebase until the language can hold the documents. This note is the failure list. It is not a grammar proposal.

### What was attempted

Rewrite `brand/agenticops-web` (https://agenticop.io) as complete CWL: every public route as `@page`, shared chrome once, page bodies as the real documents.

Stopped before writing a site genome. Flattening each HTML file into one quoted line would parse and would still be the current site hidden inside strings.

### Failures (language)

1. **Page HTML is one source line.** `return html` and `chrome html` are quoted literals consumed per line (`extractCwlHtmlReturnLiteral` in `scripts/hub-ingest/cwl-parser.mjs`). A document with newlines does not parse. Gold `36-layout-chrome` is the shape that works today: `return html "<main>home</main>";`.

2. **Quotes inside the document break the literal.** Live pages use `class="…"`, JSON-LD `<script type="application/ld+json">`, and other double-quoted attributes. The extractor treats `"` / `'` as the string delimiter. One-line `\"` escaping is not a way to author these files.

3. **Chrome is a prefix, not a document shell.** RFC-0029 `layout` + `chrome html` concatenates `layoutChromeHtml + body.html`. It does not provide doctype, `<head>`, a body slot, and a footer. RFC-0011 `import` still only merges routes and module presets. The site nav and footer are one shell around every page (`ao-layout.js` fills `#ao-site-nav`). Prefix-only chrome cannot express that shell.

4. **Non-goals that must stay holes.** Taxonomy and RFC-0029 already exclude CSS/asset pipelines, Firebase Hosting, and browser runtimes. Do not turn `agenticops.css`, `ao-layout.js`, `logo.svg`, or Firebase into CWL surfaces. Opaque client script stays a hole (`unsupported:opaque-script` in gold 36). After pages can hold real HTML, those URLs can remain ordinary links inside the document.

### Site that has to fit

Public HTML in `brand/agenticops-web` (Firebase `public: .`; `docs/**` and `**/*.md` are not deployed):

`index.html`, `chrysalis.html`, `convert.html`, `secure.html`, `docs.html`, `paper-cwl.html`, `paper-webir.html`, `paper-convert.html`, `paper-helix.html`, `paper-traffic.html`, `whitepaper.html`, `published.html`, `press.html`, `projects.html`, `wptp.html`, `fde.html`, `ghosts.html`, `field.html`, `hub.html`, `contact.html`, `method.html`, `about.html`, `proof.html`, `trust.html`, `services.html`, `404.html`.

Shared assets the pages reference: `/agenticops.css`, `/ao-layout.js`, `/logo.svg`.

### Acceptance

- [x] A multi-line HTML document that contains `class="…"` and a JSON-LD script block parses as a `@page` body without being collapsed to one line.
- [x] One layout can wrap that body in a shared document shell (head, header, main slot, footer). Chrome-as-prefix remains valid for gold 36.
- [x] Existing language golds still pass (`npm run build:webir` and `CWL_REQUIRE_WEBIR=1 npm run test:language`).
- [x] CSS, browser JS, images, and Firebase Hosting stay outside the language. Unsupported behavior is a `hole` reason, not a stub.
- [x] Reply in this file (or CWL `OUTBOX.md` if the fix needs Convert to emit static HTML afterward). Static emit to Firebase `public/` is Convert’s job once the grammar exists — do not invent it in the language pillar.

### CWL reply (2026-09-30)

Tip **1.0.60**, gold `68-site-document`. `return html """` … `""";` and `chrome html """` … `""";` keep newlines and quotes. `<!-- cwl:body -->` is the one slot; gold 36 prefix chrome is unchanged. The live site files were not rewritten. Convert peels and static emit to Firebase `public/` are the next ask ([`OUTBOX.md`](./OUTBOX.md) `tip-1.0.60-site-document`).

### Follow-on (2026-10-01) — shared shell still could not carry a real page

Reading the live pages after tip 1.0.60: each document has its own `<title>` and meta, `data-ao-page`, and an active nav class. One body slot cannot say those. `ao-layout.js` was filling the nav and footer at runtime.

**Status:** **done** (language, tip **1.0.61**, gold `69-site-shell`)

- `head html` fills `<!-- cwl:head -->`
- `<!-- cwl:page -->` is the page decl name
- `<!-- cwl:active <page> <class> -->` inserts that class only on the matching page
- A head with no slot is `cwl:missing-head-slot` and is left out of the response
- The menu toggle, viewport script, CSS, images, and Firebase Hosting stay outside. `unsupported:opaque-script` stays on the shell

Convert peels gold `69` and still emits static HTML. Ask: [`OUTBOX.md`](./OUTBOX.md) `tip-1.0.61-site-shell`.

### Follow-on (2026-10-01) — active class is the page name

Tip **1.0.61** was read against `brand/agenticops-web`. `head html` can carry each page's title and meta. The shell still cannot reproduce the live nav.

`ao-layout.js` sets the active link from `data-ao-page`, and many URLs share one value:

| `data-ao-page` | Routes |
| --- | --- |
| `docs` | `docs.html`, `paper-cwl.html`, `paper-webir.html`, `paper-convert.html`, `paper-helix.html`, `paper-traffic.html` |
| `projects` | `projects.html`, `wptp.html`, `fde.html`, `ghosts.html`, `field.html` |
| `about` | `about.html`, `whitepaper.html` |

`<!-- cwl:page -->` and `<!-- cwl:active <page> <class> -->` both use the page decl name (`applyCwlPageMarkers` in `scripts/hub-ingest/cwl-layout.mjs`). A page named `paper_cwl` does not light the Docs link. Giving those routes the same page name would collide. The marker stays valid when the nav id and the page name are the same (gold 69).

The same script still writes the header and footer (`#ao-site-nav`, `#ao-site-footer`), the menu drawer, the mobile/desktop switch, and the footer year. A shell that already contains that markup would be replaced at runtime. Those behaviors stay `unsupported:opaque-script`. Do not pull `ao-layout.js` into the language.

Convert has not pinned **1.0.61**. Static emit stays the open ask `tip-1.0.61-site-shell` in [`OUTBOX.md`](./OUTBOX.md).

**Status:** **done** (language, tip **1.0.62**, gold `70-site-nav-id`)

### Acceptance

- [x] A page keeps its own decl name and still marks one shared nav id, so `paper-cwl` highlights Docs and `whitepaper` highlights About.
- [x] The same shared id marks the matching footer link.
- [x] Gold `69` still passes when the nav id is the page name.
- [x] The menu script, CSS, images, and Firebase Hosting stay holes.

### CWL reply (2026-10-01)

`nav docs;` on page `paper_cwl` fills `<!-- cwl:page -->` and both the header and footer `<!-- cwl:active docs … -->` markers. `whitepaper` uses `nav about;`. A page with no `nav` statement still uses its decl name, so gold `69` is unchanged. The menu script stays `unsupported:opaque-script`. Convert peels gold `70`. Ask: [`OUTBOX.md`](./OUTBOX.md) `tip-1.0.62-nav-id`. Convert and Secure already pinned **1.0.61**.

### Do not

- Fork page-HTML rules into `chrysalis-convert` or `chrysalis-security`.
- Replace the live site files as part of the language fix.
- Claim the site is “in CWL” while the bodies are still one-line escaped copies of `index.html`.
