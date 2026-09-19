# `53-rate-limit-rpm` — RFC-0020 deepen (tip 1.0.45)

Genome may name an RPM budget. Bare `rate.limit` stays valid (host default). Host enforces; CWL does not invent the limiter.

| Route | Surface |
| --- | --- |
| `GET /api/metered` | `rate.limit rpm 60` |
| `GET /api/open` | `rate.limit` |
