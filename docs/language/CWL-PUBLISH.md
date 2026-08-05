# CWL publish & consumer pin path

**Status:** Phase 1.0 prep — document only. **Do not `npm publish` until Exit 1.0.**

Canonical version: [`LANGUAGE_VERSION.md`](../../LANGUAGE_VERSION.md)  
Package metadata: [`packages/cwl/package.json`](../../packages/cwl/package.json) (`@chrysalis/cwl`)

---

## Today (pre-publish)

| Fact | Detail |
| --- | --- |
| Package | `@chrysalis/cwl` stays `"private": true` |
| Version | Must match `LANGUAGE_VERSION.md` (currently `0.1.7`) — metadata aligned for future pin |
| Convert | **`file:../chrysalis-cwl/packages/cwl`** pin (devDependency) + junctions / sibling |
| Secure | **`file:../chrysalis-cwl/packages/cwl`** pin + sibling / `CHRYSALIS_CWL_ROOT` |

**Version rule:** whenever the language surface changes for consumers, bump **both** `LANGUAGE_VERSION.md` and `packages/cwl/package.json` `"version"` to the same string.

---

## How to publish later (orchestrator / human only)

Agents do **not** run `npm publish` by default. When Exit 1.0 is intentionally opened:

1. Confirm `packages/cwl/package.json` `"version"` ≡ `LANGUAGE_VERSION.md`.
2. Gate: `npm run test:language` green; `CHANGELOG.md` entry for the release.
3. Decide registry (public npm vs private AgenticOps registry).
4. Set `"private": false` (or `publishConfig`) **only for the publish commit**.
5. From `packages/cwl` (or workspace root with `-w @chrysalis/cwl`):  
   `npm publish --access public` (or scoped private registry equivalent).
6. Publish artifact: `@chrysalis/cwl@<LANGUAGE_VERSION>`.
7. Tag git `cwl-v<LANGUAGE_VERSION>` (optional but preferred).
8. Leave a follow-up: Convert / Secure PRs that switch to the registry pin (below).

Parser/scripts may still live in-repo at 1.0; the published package is the **versioned language surface** consumers pin. Expanding `files` / exports (parser extract) can follow without changing the pin rule.

---

## How Convert / Secure should pin (pre-publish)

Three legitimate **local** pin styles. Prefer them in this order until a registry release exists. After Exit 1.0 publish, migrate to **registry version** (section B).

### Resolution order (runtime / tools)

Consumers that load the language tree (gates, bridge, smokes) should resolve the pillar root as:

1. Explicit option / CLI flag (e.g. `--cwl-root`) if provided  
2. Env **`CHRYSALIS_CWL_ROOT`** → absolute path to `engines/chrysalis-cwl`  
3. Sibling checkout: `../chrysalis-cwl` next to convert or security under `AgenticOps/engines/`  
4. (Convert only) Junction / `realpath` of `packages/cwl` back into this pillar  

Always verify `LANGUAGE_VERSION.md` exists at the resolved root and matches the bar you claim.

### A1. Workspace sibling (default AgenticOps layout)

```text
AgenticOps/engines/
  chrysalis-cwl/          ← language authority
  chrysalis-convert/      ← sibling → ../chrysalis-cwl
  chrysalis-security/     ← sibling → ../chrysalis-cwl
```

No env needed when both checkouts sit under `engines/`. Convert: `hub:cwl-language-pillar-smoke`. Secure: `cwl-bridge-smoke` / `helix seed-cwl`.

### A2. Env override — `CHRYSALIS_CWL_ROOT`

Use when the language tree is not a sibling (CI checkout elsewhere, worktree, monorepo remap):

```bash
# Windows PowerShell
$env:CHRYSALIS_CWL_ROOT = "C:\path\to\chrysalis-cwl"

# bash
export CHRYSALIS_CWL_ROOT=/path/to/chrysalis-cwl
```

