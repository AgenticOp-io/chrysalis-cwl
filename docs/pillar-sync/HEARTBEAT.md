# Fleet HEARTBEAT

**Fleet:** tip **1.0.75** land `c5d48cb` · Convert/Secure pin open

| Pillar | Status | SHA | Note |
| --- | --- | --- | --- |
| **CWL** | waiting | `c5d48cb` | tip **1.0.75** · `CWL_HOST_SITE_OK` |
| **Convert** | waiting | `360588ad` | pin **1.0.75** |
| **Secure** | waiting | `44446dc` | pin **1.0.75** |
| **Site** | wait | — | live `hosting:agenticops` stays separate |

```text
FLEET_MODE: on
CWL_FLEET_IDLE: no
ORDER: tip-1.0.75-host-site-emit
NEXT: Convert/Secure pin 1.0.75; optional operator npm run deploy:demo
```
