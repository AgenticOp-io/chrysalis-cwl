# `54-csrf-verify-cookie` — RFC-0020 deepen (tip 1.0.46)

Genome may name the CSRF cookie. Token values stay host-side. Bare `csrf.verify` remains valid.

| Route | Surface |
| --- | --- |
| `POST /form` | `csrf.verify cookie csrf` |
| `POST /form-default` | `csrf.verify` |
