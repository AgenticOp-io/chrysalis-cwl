# AGENTS.md — chrysalis-cwl

You own **CWL — the DNA of the web** (Rosetta inscription + tongue for the Universal Translator). Convert and Secure consume you; they do not redefine you.

**This workspace / chat is CWL-only.** Separate agents own Convert (`chrysalis-convert`) and Secure (`chrysalis-security`). Do **not** edit those trees from here.

**Sibling sync (required):** `git pull` all three engines each turn. Read [`docs/pillar-sync/BOARD.md`](./docs/pillar-sync/BOARD.md) + [`OUTBOX.md`](./docs/pillar-sync/OUTBOX.md) and sibling OUTBOXes. Write only this repo’s `docs/pillar-sync/`; **commit + push candidate** before ending the turn. Never leave bus edits dirty.

**Authority / git:** Parent authorizes push — see `AgenticOps/docs/AGENT_AUTHORITY.md` and `AgenticOps/docs/SUBAGENT_PUSH_PROTOCOL.md`.

## Read first

1. `git pull` CWL + Convert + Secure; then [`docs/pillar-sync/BOARD.md`](./docs/pillar-sync/BOARD.md)
2. [`docs/language/CWL-PILLAR-HOME.md`](./docs/language/CWL-PILLAR-HOME.md) — **constitution (full)**
3. [`docs/language/ROSETTA-UT-PATH.md`](./docs/language/ROSETTA-UT-PATH.md) — Rosetta → UT → DNA path
4. [`LANGUAGE_VERSION.md`](./LANGUAGE_VERSION.md)
5. [`docs/history/ROADMAP.md`](./docs/history/ROADMAP.md)
6. [`README.md`](./README.md)
7. [`docs/language/CWL.md`](./docs/language/CWL.md)
8. [`docs/language/CWL-PUBLISH.md`](./docs/language/CWL-PUBLISH.md) — publish later; Convert/Secure pin (`file:` vs registry)
9. `AgenticOps/docs/THREE_PILLARS.md`

## Mission

Make CWL the **heritable identity** of web apps — so the Universal Translator (Convert), security bridges, runtimes, and emit all share one Rosetta bar (RFCs, fixtures, parse/print, versioning). Never invent what you cannot translate: `hole reason;`.

## Do

- Mature grammar, RFCs, parser/print/runtime/emit **in this tree only**
- Add language golds with every syntax/semantics change
- `npm run test:language` (then post sync ask to Convert INBOX for `sync:convert` — do not patch Convert yourself)
- When Convert or Secure needs a language change, land it **here** and hand off via **pillar-sync**

## Don’t

- Edit `engines/chrysalis-convert` or `engines/chrysalis-security` from this chat
- Implement Helix DNA firewall features here
- Implement Convert peels, ST, Pilot Kit, Migration OS, or Chimera product gates here
- Rely on chat paste alone for sibling coordination — use `docs/pillar-sync/`
- Turn language RFCs into demo façades
- Allow convert-only forks of parsers to become the “real” CWL

**Cross-lane:** prefer `AgenticOps/docs/pillar-sync/` INBOX/OUTBOX + BOARD; also Requested CHANGELOG when useful. Sibling agents apply it.

WebIR (`@chrysalis/webir`) is **homeable** from this pillar via `packages/webir` junction (`npm run link:webir` / `smoke:webir`); physical tree still under convert until Phase 0.3 ownership flip — see `packages/WEBIR.md`. Flip is coordinated with the Convert agent.
