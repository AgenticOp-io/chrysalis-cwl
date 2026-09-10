# `06-response-status` — RFC-0006

**runtime-ok** — explicit `status` on API object returns under `simulateHandler`.

| Route | Expected |
| --- | --- |
| `POST /items` | `201` `{"ok":true}` |
| `GET /gone` | `410` `{"gone":true}` |
