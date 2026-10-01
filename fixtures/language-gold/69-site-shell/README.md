# 69 — shared document shell

One layout holds the document. Each page fills `<!-- cwl:head -->` and `<!-- cwl:body -->`. `<!-- cwl:page -->` is the page name. `<!-- cwl:active <page> <class> -->` inserts that class only on the matching page.

`/bare` declares a head with no slot, so the title stays out of the response and the reason is `cwl:missing-head-slot`.

The menu toggle, viewport script, CSS file, images, and hosting stay outside the language. `unsupported:opaque-script` remains on the shell.
