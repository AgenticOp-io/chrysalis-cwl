# CWL RFC-0034 — Cookie purpose

**Status:** accepted (2026-09-26)  
**Tip:** `1.0.56` · gold `64-cookie-purpose`  
**Extends:** RFC-0004 (cookie binding) · RFC-0014 (classified device token) · RFC-0032 (session cookie name)

## Summary

A cookie that is a stable identifier can be joined across requests and sold. CWL keeps the cookies a site needs and refuses that identifier.

| Purpose | Declares | May do | May not |
| --- | --- | --- | --- |
| `session` | name only | login continuity; `samesite lax` or `strict` | a value in CWL; `samesite none`; appear in HTML |
| `csrf` | name only | bind a form to the session | a second profile or a value list |
| `preference` | name + closed class list | theme, locale, device class | a unique id (the genome would have to list every person) |

Anything else — a bare name, a value list on a session, `samesite none` — is `hole unsupported:tracking-cookie`. No tracking runtime is invented.

```cwl
cookie theme purpose preference values light dark;
cookie sid purpose session;

effects: session.mint cookie sid httponly secure samesite lax;
```

`samesite` on a session cookie is `lax` or `strict`. `none` is the cross-site identity flag and is refused.

Preference classes are short tokens (`phone`, `desktop`, `light`, `dark`): at least two, at most eight. A per-visitor id cannot be written down as that list.

Session and CSRF names are not spliced into HTML. A preference may show its **class** through a load binding (`theme`), which is one of the declared values, not a joinable id.

## What stays with the host

The host mints the session token, sets `HttpOnly`, and refuses a `Set-Cookie` whose name is not one of these purposes or whose preference value is outside the declared list. CWL records the intent. It does not store the token.

The language runtime drops `__cwl_cookie_purpose` before simulation. The declaration stays in WebIR for emit. Cookie values still come from the request, never from the genome.
