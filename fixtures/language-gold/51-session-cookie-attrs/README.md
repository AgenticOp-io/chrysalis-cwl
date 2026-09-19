# `51-session-cookie-attrs` — RFC-0032 deepen (tip 1.0.43)

Genome declares cookie **policy** flags alongside the cookie name. Token values stay host-side.

| Route | Surface |
| --- | --- |
| `POST /login` | `session.mint cookie sid httponly secure path / samesite lax` |
| `POST /logout` | `session.revoke cookie sid path /` |

Allowed attrs: `httponly`, `secure`, `path /…`, `samesite lax|strict|none`.
