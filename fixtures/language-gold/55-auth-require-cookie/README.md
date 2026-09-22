# `55-auth-require-cookie` — tip 1.0.47

Genome may name the session cookie `auth.require` expects. Token values stay host-side. Bare `auth.require` remains valid.

| Route | Surface |
| --- | --- |
| `GET /me` | `auth.require cookie sid` |
| `GET /admin` | `auth.require` |
