# DNA build — next queue

**Path:** Rosetta → UT → DNA — [`ROSETTA-UT-PATH.md`](../language/ROSETTA-UT-PATH.md)  
**Tip:** **`1.0.10`** — thin emit control reverse + authored CT only  
**Scope:** [`CWL-LANGUAGE-SCOPE.md`](../language/CWL-LANGUAGE-SCOPE.md)

## CWL-owned

*Blocked on siblings for further product-facing depth.* Language-owned Rosetta polish for control reverse is shipped. Remaining:

| Item | Why wait |
| --- | --- |
| Opaque `g_*` / DB evaluate | Convert/oracle |
| Foreach N-iteration HTML | Convert/simulate oracle |
| Browser island events | Convert/runtime |
| Fat ingest sync of 1.0.9–1.0.10 | **Convert** (mirror `appendForeachBindings` + else + thin emit if fat) |
| Registry tip pin | **Secure** (+ Convert consume docs) |

## Convert / Secure (sibling wait)

| Sibling | Ask |
| --- | --- |
| **Convert** | Tip pin **1.0.10**; sync fat `cwl-ingest` / `cwl-control-lower` (≥1.0.9 foreach/else); refresh consume docs past 1.0.8 |
| **Secure** | Tip pin **`@agenticop-io/cwl@1.0.10`** (registry + docs) |

CWL reads sibling feedback (fat behind tip, pin floors at 1.0.8) but does not edit Convert/Secure trees.
