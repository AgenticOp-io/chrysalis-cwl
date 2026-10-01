# 73 — drawer, device token, named link lists

`links primary` and `links practice` are separate lists. The header slots use `primary`. The footer slot uses `practice`.

`drawer` writes the menu behavior into the document: the toggle click, Escape, and a link inside the nav. It does not read the user agent or the viewport.

`device host mobile desktop` keeps `<!-- cwl:device -->`. CWL does not choose mobile or desktop. `/bare` has no device token, no drawer targets, and no link slot, so the reasons are `cwl:missing-device-slot`, `cwl:missing-drawer-target`, and `cwl:missing-links-slot`.

CSS, images, and Firebase Hosting stay outside the language.
