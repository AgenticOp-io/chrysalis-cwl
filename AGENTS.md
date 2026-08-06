# AGENTS.md — chrysalis-cwl

You own **CWL — THE language of the web** for AgenticOps. Convert and Secure consume you; they do not redefine you.

**This workspace / chat is CWL-only.** Separate agents own Convert (`chrysalis-convert`) and Secure (`chrysalis-security`). Do **not** edit those trees from here.

**Authority / git:** Parent authorizes push — see `AgenticOps/docs/AGENT_AUTHORITY.md` and `AgenticOps/docs/SUBAGENT_PUSH_PROTOCOL.md`.

## Read first

1. [`docs/language/CWL-PILLAR-HOME.md`](./docs/language/CWL-PILLAR-HOME.md) — **constitution (full)**
2. [`LANGUAGE_VERSION.md`](./LANGUAGE_VERSION.md)
3. [`docs/history/ROADMAP.md`](./docs/history/ROADMAP.md)
4. [`README.md`](./README.md)
5. [`docs/language/CWL.md`](./docs/language/CWL.md)
6. [`docs/language/CWL-PUBLISH.md`](./docs/language/CWL-PUBLISH.md) — publish later; Convert/Secure pin (`file:` vs registry)
7. `AgenticOps/docs/THREE_PILLARS.md`

## Mission

Make CWL the **canonical** way to say what a web app is — so conversion, security bridges, runtimes, and emit all share one language bar (RFCs, fixtures, parse/print, versioning).

## Do

- Mature grammar, RFCs, parser/print/runtime/emit **in this tree only**
- Add language golds with every syntax/semantics change
- `npm run test:language` (then tell Convert agent to pull / `sync:convert` — do not patch Convert yourself)
- When Convert or Secure needs a language change, land it **here** and hand off

## Don’t

- Edit `engines/chrysalis-convert` or `engines/chrysalis-security` from this chat
- Implement Helix DNA firewall features here
- Implement Convert peels, ST, Pilot Kit, Migration OS, or Chimera product gates here
- Turn language RFCs into demo façades
- Allow convert-only forks of parsers to become the “real” CWL

**Cross-lane:** document a Requested CHANGELOG line for Convert/Secure; stop. Sibling agents apply it.

WebIR (`@chrysalis/webir`) is **homeable** from this pillar via `packages/webir` junction (`npm run link:webir` / `smoke:webir`); physical tree still under convert until Phase 0.3 ownership flip — see `packages/WEBIR.md`. Flip is coordinated with the Convert agent.
