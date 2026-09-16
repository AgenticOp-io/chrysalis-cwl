# `39-cinderpath-holes` — RFC-0012 deepen (tip 1.0.30)

Not runtime-ok — host executor fills these; CWL only names them.

| Route | Hole |
| --- | --- |
| `GET /fragment` | `hub-cwl:html-fragment` |
| `POST /login` | `hub-cwl:credential-store` |
| `GET /upstream` | `hub-cwl:upstream-proxy` |

Do not invent fragment UI or credential stores in CWL.
