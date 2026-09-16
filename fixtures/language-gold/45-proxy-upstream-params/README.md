# `45-proxy-upstream-params` — RFC-0033 deepen (tip 1.0.36)

A forwarded route usually has a path. The target may reuse the route's own path
params, so the destination stays complete instead of collapsing to a host config.

| Route | Upstream | Result |
| --- | --- | --- |
| `GET /api/device/:id/status` | `…/device/:id/status` | forwards, `id` bound |
| `GET /api/site/:site/tower/:tower` | `…/sites/:site/towers/:tower` | forwards, both bound |
| `GET /api/pop/:id/health` | `…/pop/:region/health` | `hole cwl:unknown-proxy-param:region;` |

Params in the target are lowered as `data.requestField` path reads, so they are real
data dependencies — emit recovers them as `param …;` bindings next to the statement.
A `:name` the route does not own is never invented.
