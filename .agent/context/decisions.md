# Decisions

Log of architectural / product decisions. Latest first.

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-09-04 | NativeWind v4 with Tailwind CSS 3.4 is the universal styling layer | Provides Tailwind-style `className` support across Expo web, Android, and iOS while matching the project's desired stack |
| 2026-09-02 | Three Zustand stores (`studyStore`, `progressStore`, `settingsStore`), each persisted to AsyncStorage via `persist` middleware | Screens stay decoupled from storage; changes to one domain don't rerender others; persistence is declarative |
| 2026-09-02 | Persist first-launch onboarding completion in AsyncStorage | The welcome screen appears once; returning users and restored tab routes must open Home without showing onboarding again |
| 2026-08-29 | Light-only UI; dark mode not active | Design renders light; removed `bg-black`/dark class activation; `app.json userInterfaceStyle: "light"` |
| 2026-08-29 | Initial data is empty (no seeded sessions/plan) | First launch shows the empty dashboard state by design |
| 2026-08-29 | BaaS approach confirmed: Firebase Auth + Cloud Firestore for account & cloud sync; NO custom backend API | Developer has no hosting server; BaaS provides auth + database with zero backend code. Local-first SQLite stays the source of truth; Firestore is the sync/backup copy. See `CLOUD-SYNC-STRATEGY.md` |
| 2026-08-25 | Expo SDK 52+ instead of bare RN | Faster DX, Expo Go device testing, EAS builds |
| 2026-08-25 | Local-first SQLite (expo-sqlite) as source of truth | Design mandates offline "Not Now" mode; sync is optional additive |
| 2026-08-25 | Firebase (Auth + Firestore) for optional cloud sync, NOT Supabase | Supabase blocked by VPN in dev country; Firebase accessible |
| 2026-08-25 | UUID v4 (TEXT) primary keys | Offline-first: no cross-device ID collisions during sync |
| 2026-08-25 | `synced_at IS NULL` = pending push; LWW merge by `updated_at` | Simple, deterministic sync strategy |
| 2026-08-25 | Soft delete (`deleted_at`) everywhere | Local + sync consistency without hard deletes |
| 2026-08-25 | Aggregations computed at query time; no denormalised cache tables | SQLite handles this scale; fewer sync/anomaly risks |
| 2026-08-25 | Zustand stores wrap repo layer; screens never touch SQL directly | Testability + UI/state separation |
| 2026-08-29 | Bottom nav = Home, Plan, Menu, History, Stats | Final design set adds a dedicated Plan tab and moves Subjects/Tags into the menu flow |
| 2026-08-25 | Added `learning_plan_items` table | Final design (p.11) adds weekly learning plan |
| 2026-08-25 | `docs/.agent` renamed to `.agent` (context/rules/workflows/tasks/memory structure) | Developer's chosen agent-guideline layout |
