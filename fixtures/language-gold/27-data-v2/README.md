# `27-data-v2` — RFC-0013 v2 load redirect / error / cookie

**runtime-ok** — Data v2 shapes already in grammar; this gold proves Rosetta + `runtime-cwl`.

| Route | Expected |
| --- | --- |
| `GET /go` | `302` · `Location: /landed` (body empty) |
| `GET /missing` | `404` (load error; HTML body not rendered) |
| `GET /who` + `Cookie: session_id=abc` | `200` HTML + page-load JSON with `sessionId` |
