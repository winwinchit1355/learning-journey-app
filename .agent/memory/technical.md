# Technical Memory

Accumulated technical facts worth remembering. Latest at top.

- **2026-08-25** — Schema: 4 tables. `study_sessions.duration_minutes` computed at insert from start/end time. Aggregations (goal %, streaks, weekly totals) computed at query time — no cache tables.
- **2026-08-25** — expo-sqlite: migrations must be idempotent; wrap schema creation in `PRAGMA user_version`-based versioning (v1).
- **2026-08-25** — UUIDs via `expo-crypto.randomUUID()`; TEXT PKs in SQLite.
- **2026-08-25** — NativeWind: `dark:` variants require a theme token for `darkMode` resolution; test both palettes when changing colors.
- **2026-08-25** — Duplicate detection for import: match on (subject name, date, start time) — normalized into a `duplicate_key` check at import time; never trust file-provided ids.
- **2026-08-25** — Design uses 24h-behind-dayjs for dates; do NOT use JS `Date` arithmetic for day boundaries (DST-safe via dayjs startOf/endOf day).