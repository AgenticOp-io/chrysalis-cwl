# CWL language version

| Field | Value |
| --- | --- |
| **Language** | Chrysalis Web Language (CWL) |
| **Version** | `1.0.16` |
| **Status** | CWL-owned DNA queue **CLOSED** |
| **Date** | 2026-08-09 |

## What this version means

`1.0.16` finishes the queue: tip/doc handoff only — no new language invent.

- Constitution / README / EXIT / PUBLISH / fleet / starter aligned to tip
- Sibling Requested pins → **`@agenticop-io/cwl@1.0.16`**
- [`DNA-BUILD-NEXT.md`](./docs/history/DNA-BUILD-NEXT.md) marked **CLOSED**

## Gate

```bash
npm run build:webir
CWL_REQUIRE_WEBIR=1 npm run test:language
npm run smoke:cwl-emit
```
