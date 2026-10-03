# Chrysalis sync BOARD (git SoR in CWL)

**Updated:** 2026-10-02 · tip **1.0.67** · **Goal:** DNA of web languages — a language in its own right, able to replace any web page. The public site genome is `fixtures/sites/agenticop-io/site.cwl` (26 pages). WebSocket, SQL, and unclassified script stay holes.  
**Protocol:** [`PROTOCOL.md`](./PROTOCOL.md) · [`COORDINATOR.md`](./COORDINATOR.md)  
**Queue:** [`../history/DNA-BUILD-NEXT.md`](../history/DNA-BUILD-NEXT.md)

```text
FLEET_MODE: on
CWL_FLEET_IDLE: no
DISPATCH: Convert emit the site genome · Secure pin 1.0.67
CONVERT_NEXT: emit fixtures/sites/agenticop-io/site.cwl · replace the year and device tokens on the host · do not inject ao-layout.js
SECURE_NEXT: pin 1.0.67
```

## Tips / pins

| Surface | Value |
| --- | --- |
| **CWL tip** | **`1.0.67`** |
| Packages | **`@agenticop-io/cwl@1.0.67`** (pin; Packages publish when tagged) |
| Tags | `cwl-v1.0.46` · `cwl-v1.0.47` · `cwl-v1.0.56` · `cwl-v1.0.61` · `cwl-v1.0.62` |

## Latest SHAs

| Pillar | Branch | SHA | Note |
| --- | --- | --- | --- |
| **CWL** | `main` | dafbce0 | tip **1.0.67** land |

## Who builds next

| Priority | Owner | Work |
| --- | --- | --- |
| **P0** | Convert | Emit `fixtures/sites/agenticop-io/site.cwl`. Do not inject `ao-layout.js` |
| **P0** | Secure | Tip pin **1.0.67** |
| **done** | Convert | Tip pin **1.0.67** (golds 71–75), PR #76 `355f6c5` |
| **done** | CWL | AgenticOps site genome, 26 pages |
| **done** | CWL | tip **1.0.67** script file, same-site form, off-site anchor |
| **done** | CWL | tip **1.0.66** stylesheet, image, Firebase public root |
| **done** | CWL | tip **1.0.65** drawer, device token, named lists |
| **done** | CWL | tip **1.0.64** shared nav list |
| **done** | CWL | tip **1.0.63** host calendar year |
| **done** | Convert / Secure | tip pin **1.0.62** |

## Honesty

Goal: CWL is the DNA of web languages and must be able to replace any web page. The public pages are `fixtures/sites/agenticop-io/site.cwl`. Tip **1.0.67** names a script file, writes a same-site form, and emits an off-site anchor. It does not run the script. An off-site form action is `unsupported:offsite-form`. WebSocket and SQL stay holes. No SQL invent. Cookie values never enter CWL. A cookie is session, csrf, or an enumerated preference. A redirect is a same-site path; off-site targets are `unsupported:open-redirect`. A page body may be a multi-line HTML document. `<!-- cwl:head -->` is that page's title and meta. `nav <id>;` is the shared nav id for `<!-- cwl:page -->` and `<!-- cwl:active <page> <class> -->`. No `nav` statement uses the page name. `<!-- cwl:year -->` is the host calendar year. CWL does not read the clock. `link` rows fill every `<!-- cwl:links -->` slot. `links <name>` is a separate list. `drawer` is the menu toggle. `<!-- cwl:device -->` is the host device class. CWL does not read the viewport or the user agent. `style` and `image` name host files. `host firebase` names the public root. CWL does not parse CSS, read image bytes, or deploy. WebSocket stays a hole. No SMTP / CORS / CDN / HTTP-client invent.
