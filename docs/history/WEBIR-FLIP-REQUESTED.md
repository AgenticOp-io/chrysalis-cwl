# WebIR ownership flip — Requested: Convert

**Status:** CWL ready; **physical flip = Convert agent only**  
**Policy:** link-until-pnpm (locked 2026-08-05) until Convert proves consumers after reverse junction / `file:`  
**Repos:** private — Convert GitHub is `AgenticOp-io/chrysalis` (not a public npm/WebIR fork)  
**One-pager:** [`DNA-STEP-E-WEBIR.md`](./DNA-STEP-E-WEBIR.md) · plan: [`WEBIR-EXTRACT-PLAN.md`](./WEBIR-EXTRACT-PLAN.md) · home: [`packages/WEBIR.md`](../../packages/WEBIR.md)  
**Refreshed:** 2026-08-08 (DNA Step E — CWL handoff; no second WebIR)

---

## Do not

- Invent a second `@chrysalis/webir` under Convert
- Leave physical trees in both pillars (one SoR only)
- Flip without retargeting Convert `workspace:*` consumers
- Expect CWL to `git mv` out of Convert

---

## CWL already proved (no Convert cwd)

| Proof | Command (from `chrysalis-cwl`) |
| --- | --- |
| Junction home | `npm run link:webir` → `packages/webir` → sibling convert |
| Resolve + ModuleBuilder | `npm run smoke:webir` |
| Thin ingest + golds | `npm run test:ingest` / `smoke:cwl-ingest-matrix` |
| Language + ingest matrix | `npm run test:language:full` |
| Pillar workspace stub | `pnpm-workspace.yaml` comments future `packages/webir` |
| Loader order | `scripts/hub-ingest/load-webir.mjs` (pillar → sibling → package) |

Convert Slice 3.3 (`loadWebir` without cwd-only hack) is already done on Convert side.

---

## Convert checklist (execute in order)

- [ ] **1. Coordinate move** — From Convert (`AgenticOp-io/chrysalis`): `git mv packages/webir` into `chrysalis-cwl/packages/webir` (or copy + delete with history note). CWL does not perform this move.
- [ ] **2. Reverse home** — Convert `packages/webir` becomes junction / symlink / `"@chrysalis/webir": "file:../chrysalis-cwl/packages/webir"` pointing **at CWL**. Remove any leftover physical duplicate.
- [ ] **3. Retarget workspace** — Update Convert pnpm `packages/*` / ~14 `"@chrysalis/webir": "workspace:*"` consumers so resolve stays green (workspace protocol or `file:` — pick one, document it).
- [ ] **4. Pillar workspace (with CWL)** — Uncomment / enable `packages/webir` in CWL `pnpm-workspace.yaml` if using `workspace:*` from CWL `runtime-cwl*`; else set those deps to `file:../webir`. Coordinate — do not leave broken `workspace:*` with no workspace member.
- [ ] **5. Retire leftovers** — Drop PHP_converter / legacy webir junctions as source of truth (Slice 3.5).
- [ ] **6. Prove Convert** — Run acceptance commands below; reply with Convert SHA + what path consumers use (`workspace:*` vs `file:`).
- [ ] **7. Hand back** — CWL agent re-runs prove commands (below) from `chrysalis-cwl` cwd only.

---

## Acceptance commands (Convert must run)

From **Convert** root after flip:

```bash
# WebIR package builds and resolves for hub
pnpm --filter @chrysalis/webir build
# Prefer the lane’s existing language-pillar smoke (name may match your scripts):
pnpm run hub:cwl-language-pillar-smoke
# Plus at least one ST / hub sample that imports @chrysalis/webir (your usual GCE/full prove path)
```

Must show:

1. `import("@chrysalis/webir")` (or workspace link) works **without** `process.cwd()` == Convert root hacks beyond Slice 3.3 fallbacks.
2. No second physical `packages/webir` tree under Convert (only junction/`file:` → CWL).
3. Hub ST / language-pillar smoke green.

---

## CWL prove commands (after Convert replies)

From **`chrysalis-cwl`** (physical `packages/webir` or refreshed link — **not** Convert cwd):

```bash
npm run smoke:webir
npm run test:ingest
npm run test:language:full
```

Expected: pillar home resolves `packages/webir/dist` first; ingest golds + matrix green; language gates unchanged.

---

## Reply template (Convert → CWL)

```
WebIR flip done
Convert SHA: <sha>
Consumer mode: workspace:* | file:../chrysalis-cwl/packages/webir
Convert prove: hub:cwl-language-pillar-smoke <ok|fail>
PHP_converter webir retired: <yes|no>
```

CWL then runs the three prove commands and closes Step E in the DNA note.
