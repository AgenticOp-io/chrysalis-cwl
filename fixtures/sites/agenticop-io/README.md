# AgenticOps public site genome

`site.cwl` is the source of the 26 public pages (home through the 404 document). Emit produces those pages.

The shared shell names the stylesheet, the logo, the Firebase public root, the host year token, and `device host mobile desktop below 820`. Header and footer lists are `link` rows. The menu is `drawer`. The module does not load `ao-layout.js`.

CWL does not read the clock, parse the CSS file, read the image bytes, or deploy. An off-site form is not in this site. Contact uses mailto links in the page body.

```bash
npm run smoke:agenticop-site
```

Rebuild the snapshot from the current public HTML with `node scripts/build-agenticop-site-genome.mjs`. That reads `brand/agenticops-web` and does not edit it.
