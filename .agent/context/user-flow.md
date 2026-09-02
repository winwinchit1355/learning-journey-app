# User Flow

```
Onboarding (1)
   │ "Start Learning"
   ▼
Home (2/3) ──▶ central hub
   │ Add Study ────────▶ Log Study Session modal (4) ──▶ saves to SQLite ──▶ Home refreshes
   │ Add Subject ──────▶ Add Subject modal
   │ View All (Latest Subjects) ──▶ Subjects tab (5)
   │ [Menu] ───────────▶ Drawer (12): Learning Plan / Subjects / Settings / Profile / Daily Goal / Export Data
   │
   ├── Subjects tab (5) ── filter/sort; tap subject → its stats; Add Subject
   ├── History tab (6) ── search box; date-grouped list of sessions
   ├── Stats tab (7) ──── Week | Month | Year switch; metrics; charts
   └── (from drawer) Settings (8)
         ├── Switch Account / Log Out ──▶ Security (13) / Log In (15) / Register (14)
         ├── Edit Profile (9)
         ├── Daily Study Goal (10)
         ├── Export Data (16) ──▶ share CSV/JSON/PDF
         └── Import Data (17) ──▶ processing (18) ──▶ success summary (19)
```

## Auth branch (optional)

- Any point a user picks "Create an account" → Register (14)
- "Log In" → Login (15)
- "Not Now" → continues local-only; sync stays off
- Happy path: local writes queue `synced_at IS NULL` → on next sync, pushed to Firestore

## Learning Plan flow

- From drawer → Learning Plan (11): Daily/Weekly/Monthly tabs; per day: "+ Add" → pick subject + duration; items displayed per day-of-week.