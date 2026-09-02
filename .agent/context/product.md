# Product — Learning Journey App

## What it is

A mobile study-session tracker that helps users build a consistent learning habit: record each study session per subject, see progress toward a daily goal, keep streaks, review history, and get statistics.

## Theme

Light-only UI. Background `#F5F6FA`, cards `#FFFFFF`, primary text `#14161C`, muted `#8A8F99`, accent `#5B4BFA`. Dark mode is not active (`app.json userInterfaceStyle: "light"`); no `dark:` activation.

## Screens (current design set)

1. **Onboarding** — first-launch welcome screen with tagline and "Start Learning". Pressing the CTA persists `learning_journey.has_seen_welcome` in AsyncStorage and replaces the route with `/(tabs)/home`; returning users skip onboarding and open Home directly.
2. **Home (empty)** — empty-state hero when no data; zeros on metrics. Initial data is empty by default.
3. **Home (filled)** — today's total time, goal %, sessions, streak, weekly total, today's activities, latest subjects, weekly view.
4. **Log Study Session** — subject, topic, date, start/end time (auto duration), notes.
5. **My Subjects** — per-subject: sessions logged, total time, % of goal.
6. **Learning History** — search, grouped by date.
7. **Statistics** — Week/Month/Year tabs, total/average, streaks, total sessions, most studied, weekly bar chart, subject distribution.
8. **Settings** — profile card, Switch Account, Daily Goal, Cloud Sync Status, Push Notifications, Dark Mode, Export/Import Data, Log Out.
9. **Edit Profile** — full name + email.
10. **Daily Study Goal** — hours + minutes wheel picker.
11. **Learning Plan** — Daily/Weekly/Monthly tabs; per day-of-week scheduled items + completion.
12. **Today&apos;s Plan** — per-item status breakdown and add-study CTA.
13. **Menu** — Learning Plan, Subjects, Tags, Settings, Profile, Daily Goal, Export/Import.
14. **Tags** — tag management list.
15. **Security prompt** — "Create Account / Log In / Not Now" (cloud sync is optional).
16. **Create Account** — full name, email, password (min 8), confirm.
17. **Log In** — email, password, remember me, forgot password.
18. **Export Data** — CSV / JSON / PDF, All Data or Custom Range.
19. **Import Data** — CSV/JSON, duplicate-skip (match subject + timestamp), max 15MB, template: Subject Name, Date, Duration (minutes).
20. **Import processing** — spinner.
21. **Import Success** — summary: new records, duplicates skipped, total processed.

## Bottom nav (5 tabs)

Home | Plan | **Menu** (center) | History | Stats

## Key non-negotiables

- Works fully offline. Account not required ("Not Now").
- Dark mode support.
- Export/Import must round-trip local data.
