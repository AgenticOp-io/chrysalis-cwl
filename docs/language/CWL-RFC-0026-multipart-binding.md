# CWL RFC-0026 — Multipart field / file bindings

**Status:** accepted (2026-08-11)  
**Tip:** **1.0.21**  
**Extends:** [RFC-0005](CWL-RFC-0005-request-body.md) · replaces catalogued `unsupported:multipart` upload shell when field/file parts are named

## Summary

Declare `multipart/form-data` **part bindings** without inventing upload middleware, disk stores, or streaming parsers.

## Syntax

```cwl
@route POST "/upload"
handler upload {
  effects: none;
  multipart field title;
  multipart file avatar;
  return { ok: true, title: title, avatar: avatar };
}
```

| Construct | WebIR |
| --- | --- |
| `multipart field name;` | `data.requestField` source `body`, provenance `cwl:multipart-field` |
| `multipart file name;` | `data.requestField` source `body`, provenance `cwl:multipart-file` |

Part names participate in return/load bindings like `body` params (sandbox reads the same body map).

## Verify

- Gold `fixtures/language-gold/31-multipart-binding`
- Round-trip parse → print → emit recovers `multipart field` / `multipart file`

## Non-goals

- Real multipart streaming parsers, temp-file stores, or virus-scan pipelines
- Nest / LiveView / Flutter upload façades
- Residual nested/streaming multipart shapes stay `hole unsupported:multipart;` when not named as field/file bindings
