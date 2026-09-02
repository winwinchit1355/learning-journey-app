# Requirements

Derived from design PDF (19 screens). Statuses: planned / in-progress / done.

## P0 — Core tracking (must ship first)

- [x] Scaffold Expo + tabs + theme base (dark mode ready)
- [ ] SQLite schema + repository layer (`subjects`, `study_sessions`, `settings`, `learning_plan_items`)
- [x] Daily study goal setting (hours/minutes picker)
- [x] Home tab — filled state, weekly view strip, today's progress cards
- [x] Log Study Session — auto duration calc
- [x] Add Subject
- [x] Subjects tab — totals + % of goal
- [x] History tab — search + date grouping
- [x] Stats tab — week/month/year, streaks, bar chart, distribution
- [x] Learning Plan — daily/weekly/monthly scheduling per day-of-week
- [x] Menu — Learning Plan, Subjects, Tags, Settings, Profile, Daily Goal, Export Data
- [ ] Onboarding

## P1 — Settings & profile

- [x] Settings screen (8) — profile card, cloud sync status, notifications, dark mode, export/import entries, logout
- [x] Edit Profile (9)
- [ ] Dark mode persistence

## P2 — Account / sync (optional)

- [ ] Security prompt (13)
- [ ] Create Account (14) — Firebase email/password
- [ ] Log In (15)
- [ ] Cloud sync — push `synced_at IS NULL`, pull newer than cursor, LWW by `updated_at`

## P3 — Export / Import

- [ ] Export Data (16) — CSV, JSON, PDF; All Data / Custom Range
- [ ] Import Data (17-19) — CSV/JSON, dedupe (subject + timestamp), summary screen

## New design add-ons

- [x] Today&apos;s Plan detail screen
- [x] Tags management screen
- [x] Tag selection modal for Add Subject
- [ ] Onboarding refresh

## Constraints

- Local-first; never require the network.
- UUID v4 keys. Soft delete everywhere. `synced_at` marks pending sync.
- Max import file 15MB; import columns: Subject Name, Date, Duration (minutes).
