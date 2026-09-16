# CWL RFC-0033 — Declared upstream forwards

**Status:** accepted (2026-09-16)  
**Tip:** `1.0.34` · deepened `1.0.36` · golds `43-proxy-upstream`, `45-proxy-upstream-params`  
**Extends:** RFC-0007 (effects) · RFC-0012 (host-executor holes)

## Summary

A route that forwards to an existing backend could only say `hole hub-cwl:upstream-proxy;` — so the most
load-bearing fact about that route, *where it goes*, lived in an nginx block or Go handler instead of the
genome. This RFC gives CWL a way to name the destination while leaving the transfer itself to the host,
the same split RFC-0032 used for credentials.

## Syntax

```cwl
@route GET "/api/tower-status"
handler tower_status {
  effects: io;
  proxy upstream "https://backend-services.internal/tower-status";
}
```

`proxy upstream <string literal>;` is a handler body — it replaces `return`, and a route may have only one.
A non-literal target is not guessed; it becomes `hole cwl:invalid-proxy-upstream;`.

### Path params in the target (`1.0.36`)

Most forwarded routes have a path, so the target may reuse the route's own `:name` params:

```cwl
@route GET "/api/site/:site/tower/:tower"
handler site_tower {
  effects: io;
  proxy upstream "https://backend-services.internal/sites/:site/towers/:tower";
}
```

Only params the route's path declares may appear. A `:name` the route does not own becomes
`hole cwl:unknown-proxy-param:<name>;` — CWL will not invent where the value comes from.

## Lowering and reverse

The body lowers to `data.call __cwl_effect_upstream_proxy(<target literal>, …<path reads>)` with a
`cwl:proxy-upstream` provenance locator. The target is a plain `data.literal` so emit reads it back
verbatim; each `:name` in it also lowers to a `data.requestField` path read (`cwl:proxy-path-param`), so
the params are real data dependencies rather than text, and emit recovers them as `param …;` bindings.
If the target literal is missing on the way back, thin emit yields `hole cwl:emit:proxy-target;` rather
than inventing a host.

## What stays with the host

CWL declares the destination; it does **not** describe:

- TLS termination / certificate handling
- hop-by-hop headers, `X-Forwarded-*` policy, cookie rewriting
- retries, timeouts, circuit breaking, load balancing across replicas
- tunnels (WireGuard, VPN) and network reachability

`hub-cwl:upstream-proxy` remains the honest hole for those mechanics.

## Non-goals

- Request/response body rewriting on the way through
- Query, header, or body values in the target — path params only
- Upstream pools, weights, or health checks
