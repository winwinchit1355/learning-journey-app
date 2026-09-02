# Architecture Rules

## Layering

```
Screens (UI) → Zustand stores → Repositories (SQL) → expo-sqlite
                         └──────────▶ Firebase SDK (optional sync)
```

- Screens must NOT import SQL or Firestore directly.
- Stores are the only entry point to data from components.
- Repositories are stateless; take ids as args.

## Database

- SQLite via expo-sqlite, migrations run on app start (versioned array).
- Naming: `snake_case` columns/tables, singular model names, plural table names.

### ERD (source of truth — update in lockstep with schema.js)

```
subjects(id PK, name, color, created_at, updated_at, deleted_at, synced_at)
   │ 1:N
   ▼
study_sessions(id PK, subject_id FK, topic, date 'YYYY-MM-DD',
               start_time 'HH:MM:SS', end_time, duration_minutes,
               notes, created_at, updated_at, deleted_at, synced_at)
settings(key PK, value, updated_at, synced_at)
learning_plan_items(id PK, subject_id FK, day_of_week 0-6, topic,
                    duration_minutes, created_at, updated_at, deleted_at, synced_at)
```

Indexes: `study_sessions(subject_id)`, `study_sessions(date)`, partial `study_sessions(deleted_at) WHERE deleted_at IS NULL`.

## Settings keys

`daily_goal_minutes` (180), `dark_mode`, `push_notifications`, `user_full_name`, `user_email`, `last_synced_at`.

## Sync (Phase P2)

- Firestore layout: `users/{uid}/subjects|study_sessions|settings|learning_plan_items/{id}`.
- Trigger: app foreground + after every mutation.
- LWW by `updated_at`; push `synced_at IS NULL` first, then pull > cursor.
- Never block local writes on sync state.

## Directory layout

```
app/                  # expo-router routes (tabs + modals)
src/db/               # schema.js, *.repo.js
src/stores/           # zustand
src/components/       # shared UI
src/screens/<Feature> # screen components
src/theme.js          # colors, spacing
```

## Export/Import

- Export writes files to cache dir, share via expo-sharing. CSV/JSON/PDF.
- Import: read file, map rows (Subject Name, Date, Duration minutes), dedupe on (subject+timestamp), max 15MB.