# AGENTS.md — chrysalis-cwl

You are on the **CWL language pillar**, not Convert migrations and not Helix firewall.

**This repo is the primary holder of CWL language logic.** Convert junctions/mirrors and Secure bridges consume you — they do not redefine the language.

## Read first

1. [`README.md`](./README.md)
2. [`docs/language/CWL.md`](./docs/language/CWL.md) (if present)
3. [`docs/history/PILLAR_HANDOFF.md`](./docs/history/PILLAR_HANDOFF.md)
4. `AgenticOps/docs/THREE_PILLARS.md`

## Do

- Mature grammar, RFCs, parser/runtime/emit packages in this tree  
- Keep Convert junctions working (edit files **here**; convert paths are junctions or mirrors to sync)  
- Prefer language fixtures and RFCs over hub/WISP product smokes  
- When convert asks for a language fix, land it here first  

## Don’t

- Implement Helix DNA firewall features here  
- Turn language RFCs into demo façades  
- Break convert by deleting junctions without updating convert  
- Allow convert-only forks of parsers/runtimes/scripts to become the “real” CWL  

WebIR package still lives under convert for now (`packages/webir`); treat it as shared substrate until extracted.
