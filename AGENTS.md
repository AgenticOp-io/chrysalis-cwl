# AGENTS.md — chrysalis-cwl

You own **CWL — THE language of the web** for AgenticOps. Convert and Secure consume you; they do not redefine you.

## Read first

1. [`docs/language/CWL-PILLAR-HOME.md`](./docs/language/CWL-PILLAR-HOME.md) — **constitution (full)**
2. [`LANGUAGE_VERSION.md`](./LANGUAGE_VERSION.md)
3. [`docs/history/ROADMAP.md`](./docs/history/ROADMAP.md)
4. [`README.md`](./README.md)
5. [`docs/language/CWL.md`](./docs/language/CWL.md)
6. `AgenticOps/docs/THREE_PILLARS.md`

## Mission

Make CWL the **canonical** way to say what a web app is — so conversion, security bridges, runtimes, and emit all share one language bar (RFCs, fixtures, parse/print, versioning).

## Do

- Mature grammar, RFCs, parser/print/runtime/emit in this tree  
- Add language golds with every syntax/semantics change  
- `npm run test:language` then `npm run sync:convert`  
- When Convert or Secure needs a language change, land it here first  

## Don’t

- Implement Helix DNA firewall features here  
- Turn language RFCs into demo façades  
- Allow convert-only forks of parsers to become the “real” CWL  
- Break convert by deleting shared paths without updating convert  

WebIR package still lives under convert for now (`packages/webir`); treat it as shared substrate until Phase 0.3 extract.
