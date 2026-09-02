# AGENTS.md — Learning Journey App

Main instructions every agent session must follow. Read the referenced files before starting work.

## 1. Project

- Study-session tracker (React Native / Expo). Log time per subject, track daily goal, streaks, stats, weekly learning plan.
- Design source: `G:\Projects\Learning Journey App\design\Learning Journey App.pdf` (current design set with PNG exports under `G:\Projects\Learning Journey App\design\`).
- Desired stack: Expo SDK 52+, JavaScript (no TypeScript), expo-router, expo-sqlite (local-first), Firebase JS SDK (optional auth/cloud sync), Zustand, NativeWind v4, dayjs, react-native-gifted-charts.

## 2. Every session start

1. Read `.agent/tasks/current.md` — what is in progress.
2. Read `.agent/memory/lessons.md` + `decisions.md` — avoid repeating mistakes.
3. Read `.agent/context/` — product/requirements if unsure of scope.
4. Read relevant `rules/*.md` before touching each concern.

## 3. Workflow (mandatory)

1. **Plan** — draft plan (scope, files, DB impact) before writing code.
2. **Approval** — present to the developer; wait for explicit go-ahead.
3. **Implement** — one step at a time; run to completion.
4. **Verify** — `npx eslint .` (+ Jest when tests exist).
5. **Update agent docs** — update the files listed in section 4 for any code, flow, decision, requirement, or lesson changes **before** committing.
6. **Commit & push** — only after agent docs are current.
7. **Memory** — append lessons learned only when non-obvious.

## 4. Agent Doc Updates (mandatory)

- Code changes: update `.agent/tasks/current.md` with what changed, verification run, and remaining work.
- Screen flow or navigation changes: update `.agent/context/product.md` with the affected route/screen behavior.
- Architecture, data, dependency, or product decisions: update `.agent/context/decisions.md` with date, decision, and rationale.
- Requirement/scope changes: update `.agent/context/requirements.md` with the new or changed requirement.
- Non-obvious bug, tool, library, or workflow lesson: update `.agent/memory/lessons.md` so future agents avoid repeating it.
- Before any `git commit` or `git push`: check `git diff -- .agent` and ensure the relevant agent docs are included.

## 5. Token efficiency (abridged)

- Targeted reads (`offset`/`limit`); never re-read unchanged files.
- Grep/glob before reading; delegate wide exploration to subagents.
- Do not echo file/tool output back into replies.
- Batch independent reads in parallel; one verification call.
- Keep replies short, direct, no filler, no emojis.
- Prefer surgical `edit` over whole-file rewrites.

## 6. Conventions

- Hydrate only from `.agent/` docs + codebase — never from memory of earlier projects.
- All IDs are UUID v4 (expo-crypto). Dates via dayjs, stored ISO.
- Local-first: SQLite is the source of truth. Firebase sync optional for logged-in users (LWW by `updated_at`).
- Follow `rules/*.md`; where a rule conflicts with the developer's explicit instruction, the instruction wins.

## 7. Verification commands

```sh
npx eslint .
npx jest               # when tests exist
# app run: npx expo start  (developer tests on device via Expo Go)
```
