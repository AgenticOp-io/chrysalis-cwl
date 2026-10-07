# CWL language scope — DNA of web languages

**Status:** constitutional (read with [`CWL-PILLAR-HOME.md`](./CWL-PILLAR-HOME.md) · [`ROSETTA-UT-PATH.md`](./ROSETTA-UT-PATH.md))

## Verdict

**Goal:** CWL is the DNA of web languages. It is a language in its own right. It must be able to replace any web page.

CWL has not absorbed every programming language, and it must not. It is not a replacement for a SQL engine, an operating system, or a vendor SDK. It **is** the language a web page is written in. A page that still cannot be written here is an open language gap.

| Metaphor | Means | Owner |
| --- | --- | --- |
| **Rosetta** | One app meaning ↔ CWL / WebIR | **CWL** |
| **Universal Translator** | Hear origin stacks → speak emit targets | **Convert** |
| **DNA of web languages** | The language that replaces any web page | **CWL genome** |

Convert peels may hear PHP, Express, Python, Go, Java, C#, Ruby, Rust, frameworks, COBOL layouts, etc. Those peels **map into** this genome (or leave a named residual). They do **not** expand the genome into those languages. PHP is **one peel**, not the product identity of Chrysalis.

## Chrysalis (open source)

| Pillar | Repository | Role |
|--------|------------|------|
| **CWL** | [**chrysalis-cwl**](https://github.com/AgenticOp-io/chrysalis-cwl) | Chrysalis Web Language — DNA of web languages |
| **Convert** | [**chrysalis**](https://github.com/AgenticOp-io/chrysalis) | Universal Translator — origin → WebIR/CWL → emit |
| **Secure** | [**chrysalis-security**](https://github.com/AgenticOp-io/chrysalis-security) | Helix DNA firewall — allow only what certified traffic proves |

## What is in the genome (RFCs 0001–0034)

Modeled surfaces: `@route` / `@page`, request/response shapes, effects (including named cookie / CORS / rate / CSRF / db table / job enqueue policy), modules, UI trees / islands, control (`if` / `foreach`), nested structured literals (RFC-0025), multipart (0026), SSE (0027), named UI islands (0028), layout chrome (0029), page HTML + sibling islands (0030), repeated markup (0031), credential/session effects (0032), proxy upstream (0033), WebSocket duplex (0035), job enqueue (0036), broader UI events (0037), framework residuals (0038), DNA identity `replaces` / `from peel` / `capability` / `works without client` (0039), progressive asset integrity `script` / `style` + `integrity` / `module` / `crossorigin` (0040), named residuals (`hole reason;` gene), DNA bridge (0022/0023).

Language golds: `fixtures/language-gold/01`–`92`. Tip: [`LANGUAGE_VERSION.md`](../../LANGUAGE_VERSION.md). Dynamic HTML emit builds a page from the CWL source, the request, and rows (`npm run live -- file.cwl --data data.json`). `engine` names sqlite, postgres, mysql, mariadb, sqlserver, or oracle. `table` plus `db select` / `insert` / `update` / `delete` are bound row operations on that engine (`--db` is a sqlite file or that engine's URL). Request values are parameters. Raw SQL text is not a statement. `stream websocket;` names duplex upgrade intent. `job.enqueue` names background work. `style`, `image`, and `script` name host files; optional `integrity` / `module` / `crossorigin` are document facts (RFC-0040). `form` writes a same-site form. `host firebase` names the public root. CWL does not parse CSS, read image bytes, run scripts, or deploy.

## What stays holes / out of scope

| Concern | Status |
| --- | --- |
| Wasm modules, vendor SDKs, opaque scripts | Catalogued `unsupported:*` holes (RFC-0024) — do not invent grammar |
| Nest DI / LiveView / Flutter / middleware onion | Catalogued residuals (RFC-0038, tip `1.0.81`) — never façade genes |
| Framework form actions | Hole (`hub-svelte:form-action` and kin). A same-site HTML form is `form` / `field` / `submit` (tip 1.0.67). An off-site action is `unsupported:offsite-form` |
| Raw SQL text, queues, Mongo, GenieACS, NGFW | A SQL string is `unsupported:raw-sql` (RFC-0038). Named tables and bound row operations are (tip `1.0.74`) on sqlite, postgres, mysql, mariadb, sqlserver, and oracle. Any other engine is `cwl:unknown-db-engine` |
| WebSocket duplex | `stream websocket;` (RFC-0035). Residual / undeclared duplex stays `unsupported:websocket` |
| Background jobs | `job.enqueue` / `job.enqueue name <id>` (RFC-0036). Queue engines stay host-side |
| Tracking cookies | Kept hole (`unsupported:tracking-cookie`, RFC-0034). Session, CSRF, and an enumerated preference stay |
| Open redirect | Kept hole (`unsupported:open-redirect`, RFC-0006). Same-site `redirect "/path"` stays |
| Origin PLs as CWL dialects | **Forbidden** — peels belong in Convert |

## How to grow (honestly)

1. Close a page gap with an RFC + language gold when a web page still cannot be written here.
2. New **named hole reasons** when Convert peels need vocabulary (RFC/catalog first).
3. New **surfaces** only with RFC + language gold (never “looks green” façades).
4. Broader **origin hearing** = Convert peel work, not CWL grammar forks.

If someone asks “when will CWL support language X?”: Convert may peel X into CWL. The goal is stricter. If X is how a web page is written, CWL must be able to replace that page.
