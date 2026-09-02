# Testing Rules

## Stack

- Jest + React Native Testing Library. `expo` preset.
- Tests live beside source or in `__tests__/` mirroring the tree.

## What to test

- Repositories: CRUD + aggregation queries (today total, streaks, goal %, distribution) against in-memory SQLite (`expo-sqlite` compatible mock or `better-sqlite3` dev shim).
- Stores: state transitions, optimistic updates.
- Pure logic: duration math, date grouping, dedupe rules (import), LWW merge.
- Screen basics: renders empty vs filled state, key interactions (save session).
- NO tests for: layout pixel-perfection, NativeWind classes, chart internals.

## Verification loop

```sh
npx eslint .
npx jest --silent
```

- Debug a single failure: `npx jest --testPathPattern="<file>"`.
- If a test needs >3 mocks, test the underlying pure function instead.

## Coverage bar

- New pure logic (queries/merges/parsers): 100% path.
- Repos/stores: per-change, not gating.
- Do not chase line coverage on screens.