# CWL RFC-0022 — CWL surface ↔ `app-dna-v1` bridge contract

**Status:** accepted (contract only — 2026-08-04)  
**Pillar:** language (`chrysalis-cwl`)  
**Consumers:** Secure / Helix (implement DNA side); Convert (optional cutover compare)  
**Depends on:** [RFC-0010](CWL-RFC-0010-full-stack-pages.md) (`@page`), [RFC-0007](CWL-RFC-0007-auth-effects.md) / [RFC-0020](CWL-RFC-0020-effects-middleware.md) (effects), [RFC-0002](CWL-RFC-0002-path-parameters.md) (path templates)  
**Non-goal:** Helix learn/enforce/proxy code lives in `chrysalis-security` only.

## Motivation

Secure’s out-of-box identity is **traffic DNA** (`app-dna-v1`). CWL is **THE language of the web** — the authored surface of routes, pages, effects, and honest holes. Cutover and seed/compare need a **shared bridge contract** so Helix does not fork CWL grammar and CWL does not pretend to own firewall policy.

This RFC defines **how** CWL `@route` / `@page` surface maps to DNA **route identity** fields for:

1. **Seed** — draft DNA from a CWL module (authoritative surface → draft certificate).
2. **Compare** — “does convert/CWL surface match live DNA?” (identity intersection only).

It does **not** make CWL a firewall, and it does **not** require Helix to load CWL to protect an app.

## Ownership (honest split)

| Concern | Owner | Notes |
| --- | --- | --- |
| Grammar / parse / print / RFCs | **CWL** | Single language bar |
| Authored surface: method, path, `@page` vs `@route`, effects, handler/page bodies, holes | **CWL** | What the app *is* |
| Traffic-proved identity: host, learned path templates, `content_class`, status classes, JSON key fingerprint, certify/sign | **DNA / Helix** | What the app *did* under observation |
| Learn / shadow / enforce / NGFW augment | **Helix** | Never implemented in this repo |
| Bridge mapping + gold fixture shape | **CWL (this RFC)** | Helix consumes; must not redefine |

**Identity key for compare** (DNA side, from `dna-core` / `app-dna-v1`):

```text
routeKey = `${host} ${METHOD} ${path_template}`
```

CWL has no `host` at authoring time. Seed uses host `"default"` unless an external deploy profile supplies one. Compare against live DNA must either normalize host or match on `(METHOD, path_template)` when host is unknown on the CWL side.

## Surface mapping

### 1. Route / page → DNA route identity

| CWL | DNA (`app-dna-v1` route) | Seed rule | Compare rule |
| --- | --- | --- | --- |
| `@route METHOD "path"` | `method` + `path_template` | Uppercase method; path string as template | Equality on method + path_template |
| `@page METHOD "path"` | same | Same — pages are HTTP routes | Same |
| Path params `:name` | segment in `path_template` | Keep CWL names (`/items/:id`) | See § Path templates |
| Handler / page **name** | *(none)* | Not in DNA | N/A |
| `return { … }` / `return html` / other | informs `content_class` only | See § Content class | Drift is DNA-owned after learn |

```cwl
@route GET "/api/health"
handler health {
  effects: none;
  return { ok: true };
}

@page GET "/"
page home {
  effects: none;
  return html "<!doctype html><html><body>Home</body></html>";
}
```

Seeds (identity fields only):

```json
[
  {
    "host": "default",
    "method": "GET",
    "path_template": "/api/health",
    "content_class": "json"
  },
  {
    "host": "default",
    "method": "GET",
    "path_template": "/",
    "content_class": "html"
  }
]
```

### 2. Effects (optional; not DNA identity)

| CWL | DNA | Bridge treatment |
| --- | --- | --- |
| `effects: none;` / omitted | *(none)* | No DNA field |
| `effects: session.read;` etc. | *(none in v1 schema)* | Emit in a **bridge envelope** (`bridge.annotations[]`: `cwl_effects`, `cwl_surface`) keyed by method+path — **not** inside certified DNA route objects. **Never** part of `routeKey`. |
| Middleware chains (RFC-0020) | *(none)* | Same — ordered list in annotation for human/agent compare notes |

