# CWL language version

| Field | Value |
| --- | --- |
| **Language** | Chrysalis Web Language (CWL) |
| **Goal** | DNA of web languages. Tip `1.0.84` deepens page forms with `enctype multipart` and `field … "file"` so upload UIs can be said without inventing middleware. |
| **Version** | `1.0.84` |
| **Status** | Page form multipart |
| **Date** | 2026-10-06 |

## What this version means

- RFC-0041 + gold `93`: page `form … enctype multipart` + `field … "file"`
- Emit writes `enctype="multipart/form-data"` and file inputs; host owns transfer/storage
- Prior tip **1.0.83:** progressive asset integrity (SRI / module / crossorigin)

## Gate

```bash
npm run build:webir
CWL_REQUIRE_WEBIR=1 npm run test:language
```