| Consumer | Who reads it |
| --- | --- |
| **Convert** | `resolveCwlPillarRoot` in `hub-cwl-language-pillar-smoke.mjs` (and related pillar smokes) |
| **Secure** | `packages/cwl-bridge` resolve + `helix` `--cwl-root` / env for `seed-cwl` / `compare-cwl` |

Point at the **repo root** of chrysalis-cwl (the directory that contains `LANGUAGE_VERSION.md`), not `packages/cwl`.

### A3. npm `file:` dependency (optional package pin)

Use when a consumer `package.json` should declare a resolvable `@chrysalis/cwl` without registry:

```json
{
  "dependencies": {
    "@chrysalis/cwl": "file:../chrysalis-cwl/packages/cwl"
  }
}
```

| Mechanism | When |
| --- | --- |
| `file:../chrysalis-cwl/packages/cwl` | npm-resolvable local pin from a sibling checkout |
| Junction / `sync:convert` / mirrored `cwl-*.mjs` | Convert’s current ops path — not a substitute for language ownership |
| Git SHA of this repo | CI freeze without npm: known `LANGUAGE_VERSION.md` at that SHA |
| `CHRYSALIS_CWL_ROOT` | Runtime path pin when layout ≠ sibling |

**Rules:** path / env pin must still resolve a tree whose `LANGUAGE_VERSION.md` matches the bar you claim. Do not treat a stale convert copy as authority.

### Consumer cheat sheet (today)

| Consumer | Documented pin (today) | Registry pin |
| --- | --- | --- |
| **Convert** | `file:../chrysalis-cwl/packages/cwl` + sibling / `CHRYSALIS_CWL_ROOT` + junctions — see [`chrysalis-convert/docs/CWL-PILLAR-HOME.md`](../../../chrysalis-convert/docs/CWL-PILLAR-HOME.md) | **Open** (Phase 1.0 publish) |
| **Secure** | `file:../chrysalis-cwl/packages/cwl` + sibling / `CHRYSALIS_CWL_ROOT` / `--cwl-root` — see [`chrysalis-security/docs/CWL-BRIDGE.md`](../../../chrysalis-security/docs/CWL-BRIDGE.md) | **Open** (Phase 1.0 publish) |

Gate in this pillar: `npm run test:cwl-pin` (also part of `test:language`) checks version align + Convert/Secure `file:` pins.

---

## B. Registry version (after Phase 1.0 publish)

```json
{
  "dependencies": {
    "@chrysalis/cwl": "0.1.7"
  }
}
```

| Consumer | Pin rule |
| --- | --- |
| **Convert** | Exact (or `~`) `@chrysalis/cwl` matching the language bar you verify against; stop treating a random pillar tree copy as authority |
| **Secure** | Same pin when bridging surface↔DNA; never fork grammar into Helix |
| **Breaking** | Major bump in `LANGUAGE_VERSION.md` + RFC migration notes before consumers move |

Until publish, pin = **git SHA / sibling / `CHRYSALIS_CWL_ROOT` / `file:`** of this repo at a known `LANGUAGE_VERSION.md`. After publish, prefer the npm (or private registry) version string.

---

## Checklist (Exit 1.0)

- [x] Prep: package `"version"` ≡ `LANGUAGE_VERSION.md` (`0.1.7`); this doc exists
- [x] Pre-publish pin path documented for Convert & Secure (`file:` / sibling workspace / `CHRYSALIS_CWL_ROOT`)
- [x] Convert + Secure declare `file:../chrysalis-cwl/packages/cwl` (`test:cwl-pin`)
- [ ] npm (or private registry) package version ≡ `LANGUAGE_VERSION.md` (**actual publish — not done**)
- [ ] Convert pins a **registry** CWL release (migration from `file:` / sibling / env)
- [ ] Secure pins a **registry** CWL release (migration from `file:` / sibling / env)
- [ ] Breaking changes require major bump + RFC migration notes

See [`ROADMAP.md`](../history/ROADMAP.md) Phase 1.0.
