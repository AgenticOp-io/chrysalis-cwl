# CWL language version

| Field | Value |
| --- | --- |
| **Language** | Chrysalis Web Language (CWL) |
| **Goal** | DNA of web languages. A language in its own right. Able to replace any web page. Tip `1.0.67` replaces a document that names a script, a same-site form, and an off-site anchor (golds `68`–`75`). WebSocket duplex, SQL engines, and unclassified client script stay holes. |
| **Version** | `1.0.67` |
| **Status** | RFC-0029 deepen — script file, same-site form, off-site anchor |
| **Date** | 2026-10-01 |

## What this version means

- **RFC-0029 deepen:** `script` names a script file. `form` writes a same-site form. `link … target blank rel` is an off-site anchor
- **Gold `75`:** CWL does not parse or run the script. An off-site form action is `unsupported:offsite-form`
- Prior tip **1.0.66:** stylesheet, image, Firebase public root (gold `74`)

## Gate

```bash
npm run build:webir
CWL_REQUIRE_WEBIR=1 npm run test:language
```
