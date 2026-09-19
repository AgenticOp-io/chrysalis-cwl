# CWL genome deepen — Phase 1.x

**Status:** active (reopened 2026-08-11)  
**Tip start:** **1.0.18** (RFC-0025) · **current:** **1.0.41**  
**Authority:** [`CWL-PILLAR-HOME.md`](./CWL-PILLAR-HOME.md) · [`CWL-LANGUAGE-SCOPE.md`](./CWL-LANGUAGE-SCOPE.md) · [`DNA-BUILD-NEXT.md`](../history/DNA-BUILD-NEXT.md)

## Thesis

Exit **1.0** shipped a **bootstrap genome**: routes, pages, loads, UI islands, control, holes, DNA bridge. That is enough for Rosetta ↔ UT cutover proofs — **not** the complete DNA of web-application meaning.

Deepen **here** when a surface can be named, gold-proven, and lowered without forging framework runtimes.

Convert still **hears** origin stacks; Secure still **checks** live DNA. Neither owns new genes.

## What “fuller genome” means

| Layer | Deepen direction |
| --- | --- |
| **Literals / values** | Nested objects/arrays (RFC-0025) — done |
| **CWL Data** | Load redirect / error / cookie golds (`27`) — done |
| **Response headers** | Hyphenated `Set-Cookie` (`28`) — done |
| **Transport** | SSE / WebSocket / multipart catalogued holes (`29`) — done |
| **CWL Effects** | Executable chains beyond session presets (`30`) — done |
| **Multipart** | Field/file part bindings (`31`, RFC-0026) — done |
| **SSE** | Single-shot `stream sse;` (`32`, RFC-0027) — done |
| **UI islands** | Named `client ui "…"` + form events (`33`, RFC-0028) — done |
| **DNA bridge** | SSE / multipart / HEAD seed honesty (`34`, RFC-0022 deepen) — done |
| **Emit reverse** | Load redirect / http.error (`27`) — done (`1.0.25`) |
| **HTML shell + forms** | Redirect/error shell preserve + urlencoded POST (`35`) — done (`1.0.26`) |
| **Layout chrome** | `layout` + `chrome html` wrap (`36`, RFC-0029) — done (`1.0.27`) |
| **HTML cookie / device token** | Cookie + load interpolate (`37`, RFC-0014) — done (`1.0.27`) |
| **HTML + page island** | Sibling `client ui` (`38`, RFC-0030) — done (`1.0.27`); emit reverse done (`1.0.28`) |
| **Host-executor holes** | Catalog + gold `39` (`html-fragment` / `credential-store` / `upstream-proxy`) — done (`1.0.29`–`1.0.30`) |
| **Layout package surface** | ALWAYS sync + `@chrysalis/cwl/layout` — done (`1.0.30`) |
| **Repeated markup** | `repeat … as … html` (`40`, RFC-0031) — done (`1.0.31`); item fields (`41`) — done (`1.0.32`); conditional `if item.field` (`47`) — done (`1.0.39`); empty `else html` (`48`) — done (`1.0.40`); one-level nest (`49`) — done (`1.0.41`) |
| **Credential / session intent** | `auth.verify` / `session.mint` / `session.revoke` (`42`, RFC-0032) — done (`1.0.33`); cookie **names** (`46`, `session.mint cookie sid`) — done (`1.0.38`); crypto + values stay host |
| **Upstream forward** | `proxy upstream "…"` (`43`, RFC-0033) — done (`1.0.34`); path params in targets (`45`) — done (`1.0.36`); transfer mechanics stay host |
| **Host-byte residuals** | `keypair-gen` / `binary-render` reasons with declared media type (`44`) — done (`1.0.35`) |
| **WebSocket duplex** | Kept honest hole (`unsupported:websocket`) |
| **Cinderpath product asks** | Working note [`CWL-EXPAND.md`](../history/CWL-EXPAND.md) — consume process documented; genome tip bump in Cinderpath after pin |
| **CWL UI** | Hydration / silent React-Svelte lower remain non-goals |
| **Holes** | More precise `unsupported:*` / `cwl:*` reasons as peels demand; argument-carrying reasons resolve to their entry — done (`1.0.37`) |

## Explicit non-goals (unchanged)

- Absorbing PHP/Go/Java/COBOL **as dialects** of CWL  
- Nest DI / LiveView / Flutter / middleware-onion **façades**  
- Databases, queues, NGFW, vendor SDKs as grammar  
- UA regex / media-query evaluate inside CWL

## Prove

```bash
npm run test:language
npm run smoke:cwl-ingest-matrix
npm run smoke:cwl-runtime-matrix
npm run smoke:ut-spine
```
