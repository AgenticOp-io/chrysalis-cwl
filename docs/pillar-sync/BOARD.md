# Chrysalis sync BOARD (git SoR in CWL)

**Updated:** 2026-10-05 · tip **1.0.77** · **Goal:** DNA of web languages. Tip 1.0.77 closed fonts/100% contract; parent asks for **complete** CWL (no unexplained host leftovers). Site lane still deploys live.  
**Protocol:** [`PROTOCOL.md`](./PROTOCOL.md) · [`COORDINATOR.md`](./COORDINATOR.md)  
**Queue:** [`../history/DNA-BUILD-NEXT.md`](../history/DNA-BUILD-NEXT.md)

```text
FLEET_MODE: on
CWL_FLEET_IDLE: no
DISPATCH: ASK site-complete-cwl (parent INBOX). Tip 1.0.77 pins stay done. Close drawer/device/year/assets/host-path/deploy for a complete claim
CONVERT_NEXT: idle · tip 1.0.77 · wait if complete tip lands
SECURE_NEXT: idle · tip 1.0.77 · wait if complete tip lands
CWL_NEXT: open · parent ask site-complete-cwl · INBOX-SITE-COMPLETE-CWL.md
SITE_NEXT: wait · redeploy demo/live after complete tip · parent auth · CWL does not deploy live
```

## Tips / pins

| Surface | Value |
| --- | --- |
| **CWL tip** | **`1.0.77`** |
| Packages | **`@agenticop-io/cwl@1.0.77`** (pin; Packages publish when tagged) |
| Tags | `cwl-v1.0.46` · `cwl-v1.0.47` · `cwl-v1.0.56` · `cwl-v1.0.61` · `cwl-v1.0.62` · `cwl-v1.0.67` · `cwl-v1.0.70` · `cwl-v1.0.75` · `cwl-v1.0.76` · `cwl-v1.0.77` |

## Latest SHAs

| Pillar | Branch | SHA | Note |
| --- | --- | --- | --- |
| **CWL** | `main` | 55238a6 | tip **1.0.77** owned fonts · merge `a8945e0` · tag `cwl-v1.0.77` |
| **Convert** | `main` | 419164ca | tip pin **1.0.77**, `CONVERT_TIP_1_0_77_OK` |
| **Secure** | `main` | 630ccf6 | tip pin **1.0.77**, `SECURE_TIP_1_0_77_OK` |
| **Site** | `main` | 805f43b | tip **1.0.77** emit live · `SITE_DEPLOY_OK` |

## Who builds next

| Priority | Owner | Work |
| --- | --- | --- |
| **P0** | CWL | **Ask `site-complete-cwl`.** Parent: complete the public site beyond tip **1.0.77** (drawer/device/year host JS, asset-bytes rule, emit vs genome, deploy boundary). Details: [`INBOX-SITE-COMPLETE-CWL.md`](./INBOX-SITE-COMPLETE-CWL.md) |
| **P1** | Site | After tip: refresh demo (`deploy:demo`) + live when parent authorizes |
| **done** | Site | Deployed tip **1.0.77** emit to `hosting:agenticops` · main `805f43b` · PR #2 |
| **done** | Convert | Tip pin **1.0.77**, main `419164ca`, [PR #84](https://github.com/AgenticOp-io/chrysalis/pull/84) |
| **done** | Secure | Tip pin **1.0.77**, main `630ccf6`, [PR #30](https://github.com/AgenticOp-io/chrysalis-security/pull/30) |
| **done** | CWL | tip **1.0.77** owned fonts, land `55238a6`, tag `cwl-v1.0.77` |
| **done** | Secure | Tip pin **1.0.76**, main `9f61d00` |
| **done** | Convert | Tip pin **1.0.76**, main `be58a179` |
| **done** | CWL | tip **1.0.76** site 100% contract, land `bfd1122` |

## Honesty

See [`../language/CWL-SITE-100.md`](../language/CWL-SITE-100.md). Genome SoR is `fixtures/sites/agenticop-io/site.cwl`. Asset bytes SoR is `fixtures/sites/agenticop-io/assets/` (includes owned fonts). Official public host is certified `emit:site`. Year/device/drawer are certified host effects. Live Firebase CLI is site/ops. Tip **1.0.75** demo deploy refuses live `agenticops`.
