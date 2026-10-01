# 67 — cache.no-cache

RFC-0020 deepen (tip **1.0.59**): `cache.no-cache` declares that a cache may store the response but must revalidate before reuse.
Composes with `cache.private`. `cache.no-store` stays the stronger refusal. Host sets the header — no CDN invent.
