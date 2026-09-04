# `@chrysalis/webir` — home in the CWL pillar

**Canonical home:** this language pillar (`chrysalis-cwl`) — physical `packages/webir`.  
**Convert:** reverse-homed (junction + `file:` → here) — verified ([`WEBIR-FLIP-REQUESTED.md`](../docs/history/WEBIR-FLIP-REQUESTED.md)).  
**Policy:** one WebIR SoR. CWL does not ship a fork. Pillar GitHub repos are public (see `PRIVATE-PILLARS.md`).

## Why here

WebIR is the Rosetta twin of CWL. Parse / print / ingest / emit are language genome work — the IR belongs with the tongue.

```bash
npm run build:webir   # tsc in packages/webir
npm run link:webir    # no-op when physical home present; legacy junction fallback
npm run smoke:webir   # ModuleBuilder + dialects via load-webir.mjs
npm run test:ingest   # CWL → WebIR golds
npm run test:language:full
```

`pnpm-workspace.yaml` lists `packages/webir`. `dist/` stays gitignored — build after clone.

## Resolve order (`scripts/hub-ingest/load-webir.mjs`)

1. `packages/webir/dist/index.js` (physical home)
2. Sibling `../chrysalis-convert/packages/webir/dist/index.js` (pre-cutover Convert leftover)
3. `import("@chrysalis/webir")` when a `file:` / workspace dep is installed

## Convert checklist (remaining)

Convert reverse-home is **done**. Remaining Convert work is gravity / registry pin — not a second WebIR tree.

| # | Blocker | Owner |
| --- | --- | --- |
| 3.1 | ~~Physical tree in chrysalis-cwl~~ | **Done (CWL)** |
| 3.2 | ~~Convert replace tree with junction / `file:` → CWL~~ | **Done (Convert)** |
| 3.4 | Keep `workspace:*` consumers green via junction | Convert hygiene |
| 3.5 | Retire PHP_converter webir leftovers if any | Convert |

## Related

| Item | Role |
| --- | --- |
| `npm run build:webir` | Build in-pillar |
| `npm run link:webir` | Verify home / legacy junction |
| `npm run smoke:webir` | Resolve smoke |
| Flip ask | [`docs/history/WEBIR-FLIP-REQUESTED.md`](../docs/history/WEBIR-FLIP-REQUESTED.md) |
| Private repos | `docs/history/PRIVATE-PILLARS.md` |
