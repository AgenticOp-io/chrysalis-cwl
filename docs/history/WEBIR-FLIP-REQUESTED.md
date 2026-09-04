# WebIR ownership flip — Convert reverse-home

**Status:** **Done on disk** (verified 2026-08-09) — physical SoR in chrysalis-cwl; Convert junctions + `file:`  
**Repos:** private — Convert GitHub is `AgenticOp-io/chrysalis`  
**Convert doc:** `chrysalis-convert/docs/WEBIR-REVERSE-HOME.md`  
**Home:** [`packages/WEBIR.md`](../../packages/WEBIR.md)

---

## Verified (this machine / sibling checkout)

| Check | Result |
| --- | --- |
| Physical `packages/webir` | **chrysalis-cwl** |
| Convert `packages/webir` | Junction → CWL |
| Convert root pin | `"@chrysalis/webir": "file:../chrysalis-cwl/packages/webir"` |
| Setup | `pnpm run link:webir-from-cwl` (also pretest) |

## Still open (Convert hygiene — not CWL genome)

- [ ] Prefer registry pin `@agenticop-io/cwl@1.0.1` (today: `file:` OK) — see [`CONVERT-GRAVITY-REQUESTED.md`](./CONVERT-GRAVITY-REQUESTED.md)
- [ ] Peel/emit gravity closeout (honest holes across peels)
- [ ] Retire any remaining PHP_converter webir SoR leftovers if present on other machines
- [ ] Align stale Convert docs that still say “WebIR under convert” / language `0.1.7`

## CWL prove

```bash
npm run build:webir
npm run link:webir
npm run smoke:webir
npm run test:ingest
```

## Do not

- Invent a second `@chrysalis/webir` under Convert
- Edit WebIR under Convert (edit CWL copy)
- Treat Convert fat `cwl-ingest` as language SoR — golds live here
