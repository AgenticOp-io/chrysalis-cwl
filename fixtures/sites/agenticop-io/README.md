# AgenticOps public site genome

`site.cwl` is the source of the 26 public pages (home through the 404 document). Emit produces those pages.

Footer carries the **CWL Certified** seal (`assets/cwl-certified.svg`) — language-of-record mark: genome · emit:site · tip verified.

**Tip 1.0.78 complete form:** literal `year 2026;`, checkbox menu + owned CSS (no host drawer/device JS), owned fonts under [`assets/`](./assets/), certified `emit:site` freeze for Firebase. Contract: [`docs/language/CWL-SITE-COMPLETE.md`](../../../docs/language/CWL-SITE-COMPLETE.md). Token `CWL_SITE_COMPLETE_OK`.

The shell names stylesheet, fonts, logo, Firebase public root, charset, and viewport. Each page names `title`, and names `description`, `canonical`, social card, keywords, `icon`, `alternate`, and `jsonld` when present. Header and footer lists are `link` rows. The module does not load `ao-layout.js`. Schema.org is not interpreted.

Brand `agenticops-web` is ops/mirrors only — not a second page source.

```bash
npm run smoke:agenticop-site
npm run smoke:cwl-site-complete
npm run emit:site -- fixtures/sites/agenticop-io/site.cwl --out out/agenticop-site
npm run deploy:demo -- --dir out/agenticop-site --site agenticop-cwl-demo
```

`emit:site` defaults `--assets` to `./assets` when present. Live Firebase `hosting:agenticops` deploy stays the site lane.
