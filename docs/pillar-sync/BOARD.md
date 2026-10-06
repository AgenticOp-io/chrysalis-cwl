# Chrysalis sync BOARD (git SoR in CWL)

**Updated:** 2026-10-05 · tip **1.0.75** · **Goal:** DNA of web languages — a language in its own right, able to replace any web page. Live agenticop.io is genome-emitted (26 pages) but not yet 100% CWL. Parent ask `site-100-cwl` is open.  
**Protocol:** [`PROTOCOL.md`](./PROTOCOL.md) · [`COORDINATOR.md`](./COORDINATOR.md)  
**Queue:** [`../history/DNA-BUILD-NEXT.md`](../history/DNA-BUILD-NEXT.md)

```text
FLEET_MODE: on
CWL_FLEET_IDLE: no
DISPATCH: ASK site-100-cwl (parent INBOX). Tip 1.0.75 pins stay done. Live pages already emitted; 100% contract is the gap
CONVERT_NEXT: idle · tip 1.0.75 · wait for site-100-cwl tip if contract lands
SECURE_NEXT: idle · tip 1.0.75 · wait for tip pin if CWL bumps
CWL_NEXT: open · parent ask site-100-cwl · INBOX-SITE-100-CWL.md · CSS/image bytes, drawer/device, year, fonts, live vs emit, deploy boundary
SITE_NEXT: wait · delete dead ao-layout.js + redeploy after CWL 100% tip · do not hand-edit page HTML
```

## Tips / pins

| Surface | Value |
| --- | --- |
| **CWL tip** | **`1.0.75`** |
| Packages | **`@agenticop-io/cwl@1.0.75`** (pin; Packages publish when tagged) |
| Tags | `cwl-v1.0.46` · `cwl-v1.0.47` · `cwl-v1.0.56` · `cwl-v1.0.61` · `cwl-v1.0.62` · `cwl-v1.0.67` · `cwl-v1.0.70` |

## Latest SHAs

| Pillar | Branch | SHA | Note |
| --- | --- | --- | --- |
| **CWL** | `main` | c5d48cb | tip **1.0.75** host site emit |
| **Convert** | `main` | d38253ad | tip pin **1.0.75**, `CONVERT_TIP_1_0_75_OK`, feature `a629b40f` |
| **Secure** | `main` | e753716 | tip pin **1.0.75**, `CUTOVER_TIP_1_0_75_OK`, feature `8056197` |

## Who builds next

| Priority | Owner | Work |
| --- | --- | --- |
| **P0** | CWL | **Ask `site-100-cwl`.** Parent: close gaps so https://agenticop.io is 100% CWL (CSS/image bytes, drawer/device JS, year, fonts, live vs emit, deploy boundary). Details: [`INBOX-SITE-100-CWL.md`](./INBOX-SITE-100-CWL.md). Live is already genome-emitted; tip **1.0.75** alone is not enough |
| **P1** | Site | After CWL tip: drop dead `ao-layout.js`, keep brand as assets/ops only, redeploy when parent authorizes |
| **P2** | Operator | Optional: `npm run deploy:demo` for https://agenticop-cwl-demo.web.app |
| **done** | Convert | Tip pin **1.0.75**, `CONVERT_TIP_1_0_75_OK`, main `d38253ad` |
| **done** | Secure | Tip pin **1.0.75**, `SECURE_TIP_1_0_75_OK`, main `e753716` |
| **done** | CWL | tip **1.0.75** host site emit, gold `83`, `CWL_HOST_SITE_OK`, land `c5d48cb` |
| **done** | Convert | Demo peel **1.0.74**, `CONVERT_AGENTICOP_SITE_OK`, 26 pages, main `360588ad` |
| **done** | Secure | Tip pin **1.0.74**, `CUTOVER_TIP_1_0_74_OK`, main `44446dc` |
| **done** | CWL | tip **1.0.74** database, land `9f62655` |
| **done** | CWL | tip **1.0.73** dynamic HTML, land `4d849ec` |
| **done** | CWL | tip **1.0.72** live document, land `425b01f` |
| **done** | CWL | tip **1.0.71** remaining head facts, land `4bc7b6b` |
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

Goal: CWL is the DNA of web languages and must be able to replace any web page. The public pages are `fixtures/sites/agenticop-io/site.cwl`. Tip **1.0.74** names `engine` as sqlite, postgres, mysql, mariadb, sqlserver, or oracle, and runs `db select`, `db insert`, `db update`, and `db delete` with request values kept as parameters. Raw SQL text is not a statement. Tip **1.0.73** builds HTML from the request and from host data: `repeat` writes the rows, and `if` chooses the document. `<!-- cwl:device -->` stays. Tip **1.0.72** composes each page from that source on the request. Tip **1.0.71** names `meta keywords`, `icon`, `alternate`, `preconnect`, a page `style`, and `jsonld`. Schema.org is not interpreted. Apple touch icons are written only when declared. Convert `920d1329` still peels golds `76`–`78`. The live HTML files and Firebase project `agenticops` stay the site lane. Tip **1.0.70** names `meta robots`, `meta author`, `meta theme`, `meta og`, and `meta twitter`. Tip **1.0.69** names `charset utf-8`, `viewport device`, `title`, `description`, and `canonical`. The viewport meta is a fixed content string. CWL does not evaluate it. The genome also declares `device host mobile desktop below 820`. Tip **1.0.68** names that cut and leaves `<!-- cwl:device -->`. CWL does not call `matchMedia`. Tip **1.0.67** names a script file, writes a same-site form, and emits an off-site anchor. It does not run the script. An off-site form action is `unsupported:offsite-form`. WebSocket stays a hole. Raw SQL text is not a statement. Cookie values never enter CWL. A cookie is session, csrf, or an enumerated preference. A redirect is a same-site path; off-site targets are `unsupported:open-redirect`. A page body may be a multi-line HTML document. `<!-- cwl:head -->` is that page's title and meta. `nav <id>;` is the shared nav id for `<!-- cwl:page -->` and `<!-- cwl:active <page> <class> -->`. No `nav` statement uses the page name. `<!-- cwl:year -->` is the host calendar year. CWL does not read the clock. `link` rows fill every `<!-- cwl:links -->` slot. `links <name>` is a separate list. `drawer` is the menu toggle. `<!-- cwl:device -->` is the host device class. CWL does not read the viewport or the user agent. `style` and `image` name host files. `host firebase` names the public root. CWL does not parse CSS, read image bytes, or deploy. WebSocket stays a hole. No SMTP / CORS / CDN / HTTP-client invent.
