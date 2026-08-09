# Secure cutover default — Requested (DNA evolution Step G)

**Status:** Requested — Secure / Helix agent owns implementation  
**From:** CWL pillar (`chrysalis-cwl` @ `0.1.9+`)  
**Secure repo:** private [`AgenticOp-io/chrysalis-security`](https://github.com/AgenticOp-io/chrysalis-security) (local: `engines/chrysalis-security`)  
**Related:** [DNA-EVOLUTION-0.1.9.md](./DNA-EVOLUTION-0.1.9.md) Step G · [RFC-0022](../language/CWL-RFC-0022-dna-surface-bridge.md) · [RFC-0023](../language/CWL-RFC-0023-deploy-dna-profiles.md) · [PRIVATE-PILLARS.md](./PRIVATE-PILLARS.md)

## Ask (one sentence)

Make Helix cutover’s **default** compare live `app-dna-v1` against the authored CWL surface per RFC-0022/0023 — consume CWL fixtures/seed tools, never fork the grammar.

## Why

Secure’s out-of-box path stays **traffic DNA**. Cutover is the moment CWL matters: operators need “converted / authored surface matches live DNA” in one shared vocabulary. That mapping is already specified in the language pillar; Helix applies it.

## CWL has done (do not re-implement)

- [RFC-0022](../language/CWL-RFC-0022-dna-surface-bridge.md) — surface ↔ DNA identity / compare rules
- [RFC-0023](../language/CWL-RFC-0023-deploy-dna-profiles.md) — external deploy/DNA profile (`cwl-deploy-profile-v1`)
- Gold: `fixtures/language-gold/24-dna-bridge/` (`routes.cwl`, `expected-dna.json`, `deploy-profile.json`)
- Seed helper / gate: `cwl-dna-seed` · `npm run test:cwl-dna-bridge` (in CWL)
- Spine: `npm run smoke:ut-spine` (optional `:helix` when sibling present)
- Private pillar posture — Secure pins via `file:` / sibling / `CHRYSALIS_CWL_ROOT`

## Secure must do

1. **Cutover default** — Default cutover compare = live certified DNA **vs** CWL-derived surface identity (method + path_template + host from deploy profile), not DNA-only or Convert-only ad hoc diffs.
2. **Consume RFCs** — Implement seed/compare against RFC-0022 mapping and RFC-0023 profiles; use gold `24-dna-bridge` as the contract bar.
3. **No grammar fork** — Do not copy or alter CWL parser/print into Helix. Import sibling / `file:` `@chrysalis/cwl` / `CHRYSALIS_CWL_ROOT` only.
4. **Keep DNA primary** — Traffic learn/enforce remains Helix-owned; CWL bridge is optional for protect-at-rest, **required** for cutover-default surface compare.
5. **Private repo** — Work in private `AgenticOp-io/chrysalis-security`; no assumption of public CWL npm.

## Do not

- Edit `chrysalis-cwl` RFCs or golds from Secure (request changes here instead)
- Embed deploy/host into CWL grammar
- Auto-merge CWL `hole` vocabulary into DNA `holes[]` (different honesty domains — see RFC-0022 § Holes)
- Implement Convert peels or WebIR ownership flip

## Acceptance checklist

- [ ] Cutover **default** path compares live DNA identity to CWL surface (RFC-0022)
- [ ] Deploy profile applied per RFC-0023 when host ≠ `"default"`
- [ ] `npm run cwl-bridge-smoke` green against sibling CWL `0.1.9+`
- [ ] `npm run cutover-smoke` green (default includes CWL surface compare)
- [ ] No Helix-local CWL grammar fork; pin/sync check still passes
- [ ] Optional: CWL `npm run smoke:ut-spine:helix` green from language pillar with Secure sibling
- [ ] Reply with Secure SHA + smoke markers to orchestrator / CWL agent

## Reply shape

```text
SECURE_CUTOVER: ok
SHA: <security commit>
CWL_PIN: 0.1.9+
SMOKES: cwl-bridge-smoke · cutover-smoke
RFC: 0022 · 0023
```
