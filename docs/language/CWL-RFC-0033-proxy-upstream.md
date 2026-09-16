# CWL RFC-0033 — Declared upstream forwards

**Status:** accepted (2026-09-16)  
**Tip:** `1.0.34` · gold `43-proxy-upstream`  
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

## Lowering and reverse

The body lowers to `data.call __cwl_effect_upstream_proxy(<target literal>)` with a `cwl:proxy-upstream`
provenance locator; the target is a plain `data.literal` so emit can read it back verbatim. If the literal
is missing on the way back, thin emit yields `hole cwl:emit:proxy-target;` rather than inventing a host.

## What stays with the host

CWL declares the destination; it does **not** describe:

- TLS termination / certificate handling
- hop-by-hop headers, `X-Forwarded-*` policy, cookie rewriting
- retries, timeouts, circuit breaking, load balancing across replicas
- tunnels (WireGuard, VPN) and network reachability

`hub-cwl:upstream-proxy` remains the honest hole for those mechanics.

## Non-goals

- Request/response body rewriting on the way through
- Path rewriting beyond the declared target
- Upstream pools, weights, or health checks
