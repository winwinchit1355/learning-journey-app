# Decision Memory

Why-specific decisions and trade-offs (short version; full log in `context/decisions.md`).

- **Local-first SQLite before Firebase** — the app must be usable offline per design ("Not Now"); cloud is an add-on, never a dependency. Revisit only if product pivots to server-authoritative.
- **No Supabase** — network-blocked in the deploy country; Firebase chosen for availability. If Firebase becomes unusable, PocketBase self-host is the fallback (swap the sync layer only).
- **UUID keys + `synced_at`** — enables future multi-device sync without ID remapping. Cost: slightly larger indexes, acceptable.
- **Stores wrap repos** — screens stay thin; swapping SQLite → API later touches only the repo layer.
- **5-tab nav with center Menu drawer** — final design (p.2) overrides the earlier 4-tab draft. Keep drawer contents per p.12.