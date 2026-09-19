# CWL expand (Cinderpath)

Working note for **AgenticOp-io/chrysalis-cwl**. Genome: `internal/webapp/cwl/cinderpath.cwl`.  
**Landed tip:** **1.0.38** (session cookie names; parameterized upstream forwards; precise host-byte reasons). **GET pages render from compiled CWL**.  
**Holes live in the genome.** Go (`cinderpath-web`) only executes them.

If a line is wrong, strike it.

---

## Already honest

| Need | What we use now |
| --- | --- |
| Routes, pages, forms | `@page` / `@route`, `use urlencoded`, `use auth session` |
| Shared chrome | `layout site { chrome html … }` (RFC-0029) |
| Device class token | `cookie cp_device` + `load { device: … }` (not UA regex) |
| Opaque device residual | `hole unsupported:opaque-script;` |
| Live HTML fragments | `hole hub-cwl:html-fragment;` (Go fills `load` bindings) |
| Auth credentials | `effects: auth.verify, session.mint cookie sid;` (+ `hole hub-cwl:credential-store;` only for the store) |
| Forwarded API routes | `proxy upstream "…/:id/…";` (RFC-0033) — target + path params named in CWL |
| Forward mechanics (TLS, retries, tunnels) | `hole hub-cwl:upstream-proxy;` |
| WireGuard keypair | `hole hub-cwl:keypair-gen;` + declared `content-type` |
| QR / config bytes | `hole hub-cwl:binary-render;` + declared `content-type` |
| Genome on the site | `/cwl`, `/cinderpath.cwl`, nav chip **CWL** |

---

## Expansions (status)

1–4 landed in **1.0.27–1.0.28**. See golds `36`–`38`.

### 5. Go as hole executor — **done (process)**

Holes are **named in CWL**. Go does not own the vocabulary. Website `/cwl` copy matches.

### Keep as holes (executor only)

- bcrypt / sqlite session → `hub-cwl:credential-store`
- WireGuard keypair → `hub-cwl:keypair-gen` (was `upstream-proxy` before `1.0.35`)
- QR / config bytes → `hub-cwl:binary-render` (was `upstream-proxy` before `1.0.35`)
- Live HTML fragments → `hub-cwl:html-fragment`
- UA regex inside CWL — **forbidden**
- Tunnel destination inspection — `tunnel_inspection: false`

---

## After tip pin

1. Genome tip **1.0.38** + catalog holes — **done**
2. Redeploy `/cinderpath.cwl` after compile
3. Convert/Secure pin **1.0.38**
