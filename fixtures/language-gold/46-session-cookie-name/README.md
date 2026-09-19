# `46-session-cookie-name` — RFC-0032 deepen (tip 1.0.38)

`session.mint` / `session.revoke` may name the cookie the host will set or clear.
The genome carries the **name** only — never a token value.

| Route | Effects |
| --- | --- |
| `POST /login` | `auth.verify`, `session.mint cookie sid` |
| `POST /logout` | `session.revoke cookie sid` |

Bare `session.mint` (gold `42`) remains valid when the cookie name is unknown.
Secure cutover can now honor a genome-declared name against `set_cookie_names`.
