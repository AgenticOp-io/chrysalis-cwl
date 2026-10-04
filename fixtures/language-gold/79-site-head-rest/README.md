# 79 — remaining head facts

`meta keywords` fills `<!-- cwl:meta -->` with the rest of the card. `icon` resolves a declared `image`. `apple` adds the touch icon only when it is written. `alternate`, `preconnect`, and a page `style` fill their markers. `jsonld` is the raw JSON-LD document inside `<!-- cwl:jsonld -->`. Schema.org is not interpreted. CWL does not fetch the font host.

`/bare` has no markers, so the reasons are `cwl:missing-icon-slot`, `cwl:missing-alternate-slot`, `cwl:missing-jsonld-slot`, and `cwl:missing-preconnect-slot`. `ghost` is `cwl:unknown-icon`. `javascript:alert(1)` is `cwl:preconnect-not-url` and `cwl:alternate-not-url`. `not-json` is `cwl:jsonld-not-json`. A block that contains `</script>` is `cwl:jsonld-closes-script`. Those values are not written.