Effects describe **declared** behavior in CWL. DNA proves **observed** traffic. A seed may hint that a route expects auth; certification still requires traffic (or explicit promote policy owned by Helix).

### 3. Content class

| CWL surface cue | Seed `content_class` |
| --- | --- |
| `return html …` or `@page` with HTML body | `html` |
| `return { … }` object literal / JSON body | `json` |
| string / opaque / hole-only body | `other` (or omit seed fingerprint) |

Live DNA may **override** after learn (e.g. JSON that returns HTML error pages). Compare of identity uses method+path(+host); content_class drift is a DNA/Helix concern, not a CWL grammar change.

### 4. Status classes & JSON fingerprints (DNA-owned; optional seed hints)

| Field | Seed from CWL? | Notes |
| --- | --- | --- |
| `status_classes` | Optional: if handler declares `status N;` on all exits, seed `[floor(N/100)*100]` set; else `[]` or omit | Traffic learn fills this |
| `response_key_fingerprint` | Optional for JSON literals: sorted top-level keys joined by `,` | Matches Helix `responseKeyFingerprint` for objects; `null` for html/other |
| `mode` / `app_id` / `created_at` / `parent_hash` / `signature` | Profile / Helix | Not derived from CWL syntax |

### 5. Path templates

- **CWL authored:** named params (`/users/:userId`).
- **DNA learned:** often collapses numeric/uuid segments to `/:id` (Helix `pathTemplate`).

**Bridge rules:**

| Direction | Rule |
| --- | --- |
| CWL → seed DNA | Keep CWL path string as `path_template` (named params preserved). |
| Compare CWL ↔ learned DNA | Helix (or bridge tool) should treat templates as equal when they share method and a **segment-shape** match: each `:param` aligns with `:id` or a named param; static segments must match exactly. Exact string equality is sufficient when DNA was seeded from CWL without re-learn. |
| Static asset globs (`/**/*.js`) | DNA-only collapse. CWL does not author CDN asset DNA; no seed from CWL modules. |

### 6. Holes

| CWL `hole` | DNA `holes[]` |
| --- | --- |
| Language honesty: unsupported emit/runtime | Certificate honesty: uncertified / unknown observed behavior |

Do **not** auto-copy CWL holes into DNA `holes`. They are different vocabularies. A bridge report may *list* CWL holes next to DNA gaps for operators; schemas stay separate.

## What this RFC does not change

- No new CWL syntax.
- No parser/print changes required for the gold `.cwl`.
- No Helix enforcement semantics here.

## Fixture

| Path | Role |
| --- | --- |
| `fixtures/language-gold/24-dna-bridge/routes.cwl` | Minimal valid CWL (round-trip / diagnose) |
| `fixtures/language-gold/24-dna-bridge/expected-dna.json` | Documented seed/compare shape for Helix |

Gate: `npm run test:language` covers the `.cwl` only. The JSON is a **contract gold** for Secure agents — not executed by the language parser.

## Helix follow-up (blockers / handoff)

1. Implement `cwlSurfaceToDraftDna(module)` (or CLI) consuming this mapping — **in** `chrysalis-security`.
2. Define host resolution when seeding from CWL (profile vs `"default"`).
3. Implement path-template **shape** equality for CWL-named vs DNA-`/:id` learned templates.
4. Decide whether bridge annotations (`cwl_effects`) live in an envelope beside DNA or a Helix-private extension (schema today is `additionalProperties: false` on `app-dna-v1` — keep effects **out** of the certified certificate body unless schema is versioned).
5. Wire cutover gate: CWL surface ⊆ certified DNA (identity), without forking grammar — **Convert does not own this**.

## Verify (language pillar)

- [x] RFC published and indexed in `CWL-RFC.md`
- [x] Fixture pair under `fixtures/language-gold/24-dna-bridge/`
- [x] `.cwl` passes `npm run test:language` round-trip + diagnose
- [x] Spine: `npm run smoke:ut-spine` (contract always; Helix when Secure sibling — `smoke:ut-spine:helix`)
- [x] Secure consumes mapping (`cutover-smoke` / `cwl-bridge`) — Helix owns enforce
