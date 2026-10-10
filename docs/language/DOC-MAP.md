# CWL documentation map

**Tip:** **1.0.88** · invent queue **CLOSED** · RFCs **0001–0045** · golds **01–97**  
**Sibling maps:** Convert [`docs/DOC-MAP.md`](../../../chrysalis-convert/docs/DOC-MAP.md) · Secure [`docs/DOC-MAP.md`](../../../chrysalis-security/docs/DOC-MAP.md)  
**Honest leftovers:** [`DOC-HOLES.md`](./DOC-HOLES.md)

CWL owns the **genome** (language). Convert peels. Secure proves traffic DNA. Site deploys.

## Start here

| Need | Doc |
| --- | --- |
| Install & use | [`CWL-HOWTO.md`](./CWL-HOWTO.md) |
| Constitution | [`CWL-PILLAR-HOME.md`](./CWL-PILLAR-HOME.md) |
| Rosetta → UT path | [`ROSETTA-UT-PATH.md`](./ROSETTA-UT-PATH.md) |
| What CWL models / refuses | [`CWL-LANGUAGE-SCOPE.md`](./CWL-LANGUAGE-SCOPE.md) |
| Publish / pin | [`CWL-PUBLISH.md`](./CWL-PUBLISH.md) |
| CLI | [`CWL-CLI.md`](./CWL-CLI.md) |
| Language reference | [`CWL.md`](./CWL.md) |
| RFC index | [`CWL-RFC.md`](./CWL-RFC.md) |
| Surface taxonomy | [`CWL-SURFACE-TAXONOMY.md`](./CWL-SURFACE-TAXONOMY.md) |
| Ecology / VSIX | [`CWL-ECOLOGY.md`](./CWL-ECOLOGY.md) · [`CWL-LSP.md`](./CWL-LSP.md) |
| Complete site + **CWL Certified** | [`CWL-SITE-COMPLETE.md`](./CWL-SITE-COMPLETE.md) |
| Deepen program | [`CWL-GENOME-DEEPEN.md`](./CWL-GENOME-DEEPEN.md) · [`CWL-LANGUAGE-PROGRAM.md`](./CWL-LANGUAGE-PROGRAM.md) |

## Tip ladder (recent DNA)

| Tip | RFC | Gold | Meaning |
| --- | --- | --- | --- |
| **1.0.85** | [0042](./CWL-RFC-0042-dna-fingerprint.md) | `94` | DNA certificate · fingerprint · bank · `match live` |
| **1.0.86** | [0043](./CWL-RFC-0043-dna-fingerprint-strong.md) | `95` | Fingerprint floor sha384/sha512 (`sha256` too weak for DNA) |
| **1.0.87** | [0044](./CWL-RFC-0044-dna-proof.md) | `96` | Multi-fp · `match bank` · `dna expect` |
| **1.0.88** | [0045](./CWL-RFC-0045-dna-proof-unit.md) | `97` | Named proof units · quorum · lineage · witness · scope |

Asset SRI may still use sha256. PQ certificate signatures are **Secure-owned** — not CWL invent.

## Site genome

| Artifact | Path |
| --- | --- |
| Genome | `fixtures/sites/agenticop-io/site.cwl` (27 pages) |
| Seal SVG | `fixtures/sites/agenticop-io/assets/cwl-certified.svg` |
| Public page | `/cwl-certified.html` — Get CWL Certified |
| Smokes | `npm run smoke:agenticop-site` · `npm run smoke:cwl-site-complete` |
| Emit | `npm run emit:site` (live Firebase = site lane) |

**CWL Certified** = genome form (pages from CWL + emit:site + honest tip + assets). Not Helix enforce. Not a crypto certificate.

## Gates

```bash
npm run build:webir
CWL_REQUIRE_WEBIR=1 npm run test:language
npm run smoke:agenticop-site
npm run smoke:cwl-site-complete
```

## Who owns what

| Topic | Owner |
| --- | --- |
| Grammar, RFCs, golds, parser/print, tip version | **CWL** (this repo) |
| Origin peels, WebIR machine IR, oracle, hub | **Convert** |
| Traffic DNA, live-match, soak → enforce | **Secure** |
| Live agenticop.io Firebase | **Site / parent** |
| Sibling coordination | `docs/pillar-sync/` |

## Cross-pillar doc maps

| Pillar | Map |
| --- | --- |
| Convert | `engines/chrysalis-convert/docs/DOC-MAP.md` · holes `DOC-HOLES.md` |
| Secure | `engines/chrysalis-security/docs/DOC-MAP.md` · holes `DOC-HOLES.md` |
