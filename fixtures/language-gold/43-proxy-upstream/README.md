# `43-proxy-upstream` — RFC-0033 declared upstream forward (tip 1.0.34)

Hole-free: the route says *where* it forwards, so the destination is heritable
instead of hidden in a host config file.

| Route | Upstream |
| --- | --- |
| `GET /api/tower-status` | `https://backend-services.internal/tower-status` |
| `POST /api/provision` | `https://backend-services.internal/provision` |

CWL does not own the transfer. TLS, hop-by-hop headers, retries, timeouts, and
tunnels remain the host executor's job — see `hub-cwl:upstream-proxy`.
