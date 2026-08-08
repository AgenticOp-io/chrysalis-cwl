# CWL RFC-0023 — Deploy / DNA surface profiles

**Status:** accepted (normative contract — 2026-08-07)  
**Pillar:** language (`chrysalis-cwl`)  
**Consumers:** Secure (host/deploy identity); Convert (optional cutover compare)  
**Depends on:** [RFC-0022](CWL-RFC-0022-dna-surface-bridge.md)  
**Non-goal:** Helix learn/enforce implementation.

## Motivation

CWL modules have no host or environment at authoring time. Live DNA keys include `host`. Cutover and seed need a **deploy profile** so authored surface and traffic identity share a vocabulary without forking grammar into Helix.

## Profile shape

```json
{
  "schema": "cwl-deploy-profile-v1",
  "app_id": "my-app",
  "host": "default",
  "hosts": {
    "default": { "public_origin": "https://example.com" },
    "api": { "public_origin": "https://api.example.com" }
  },
  "path_shape_equality": true,
  "content_class_from_cwl": true
}
```

| Field | Meaning |
| --- | --- |
| `host` | Default DNA host label when seeding from CWL |
| `hosts` | Optional named deploy targets (docs + tools; seed uses `host` unless overridden) |
| `path_shape_equality` | Compare uses RFC-0022 shape equality (`:id` ≡ `:userId`) |
| `content_class_from_cwl` | Seed may set `content_class` from return kind (json/html) |

## Language rules

1. CWL source does **not** embed deploy profiles (keeps grammar free of ops).
2. Profile is an **external** artifact beside the module (CI, Helix, evidence pack).
3. Gold fixture for the default profile: `fixtures/language-gold/24-dna-bridge/deploy-profile.json`.
4. `npm run smoke:ut-spine` may read the gold profile when present; absence → host `"default"`.

## Ownership

| Concern | Owner |
| --- | --- |
| Profile schema + gold | **CWL** |
| Applying profile at seed/compare/enforce | **Secure** |
| Supplying profile in migration cutover | **Convert** (consume only) |
