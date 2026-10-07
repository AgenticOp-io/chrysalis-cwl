# CWL-RFC-0040 — Progressive asset integrity

**Status:** Accepted · Tip **1.0.83**  
**Gold:** `fixtures/language-gold/92-asset-integrity/routes.cwl`

## Why this deepens DNA

Other page languages name a script URL and leave Subresource Integrity to HTML copy-paste. CWL already names `script` / `style` as document facts. Tip **1.0.83** binds **SRI**, optional **`module`**, and **`crossorigin`** in the genome so emit writes honest tags without inventing a JS runtime — shrinking the need for `unsupported:opaque-script` when the peel can declare a named file.

## Syntax

```cwl
layout site {
  style "/app.css" integrity "sha384-…" crossorigin;
  script "/site.js" integrity "sha384-…" crossorigin;
  script "/editor.mjs" module integrity "sha384-…";
  chrome html """
<!doctype html><html><head>
<!-- cwl:style -->
<!-- cwl:script -->
</head><body><!-- cwl:body --></body></html>
""";
}
```

| Form | Meaning |
| --- | --- |
| `script "<src>";` | Named classic script (unchanged) |
| `script "<src>" module …;` | `type="module"` (browser-deferred; no invent) |
| `script "<src>" … integrity "<sri>" …;` | SRI token on the tag |
| `script "<src>" … crossorigin;` | `crossorigin="anonymous"` |
| `style "<href>" …;` | Same integrity / crossorigin rules (no `module`) |

Trailing tokens must appear in order: `module` (script only) → `integrity "…"` → `crossorigin`.

## Holes

| Reason | When |
| --- | --- |
| `cwl:bad-integrity` | Empty or non-SRI integrity |
| `cwl:bad-asset-url` | Not same-site path or absolute http(s) |
| `cwl:bad-asset-tail` | Unknown trailing tokens |

## Non-goals

- Computing or verifying hashes inside CWL (host / CI supply the SRI string)
- Executing or parsing JS/CSS
- Nest / LiveView / Flutter façades
- Closing `unsupported:opaque-script` for unclassified peels (still a residual)

## Prove

```bash
npm run test:language
```
