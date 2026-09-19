# `52-cors-allow-origin` — RFC-0020 deepen (tip 1.0.44)

Genome may name the allowed CORS origin. Bare `cors.allow` still means `*`.

| Route | Surface |
| --- | --- |
| `GET /api/public` | `cors.allow origin https://app.example.com` |
| `GET /api/open` | `cors.allow` (wildcard) |
