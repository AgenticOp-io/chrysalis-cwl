# `64-cookie-purpose` — RFC-0034

A site may keep a **session** cookie and a **preference** whose legal values are listed in the genome (theme, device, locale). Those are useful and are not a joinable profile.

An undeclared cookie name and `samesite none` are `unsupported:tracking-cookie`. The cookie value never enters CWL.

## Checks

| Route | Surface |
| --- | --- |
| `GET /` | `cookie theme purpose preference values light dark` + load class |
| `GET /me` | `cookie sid purpose session` + `auth.require cookie sid` |
| `POST /login` | `samesite none` refused |
| `GET /ad` | bare `cookie _ga` refused |
