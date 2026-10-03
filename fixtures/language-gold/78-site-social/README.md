# 78 — social card

`meta robots`, `meta author`, `meta theme`, `meta og`, and `meta twitter` fill `<!-- cwl:meta -->`. Open Graph uses `property`. Twitter uses `name`. JSON-LD stays in `head html`.

`/bare` has no marker, so the reason is `cwl:missing-meta-slot`. `red` is `cwl:meta-theme`. `javascript:alert(1)` is `cwl:meta-not-url`. `tracker` is `cwl:meta-twitter-card`. Those values are not written.
