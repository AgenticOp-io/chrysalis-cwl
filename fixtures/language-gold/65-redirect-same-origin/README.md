# `65-redirect-same-origin` — RFC-0006 deepen

A handler may name a **same-site** path to send the caller to. Default status is 302. `301`, `303`, `307`, and `308` may be named.

`https://…` and protocol-relative targets are `unsupported:open-redirect`. The genome does not declare an open redirect.

## Checks

| Route | Surface |
| --- | --- |
| `POST /login` | `redirect "/account"` |
| `POST /moved` | `redirect "/home" status 301` |
| `GET /out` | off-site target refused |
