# CWL RFC-0032 — Credential / session effects

**Status:** accepted (2026-09-16)  
**Tip:** `1.0.33` · gold `42-auth-effects-v2`  
**Extends:** RFC-0007 (auth effects) · RFC-0020 (executable effects)

## Summary

A login route could not *say* what it does. CWL had `auth.require` (read a session) but no vocabulary for
"check a credential" or "mint a session", so genomes declared `hole hub-cwl:credential-store;` and the
host executor owned both the meaning and the crypto. This RFC moves the **intent** into CWL and leaves the
**secrets** with the host — the same split as `mail.send` and `db.write`.

## Effect tags

| Tag | Meaning | WebIR effect |
| --- | --- | --- |
| `auth.verify` | A submitted credential is checked against a store | `db.read` |
| `session.mint` | A session is created for the caller | `session.write` |
| `session.revoke` | The caller's session is destroyed | `session.write` |

```cwl
@route POST "/login"
handler login {
  effects: auth.verify, session.mint;
  body username;
  body password;
  return { ok: true, username: username };
}

@route POST "/logout"
handler logout {
  effects: session.revoke;
  return { ok: true };
}
```

## Lowering and reverse

Each tag adds its WebIR effect plus a named executable node (`__cwl_effect_auth_verify`,
`__cwl_effect_session_mint`, `__cwl_effect_session_revoke`) carrying a `cwl:executable-*` provenance
locator, so emit recovers the exact tag list.

## What stays with the host

CWL declares the intent; it does **not** describe or contain:

- password hashing / verification algorithms (bcrypt, argon2, …)
- session token format, storage, expiry, or rotation
- credential stores (sqlite, Postgres, LDAP, …)

`hub-cwl:credential-store` remains the honest hole for genomes that still need to point at a host-owned
store beyond these declarations. Forging a hashing or session runtime in CWL stays forbidden.

## Non-goals

- Authorization policy / roles / scopes
- Multi-factor, OAuth, or SSO flows
- Reading or asserting credential values inside CWL
