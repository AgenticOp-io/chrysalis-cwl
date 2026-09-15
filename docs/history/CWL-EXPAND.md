# CWL expand (Cinderpath)

Working note for **AgenticOp-io/chrysalis-cwl**. Genome: `internal/webapp/cwl/cinderpath.cwl`.  
**Landed tip:** **1.0.27** (RFC-0029 / 0014 deepen / 0030). Go (`cinderpath-web`) remains the hole executor.

If a line is wrong, strike it.

---

## Already honest (do not expand for these)

| Need | What we use now |
| --- | --- |
| Routes, pages, forms | `@page` / `@route`, `use urlencoded`, `use auth session` |
| Request UA as data | `header User-Agent;` (RFC-0004) |
| Phone vs desktop script residual | `hole unsupported:opaque-script;` (RFC-0024) still valid |
| WireGuard / POP mint / QR | `hole hub-cwl:upstream-proxy;` |
| Genome on the site | `/cwl`, `/cinderpath.cwl`, nav chip **CWL** |

---

## Expansions (status)

### 1. Shared chrome (layout wrap) — **landed 1.0.27**

```cwl
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

RFC-0029 · gold `36-layout-chrome`. Non-goals: CSS pipelines, nested `extends`, component slots.

### 2. Device class from the browser — **partial (honest)**

- Prefer `cookie` / `load` classified token (`phone` \| `desktop`) in HTML — gold `37`
- Optional page island contract — gold `38` / RFC-0030
- Keep `unsupported:opaque-script` when the browser must own the script
- **Do not** add UA regex to CWL grammar

### 3. Header / cookie tokens in `return html` — **landed 1.0.27**

RFC-0014 deepen: `param` / `query` / `cookie` / `load` keys. Prefer classified device cookie, not raw UA.

### 4. One return: HTML body + client island — **landed 1.0.27**

RFC-0030 · gold `38-html-page-island`. Layout may own the island once (RFC-0029 merge).

### 5. Go as hole executor vs CWL as renderer — **process (not syntax)**

**Supported consume shape for Cinderpath:**

1. Author / publish genome in `chrysalis-cwl` tip (pin `@chrysalis/cwl` / `file:`).
2. Public pages: treat CWL `return html` (+ layout chrome) as the **record** Convert/`cwl` simulate/emit can render.
3. Keep **Go** for catalogued holes only: bcrypt/session, WireGuard/POP/QR, any opaque device script the genome declares.
4. Do **not** re-implement a second CWL parser in Go — call the pillar package / Convert spine.
5. Bump `cinderpath.cwl` tip comment only after Convert/Secure pin **1.0.27**.

---

## Keep as holes (unless you say otherwise)

- bcrypt / sqlite session
- WireGuard keypair, POP `/v1/sessions`, QR PNG
- UA regex / media-query evaluate inside CWL
- Destination inspection through the tunnel (`tunnel_inspection: false`)

---

## After tip pin

1. Drop duplicate chrome strings in Cinderpath genome → `layout shell`.
2. Use cookie/load device token in HTML where live class is needed for simulate.
3. Redeploy `/cinderpath.cwl`.
