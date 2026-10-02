# 75 — script file, same-site form, off-site anchor

`script` fills `<!-- cwl:script -->` with a deferred script tag. `form` fills `<!-- cwl:form <id> -->` when the action is a same-site path. `link … target blank rel noopener` is an off-site anchor.

CWL does not parse or run the script file. An off-site form action is `unsupported:offsite-form` and is not written into the page. `/bare` has no script or form slot, so the reasons are `cwl:missing-script-slot` and `cwl:missing-form-slot`.
