# `22-effects-middleware` — RFC-0020

**Parseable now:** `effects: auth.require, cors.allow, csrf.verify;` (comma-separated dotted names) and mixes with `session.write`.

**Not in this gold:** WebIR/Hono lowering of `__cwl_middleware_*` helpers — convert/runtime verify suites own that depth.
