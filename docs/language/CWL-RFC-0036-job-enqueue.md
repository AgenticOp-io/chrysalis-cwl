# CWL RFC-0036 — Background job enqueue intent

**Status:** accepted (2026-10-06)  
**Tip:** **1.0.79**  
**Extends:** [RFC-0020](CWL-RFC-0020-effects-middleware.md)

## Summary

Name background work the host may enqueue. CWL does not own Redis, queues, or worker pools.

## Syntax

```cwl
@route POST "/digest"
handler digest {
  effects: job.enqueue name nightly_digest;
  return { ok: true };
}
```

| Construct | Meaning |
| --- | --- |
| `job.enqueue` | Background work intent |
| `job.enqueue name <id>` | Named job id (host catalog) — never a payload body |

## Verify

- Gold `fixtures/language-gold/88-job-enqueue`

## Non-goals

- Queue engines, cron parsers, or worker runtimes as grammar
- Inventing job payloads inside CWL
