# AgenticOps public site genome

`site.cwl` is the source of the 26 public pages (home through the 404 document). Emit produces those pages.

The shared shell names the stylesheet, the logo, the Firebase public root, the host year token, `charset utf-8`, `viewport device`, and `device host mobile desktop below 820`. Each page names `title`, and names `description`, `canonical`, and the social card (`meta robots`, `meta author`, `meta theme`, `meta og`, `meta twitter`) when the HTML page has them. JSON-LD stays in `head html`. Header and footer lists are `link` rows. The menu is `drawer`. The module does not load `ao-layout.js`. Open Graph stays in `head html`.

CWL does not read the clock, parse the CSS file, read the image bytes, or deploy. An off-site form is not in this site. Contact uses mailto links in the page body.

```bash
npm run smoke:agenticop-site
```

Rebuild the snapshot from the current public HTML with `node scripts/build-agenticop-site-genome.mjs`. That reads `brand/agenticops-web` and does not edit it.
