# DNA Step E — WebIR physical flip (CWL handoff)

**Owner of remaining work:** Convert (`AgenticOp-io/chrysalis`, private)  
**CWL role:** ready consumer + reverse home; **does not** move the package  
**Full checklist:** [`WEBIR-FLIP-REQUESTED.md`](./WEBIR-FLIP-REQUESTED.md)

---

## What CWL already proved

- `link:webir` / `smoke:webir` — resolve `@chrysalis/webir` from pillar without Convert cwd
- Thin CWL → WebIR ingest + golds / matrix (`test:ingest`, `smoke:cwl-ingest-matrix`)
- Optional full bar: `test:language:full`
- `pnpm-workspace.yaml` stub for post-flip `packages/webir`
- Docs: `packages/WEBIR.md`, extract plan Slice 3 deferred as **link-until-pnpm**

Convert already cleared Slice 3.3 (`loadWebir` file-relative). Physical SoR is still Convert.

---

## Exact Convert steps

1. `git mv` (or equivalent) `packages/webir` → `chrysalis-cwl/packages/webir`
2. Convert `packages/webir` → junction / `file:` **into** CWL (one tree only)
3. Retarget Convert workspace consumers; keep hub ST / `hub:cwl-language-pillar-smoke` green
4. Coordinate CWL `runtime-cwl*` deps + `pnpm-workspace.yaml` member if using `workspace:*`
5. Retire PHP_converter webir as SoR
6. Reply with SHA + consumer mode (see flip doc template)

**Do not invent a second WebIR.**

---

## What “done” looks like

| Side | Done when |
| --- | --- |
| Convert | Physical tree gone; consumers resolve CWL home; hub language-pillar smoke green |
| CWL | `packages/webir` is real (or intentional post-flip link); from `chrysalis-cwl` only: |

```bash
npm run smoke:webir
npm run test:ingest
npm run test:language:full
```

all green, with resolve preferring `packages/webir/dist` first.

Until Convert executes the checklist, Step E stays **Requested** — link-until-pnpm remains honest.
