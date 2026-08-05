# CWL publish & consumer pin path

**Status:** Phase 1.0 prep — document only. **Do not `npm publish` until Exit 1.0.**

Canonical version: [`LANGUAGE_VERSION.md`](../../LANGUAGE_VERSION.md)  
Package metadata: [`packages/cwl/package.json`](../../packages/cwl/package.json) (`@chrysalis/cwl`)

---

## Today (pre-publish)

| Fact | Detail |
| --- | --- |
| Package | `@chrysalis/cwl` stays `"private": true` |
| Version | Must match `LANGUAGE_VERSION.md` (currently `0.1.6`) — metadata aligned for future pin |
| Convert | Consumes via junctions / `sync:convert` / sibling checkout — not an npm pin |
| Secure | Bridges via sibling import / fixtures (e.g. DNA seed) — not an npm pin |

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

## How Convert / Secure should pin

Two legitimate pin styles. Prefer **registry** once a release exists; use **`file:` / sibling path** until then (and for local language development).

### A. Sibling path / `file:` (today — pre-publish)

Use when developing against this pillar tree, or before any registry release:

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

**Rules:** path pin must still resolve a tree whose `LANGUAGE_VERSION.md` matches the bar you claim. Do not treat a stale convert copy as authority.

### B. Registry version (after Phase 1.0 publish)

```json
{
  "dependencies": {
    "@chrysalis/cwl": "0.1.6"
  }
}
```

| Consumer | Pin rule |
| --- | --- |
| **Convert** | Exact (or `~`) `@chrysalis/cwl` matching the language bar you verify against; stop treating a random pillar tree copy as authority |
| **Secure** | Same pin when bridging surface↔DNA; never fork grammar into Helix |
| **Breaking** | Major bump in `LANGUAGE_VERSION.md` + RFC migration notes before consumers move |

Until publish, pin = **git SHA / sibling `file:` path** of this repo at a known `LANGUAGE_VERSION.md`. After publish, prefer the npm (or private registry) version string.

---

## Checklist (Exit 1.0)

- [x] Prep: package `"version"` ≡ `LANGUAGE_VERSION.md`; this doc exists
- [ ] npm (or private registry) package version ≡ `LANGUAGE_VERSION.md` (**actual publish — not done**)
- [ ] Convert pins a CWL release (registry or documented `file:` → registry migration)
- [ ] Secure pins a CWL release (bridge consumers)
- [ ] Breaking changes require major bump + RFC migration notes

See [`ROADMAP.md`](../history/ROADMAP.md) Phase 1.0.
