# Standing pastes — **optional fallback only**

**Primary path:** CWL coordinator dispatches Convert/Secure **Task agents** from this chat. You do **not** need to paste into sibling windows.

Use the blocks below only if you want a long-lived sibling Cursor chat as a manual backup.

---

## Convert — paste this

```text
Lane: CONVERT. Standby fleet mode — timer check-in until CWL marks CWL_FLEET_IDLE.

## Every tick (and now)
1. git -C ../chrysalis-cwl pull --ff-only
2. git -C ../chrysalis-convert pull --ff-only
3. git -C ../chrysalis-security pull --ff-only
4. Read: ../chrysalis-cwl/docs/pillar-sync/BOARD.md
5. Read: ../chrysalis-cwl/docs/pillar-sync/OUTBOX.md (open asks To: convert)
6. Read: ../chrysalis-cwl/docs/pillar-sync/HEARTBEAT.md

## If open Convert ask
- Do the ask in Convert lane only. No CWL/Secure edits.
- Append Reply in docs/pillar-sync/OUTBOX.md (Status: done + CONVERT_* token + SHA).
- Commit + push candidate/* only.
- Set OUTBOX Heartbeat: STATUS=waiting after reply.

## If no open Convert ask
- Append/update OUTBOX top Heartbeat:
  STATUS=waiting | LAST=ISO8601 | SHA=<short> | NOTE=idle standby
- Commit + push if heartbeat changed.
- Do not invent dialects/COBOL/EXTFMAP closes without an open ask or operator charter.
- EXTFMAP operator close is NOT agent invent.

## Hard rules
- CWL tip 1.0.17 invent CLOSED unless CWL OUTBOX opens a tip gap.
- Never push main. Never dual-edit siblings.

## Timer
/loop 5m Convert standby: pull all three engines; read CWL BOARD+OUTBOX+HEARTBEAT; if CWL_FLEET_IDLE=yes stop; else execute open Convert asks (not standby-only); at tick end if dirty commit+push candidate; keep looping while fleet on.
```

---

## Secure — paste this

```text
Lane: SECURE. Standby fleet mode — timer check-in until CWL marks CWL_FLEET_IDLE.

## Every tick (and now)
1. git -C ../chrysalis-cwl pull --ff-only
2. git -C ../chrysalis-convert pull --ff-only
3. git -C ../chrysalis-security pull --ff-only
4. Read: ../chrysalis-cwl/docs/pillar-sync/BOARD.md
5. Read: ../chrysalis-cwl/docs/pillar-sync/OUTBOX.md (open asks To: secure)
6. Read: ../chrysalis-cwl/docs/pillar-sync/HEARTBEAT.md

## If open Secure ask
- Do the ask in Secure lane only. Protect stays DNA-only (D5). No CWL grammar fork.
- Append Reply in docs/pillar-sync/OUTBOX.md (Status: done + SECURE_* token + SHA).
- Commit + push candidate/* only.
- Set OUTBOX Heartbeat: STATUS=waiting after reply.

## If no open Secure ask
- Append/update OUTBOX top Heartbeat:
  STATUS=waiting | LAST=ISO8601 | SHA=<short> | NOTE=idle standby
- Commit + push if heartbeat changed.
- Do not invent Mode B Phase 2 / soak customer traffic without an open ask.
- Optional: if ask says prove GCE L2, use SA auth (pnpm run gce:auth:activate from Convert) then gce-sync -WithL2.

## Hard rules
- CWL tip 1.0.17 invent CLOSED unless CWL OUTBOX opens a tip gap.
- Never delete protected GCE VMs. Never push main.

## Timer
/loop 5m Secure standby: pull all three engines; read CWL BOARD+OUTBOX+HEARTBEAT; if CWL_FLEET_IDLE=yes stop; else execute open Secure asks (not standby-only); at tick end if dirty commit+push candidate; keep looping while fleet on.
```

---

## CWL coordinator (this chat — already armed by CWL agent)

```text
/loop 5m CWL fleet coordinator: pull all three; run scripts/pillar-sync-checkin.ps1; refresh HEARTBEAT/BOARD; post next open asks if siblings waiting; CWL hygiene only on contract gaps; run scripts/pillar-sync-flush.ps1 (scheduled commit+push); stop when CWL_FLEET_IDLE.
```

## Commit schedule (all lanes)

Decided by CWL coordinator — default **every 5m tick**:

1. Do work / heartbeat  
2. If dirty → commit + push `candidate/*` (no empty commits, never `main`)  
3. Sleep until next tick  

Mid-tick: also commit when an ask slice finishes so siblings see replies early.
