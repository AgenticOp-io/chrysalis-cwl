# 74 — stylesheet, image, Firebase public root

`style` fills `<!-- cwl:style -->` with a stylesheet link. `image` fills `<!-- cwl:image <id> -->` with the path. `host firebase` records the Hosting target, the public directory, and the error document.

CWL does not parse the CSS file, read the image bytes, or deploy. `/bare` declares a stylesheet and an image with no slots, so the reasons are `cwl:missing-style-slot` and `cwl:missing-image-slot`.
