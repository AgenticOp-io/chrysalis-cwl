# CWL language version

| Field | Value |
| --- | --- |
| **Language** | Chrysalis Web Language (CWL) |
| **Goal** | DNA of web languages. Tip `1.0.79` adds WebSocket duplex, job enqueue intent, and broader UI event contracts (golds `87`–`89`). |
| **Version** | `1.0.79` |
| **Status** | Transport + jobs + UI deepen |
| **Date** | 2026-10-06 |

## What this version means

- **`stream websocket;`** — duplex upgrade surface (RFC-0035). Host owns frames. Residual stays `unsupported:websocket`
- **`job.enqueue` / `job.enqueue name <id>`** — background work intent (RFC-0036). No queue engine invent
- **UI events** `input` / `focus` / `blur` / `keydown` on named islands (RFC-0037). Still no hydration
- Prior tip **1.0.78:** complete marketing site

## Gate

```bash
npm run build:webir
CWL_REQUIRE_WEBIR=1 npm run test:language
```
