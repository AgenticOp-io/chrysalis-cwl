# `42-auth-effects-v2` — RFC-0032

Credential and session **intent** is CWL vocabulary: `auth.verify`, `session.mint`, `session.revoke`.
The host still owns password hashing and the session store, exactly like `mail.send` or `db.write`.

| Route | Effects |
| --- | --- |
| `POST /login` | `auth.verify, session.mint` + urlencoded `body` bindings |
| `POST /logout` | `session.revoke` |

`password` is declared but never echoed, so thin emit drops that binding (same trait as gold `35`).

Declared effects lower to `db.read` / `session.write` WebIR effects plus named `__cwl_effect_*` nodes;
emit reverse recovers the tags. A login route no longer needs `hole hub-cwl:credential-store;`
just to say "credentials are checked here".
