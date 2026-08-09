# WebIR ownership flip — Requested: Convert

**Status:** CWL physical SoR **landed** (`packages/webir` in chrysalis-cwl). **Convert must reverse-home.**  
**Repos:** private — Convert GitHub is `AgenticOp-io/chrysalis` (local: `engines/chrysalis-convert`)  
**One-pager:** [`DNA-STEP-E-WEBIR.md`](./DNA-STEP-E-WEBIR.md) · plan: [`WEBIR-EXTRACT-PLAN.md`](./WEBIR-EXTRACT-PLAN.md) · home: [`packages/WEBIR.md`](../../packages/WEBIR.md)  
**Refreshed:** 2026-08-09 (CWL took physical tree; Convert cutover remaining)

---

## Do not

- Invent a second `@chrysalis/webir` under Convert
- Leave Convert’s physical tree as SoR after cutover (edit CWL copy only)
- Flip Convert consumers without retargeting `workspace:*`
- Expect CWL to edit Convert from this lane

---

## CWL done

| Proof | Command / path |
| --- | --- |
| Physical package | `packages/webir` (src + package.json; `dist/` built via `npm run build:webir`) |
| Workspace member | `pnpm-workspace.yaml` → `packages/webir` |
| Resolve + ModuleBuilder | `npm run smoke:webir` |
| Thin ingest + golds | `npm run test:ingest` / `smoke:cwl-ingest-matrix` |
| Loader order | `scripts/hub-ingest/load-webir.mjs` (pillar → sibling → package) |

---

## Convert checklist (execute now)

- [ ] **1. Reverse home** — Replace Convert `packages/webir` with junction / symlink / `"@chrysalis/webir": "file:../chrysalis-cwl/packages/webir"`. Delete Convert’s physical duplicate after consumers resolve.
- [ ] **2. Retarget workspace** — Update Convert pnpm `packages/*` / `"@chrysalis/webir": "workspace:*"` consumers so resolve stays green (`workspace:*` only if Convert lists the CWL path, else `file:`).
- [ ] **3. Retire leftovers** — Drop PHP_converter / legacy webir junctions as SoR.
- [ ] **4. Prove Convert** — Acceptance commands below; reply with Convert SHA + consumer mode.
- [ ] **5. Pin language** — Prefer registry `@agenticop-io/cwl@1.0.0` (or keep `file:` for CWL language package) — see [`EXIT-1.0.md`](./EXIT-1.0.md).

---

## Acceptance commands (Convert must run)

From **Convert** root after reverse home:

```bash
pnpm --filter @chrysalis/webir build   # or build via CWL path
pnpm run hub:cwl-language-pillar-smoke
```

Must show:

1. `import("@chrysalis/webir")` resolves **without** a second physical Convert tree as SoR.
2. Hub ST / language-pillar smoke green.

---

## CWL prove (already green path)

```bash
npm run build:webir
npm run link:webir
npm run smoke:webir
npm run test:ingest
```

---

## Reply template (Convert → CWL)

```
WebIR flip done
Convert SHA: <sha>
Consumer mode: workspace:* | file:../chrysalis-cwl/packages/webir
Convert prove: hub:cwl-language-pillar-smoke <ok|fail>
PHP_converter webir retired: <yes|no>
```
