# Fleet HEARTBEAT

**Fleet:** tip **1.0.76** site 100% · Convert/Secure/Site asks open

| Pillar | Status | SHA | Note |
| --- | --- | --- | --- |
| **CWL** | landing | pending | tip **1.0.76** · `CWL_SITE_100_OK` |
| **Convert** | waiting | `7c970301` | pin **1.0.76** + ALWAYS `cwl-db` |
| **Secure** | waiting | `e753716` | pin **1.0.76** |
| **Site** | waiting | — | delete `ao-layout.js` after tip; redeploy on auth |

```text
FLEET_MODE: on
CWL_FLEET_IDLE: no
ORDER: tip-1.0.76-site-100
NEXT: land tip; Convert/Secure pin; Site cleans ao-layout.js
```
