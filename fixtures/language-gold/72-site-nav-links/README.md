# 72 — shared nav list

`link` rows are the site nav that `ao-layout.js` used to inject into an empty header. `<!-- cwl:links <base> <active> -->` expands every copy, so the desktop list and the mobile drawer share one list. A row with `class` uses that class instead of the base class. The active class is added only when the row id matches the nav id.

`/bare` declares a link and has no slot, so the reason is `cwl:missing-links-slot`.

The Menu button is document text. Opening the drawer and setting `data-ao-device` stay `unsupported:opaque-script`. CSS, images, and Firebase Hosting stay outside the language.
