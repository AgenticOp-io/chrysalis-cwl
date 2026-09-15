# CWL expand (Cinderpath)

Working note for **AgenticOp-io/chrysalis-cwl**. Edit this file before anything lands in the language.

Cinderpath does **not** invent CWL here. Genome: `internal/webapp/cwl/cinderpath.cwl`. Tip we authored against: **1.0.26**. Go (`cinderpath-web`) is the hole executor.

If a line is wrong, strike it. If a surface should exist, write the syntax you want under **Draft syntax**.

---

## Already honest (do not expand for these)

| Need | What we use now |
| --- | --- |
| Routes, pages, forms | `@page` / `@route`, `use urlencoded`, `use auth session` |
| Request UA as data | `header User-Agent;` (RFC-0004) |
| Phone vs desktop script | `hole unsupported:opaque-script;` (RFC-0024) on every `@page` |
| WireGuard / POP mint / QR | `hole hub-cwl:upstream-proxy;` |
| Genome on the site | `/cwl`, `/cinderpath.cwl`, nav chip **CWL** |

---

## Expansions we actually need

Cinderpath hit these while putting device layout and chrome in the genome. Rank is product order, not RFC number.

### 1. Shared chrome (layout wrap)

**Gap:** RFC-0011 `import "layouts/shell.cwl"` merges **extra routes**. It does not wrap every `@page` in one header/footer. We copy the same `<header>…CWL…</header>` string into every `return html`.

**Why it matters:** Nav, `data-device`, and the CWL chip must stay one source. Duplicating HTML in fourteen pages will drift.

**Draft syntax** (edit freely):

```cwl
# layouts/shell.cwl — not valid tip 1.0.26 wrap
layout shell {
  header User-Agent;
  hole unsupported:opaque-script;
  chrome html "<header class='top'>…<a href='/cwl'>CWL</a>…</header>";
}

@page GET "/"
page home {
  layout shell;
  return html "<main>…</main>";
}
```

**Non-goals unless you add them:** CSS pipelines, nested `extends`, component slots (RFC-0011 already says no).

### 2. Device class from the browser (not a homemade regex in CWL)

**Gap:** CWL can bind `User-Agent`. It cannot classify phone vs desktop. RFC-0021 `if` is `IDENT == lit`, not substring / media query. RFC-0019 client islands are **metadata**; they do not run JS.

**Why it matters:** Phone layout should stay the phone layout. Desktop should not look like a stacked app. That decision is a **browser** fact (UA + viewport), not a CWL expression we should fake.

**Draft syntax** (edit freely):

```cwl
@page GET "/"
page home {
  header User-Agent;
  client ui "device" {
    on resize { action "classify-device"; }
  }
  return html "<html data-device='device'>…</html>";
}
```

Needs from the pillar, if you want this in-language:

- A named device / media binding (`phone` \| `desktop`) with **verify gold**, or
- Client-island **runtime** that may set `data-device` (RFC-0019 v2), or
- An honest hole we already have (`unsupported:opaque-script`) kept forever

**Do not:** add UA regex to CWL grammar.

### 3. Header tokens in `return html`

**Gap:** RFC-0014 interpolates `param`, `query`, and `load` keys. Not `header User-Agent`. Dumping the raw UA into HTML is also a bad idea (quotes, tracking).

**Why it matters:** Genome HTML says `data-device='desktop'` as a literal. Live Go overwrites it. Convert/simulate will not see the live class.

**Draft syntax** (edit freely):

```cwl
header User-Agent;
load { device: cookie cp_device };   # or a future device binding
return html "<html data-device='device'>…</html>";
```

Prefer a **small classified token** (`phone` / `desktop`), not the UA string.

### 4. One return: HTML body + client island

**Gap:** A page is `return html` **or** `return ui`, not both. Device island wants `client ui "device"`. Copy wants long `return html`. We picked HTML + opaque-script hole.

**Draft:** allow `return html` plus a sibling `client ui "device" { … }` on the same `@page`, or allow a layout to own the island once.

### 5. Go as hole executor vs CWL as renderer

**Gap:** Live pages are Go templates (session, CSRF, shop, QR). CWL `return html` is the **record**, not the bytes the browser gets after login.

**Why it matters:** “CWL on the site” is the genome + nav. It is not yet “CWL ran this HTML.” If we want Convert/`cwl preview` to be the site, the pillar needs a runtime Cinderpath can call **without** a second parser in Go.

**Draft (process, not syntax):** document a supported way for `cinderpath-web` to consume pillar simulate/emit HTML for public pages, still using Go only for holes (auth, POP, QR).

---

## Keep as holes (unless you say otherwise)

- bcrypt / sqlite session
- WireGuard keypair, POP `/v1/sessions`, QR PNG
- UA regex / media-query evaluate inside CWL
- Destination inspection through the tunnel (`tunnel_inspection: false`)

---

## After you edit this file

1. Adjust the draft syntax until it is what you want said.
2. Open the change in **chrysalis-cwl** (RFC + language-gold). Do not patch parsers under Cinderpath.
3. Bump the genome tip comment in `internal/webapp/cwl/cinderpath.cwl` only after the pillar ships.

Cinderpath follow-up is then: drop duplicate chrome strings, keep holes that remain honest, redeploy `/cinderpath.cwl`.
