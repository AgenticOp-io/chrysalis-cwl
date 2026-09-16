# CWL expand (Cinderpath)

Working note for **AgenticOp-io/chrysalis-cwl**. Genome: `internal/webapp/cwl/cinderpath.cwl`.  
**Landed tip:** **1.0.29** (catalog html-fragment + credential-store). **GET pages render from compiled CWL**.  
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
| Auth credentials | `hole hub-cwl:credential-store;` on auth POSTs |
| WireGuard / POP / QR | `hole hub-cwl:upstream-proxy;` |
| Genome on the site | `/cwl`, `/cinderpath.cwl`, nav chip **CWL** |

---

## Expansions (status)

1–4 landed in **1.0.27–1.0.28**. See golds `36`–`38`.

### 5. Go as hole executor — **done (process)**

Holes are **named in CWL**. Go does not own the vocabulary. Website `/cwl` copy matches.

### Keep as holes (executor only)

- bcrypt / sqlite session → `hub-cwl:credential-store`
- WireGuard keypair, POP, QR → `hub-cwl:upstream-proxy`
- Live HTML fragments → `hub-cwl:html-fragment`
- UA regex inside CWL — **forbidden**
- Tunnel destination inspection — `tunnel_inspection: false`

---

## After tip pin

1. Genome tip **1.0.29** + catalog holes — **done**
2. Redeploy `/cinderpath.cwl` after compile
3. Convert/Secure pin **1.0.29**
