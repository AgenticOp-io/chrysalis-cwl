# 76 — named viewport cut

`device host mobile desktop below 820;` names the narrow-viewport cut. `<!-- cwl:device -->` stays in the document. CWL does not call `matchMedia`, read the user agent, or write `mobile` or `desktop` into the attribute.

`/bare` has no token, so the reason is `cwl:missing-device-slot`.
