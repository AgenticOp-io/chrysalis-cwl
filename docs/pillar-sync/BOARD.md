# Chrysalis sync BOARD (git SoR in CWL)

**Updated:** 2026-10-02 · tip **1.0.70** · **Goal:** DNA of web languages — a language in its own right, able to replace any web page. Convert `920d1329` peels golds `76`–`78`. The live site is still the old HTML until the site lane deploys.  
**Protocol:** [`PROTOCOL.md`](./PROTOCOL.md) · [`COORDINATOR.md`](./COORDINATOR.md)  
**Queue:** [`../history/DNA-BUILD-NEXT.md`](../history/DNA-BUILD-NEXT.md)

```text
FLEET_MODE: on
CWL_FLEET_IDLE: yes
DISPATCH: site lane writes the 1.0.70 emit into brand/agenticops-web and deploys Firebase agenticops
CONVERT_NEXT: none · tip 1.0.70 peeled · golds 76-78 · deviceHost.below · do not deploy Firebase agenticops from Convert
SECURE_NEXT: none · tip 1.0.70 pinned
```

## Tips / pins

| Surface | Value |
| --- | --- |
| **CWL tip** | **`1.0.70`** |
| Packages | **`@agenticop-io/cwl@1.0.70`** (pin; Packages publish when tagged) |
| Tags | `cwl-v1.0.46` · `cwl-v1.0.47` · `cwl-v1.0.56` · `cwl-v1.0.61` · `cwl-v1.0.62` · `cwl-v1.0.67` · `cwl-v1.0.70` |

## Latest SHAs

| Pillar | Branch | SHA | Note |
| --- | --- | --- | --- |
| **CWL** | `main` | efc006c | tip **1.0.70** social card |
| **Convert** | `main` | 920d1329 | peel golds `76`–`78`, host script reads `below` |
| **Secure** | `main` | 24750e2 | tip pin **1.0.70** |

## Who builds next

| Priority | Owner | Work |
| --- | --- | --- |
| **P0** | Site lane | Write the 1.0.70 emit into `brand/agenticops-web` and deploy Firebase project `agenticops` |
| **done** | Convert | Tip pin **1.0.70**, golds `76`–`78`, `920d1329` |
| **done** | Secure | Tip pin **1.0.70**, `24750e2` |
| **done** | CWL | tip **1.0.70** social card, land `efc006c` |
| **done** | CWL | tip **1.0.69** document identity, land `5c8dbfd` |
| **done** | CWL | tip **1.0.68** named viewport cut, land `e5452e1` |
| **done** | Convert | Emit 26 pages, PR #77 `73af128b` |
| **done** | Secure | Tip pin **1.0.67** and site genome, `831bd11` |
| **done** | Convert | Tip pin **1.0.67** (golds 71–75), PR #76 `355f6c5` |
| **done** | CWL | AgenticOps site genome, 26 pages |
| **done** | CWL | tip **1.0.67** script file, same-site form, off-site anchor |
| **done** | CWL | tip **1.0.66** stylesheet, image, Firebase public root |
| **done** | CWL | tip **1.0.65** drawer, device token, named lists |
| **done** | CWL | tip **1.0.64** shared nav list |
| **done** | CWL | tip **1.0.63** host calendar year |
| **done** | Convert / Secure | tip pin **1.0.62** |

## Honesty

Goal: CWL is the DNA of web languages and must be able to replace any web page. The public pages are `fixtures/sites/agenticop-io/site.cwl`. Convert `920d1329` peels that genome, including `deviceHost.below`, title, description, canonical, and the social card. JSON-LD stays in `head html`. The live HTML files and Firebase project `agenticops` stay the site lane. Tip **1.0.70** names `meta robots`, `meta author`, `meta theme`, `meta og`, and `meta twitter`. Tip **1.0.69** names `charset utf-8`, `viewport device`, `title`, `description`, and `canonical`. The viewport meta is a fixed content string. CWL does not evaluate it. The genome also declares `device host mobile desktop below 820`. Tip **1.0.68** names that cut and leaves `<!-- cwl:device -->`. CWL does not call `matchMedia`. Tip **1.0.67** names a script file, writes a same-site form, and emits an off-site anchor. It does not run the script. An off-site form action is `unsupported:offsite-form`. WebSocket and SQL stay holes. No SQL invent. Cookie values never enter CWL. A cookie is session, csrf, or an enumerated preference. A redirect is a same-site path; off-site targets are `unsupported:open-redirect`. A page body may be a multi-line HTML document. `<!-- cwl:head -->` is that page's title and meta. `nav <id>;` is the shared nav id for `<!-- cwl:page -->` and `<!-- cwl:active <page> <class> -->`. No `nav` statement uses the page name. `<!-- cwl:year -->` is the host calendar year. CWL does not read the clock. `link` rows fill every `<!-- cwl:links -->` slot. `links <name>` is a separate list. `drawer` is the menu toggle. `<!-- cwl:device -->` is the host device class. CWL does not read the viewport or the user agent. `style` and `image` name host files. `host firebase` names the public root. CWL does not parse CSS, read image bytes, or deploy. WebSocket stays a hole. No SMTP / CORS / CDN / HTTP-client invent.
