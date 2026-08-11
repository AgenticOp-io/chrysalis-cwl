# Fleet coordinator (CWL chat owns)

**Mode:** git bus + timed check-ins (no chat-to-chat messaging)  
**Stop when:** CWL invent CLOSED **and** Convert+Secure have **no agent-doable** portfolio work left (operator-only residuals do not count as “keep building”) **and** both HEARTBEAT = `waiting` with an empty open-ask queue → `CWL_FLEET_IDLE`

**Do not stop** just because siblings answered a standby heartbeat. Standby is a pause between asks — the coordinator’s job is to **post the next real ask** on each tick until the portfolio queue is empty.

## Roles

| Chat | Job |
| --- | --- |
| **CWL (this chat)** | Coordinator: pull all three → read OUTBOX/HEARTBEAT → post next asks → do any CWL hygiene → **scheduled commit+push** → keep going until idle |
| **Convert** | Standby loop: pull → work open ask or heartbeat waiting → **scheduled commit+push** |
| **Secure** | Standby loop: same for secure lane |

## Cadence (default)

| Agent | Interval | Wake action |
| --- | --- | --- |
| CWL coordinator | **5m** | checkin → act → **flush commit** |
| Convert standby | **5m** | pull → work/wait → **flush commit** |
| Secure standby | **5m** | pull → work/wait → **flush commit** |

P0 open ask → tighten to **2m**. Fleet winding down → **15m** until `CWL_FLEET_IDLE`.

## Commit schedule (decided)

Commits are **timer-driven**, not “ask the human first.”

| When | What |
| --- | --- |
| **Every tick end** | If own lane has dirty changes → `git add` relevant paths → commit → `git push` `candidate/*` |
| **Ask/slice complete mid-tick** | Commit immediately (don’t wait for next sleep) **and** still flush at tick end if more dirt appears |
| **Heartbeat-only** | One commit per tick max (`pillar-sync: heartbeat <lane>`) |
| **Never** | Empty commits · push `main` · `--no-verify` · leave bus dirty across a tick |

**CWL coordinator** also runs `pwsh scripts/pillar-sync-flush.ps1` at tick end (pillar-sync + checkin script only).  
Siblings flush their own `docs/pillar-sync/` (+ finished lane work for the open ask).

## Every coordinator tick

1. `git pull --ff-only` all three engines  
2. `pwsh scripts/pillar-sync-checkin.ps1`  
3. Sibling **done** → close ask on BOARD → **immediately post the next real build ask** (not standby)  
4. Sibling **waiting** with empty queue → if portfolio still has agent-doable work → open that ask; else only then consider idle  
5. CWL contract gap → land hygiene here, then ask siblings to consume  
6. **Flush commit+push** (`pillar-sync-flush.ps1`)  
7. Stop **only** when invent CLOSED **and** no agent-doable Convert/Secure work remains → `CWL_FLEET_IDLE`

**Forbidden:** declaring idle after a standby heartbeat while Convert/Secure still have scoreboard/roadmap agent work.

## Sibling waiting contract

- No invent outside BOARD/OUTBOX  
- No editing other engines  
- Heartbeat block on own OUTBOX each tick  
- **Commit+push on the schedule above** so CWL can see you

## Dispatch (no human paste)

**Primary:** CWL coordinator **launches sibling Task agents** each tick with the open OUTBOX ask baked into the prompt. Human paste into Convert/Secure chats is **optional fallback only**.

| Path | Who runs work |
| --- | --- |
| **Default** | CWL chat → Task agent (Convert lane) + Task agent (Secure lane) |
| Fallback | Human pastes [`STANDING-PASTE.md`](./STANDING-PASTE.md) into sibling Cursor chats |

Each dispatch:

1. Write/refresh open ask in CWL `OUTBOX.md` + BOARD  
2. `pillar-sync-flush.ps1` (siblings must see pushed bus)  
3. Launch Task with absolute engine path + ask id + acceptance bar  
4. On Task done → pull sibling OUTBOX → close ask → **post next ask** → dispatch again  
5. Never require the user to copy/paste between windows
