# Convert gravity — Requested (DNA evolution Step G)

**Status:** Requested — Convert agent owns implementation  
**From:** CWL pillar (`chrysalis-cwl` tip **`1.0.16`** — DNA queue **CLOSED**)  
**Convert repo:** private [`AgenticOp-io/chrysalis`](https://github.com/AgenticOp-io/chrysalis) (local: `engines/chrysalis-convert`)  
**Related:** [DNA-EVOLUTION-0.1.9.md](./DNA-EVOLUTION-0.1.9.md) Step G · [WEBIR-FLIP-REQUESTED.md](./WEBIR-FLIP-REQUESTED.md) · [PRIVATE-PILLARS.md](./PRIVATE-PILLARS.md) · [EXIT-1.0.md](./EXIT-1.0.md) · separate execute ask: [CONVERT-REWRITE-HEADERS-REQUESTED.md](./CONVERT-REWRITE-HEADERS-REQUESTED.md) (`RequestInput.headers` / `04-request-context`)

## Ask (one sentence)

Make every Convert peel/emit path land **honest CWL** (typed holes, no façades), prove cutover smokes, **pin tip `@agenticop-io/cwl@1.0.16`**, and keep WebIR reverse-homed to chrysalis-cwl.

## Why

CWL is the genetic identity of web programs. Convert’s product gravity is worthless if peels emit demo stubs, silent invent, or a private grammar fork. Language truth lives here; Convert **consumes** via junctions / `file:` pin.

## CWL has done (do not re-implement)

- Grammar, RFCs, parse/print, language golds, diagnose, DNA bridge contract (RFC-0022/0023)
- Junctions for core `cwl-*.mjs`; `@chrysalis/cwl` `file:` pin path
- UT spine + evidence: `npm run smoke:ut-spine` / `smoke:ut-evidence` (Convert wraps via `hub:cwl-helix-cutover-smoke`)
- Private pillar posture — no public npm / Marketplace assumption

## Convert must do

1. **Honest landings** — Every peel → WebIR/CWL → emit path must preserve unsupported work as catalogued `hole …;` (or equivalent WebIR hole). No silent stubs, no “looks green” façades that hide missing behavior.
2. **Pin tip `1.0.16`** — Prefer `"@agenticop-io/cwl": "1.0.16"` from GitHub Packages; `file:../chrysalis-cwl/packages/cwl` OK during cutover. Refresh junctions / mirrors; no convert-only parser/print forks.
3. **Cutover proof** — Keep `pnpm run hub:cwl-helix-cutover-smoke` green against the sibling CWL tree (and language pillar smoke as today). Prefer CWL golds over inventing a second golden tree.
4. **Private repo** — Work in private `AgenticOp-io/chrysalis`.
5. **WebIR reverse-home** — CWL already has physical `packages/webir`; Convert must junction/`file:` → CWL: [WEBIR-FLIP-REQUESTED.md](./WEBIR-FLIP-REQUESTED.md).

## Do not

- Edit `chrysalis-cwl` grammar or redefine RFCs from Convert
- Implement Helix learn/enforce / NGFW
- Treat convert-local `cwl-*.mjs` copies as more authoritative than this pillar

## Acceptance checklist

- [ ] Peel/emit paths under review emit or preserve honest CWL holes (no façade stubs)
- [ ] Pin `@agenticop-io/cwl@1.0.16` (or `file:` ≡ tip) + WebIR reverse-home checklist started
- [ ] `pnpm run hub:cwl-language-pillar-smoke` green
- [ ] `pnpm run hub:cwl-helix-cutover-smoke` green (consumes CWL UT spine contract)
- [ ] No convert-only grammar fork; parser/print match pillar (or are reparse-point junctions)
- [ ] Reply with Convert SHA + smoke markers to orchestrator / CWL agent

## Reply shape

```text
CONVERT_GRAVITY: ok
SHA: <convert commit>
CWL_PIN: @agenticop-io/cwl@1.0.0 | file:1.0.0
WEBIR: reverse-home <ok|pending>
SMOKES: hub:cwl-language-pillar-smoke · hub:cwl-helix-cutover-smoke
```
