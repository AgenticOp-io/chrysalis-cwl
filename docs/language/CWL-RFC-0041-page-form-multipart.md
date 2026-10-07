# CWL-RFC-0041 — Page form file + multipart enctype

**Status:** Accepted · Tip **1.0.84**  
**Gold:** `fixtures/language-gold/93-page-form-multipart/routes.cwl`

## Why this deepens DNA

API routes already bind `multipart file` (RFC-0026). Page layouts could only declare text-like fields, so an upload UI could not be said honestly on `@page` / `layout` without inventing middleware. Tip **1.0.84** closes that page-replace gap: a same-site form may declare `enctype multipart` and `field … "file"`.

## Syntax

```cwl
layout site {
  form upload method post action "/upload" enctype multipart;
  field resume "file";
  field note "text";
  submit "Upload";
  chrome html """
<!doctype html><html><body>
<!-- cwl:form upload -->
<!-- cwl:body -->
</body></html>
""";
}
```

| Form | Meaning |
| --- | --- |
| `form … enctype multipart;` | Emit `enctype="multipart/form-data"` |
| `field <name> "file";` | File input — only when the current form has `enctype multipart` |

## Holes

| Reason | When |
| --- | --- |
| `cwl:file-needs-multipart` | `field … "file"` without `enctype multipart` |
| `cwl:multipart-not-get` | `enctype multipart` on a GET form |

`unsupported:offsite-form` and `unsupported:multipart` (API residual beyond RFC-0026) stay unchanged.

## Non-goals

- Upload middleware, virus scan, storage, or size limits (host)
- Inventing Nest/LiveView/Flutter façades
- GET multipart bodies

## Prove

```bash
npm run test:language
```
