# Fleet HEARTBEAT (CWL-owned snapshot)

**Updated by:** CWL coordinator each tick (and after sibling pushes)  
**Live detail:** each pillar’s own `OUTBOX.md` top `## Heartbeat` block

| Pillar | Status | Last seen SHA | Note |
| --- | --- | --- | --- |
| **CWL** | coordinating | cb74bb9 | invent CLOSED @ 1.0.17 · fleet ON · commit every 5m |
| **Convert** | assigned standby | `af72d8ae` | open ask `convert-fleet-standby` |
| **Secure** | assigned prove | `8f64f13` | open ask `secure-gce-l2-prove` |

## Fleet flag

```text
FLEET_MODE: on
CWL_FLEET_IDLE: no
COMMIT_CADENCE: 5m
```
