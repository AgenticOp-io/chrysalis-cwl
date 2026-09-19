# CWL OUTBOX (git)

Pushed asks for siblings. Newest first.

---

## 2026-09-19 — runtime-upstream-passthrough

**To:** convert + secure  
**Priority:** P0  
**Status:** **done**  
**CWL tip:** **1.0.37** (unchanged — runtime package, not a language tip)

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
