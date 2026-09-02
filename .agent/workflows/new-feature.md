# Workflow: New Feature

## Gate

Feature must exist in `.agent/context/requirements.md` (explicitly asked by developer or P0-P3 list). Open new when ambiguous.

## Steps

1. **Read** the relevant screen spec from design PDF + current `tasks/current.md` + `context/user-flow.md`.
2. **Plan** (write to `tasks/current.md`):
   - Schema change? (then: new table/column + migration + ERD update in `rules/architecture.md`)
   - Files to create/edit (route, screen, store, repo).
   - Edge cases: empty state, validation, dark mode.
3. **Present plan** to the developer. Do NOT code until approved.
4. **Branch** per `rules/git.md` (feature branch off `main`).
5. **Implement** one step at a time. Small logical commits.
6. **Verify**: `npx eslint .`, run relevant jest.
7. **Report**: update `tasks/current.md` + move finished to `completed/`. Append memory notes if non-obvious.
8. Merge into `main` when developer says ready.

## Summary entry

```
- [x] <Feature> — screens touched; schema delta; verification passed; commit(s)
```