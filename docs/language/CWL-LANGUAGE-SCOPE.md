# CWL language scope — DNA of the web ≠ all programming languages

**Status:** constitutional (read with [`CWL-PILLAR-HOME.md`](./CWL-PILLAR-HOME.md) · [`ROSETTA-UT-PATH.md`](./ROSETTA-UT-PATH.md))

## Verdict

**We have not “added all programming languages” to CWL — and we must not.**

CWL is the **DNA of the web**: the heritable identity of a **web application** (routes, pages, data, UI, effects, honest holes). It is **not** a universal programming language, not a replacement for Go/Java/Python/SQL/COBOL, and not a place to absorb every vendor SDK.

| Metaphor | Means | Owner |
| --- | --- | --- |
| **Rosetta** | One app meaning ↔ CWL / WebIR | **CWL** |
| **Universal Translator** | Hear origin stacks → speak emit targets | **Convert** |
| **DNA of the web** | What the web app *is* | **CWL genome** |

Convert peels may hear PHP, Express, Python, Go, Java, C#, Ruby, Rust, frameworks, COBOL layouts, etc. Those peels **map into** this genome (or leave catalogued holes). They do **not** expand the genome into those languages. PHP is **one peel**, not the product identity of Chrysalis.

## Chrysalis (open source)

| Pillar | Repository | Role |
|--------|------------|------|
| **CWL** | [**chrysalis-cwl**](https://github.com/AgenticOp-io/chrysalis-cwl) | Chrysalis Web Language — DNA of the web |
| **Convert** | [**chrysalis**](https://github.com/AgenticOp-io/chrysalis) | Universal Translator — origin → WebIR/CWL → emit |
| **Secure** | [**chrysalis-security**](https://github.com/AgenticOp-io/chrysalis-security) | Helix DNA firewall — allow only what certified traffic proves |

## What is in the genome (RFCs 0001–0033)

Modeled surfaces: `@route` / `@page`, request/response shapes, effects (including named cookie / CORS / rate / CSRF / db table policy), modules, UI trees / islands, control (`if` / `foreach`), nested structured literals (RFC-0025), multipart (0026), SSE (0027), named UI islands (0028), layout chrome (0029), page HTML + sibling islands (0030), repeated markup (0031), credential/session effects (0032), proxy upstream (0033), holes, DNA bridge (0022/0023).

Language golds: `fixtures/language-gold/01`–`59`. Tip: [`LANGUAGE_VERSION.md`](../../LANGUAGE_VERSION.md).

## What stays holes / out of scope

| Concern | Status |
| --- | --- |
| Wasm modules, vendor SDKs, opaque scripts | Catalogued `unsupported:*` holes (RFC-0024) — do not invent grammar |
| Form actions, complex framework loads | Hole until an RFC can lower honestly |
| SQL engines, queues, Mongo, GenieACS, NGFW | Non-goals in this pillar (`db.read table X` names intent only) |
| WebSocket duplex | Kept hole (`unsupported:websocket`) until an honest peel |
| Origin PLs as CWL dialects | **Forbidden** — peels belong in Convert |

## How to grow (honestly)

1. New **named hole reasons** when Convert peels need vocabulary (RFC/catalog first).
2. New **surfaces** only with RFC + language gold (never “looks green” façades).
3. Broader **origin hearing** = Convert peel work, not CWL grammar forks.

If someone asks “when will CWL support language X?”: answer **Convert peels X into CWL surfaces or holes** — CWL already is the DNA those peels write.
