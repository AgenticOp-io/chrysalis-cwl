# 77 — document identity

`charset utf-8` and `viewport device` are layout facts. `title`, `description`, and `canonical` are page facts. The markers become the charset meta, the HTML viewport meta, the title element, the description meta, and the canonical link.

`viewport device` writes `width=device-width, initial-scale=1`. CWL does not evaluate that content.

`/bare` has no markers, so the reasons are `cwl:missing-charset-slot`, `cwl:missing-viewport-slot`, `cwl:missing-title-slot`, and `cwl:missing-description-slot`. `javascript:alert(1)` is `cwl:canonical-not-url` and is not written. Open Graph stays in `head html`.
