# CWL RFC-0020 — CWL Effects middleware chains

**Status:** accepted (2026-06-16); deepened **1.0.20** (executable presets beyond session)  
**Tracking:** G7330, DESIGN D6260  
**Extends:** [RFC-0007](CWL-RFC-0007-auth-effects.md)

## Summary

Phase **21** extends executable effects beyond `session.read` / `session.write` with **middleware-equivalent** declarations that lower to executable WebIR before the handler body.

Tip **1.0.20** completes the remaining declared presets so they are no longer metadata-only: `time.now`, `random`, `mail.send`, `db.read`, `db.write`, `io`, and `rate.limit`.

## Syntax

```cwl
@route GET "/admin"
handler admin_index {
  effects: auth.require, cors.allow, csrf.verify;
  return { ok: true };
}

@route GET "/clock"
handler clock {
  effects: time.now, rate.limit;
  return { ok: true };
}
```

| Effect | Lowering (v1) |
| --- | --- |
| `auth.require` | Executable `session.read` on `user_id` (same sandbox as session.read) |
| `rate.limit` | `data.call` to `__cwl_middleware_rate_limit` (optional `rpm <n>`; tip 1.0.45) |
| `time.now` | `effect.time.now` |
| `random` | `effect.random` with sandbox literals `0..1` |
| `mail.send` | `data.call` `__cwl_effect_mail_send` (optional `template <name>`; tip 1.0.49 — no invented mailer) |
| `db.read` / `db.write` | `data.call` `__cwl_effect_db_*` (optional `table <name>`; tip 1.0.48 — no invented SQL engine) |
| `io` | `data.call` `__cwl_effect_io` (optional `host <name>`; tip 1.0.52 — no invented HTTP client) |
| `auth.verify` | `db.read` + `data.call` `__cwl_effect_auth_verify` (RFC-0032; host hashes) |
| `session.read` / `session.write` | executable session read/write (optional `cookie <name>`; tip 1.0.54 — name only) |
| `session.mint` / `session.revoke` | `session.write` + `data.call` `__cwl_effect_session_*` (RFC-0032; optional `cookie <name>`; `samesite` is `lax` or `strict` — RFC-0034 refuses `none`) |
| `cors.allow` | `data.call` `__cwl_middleware_cors` (`origin` tip 1.0.44; `methods` tip 1.0.50; `credentials` tip 1.0.53 — no invented CORS engine) |
| `cache.max-age` | `data.call` `__cwl_middleware_cache` (tip 1.0.51 — no invented CDN) |
| `cache.private` | `data.call` `__cwl_middleware_cache` (tip 1.0.55 — private intent only) |
| `cache.no-store` | `data.call` `__cwl_middleware_cache` (tip 1.0.58 — nothing may store the response) |
| `csrf.verify` | `data.call` `__cwl_middleware_csrf` (optional `cookie <name>`; tip 1.0.46) |
| `auth.require` | Executable `session.read` (optional `cookie <name>`; tip 1.0.47) |

Effects run **in declaration order** before the handler value.

## Verify

- Gold fixture `fixtures/language-gold/22-effects-middleware` + `30-effects-executable`
- Suites `cwl-auth-middleware-hono`, `cwl-auth-middleware-fastify`
- Gate **G7330** — `pnpm run hub:cwl-phase21-close-smoke`

## Non-goals

- Real mail delivery, SQL execution, or rate-limit policy engines as CWL grammar
- Nest DI / LiveView / Flutter / onion middleware façades
