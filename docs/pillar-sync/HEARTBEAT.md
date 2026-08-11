# Fleet HEARTBEAT (CWL-owned snapshot)

**Updated by:** CWL coordinator each tick  
**Commit cadence:** every **5m** tick flush (dirty → commit+push `candidate/*`)

| Pillar | Status | Last seen SHA | Note |
| --- | --- | --- | --- |
| **CWL** | coordinating | *(flush)* | invent CLOSED · scheduled commits ON |
| **Convert** | assigned standby | `af72d8ae` | needs `CONVERT_STANDBY` heartbeat |
| **Secure** | assigned standby | `6c2d624` | GCE L2 green · needs `SECURE_STANDBY` |

```text
FLEET_MODE: on
CWL_FLEET_IDLE: no
COMMIT_CADENCE: 5m
```
