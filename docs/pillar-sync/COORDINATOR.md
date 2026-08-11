# Fleet coordinator (CWL chat owns)

**Mode:** git bus + timed check-ins (no chat-to-chat messaging)  
**Stop when:** CWL invent CLOSED **and** no open OUTBOX asks **and** Convert+Secure HEARTBEAT = `waiting` with nothing assigned → declare `CWL_FLEET_IDLE`

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
3. Sibling **done** → close ask on BOARD, post **next** or idle  
4. Sibling **waiting** + work exists → ensure **open** ask in CWL OUTBOX  
5. CWL contract gap → land hygiene here, then ask siblings to consume  
6. **Flush commit+push** (`pillar-sync-flush.ps1`)  
7. Stop condition → `CWL_FLEET_IDLE: yes` → flush → **stop loop**

## Sibling waiting contract

- No invent outside BOARD/OUTBOX  
- No editing other engines  
- Heartbeat block on own OUTBOX each tick  
- **Commit+push on the schedule above** so CWL can see you

## Pastes

- Convert / Secure: [`STANDING-PASTE.md`](./STANDING-PASTE.md)  
- Protocol: [`PROTOCOL.md`](./PROTOCOL.md)
