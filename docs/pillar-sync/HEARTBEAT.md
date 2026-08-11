# Fleet HEARTBEAT (CWL-owned snapshot)

**Dispatch mode:** CWL launches Task agents — **no human paste**

| Pillar | Status | Last seen SHA | Note |
| --- | --- | --- | --- |
| **CWL** | coordinating | `7e45e98` | 5m loop ON · dispatches workers |
| **Convert** | working (dispatched) | `8355f992` | ask `convert-liveview-honesty` → Task |
| **Secure** | working (dispatched) | `39dbaf0` | ask `secure-mode-b-phase2` → Task |

```text
FLEET_MODE: on
CWL_FLEET_IDLE: no
COMMIT_CADENCE: 5m
BUILD_LOOP: on
DISPATCH: task-agents
```
