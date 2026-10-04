# CWL language version

| Field | Value |
| --- | --- |
| **Language** | Chrysalis Web Language (CWL) |
| **Goal** | DNA of web languages. A language in its own right. Able to replace any web page. Tip `1.0.74` names tables and bound row operations (golds `68`–`82`). The host runs them on sqlite, postgres, mysql, mariadb, sqlserver, or oracle. WebSocket duplex, raw SQL text, and unclassified client script stay holes. |
| **Version** | `1.0.74` |
| **Status** | Database |
| **Date** | 2026-10-04 |

## What this version means

- **Database:** `engine` names sqlite, postgres, mysql, mariadb, sqlserver, or oracle. `table` names columns. `db select`, `db insert`, `db update`, and `db delete` are the same statements on every engine. Request values are parameters. An unknown engine, an unknown column, or an update without `where` does not run
- **Gold `82`:** sqlite executes the module. The same insert is compiled for every engine, and a title that looks like SQL stays a parameter
- Prior tip **1.0.73:** dynamic HTML from host data (gold `81`)

## Gate

```bash
npm run build:webir
CWL_REQUIRE_WEBIR=1 npm run test:language
```
