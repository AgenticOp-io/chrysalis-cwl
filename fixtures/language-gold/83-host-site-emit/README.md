# 83 — host site emit

The host writes static HTML from the genome for a demo Hosting site. `year host` and `device host` are filled by the host pass. `style` and `image` stay URL references unless `--assets` copies those host files. `host firebase` names the demo target. Live `agenticops` / `agenticop.io` are refused by the deploy host.

CWL does not call `firebase deploy` inside the parser. No Cloud Function is required for this static path.
