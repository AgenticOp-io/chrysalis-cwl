# CWL language version

| Field | Value |
| --- | --- |
| **Language** | Chrysalis Web Language (CWL) |
| **Goal** | DNA of web languages. A language in its own right. Able to replace any web page. Tip `1.0.73` builds HTML from the request and host data (golds `68`–`81`). WebSocket duplex, SQL engines, and unclassified client script stay holes. |
| **Version** | `1.0.73` |
| **Status** | Dynamic HTML emit |
| **Date** | 2026-10-03 |

## What this version means

- **Dynamic HTML:** `repeat` walks host rows, including a nested list and `else html` for an empty collection. `if` / `else if` / `else` choose a different document when the comparison is against the request or that data. CWL does not query a database
- **Gold `81`:** the same board page renders open notes, an empty list, or a closed document. A note page renders one host record or the missing branch
- Prior tip **1.0.72:** live document host (gold `80`)

## Gate

```bash
npm run build:webir
CWL_REQUIRE_WEBIR=1 npm run test:language
```
