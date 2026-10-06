# AgenticOps public site genome

`site.cwl` is the source of the 26 public pages (home through the 404 document). Emit produces those pages.

The shared shell names the stylesheet, the logo, the Firebase public root, the host year token, `charset utf-8`, `viewport device`, and `device host mobile desktop below 820`. Each page names `title`, and names `description`, `canonical`, the social card, `meta keywords`, `icon`, `alternate`, `preconnect`, a font `style`, and `jsonld` when the HTML page has them. `apple` is only on the pages that have a touch icon. Header and footer lists are `link` rows. The menu is `drawer`. The module does not load `ao-layout.js`. Schema.org is not interpreted.

**100% contract:** [`docs/language/CWL-SITE-100.md`](../../../docs/language/CWL-SITE-100.md). Asset bytes live in [`assets/`](./assets/). Brand `agenticops-web` is ops/mirrors only — not a second page source.

```bash
npm run smoke:agenticop-site
npm run smoke:cwl-site-100
npm run live -- fixtures/sites/agenticop-io/site.cwl --port 8791
npm run emit:site -- fixtures/sites/agenticop-io/site.cwl --out out/agenticop-cwl-demo --year 2026
npm run deploy:demo -- --dir out/agenticop-cwl-demo --site agenticop-cwl-demo --dry-run
```

`emit:site` defaults `--assets` to `./assets` when present. Host effects fill year, device, and drawer. Live Firebase `agenticops` deploy stays ops.

Rebuild the snapshot from the current public HTML with `node scripts/build-agenticop-site-genome.mjs`. That reads `brand/agenticops-web` and does not edit it.
