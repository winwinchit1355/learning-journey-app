# Tasks — Current

Update this file at session start (in-progress) and when closing work. Finished entries move to `completed/`.

## Now

- [x] **Login screen UI** — added `app/login.js` from `login.jpg` with NativeWind, keyboard-aware layout, input validation, and Remember me toggle; welcome account action opens `/login`. Auth/reset/registration remain explicit placeholders. Formatting and Babel syntax verified; device testing pending.

- [x] **Welcome reference alignment** — rechecked `initial-page.jpg`; updated overlapping circles/book/accents, reference wording, colors, and underlined account CTA. Account CTA explicitly reports sign-in unavailable until auth is implemented. Formatting and syntax checks passed; Android visual verification pending.

- [x] **Welcome button background follow-up** — replaced the Pressable style callback with a direct style and Android ripple after the purple background was reported missing. Android visual verification pending.

- [x] **Welcome CTA typography** — added explicit 24px line height, centered text, and disabled Android font padding in `styles.buttonText`; device rendering verification pending.

- [x] **Welcome button and persistence fix** — moved the CTA into a non-shrinking safe-area footer with scrollable welcome content; removed the commented Home onboarding reset and unused import. Formatting and Babel syntax checks passed. Android device verification remains pending; local Node is still 18.8.0.

- [x] **Dashboard empty-state fidelity** — configured NativeWind v4 for Expo SDK 54; rebuilt Home metrics, empty plan/activity cards, CTA, and tab styling to match `dashboard-empty-state.jpg`. Formatting passed; Expo lint/export are blocked until the local Node 18 runtime is upgraded to Expo SDK 54's required Node 20.19+.

- [x] **Phase 1 — Scaffold**
  - [x] `npx create-expo-app` (JavaScript + expo-router template) into this repo root
  - [x] NativeWind v4 setup; `theme.js` tokens; dark-mode base
  - [x] 5-tab bottom nav: Home, Plan, Menu, History, Stats
  - [x] `.gitignore`, `.env.example`, README skeleton
  - [x] Verify: `npx eslint .`
- [x] **Design refresh** — home, plan, subjects, history, stats, settings, profile, daily goal, add study, add subject, tags, and menu flow updated to match the current design set.
- [x] **Light theme only** — removed dark-mode activation; all screens use the light palette via Tailwind (`bg-[#F5F6FA]`, white cards, dark text). `app.json userInterfaceStyle: "light"`.
- [x] **Empty initial state** — `MOCK_SESSIONS` and `MOCK_PLAN_ITEMS` are empty by default; Home shows a dedicated empty dashboard state; onboarding (initial page) is light-themed.
- [x] **History fix** — fixed "Maximum update depth exceeded": stopped selecting `Object.fromEntries(...)` in the Zustand selector (returned a new object each render). Now selects `s.subjects` directly and builds the tags map with `useMemo`.
- [x] **Safe area + refresh** — all main UI screens use `react-native-safe-area-context`; `Screen` supports `RefreshControl` via `refreshable`, and main scroll screens have pull-to-refresh enabled.
- [x] **Agent workflow rule** — `.agent/AGENTS.md` now requires updating agent docs before any commit/push, and lists which agent file to update for code changes, flow changes, decisions, requirements, and lessons.
- [x] **Expo Router + first-launch onboarding** — added Home, Plan, Menu, History, and Stats tabs; added a safe-area welcome screen; Start Learning persists an AsyncStorage flag and replaces the route with Home; returning users skip onboarding. Verified with `npx expo-doctor` (18/18) and `npx expo export --platform web`.
- [x] **Tab pull-to-refresh** — shared `TabPage` uses a controlled `RefreshControl`; all five tabs support the pull gesture and can provide an async `onRefresh` action.
- [x] **Home dashboard (empty state)** — Home shows the `dashboard-empty-state` design when the `studyStore` has no subjects/sessions; added Zustand stores (`studyStore`, `progressStore`, `settingsStore`) persisted to AsyncStorage via `persist` middleware. `dashboard.jpg` filled state pending real data.

## Ready (approved but not started)

- [ ] **Phase 2 — SQLite layer**: schema.js (4 tables), migrations, repos (`subjects`, `sessions`, `settings`, `learning_plan_items`), stores stubs
- [ ] **Phase 3 — Home tab**: empty + filled states, today's progress cards, weekly view strip

## Backlog (from requirements.md)

- P0: Plan tab, History tab, Stats tab, Log Session, Add Subject, Learning Plan, Menu flow, Tags, Onboarding
- P1: Settings, Edit Profile, dark-mode persistence
- P2: Auth (Security/Register/Login), Firestore sync
- P3: Export (CSV/JSON/PDF), Import + summary

## Notes

- 2026-09-04 handoff: dashboard/welcome UI and NativeWind setup prepared for the user-requested commit and push. Formatting and Babel syntax checks passed. Full Expo lint/export remains unverified on local Node 18.8.0; upgrade to Node 20.19+ and test Android. Login is a placeholder alert; Add Subject currently opens Menu.

- Git repo exists at repo root (renamed to `learning-journey-app`); `.agent_docs` from the old folder name was not carried over — content was folded into this `.agent/` structure.
- DB schema + ERD live in `.agent/rules/architecture.md`.
