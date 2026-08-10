# Pillar sync protocol (git-backed)

**Authority:** user / parent ([`AGENT_AUTHORITY.md`](../../../../docs/AGENT_AUTHORITY.md))  
**Lanes:** CWL · Convert · Secure  
**Canonical BOARD + PROTOCOL:** this tree (`engines/chrysalis-cwl/docs/pillar-sync/`)  
**Umbrella index:** `AgenticOps/docs/pillar-sync/` (points here)

## Laws

1. **No chat-to-chat messaging.** Sync = **git** (pull sibling OUTBOXes + BOARD).
2. **One writer per `engines/<pillar>/` tree.** Never dual-edit.
3. **Each pillar writes only its own `docs/pillar-sync/`** (and CWL also owns `BOARD.md` / `PROTOCOL.md`).
4. **Language SoR = CWL.** Conversion suite = Convert. Helix = Secure.
5. **Always push candidate after bus updates** so siblings see them on next pull.

## Git — every turn (required)

```powershell
$root = "C:\Users\david\AgenticOps\engines"
# 1) Refresh all three before reading
git -C "$root\chrysalis-cwl" pull --ff-only
git -C "$root\chrysalis-convert" pull --ff-only
git -C "$root\chrysalis-security" pull --ff-only
# 2) Also pull own lane if different cwd
git pull --ff-only
```

Read:

| Role | Read |
| --- | --- |
| Anyone | `chrysalis-cwl/docs/pillar-sync/BOARD.md` |
| Anyone | Sibling `docs/pillar-sync/OUTBOX.md` files |
| Own | Your `OUTBOX.md` (what you last published) |

After you change **your** OUTBOX (or CWL BOARD):

```powershell
git add docs/pillar-sync/
git commit -m "pillar-sync: <slug>"
git push -u origin HEAD   # candidate/* only
# then update BOARD SHAs if you are CWL or parent asked
```

**Do not leave bus edits uncommitted.** Siblings cannot see dirty working trees.

## Ownership map

| Path | Owner | Purpose |
| --- | --- | --- |
| `chrysalis-cwl/docs/pillar-sync/BOARD.md` | **CWL** (or parent) | Tips, SHAs, who builds next |
| `chrysalis-cwl/docs/pillar-sync/PROTOCOL.md` | **CWL** | This file |
| `chrysalis-cwl/docs/pillar-sync/OUTBOX.md` | **CWL** | Asks → Convert / Secure |
| `chrysalis-convert/docs/pillar-sync/OUTBOX.md` | **Convert** | Replies + Convert→sibling asks |
| `chrysalis-security/docs/pillar-sync/OUTBOX.md` | **Secure** | Replies + Secure→sibling asks |

## Message shape (OUTBOX)

Newest first:

```markdown
## YYYY-MM-DD — <slug>

**To:** convert | secure | cwl | all
**Priority:** P0 | P1 | P2
**Status:** open | blocked | done
**SHA:** <this-repo branch sha>
**CWL tip:** 1.0.x

### Ask / Reply
…

### Acceptance
- [ ] …

### Do not
- …
```

Receiver: pull → do work → append **Reply** block in **your** OUTBOX with Status **done** → commit → push → ask CWL/parent to refresh BOARD.

## Boot paste

```text
Lane: <cwl|convert|secure>.
git pull all three engines (ff-only).
Read chrysalis-cwl/docs/pillar-sync/BOARD.md + all three OUTBOX.md files.
Write only your lane's docs/pillar-sync/; commit+push candidate before ending turn.
```
