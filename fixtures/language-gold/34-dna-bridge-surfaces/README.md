# `34-dna-bridge-surfaces` — RFC-0022 deepen (1.0.24)

Seeds draft DNA for genes already in the genome but lagging the bridge:

- SSE (`stream sse;`) → `content_class: other` + `bridge.annotations[].cwl_stream`
- Multipart field/file names → `request_key_fingerprint` + annotation lists
- `HEAD` method → identity seed (parser already accepts)

**runtime-ok** — same simulate paths as golds `31` / `32` plus HEAD.
