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
| `cors.allow` | `data.call` to `__cwl_middleware_cors` (no-op in verify sandbox) |
| `csrf.verify` | `data.call` to `__cwl_middleware_csrf` (no-op in verify sandbox) |
| `rate.limit` | `data.call` to `__cwl_middleware_rate_limit` (no-op in verify sandbox) |
| `time.now` | `effect.time.now` |
| `random` | `effect.random` with sandbox literals `0..1` |
| `mail.send` | `data.call` `__cwl_effect_mail_send` (no invented mailer) |
| `db.read` / `db.write` | `data.call` `__cwl_effect_db_*` (no invented SQL engine) |
| `io` | `data.call` `__cwl_effect_io` (no invented HTTP client) |

Effects run **in declaration order** before the handler value.

## Verify

- Gold fixture `fixtures/language-gold/22-effects-middleware` + `30-effects-executable`
- Suites `cwl-auth-middleware-hono`, `cwl-auth-middleware-fastify`
- Gate **G7330** — `pnpm run hub:cwl-phase21-close-smoke`

## Non-goals

- Real mail delivery, SQL execution, or rate-limit policy engines as CWL grammar
- Nest DI / LiveView / Flutter / onion middleware façades
