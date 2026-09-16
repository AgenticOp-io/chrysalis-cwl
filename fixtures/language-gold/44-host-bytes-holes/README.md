# `44-host-bytes-holes` — precise host-byte residuals (tip 1.0.35)

Not runtime-ok: the host executor produces the bytes. What CWL *does* keep is the
route, the effect, and the **declared media type** — those survive ingest and thin
emit even though the body is a hole.

| Route | Declared `content-type` | Hole |
| --- | --- | --- |
| `GET /device/:id/qr` | `image/png` | `hub-cwl:binary-render` |
| `GET /device/:id/config` | `text/plain; charset=utf-8` | `hub-cwl:binary-render` |
| `POST /device/:id/keypair` | `application/json` | `hub-cwl:keypair-gen` |

These reasons exist so keypair and byte-rendering residuals stop borrowing
`hub-cwl:upstream-proxy`, which since RFC-0033 means only the transfer mechanics of
a declared forward. Do not invent crypto or image encoders in CWL.
