# Workflow: Bug Fix

## Steps

1. Reproduce first (steps + expected vs actual).
2. Trace: UI → store → repo → SQL/sync. Use targeted reads; do NOT re-read whole files already in context.
3. Find root cause; name each candidate rule that should have caught it (`rules/*.md` gap? then fix the rule too).
4. Confirm scope with developer if the fix changes behavior, not just a crash.
5. Branch a fix branch off `main`.
6. Fix minimally. Write a regression test that fails before / passes after.
7. Verify: `npx eslint . && npx jest --silent`.
8. Commit with a clear description. Update memory/lessons.md if the cause was a repeatable pitfall.

## Report format

```
- Bug: <symptom>
- Root cause: <file:line>
- Fix: <what/why>
- Regression test: <test name>
```